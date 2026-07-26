---
name: Sonic Kinetic
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#37393a'
  surface-container-lowest: '#0c0f0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#282a2b'
  surface-container-highest: '#333535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#d4c0d7'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#9d8ba0'
  outline-variant: '#514255'
  surface-tint: '#ecb2ff'
  primary: '#ecb2ff'
  on-primary: '#520071'
  primary-container: '#bd00ff'
  on-primary-container: '#ffffff'
  inverse-primary: '#9900cf'
  secondary: '#b9f1ff'
  on-secondary: '#00363f'
  secondary-container: '#00e0ff'
  on-secondary-container: '#005f6d'
  tertiary: '#ffb961'
  on-tertiary: '#472a00'
  tertiary-container: '#a66800'
  on-tertiary-container: '#fffeff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#f8d8ff'
  primary-fixed-dim: '#ecb2ff'
  on-primary-fixed: '#320047'
  on-primary-fixed-variant: '#74009f'
  secondary-fixed: '#a5eeff'
  secondary-fixed-dim: '#00daf8'
  on-secondary-fixed: '#001f25'
  on-secondary-fixed-variant: '#004e5a'
  tertiary-fixed: '#ffddb9'
  tertiary-fixed-dim: '#ffb961'
  on-tertiary-fixed: '#2b1700'
  on-tertiary-fixed-variant: '#663e00'
  background: '#121414'
  on-background: '#e2e2e2'
  surface-variant: '#333535'
typography:
  display-hero:
    fontFamily: Montserrat
    fontSize: 84px
    fontWeight: '900'
    lineHeight: 90px
    letterSpacing: -0.04em
  display-hero-mobile:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '900'
    lineHeight: 52px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '800'
    lineHeight: 16px
    letterSpacing: 0.1em
  track-title:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1440px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

This design system is engineered for high-octane music discovery and artist expression. It targets a Gen-Z and Millennial audience that craves energy, movement, and immersive visuals. The personality is unapologetically bold, "always-on," and digitally native.

The design style is a hybrid of **High-Contrast Modernism** and **Glassmorphism**. Utilizing its dark mode configuration, it creates a cinematic "night-club" atmosphere where vibrant artist photography and neon accents pop with intense luminosity. Surface layers use subtle translucency to maintain a sense of depth and fluidity, mimicking the layered nature of modern audio production. The interface should feel like a premium digital stage where the artist's content is the main performance.

## Colors

The palette is anchored in a "High-Contrast Dark" philosophy. By using a white neutral seed (`#ffffff`) in a dark color mode, the system generates a range of deep charcoal and midnight greys that ensure maximum clarity and a premium, immersive feel.

The accent strategy utilizes **Neon Purple** (`#bd00ff`) as the primary energy driver for calls-to-action and active states, with **Electric Blue** (`#00e0ff`) as a secondary accent for data visualization and secondary interactive elements. These colors are designed to "glow" against the dark background. Derived from the reference material, the NCS Pink and Yellow are reserved for specific metadata tags to maintain a high-energy "festival" vibe without overwhelming the main artist brand.

## Typography

Typography is a critical tool for establishing hierarchy in a content-dense environment. **Montserrat** is used for all display and headline roles to provide a geometric, aggressive, and authoritative feel. The "Display-Hero" level is specifically designed for artist names in the header, utilizing tight tracking and heavy weight.

**Inter** handles all functional and body text. Its neutral, utilitarian design ensures legibility against dark, high-contrast backgrounds. "Label-Caps" should be used for metadata like "LATEST RELEASE" or "TOP TRACKS" to create clear section demarcation.

## Layout & Spacing

This design system employs a **Fluid Grid** with fixed outer margins at higher breakpoints. The vertical rhythm is strictly based on an 8px baseline grid to maintain density without sacrificing organization.

- **Desktop (1440px+):** 12-column grid, 64px margins. Content is organized into a large left/center primary column for tracklists and a right-hand sidebar for artist stats and discovery.
- **Tablet (768px - 1439px):** 8-column grid, 32px margins. Sidebar content reflows to the bottom of the tracklist.
- **Mobile (<768px):** 4-column grid, 16px margins. Hero imagery becomes the background for the entire top-of-fold area with a heavy bottom gradient fade for text legibility.

## Elevation & Depth

Hierarchy is achieved through **Tonal Layering** and **Glassmorphism** rather than traditional shadows. Because the neutral palette is derived from white in a dark mode, surfaces become progressively lighter as they "rise" towards the user.

1. **Base Layer:** The darkest neutral surface (`surface`) used for the main page canvas.
2. **Surface Layer:** Card containers and track rows use secondary surface levels (`surface-container`) to provide subtle separation.
3. **Overlay Layer:** Modals and navigation bars use a `surface-glass` effect with a 20px backdrop blur and a 1px inner stroke of white at 10% opacity to define edges against the dark background.
4. **Interaction:** Hovering over track rows or cards should trigger a subtle increase in lightness (brightening) and a glow effect using the `primary_color` at low (10-15%) opacity.

## Shapes

The shape language balances modern software aesthetics with the organic nature of photography. 

- **Cards and Containers:** Use "Rounded" (0.5rem) corners to feel approachable yet structured.
- **Artist Thumbnails:** Always use full circles (pill-shaped/circular) to distinguish human entities from square album art or rectangular track items.
- **Buttons:** Use a hybrid approach; primary "Play" buttons are often oversized circles, while functional buttons (Follow, Share) are 0.5rem rounded rectangles.

## Components

### Buttons
- **Primary (Play/Action):** Large, circular, or high-pill shape. Solid `primary` (Neon Purple) with high-contrast text.
- **Secondary (Follow/Outline):** 1px border using `primary` or `on-surface` at 40% opacity. Text in Montserrat Bold.

### Track Lists
- Dense rows with a height of 56px. 
- On hover, the row background shifts to a slightly lighter neutral grey (`surface-container-high`) and reveals a "Play" icon. 
- Subtle 1px divider lines at very low opacity between tracks.

### Input Fields
- Dark neutral backgrounds (`surface-container`) with a 1px border. 
- Focus state triggers a neon purple border and a soft glow.

### Artist Discovery Cards
- Square album/artist art with a 0.5rem radius.
- Text labels use `track-title` for the name and `body-md` at 60% opacity for the subtext (e.g., "3.2M Monthly Listeners").

### Hero Section
- Immersive, full-width artist imagery. 
- A "Vignette" gradient (from `transparent` at the top to the base `surface` color at the bottom) must be applied to ensure the Montserrat typography remains legible regardless of the image content.