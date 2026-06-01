# Checklist Release Mobile — ASATA Connect

## Configuration EAS
- [ ] Projet Expo lié à EAS
- [ ] Identifiant Android configuré
- [ ] Identifiant iOS configuré
- [ ] Profil Android APK configuré
- [ ] Profil iOS Simulator configuré

## GitHub Actions
- [ ] Secret `EXPO_TOKEN` ajouté dans GitHub Actions Secrets
- [ ] Variable `EXPO_PUBLIC_API_BASE_URL` ajoutée dans GitHub Actions Variables
- [ ] Workflow `Mobile Release` disponible
- [ ] Permissions `contents: write` configurées

## Builds
- [ ] APK Android généré
- [ ] Build iOS Simulator généré
- [ ] Artefacts téléchargés depuis EAS
- [ ] GitHub Release créée
- [ ] APK visible dans GitHub Releases
- [ ] Artefact iOS Simulator visible dans GitHub Releases

## Notes
- L'APK Android est installable directement sur un téléphone Android.
- Le build iOS Simulator fonctionne uniquement sur le simulateur iOS macOS.
- Une distribution iPhone réelle nécessite Apple Developer / TestFlight.
