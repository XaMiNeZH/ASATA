const skiAsset = (fileName: string) => `/skiActivitiesPics/${fileName}`
const footballAsset = (fileName: string) => `/footballActivitiesPics/${fileName}`
const athleticismAsset = (fileName: string) => `/athleticism/${fileName}`

export const SKI_TEAM_IMAGE   = skiAsset('Group ski team with leaders.jpg')
export const DON_HERO_IMAGE   = skiAsset('PHOTO-2026-04-07-12-10-35_1.jpg')
export const HOME_HERO_IMAGE = skiAsset('PHOTO-2026-04-07-12-10-42_1.jpg')
export const SKI_HERO_IMAGE = skiAsset('PHOTO-2026-04-07-12-10-35_1.jpg')
export const GALLERY_HERO_IMAGE = skiAsset('PHOTO-2026-04-07-12-10-36.jpg')
export const ATHLETISME_HERO_IMAGE    = athleticismAsset('acc image.jpeg')
export const ATHLETISME_INTRO_IMAGE   = athleticismAsset('Screenshot 2026-04-26 212022.png')
export const ATHLETISME_LANDSCAPE_IMAGE = athleticismAsset('Screenshot 2026-04-26 212049.png')
export const ABOUT_HERO_IMAGE = '/association%20image.jpg'
export const CONTACT_HERO_IMAGE = '/contactphoto.jpg'
export const HOME_SKI_CARD_IMAGE = skiAsset('PHOTO-2026-04-07-12-10-40.jpg')
export const HOME_ATHLETISME_CARD_IMAGE = athleticismAsset('acc image.jpeg')
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

export const ATHLETISME_PHOTOS: string[] = [
  athleticismAsset('Screenshot 2026-04-26 211856.png'),
  athleticismAsset('Screenshot 2026-04-26 212022.png'),
  athleticismAsset('Screenshot 2026-04-26 212049.png'),
  athleticismAsset('Screenshot 2026-04-26 212127.png'),
  athleticismAsset('Screenshot 2026-04-26 212350.png'),
]

export const ALL_PHOTOS = [
  ...SKI_PHOTOS.map(src => ({ src, category: 'ski' as const })),
  ...FOOTBALL_PHOTOS.map(src => ({ src, category: 'football' as const })),
  ...ATHLETISME_PHOTOS.map(src => ({ src, category: 'athletisme' as const })),
]

const trainerAsset = (fileName: string) => `/trainers/${fileName}`

export const TRAINER_PHOTOS = {
  rachidChib:        trainerAsset('rachid-chib.jpeg'),
  ahmedBiri:         trainerAsset('ahmed-biri.jpeg'),
  younesElMarkat:    trainerAsset('younes-el-markat.jpeg'),
  taherAitElBaraka:  trainerAsset('taher-ait-el-baraka.jpeg'),
  essadiqAitBenAli:  trainerAsset('essadiq-ait-ben-ali.jpeg'),
  soufianAzzaimi:    trainerAsset('soufian-azzaimi.jpeg'),
}

export const LOGO = '/Association Logo.jpg'
export const PRESIDENT_IMG = '/president commit directeur.png'
const TEAM_PHOTO_DIR = '/team-photos'

export const TEAM_PHOTOS = {
  president:        PRESIDENT_IMG,
  jamilaChenter:    `${TEAM_PHOTO_DIR}/Mme. Jamila CHENTER.png`,
  faridBouserhan:   `${TEAM_PHOTO_DIR}/M. Farid BOUSERHAN.png`,
  abdEssamad:       `${TEAM_PHOTO_DIR}/M. Abd Essamad AIT BEL HAJ.png`,
  medAitChakart:    `${TEAM_PHOTO_DIR}/M. Med AIT CHAKART.png`,
  medAourik:        `${TEAM_PHOTO_DIR}/M. Med AOURIK.png`,
  noraAchebani:     `${TEAM_PHOTO_DIR}/Mlle. Nora ACHEBANI.png`,
  rachidBouserhan:  `${TEAM_PHOTO_DIR}/Rachid BOUSERHAN.png`,
  medElAouad:       `${TEAM_PHOTO_DIR}/Med EL AOUAD.png`,
  azizAitBourhim:   `${TEAM_PHOTO_DIR}/Aziz AIT BOURHIM.png`,
  elmajidOussais:   `${TEAM_PHOTO_DIR}/Elmajid OUSSAIS.png`,
}
