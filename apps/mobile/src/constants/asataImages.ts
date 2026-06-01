import type { ImageSourcePropType } from 'react-native';

export const AsataImages = {
  logo: require('../../assets/images/asata/logo.jpg') as ImageSourcePropType,
  homeHeader: require('../../assets/images/asata/home-header.jpg') as ImageSourcePropType,
  association: require('../../assets/images/asata/association.jpg') as ImageSourcePropType,

  football: [
    require('../../assets/images/asata/football-1.jpg') as ImageSourcePropType,
    require('../../assets/images/asata/football-2.jpg') as ImageSourcePropType,
    require('../../assets/images/asata/football-3.jpg') as ImageSourcePropType,
  ],

  ski: [
    require('../../assets/images/asata/ski-1.jpg') as ImageSourcePropType,
    require('../../assets/images/asata/ski-2.jpg') as ImageSourcePropType,
    require('../../assets/images/asata/ski-3.jpg') as ImageSourcePropType,
  ],

  athletics: [
    require('../../assets/images/asata/athletics-1.jpeg') as ImageSourcePropType,
    require('../../assets/images/asata/athletics-2.png') as ImageSourcePropType,
  ],

  group: [
    require('../../assets/images/asata/group-1.jpeg') as ImageSourcePropType,
  ],

  trainers: [
    require('../../assets/images/asata/trainer-1.jpeg') as ImageSourcePropType,
    require('../../assets/images/asata/trainer-2.jpeg') as ImageSourcePropType,
  ],
} as const;

export type AsataImageCategory = keyof typeof AsataImages;
