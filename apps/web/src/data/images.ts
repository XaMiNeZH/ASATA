const skiAsset = (fileName: string) => `/skiActivitiesPics/${fileName}`
const footballAsset = (fileName: string) => `/footballActivitiesPics/${fileName}`

export const SKI_TEAM_IMAGE = skiAsset('Group ski team with leaders.jpg')
export const HOME_HERO_IMAGE = skiAsset('PHOTO-2026-04-07-12-10-42_1.jpg')
export const SKI_HERO_IMAGE = skiAsset('PHOTO-2026-04-07-12-10-35_1.jpg')
export const GALLERY_HERO_IMAGE = skiAsset('PHOTO-2026-04-07-12-10-36.jpg')
export const ATHLETISME_HERO_IMAGE = skiAsset('PHOTO-2026-04-07-12-10-44.jpg')
export const ATHLETISME_INTRO_IMAGE = skiAsset('PHOTO-2026-04-07-12-10-43.jpg')
export const ATHLETISME_LANDSCAPE_IMAGE = skiAsset('PHOTO-2026-04-07-12-10-45.jpg')
export const ABOUT_HERO_IMAGE = skiAsset('PHOTO-2026-04-07-12-10-34.jpg')
export const CONTACT_HERO_IMAGE = skiAsset('PHOTO-2026-04-07-12-10-41.jpg')
export const HOME_SKI_CARD_IMAGE = skiAsset('PHOTO-2026-04-07-12-10-33.jpg')
export const HOME_ATHLETISME_CARD_IMAGE = skiAsset('PHOTO-2026-04-07-12-10-40.jpg')
export const FOOTBALL_HERO_IMAGE = footballAsset('484108752_1050160593818353_1515778284063821567_n.jpg')
export const FOOTBALL_INTRO_IMAGE = footballAsset('asata tournoi raman winners.jpg')

export const SKI_PHOTOS: string[] = [
  SKI_TEAM_IMAGE,
  skiAsset('PHOTO-2026-04-07-12-10-28.jpg'),
  skiAsset('PHOTO-2026-04-07-12-10-28_1.jpg'),
  skiAsset('PHOTO-2026-04-07-12-10-29.jpg'),
  skiAsset('PHOTO-2026-04-07-12-10-30.jpg'),
  skiAsset('PHOTO-2026-04-07-12-10-30_1.jpg'),
  skiAsset('PHOTO-2026-04-07-12-10-31.jpg'),
  skiAsset('PHOTO-2026-04-07-12-10-31_1.jpg'),
  skiAsset('PHOTO-2026-04-07-12-10-32.jpg'),
  skiAsset('PHOTO-2026-04-07-12-10-32_1.jpg'),
  skiAsset('PHOTO-2026-04-07-12-10-33.jpg'),
  skiAsset('PHOTO-2026-04-07-12-10-33_1.jpg'),
  skiAsset('PHOTO-2026-04-07-12-10-34.jpg'),
  skiAsset('PHOTO-2026-04-07-12-10-34_1.jpg'),
  skiAsset('PHOTO-2026-04-07-12-10-35.jpg'),
  skiAsset('PHOTO-2026-04-07-12-10-35_1.jpg'),
  skiAsset('PHOTO-2026-04-07-12-10-36.jpg'),
  skiAsset('PHOTO-2026-04-07-12-10-36_1.jpg'),
  skiAsset('PHOTO-2026-04-07-12-10-37.jpg'),
  skiAsset('PHOTO-2026-04-07-12-10-38.jpg'),
  skiAsset('PHOTO-2026-04-07-12-10-38_1.jpg'),
  skiAsset('PHOTO-2026-04-07-12-10-39_1.jpg'),
  skiAsset('PHOTO-2026-04-07-12-10-40.jpg'),
  skiAsset('PHOTO-2026-04-07-12-10-41.jpg'),
  skiAsset('PHOTO-2026-04-07-12-10-42.jpg'),
  skiAsset('PHOTO-2026-04-07-12-10-42_1.jpg'),
  skiAsset('PHOTO-2026-04-07-12-10-43.jpg'),
  skiAsset('PHOTO-2026-04-07-12-10-44.jpg'),
  skiAsset('PHOTO-2026-04-07-12-10-45.jpg'),
  skiAsset('Ski comp 2eme edution fiche.jpg'),
]

export const FOOTBALL_PHOTOS: string[] = [
  FOOTBALL_HERO_IMAGE,
  FOOTBALL_INTRO_IMAGE,
  footballAsset('488773657_1063992112435201_1225323002036523208_n.jpg'),
  footballAsset('488942403_1063991805768565_8104423691628912325_n.jpg'),
]

export const ALL_PHOTOS = [
  ...SKI_PHOTOS.map(src => ({ src, category: 'ski' as const })),
  ...FOOTBALL_PHOTOS.map(src => ({ src, category: 'football' as const })),
]

export const LOGO = '/Association Logo.jpg'
export const PRESIDENT_IMG = '/president commit directeur.png'

export const TEAM_PHOTOS = {
  president:        PRESIDENT_IMG,
  jamilaChenter:    null,
  faridBouserhan:   null,
  abdEssamad:       null,
  medAitChakart:    null,
  medAourik:        null,
  noraAchebani:     null,
  rachidBouserhan:  null,
  medElAouad:       null,
  azizAitBourhim:   null,
  elmajidOussais:   null,
}
