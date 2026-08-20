# ADMIN_PANEL_MAP.md — Payload CMS Collections & Globals Mapping

## 1. GLOBALS

### `site-settings` (Global Settings)
- **Header & Contact Data:**
  - `phone` (text, default: `05317924006`)
  - `whatsapp` (text, default: `05317924006`)
  - `email` (text, default: `menakyapi@gmail.com`)
  - `address` (textarea: `Şehitler caddesi Selahattin Ecevit sokak 36/3 Mamak Ankara`)
  - `workingHours` (text: `Haftaiçi 08:00 - 17:00`)
- **Key Statistics:**
  - `experienceYears` (text: `20 Yıllık Tecrübe`)
  - `completedProjects` (text: `500+ Mutlu Müşteri`)
  - `teamSize` (text: `15 Kişilik Uzman Ekip`)
- **Analytics & SEO Tracking:**
  - `gtmId` (text, e.g. `GTM-XXXXXXX`)
  - `ga4Id` (text, e.g. `G-XXXXXXXXXX`)
  - `googleSearchConsoleMeta` (text)

---

## 2. COLLECTIONS

### `pages` (Static & Dynamic Pages)
- `title` (text, required)
- `slug` (text, required, unique)
- `layout` (blocks: `hero`, `stats-block`, `services-grid`, `gallery-block`, `contact-cta-block`, `form-block`)
- `seo` (group: `metaTitle`, `metaDescription`, `ogImage`, `canonicalUrl`, `noIndex`)

### `projects` (Roofing Project Portfolio / Gallery)
- `title` (text, required)
- `slug` (text, required, unique)
- `category` (select: `kenet-cati`, `cati-tamiri`, `oluk-montaji`, `celik-konstruksiyon`)
- `location` (text: e.g. `Ankara / Mamak`, `Antalya / Alanya`)
- `images` (array of media, required)
- `description` (richText)
- `featured` (checkbox, for Homepage display)

### `services` (Core Offerings)
- `title` (text, required)
- `slug` (text, required, unique)
- `shortDescription` (textarea)
- `fullDescription` (richText)
- `icon` (text / media)
- `coverImage` (media)
- `features` (array of text bullets)

### `testimonials` (Client Feedback)
- `clientName` (text, required)
- `location` (text, e.g., `Ankara`)
- `comment` (textarea)
- `rating` (number 1-5)

### `faqs` (Frequently Asked Questions)
- `question` (text, required)
- `answer` (textarea, required)
- `category` (select: `genel`, `kenet-cati`, `garanti-onarim`)

### `posts` (Blog & Technical Knowledge Articles)
- `title` (text, required)
- `slug` (text, required, unique)
- `excerpt` (textarea, required)
- `content` (richText, Lexical editor)
- `coverImage` (upload relationTo `media`, required)
- `category` (select: `kenet-cati`, `cati-tamiri`, `villa-insaat`, `maliyet-rehberi`, `yasal-surecler`, `genel`)
- `author` (text, default: `MenakYapı Mühendislik Ekibi`)
- `publishedAt` (date, required)
- `readingTime` (number, default: 5)
- `featured` (checkbox, for pinned hero post)
- `faqItems` (array of `question` and `answer` for FAQ Schema)
- `seo` (group: `metaTitle`, `metaDescription`, `ogImage`, `canonicalUrl`, `noIndex`)

### `redirects` (301 / 302 URL Management)
- `from` (text, required)
- `to` (text, required)
- `type` (select: `301`, `302`)

---

## 3. REUSABLE BLOCKS (`components/blocks/`)

| Block Slug | Payload Schema Fields | Corresponding React Component |
|---|---|---|
| `hero` | `heading`, `subheading`, `primaryCta`, `secondaryCta`, `bgImage` | `components/blocks/hero.tsx` |
| `stats-block` | `title`, `statsArray` (`number`, `label`) | `components/blocks/stats-block.tsx` |
| `services-grid` | `heading`, `selectedServices` (relationship) | `components/blocks/services-grid.tsx` |
| `gallery-block` | `heading`, `selectedProjects` (relationship), `layoutStyle` | `components/blocks/gallery-block.tsx` |
| `contact-cta-block`| `heading`, `bodyText`, `buttonText`, `phoneHighlight` | `components/blocks/contact-cta-block.tsx` |
| `form-block` | `formTitle`, `formType` (`teklif-al` / `iletisim`), `fields` | `components/blocks/form-block.tsx` |
