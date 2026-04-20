import { create } from 'zustand'
import { Colors } from '../theme/colors'

const DarkColors = {
  ...Colors,
  background:    '#0F1117',
  card:          '#1C1F2E',
  border:        '#2A2D3E',
  textPrimary:   '#F0F4FF',
  textSecondary: '#9BA8C0',
  textMuted:     '#5A6480',
  tabBar:        '#1C1F2E',
  tabBarBorder:  '#2A2D3E',
  primaryGhost:  '#1A1F35',
  primaryPale:   '#1A2545',
  background2:   '#161824',
}

interface ThemeState {
  dark: boolean
  colors: typeof Colors
  toggle: () => void
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  dark: false,
  colors: Colors,
  toggle: () => {
    const dark = !get().dark
    set({ dark, colors: dark ? DarkColors : Colors })
  },
}))
