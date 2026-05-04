// ASATA design tokens — strict light blue + white palette.
// No black, no dark navy in UI elements.
export const Colors = {
  // ── Core palette ────────────────────────────────────────
  primary:      '#1565C0',
  primaryLight: '#42A5F5',
  primaryDark:  '#0D47A1',
  primaryPale:  '#E3F2FD',
  primaryGhost: '#F4F9FF',
  surface:      '#FFFFFF',

  // ── Text ────────────────────────────────────────────────
  body:    '#374151',   // primary body text
  subtle:  '#6B7280',   // secondary / muted text
  textPrimary:   '#374151',
  textSecondary: '#6B7280',
  textMuted:     '#9CA3AF',

  // ── Border / dividers ───────────────────────────────────
  hairline: '#EAF2FB',  // blue-tinted separators
  border:   '#EAF2FB',
  divider:  '#EAF2FB',

  // ── Status pill colors ──────────────────────────────────
  // planifie  → blue
  // en_cours  → green
  // termine   → neutral gray
  // annule    → red
  // complet   → amber
  statusPlanifie:   '#0D47A1', statusPlanifieBg:   '#E3F2FD',
  statusEnCours:    '#166534', statusEnCoursBg:     '#DCFCE7',
  statusTermine:    '#4B5563', statusTermineBg:     '#F3F4F6',
  statusAnnule:     '#991B1B', statusAnnuleBg:      '#FEE2E2',
  statusComplet:    '#854D0E', statusCompletBg:     '#FEF3C7',
  statusEnAttente:  '#854D0E', statusEnAttenteBg:   '#FEF3C7',
  statusConfirme:   '#0D47A1', statusConfirmeBg:    '#E3F2FD',
  statusPresent:    '#166534', statusPresentBg:     '#DCFCE7',
  statusAbsent:     '#6B7280', statusAbsentBg:      '#F3F4F6',

  // ── Semantic ────────────────────────────────────────────
  danger:         '#B91C1C',
  error:          '#991B1B',
  errorContainer: '#FEE2E2',
  success:        '#166534',
  background:     '#F4F9FF',

  // ── Aliases kept for backward compat ────────────────────
  skyBlue:       '#42A5F5',
  skyBlueDark:   '#1E88E5',

  // ── Overlays ────────────────────────────────────────────
  overlay:          'rgba(21,101,192,0.08)',
  whiteOverlay10:   'rgba(255,255,255,0.10)',
  whiteOverlay20:   'rgba(255,255,255,0.20)',
  whiteOverlay60:   'rgba(255,255,255,0.60)',
  whiteOverlay70:   'rgba(255,255,255,0.70)',
  whiteOverlay80:   'rgba(255,255,255,0.80)',
  blackOverlay20:   'rgba(0,0,0,0.20)',
  blackOverlay60:   'rgba(0,0,0,0.60)',
};
