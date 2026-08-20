# DEPLOYMENT.md — Production Deployment & Disaster Recovery Guide

## 1. INFRASTRUCTURE SETUP (Hetzner VPS + Coolify v4)

- **Target Server:** Hetzner Cloud VPS (CX22 / CX32: 2-4 vCPU, 4-8 GB RAM, Ubuntu 24.04 LTS).
- **Deployment Platform:** Coolify v4 (Self-hosted PaaS).
- **Fixed Monthly Cost:** ~€5.00/month (No hidden fees, no per-request charges).

---

## 2. DOCKER COMPOSE CONFIGURATION (`docker-compose.yml`)

```yaml
version: '3.8'

services:
  # ----------------------------------------------------
  # 1. PostgreSQL Database Container (Auto-Healing)
  # ----------------------------------------------------
  postgres:
    image: postgres:16-alpine
    container_name: menakyapi_postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-menak_user}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB:-menak_db}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    deploy:
      resources:
        limits:
          memory: 512M
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U $${POSTGRES_USER} -d $${POSTGRES_DB}"]
      interval: 10s
      timeout: 5s
      retries: 5

  # ----------------------------------------------------
  # 2. Next.js 16 + Payload CMS 3.x Application Container
  # ----------------------------------------------------
  web:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: menakyapi_web
    restart: unless-stopped
    depends_on:
      postgres:
        condition: service_healthy
    environment:
      NODE_ENV: production
      DATABASE_URI: postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}
      PAYLOAD_SECRET: ${PAYLOAD_SECRET}
      NEXTAUTH_URL: ${NEXTAUTH_URL}
      SMTP_HOST: ${SMTP_HOST}
      SMTP_PORT: ${SMTP_PORT}
      SMTP_USER: ${SMTP_USER}
      SMTP_PASS: ${SMTP_PASS}
    volumes:
      - media_uploads:/app/media
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.menakyapi.rule=Host(`${DOMAIN_NAME}`)"
      - "traefik.http.routers.menakyapi.entrypoints=websecure"
      - "traefik.http.routers.menakyapi.tls.certresolver=letsencrypt"

volumes:
  postgres_data:
  media_uploads:
```

---

## 3. AUTOMATED BACKUP & DISASTER RECOVERY (Tak ve Unut Backup)

### Daily Backup Execution (Nightly at 03:00 AM)
1. **Coolify Built-in Backup:** Configure Coolify Database -> Backups -> Scheduled -> Daily at 03:00 UTC.
2. **Offsite Backup Script (Restic / Rclone):**
   - Dumps `pg_dumpall` and compresses `/app/media` volume.
   - Pushes encrypted snapshot to Hetzner Storage Box.
   - **Retention Policy:** Keep 7 daily, 4 weekly, 3 monthly backups (`--keep-daily 7 --keep-weekly 4 --keep-monthly 3`).

### Disaster Recovery Steps (1-Click Restore)
If the VPS or database is damaged:
```bash
# 1. Pull latest backup snapshot from Hetzner Storage Box
rclone copy hetzner-storagebox:backups/menakyapi/latest.sql.gz ./

# 2. Restore database into fresh Postgres container
gunzip -c latest.sql.gz | docker exec -i menakyapi_postgres psql -U menak_user -d menak_db

# 3. Restart application
docker compose restart web
```

---

## 4. ROLLBACK PROCEDURE
If a bad build is deployed to production:
1. Open Coolify Dashboard -> Project -> MenakYapı -> Executions.
2. Click **Rollback to Previous Tag/Commit**.
3. Coolify automatically re-attaches the Traefik proxy router to the previous healthy container image without downtime.
