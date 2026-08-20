---
colors:
  primary: "#24292E"       # Antrasit / Slate Dark
  secondary: "#4B5563"     # Koyu Metalik Gri
  accent: "#D4AF37"        # Yaldız / Premium Çatı Altını
  accent-hover: "#B89628"  # Vurgu Buton Hover
  background: "#FAFAFA"    # Nötr / Temiz Arkaplan
  surface: "#FFFFFF"       # Kart / Blok Arkaplanı
  text-main: "#111827"     # Gövde Metni
  text-muted: "#6B7280"    # İkincil Metin
  border: "#E5E7EB"        # Kart Kenarlık
typography:
  heading: { fontFamily: "Outfit, sans-serif", weight: 700 }
  body: { fontFamily: "Inter, sans-serif", weight: 400 }
spacing:
  scale: [4, 8, 16, 24, 32, 48, 64, 96]
radius:
  button: "9999px"         # Pill / Tam Yuvarlak veya Yuvarlatılmış
  card: "12px"             # Soft Kart Köşesi
  input: "8px"
components:
  button-primary: 
    background: "{colors.primary}"
    color: "#FFFFFF"
    radius: "{radius.button}"
  button-accent: 
    background: "{colors.accent}"
    color: "#111827"
    radius: "{radius.button}"
  header: 
    position: "sticky"
    layout: "logo-left-menu-right-cta"
    background: "rgba(255, 255, 255, 0.95)"
---

## Rationale & Design Intent

### Brand Aesthetic & Color Palette Rationale
MenakYapı operates in heavy construction and specialized roof manufacturing (Kenet Çatı, Oluk, Tadilat). 
- **Primary Antrasit (`#24292E`):** Reflects titanium-zinc / metal roof panel sheets, reliability, and structural strength.
- **Accent Gold (`#D4AF37`):** Represents high quality craftsmanship, premium roof finishing ("yaldız" signal in client intake), and high-contrast CTA buttons ("Teklif Al", "Tıkla Ara").
- **Clean Neutral (`#FAFAFA`):** Keeps heavy industrial content readable and modern, avoiding dark, gloomy construction aesthetic.

### Typography Selection
- **Headings (`Outfit`):** A geometric, modern sans-serif that projects engineering accuracy and industrial precision.
- **Body (`Inter`):** Highly legible across mobile and desktop devices, optimized for scanning technical specifications and services.

### Header & Call to Action Strategy
- **Header Behavior:** Sticky header with `backdrop-filter: blur(8px)` to ensure constant access to the phone number `05317924006` and direct WhatsApp button.
- **Button Styling:** Pill-shaped with subtle micro-hover elevation to create high touchability on mobile devices.
