---
name: Athletic Precision
colors:
  surface: '#faf9fd'
  surface-dim: '#dad9de'
  surface-bright: '#faf9fd'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f7'
  surface-container: '#efedf1'
  surface-container-high: '#e9e7ec'
  surface-container-highest: '#e3e2e6'
  on-surface: '#1a1b1f'
  on-surface-variant: '#44474f'
  inverse-surface: '#2f3034'
  inverse-on-surface: '#f1f0f4'
  outline: '#747780'
  outline-variant: '#c4c6d0'
  surface-tint: '#465e8b'
  primary: '#001637'
  on-primary: '#ffffff'
  primary-container: '#0d2b55'
  on-primary-container: '#7a93c3'
  inverse-primary: '#aec7fa'
  secondary: '#535f74'
  on-secondary: '#ffffff'
  secondary-container: '#d4e0f9'
  on-secondary-container: '#586378'
  tertiary: '#061829'
  on-tertiary: '#ffffff'
  tertiary-container: '#1c2d3e'
  on-tertiary-container: '#8395aa'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d7e3ff'
  primary-fixed-dim: '#aec7fa'
  on-primary-fixed: '#001b3f'
  on-primary-fixed-variant: '#2d4772'
  secondary-fixed: '#d7e3fc'
  secondary-fixed-dim: '#bbc7df'
  on-secondary-fixed: '#101c2e'
  on-secondary-fixed-variant: '#3c475b'
  tertiary-fixed: '#d2e4fb'
  tertiary-fixed-dim: '#b6c8df'
  on-tertiary-fixed: '#0a1d2d'
  on-tertiary-fixed-variant: '#37485b'
  background: '#faf9fd'
  on-background: '#1a1b1f'
  surface-variant: '#e3e2e6'
typography:
  h1:
    fontFamily: Lexend
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Lexend
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  h3:
    fontFamily: Lexend
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Lexend
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Lexend
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Lexend
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Lexend
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.08em
  button:
    fontFamily: Lexend
    fontSize: 16px
    fontWeight: '600'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  container-margin: 20px
  gutter: 16px
---

## Brand & Style

This design system is built to reflect the prestige and vitality of a leading sports association. The brand personality is **Elite, Methodical, and Community-Driven**. It prioritizes a "cool" professional aesthetic that avoids the heat of competition in favor of the clarity of high-performance management. 

The visual style is **Corporate Modern**, leaning into 2025 mobile trends through high-contrast typography and structured layouts. By excluding warm tones, the interface creates a psychological sense of "cool-headedness" and stability. The aesthetic response should evoke the feeling of a premium athletic facility: clean, expansive, and high-tech.

## Colors

The color palette is anchored in a spectrum of deep blues to establish institutional trust and authority. 

- **Primary & Secondary:** These navy tones are used for high-level branding, navigation bars, and primary actions.
- **Accent:** The Sky Blue (#42A5F5) is used sparingly for interactive cues, focus states, and progress indicators to provide a refreshing "pop" against the deep navy.
- **Neutral Palette:** Backgrounds use a cool-tinted Light Gray to reduce eye strain compared to pure white, while surfaces remain white to create clear container separation.
- **Functional:** Success and Error colors are strictly reserved for feedback loops to maintain the "cool" integrity of the overall UI.

## Typography

The design system utilizes **Lexend** across all tiers. Lexend was specifically engineered to reduce visual stress and improve reading speed, making it the ideal "athletic" typeface for a high-performance sports app.

- **Headlines:** Set in Bold with tight letter spacing for a punchy, confident look.
- **Body Text:** Leverages a generous 1.6 line height to ensure readability during active movement or quick scanning.
- **Labels:** Small, semibold, and tracked out (uppercase) to create a clear architectural distinction from body content, used primarily for categories and metadata.

## Layout & Spacing

The design system employs a **fluid 4-column grid** for mobile devices. 

- **Grid Logic:** 20px outer margins provide a breathable frame, while 16px gutters ensure clear separation between cards and list items.
- **Rhythm:** An 8px linear scale (with a 4px half-step for micro-adjustments) governs all padding and margins. 
- **Vertical Flow:** Stacked elements should typically use 16px (md) spacing, while logically grouped items within a card should use 8px (sm) spacing to imply relationship.

## Elevation & Depth

Visual hierarchy is achieved through **Tonal Layering** supplemented by **Ambient Shadows**. 

- **Surfaces:** All primary content sits on white cards elevated from the Light Gray background.
- **Shadows:** A singular, soft shadow style (0 2px 8px rgba(0,0,0,0.08)) is used to provide depth without adding visual noise. This creates a "hovering" effect that feels light and modern.
- **Interactive Depth:** When pressed, buttons and cards should remove their shadow and scale slightly (98%) to simulate physical compression.
- **Dividers:** Used sparingly. Prefer whitespace or subtle background shifts (#E2E8F0) to separate list items.

## Shapes

The shape language is consistently **Rounded**, striking a balance between friendly approachability and professional structure.

- **Primary Radius (12px):** Applied to cards and buttons to create a cohesive container language.
- **Input Radius (10px):** A slightly sharper corner for form fields to provide a sense of "precision" and data entry focus.
- **Badge Radius (6px):** Used for status tags and small labels, ensuring the radius doesn't overwhelm the small font size.

## Components

- **Buttons:** Primary buttons use the Deep Navy (#0D2B55) with White text. Secondary buttons use a transparent background with a 1.5px Slate Navy border.
- **Input Fields:** Use the 10px radius with a 1px border (#E2E8F0). On focus, the border transitions to the Sky Blue (#42A5F5) and adds a subtle glow.
- **Cards:** 12px radius, white background, and the standard ambient shadow. Headers within cards should use the `label-caps` style for section titles.
- **Chips & Badges:** Use the 6px radius. "Success" badges use a light tint of the green (#2E7D52) at 10% opacity with solid text.
- **Iconography:** Use **Feather Icons**. Icons must be 24px, outline style, with a 2px stroke width to match the weight of the Lexend typeface.
- **Lists:** Clean rows with 16px vertical padding. Use the Sky Blue for "chevron-right" indicators to suggest navigation.
- **Progress Bars:** Use Sky Blue for active progress against a #E2E8F0 track, featuring rounded ends for a sleek, modern finish.