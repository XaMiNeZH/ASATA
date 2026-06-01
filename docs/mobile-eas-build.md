# Procedure de build mobile EAS

Ce document decrit la procedure de build et de distribution de l'application mobile ASATA Connect avec Expo EAS Build.

## Objectif

EAS Build permet de generer :

- un APK Android pour une installation directe par le jury ou l'association ;
- un AAB Android pour une distribution de production ;
- une configuration iOS utilisable pour TestFlight ou des tests internes lorsque les identifiants Apple Developer sont disponibles.

## Fichiers concernes

- `apps/mobile/eas.json` definit les profils `development`, `preview` et `production`.
- `apps/mobile/app.json` contient les identifiants stables de l'application : `ma.asata.connect` pour Android et iOS.
- `.github/workflows/eas-build.yml` permet de lancer un build EAS manuel depuis GitHub Actions.
- `apps/mobile/package.json` expose les scripts de build EAS utiles.

## Preparation locale

Depuis la racine du depot :

```bash
cd apps/mobile
npx eas login
npx eas build:configure
npm run build:android:preview
```

`npx eas login` authentifie le poste local avec Expo. Ne pas stocker de token Expo dans le depot.

Si `npx eas` ne trouve pas l'executable, utiliser le package CLI explicite :

```bash
npx eas-cli login
npx eas-cli build:configure
```

## APK Android pour le jury

Le profil `preview` produit un APK Android installe directement sur un appareil :

```bash
cd apps/mobile
eas build --platform android --profile preview
```

Ce build doit utiliser une URL d'API accessible publiquement. Un appareil Android physique ne peut pas joindre `localhost` sur la machine de developpement.

## AAB Android de production

Le profil `production` produit un Android App Bundle :

```bash
cd apps/mobile
eas build --platform android --profile production
```

Ce format est adapte a une distribution de type Play Store ou a une publication controlee.

## Build iOS

Le profil `preview` peut produire un build iOS interne :

```bash
cd apps/mobile
eas build --platform ios --profile preview
```

L'installation iOS necessite un compte Apple Developer et une distribution via TestFlight ou des appareils enregistres selon le mode de distribution choisi.

## GitHub Actions

Le workflow `.github/workflows/eas-build.yml` se lance manuellement depuis l'onglet Actions de GitHub.

Avant de l'utiliser :

- creer un token Expo depuis le compte Expo ;
- ajouter ce token dans les secrets du depot GitHub sous le nom `EXPO_TOKEN` ;
- lancer le workflow `EAS Build` ;
- choisir `android` comme plateforme et `preview` comme profil pour produire l'APK.

Le token Expo est lu depuis `secrets.EXPO_TOKEN` et ne doit jamais etre committe.

## Variables d'environnement

L'application utilise `EXPO_PUBLIC_API_BASE_URL` pour surcharger l'URL de l'API au moment du build. Si cette variable n'est pas definie, l'application utilise l'URL Railway deja configuree dans `apps/mobile/src/config/api.config.ts`.

Exemple :

```bash
cd apps/mobile
EXPO_PUBLIC_API_BASE_URL=https://example.com/api eas build --platform android --profile preview
```

Pour les builds jury et production, l'URL doit pointer vers l'API de production ou une API de demonstration accessible depuis Internet. Ne pas committer de fichier `.env`.

## Depannage

- `EXPO_TOKEN` manquant : ajouter le secret `EXPO_TOKEN` dans les settings GitHub du depot.
- Projet non initialise EAS : lancer `npx eas build:configure` depuis `apps/mobile`.
- Package Android deja utilise : verifier la disponibilite de `ma.asata.connect` ou choisir l'identifiant final avant publication.
- iOS bloque sur les credentials : verifier le compte Apple Developer, les certificats et le provisioning profile.
- API inaccessible dans l'APK : remplacer toute URL locale par `EXPO_PUBLIC_API_BASE_URL` pointant vers une API deployee.
