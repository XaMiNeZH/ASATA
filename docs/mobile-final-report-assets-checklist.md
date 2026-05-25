# Checklist des assets — Rapport mobile ASATA Connect

## UML

### Sources PlantUML trouvées

- `docs/UML/Use Case Diagram.puml`
- `docs/UML/Class Diagram.puml`
- `docs/UML/Sequence Diagrams/Authentification.puml`
- `docs/UML/Sequence Diagrams/InscriptionEvent.puml`
- `docs/UML/Sequence Diagrams/CancelParticipation.puml`
- `docs/UML/Sequence Diagrams/EventsManagement(Coach-Admin).puml`
- `docs/UML/Sequence Diagrams/UsersManagement(Admin).puml`

### Images UML générées

Les images UML sont disponibles dans `docs/UML/rendered/` :

- `docs/UML/rendered/use-case-diagram.png` — disponible
- `docs/UML/rendered/class-diagram.png` — disponible
- `docs/UML/rendered/sequence-authentication.png` — disponible
- `docs/UML/rendered/sequence-event-registration.png` — disponible
- `docs/UML/rendered/sequence-participation-cancellation.png` — disponible
- `docs/UML/rendered/sequence-event-management.png` — disponible
- `docs/UML/rendered/sequence-user-management.png` — disponible

### Diagrammes en échec de rendu

Aucun diagramme n’est manquant dans `docs/UML/rendered/`.

## Captures Stitch trouvées

### Interface membre

- `docs/mobile UI kit design (stitch)/login_screen/screen.png`
- `docs/mobile UI kit design (stitch)/home_screen/screen.png`
- `docs/mobile UI kit design (stitch)/events_list/screen.png`
- `docs/mobile UI kit design (stitch)/event_detail/screen.png`
- `docs/mobile UI kit design (stitch)/participations/screen.png`
- `docs/mobile UI kit design (stitch)/announcements_list/screen.png`
- `docs/mobile UI kit design (stitch)/announcement_detail/screen.png`
- `docs/mobile UI kit design (stitch)/notifications_screen/screen.png`
- `docs/mobile UI kit design (stitch)/profile_screen/screen.png`
- `docs/mobile UI kit design (stitch)/edit_profile/screen.png`
- `docs/mobile UI kit design (stitch)/bottom_tab_bar_component/screen.png`

### Interface administrateur / responsable

- `docs/mobile UI kit design (stitch)/admin/admin_dashboard/screen.png`
- `docs/mobile UI kit design (stitch)/admin/admin_event_management/screen.png`
- `docs/mobile UI kit design (stitch)/admin/member_directory/screen.png`
- `docs/mobile UI kit design (stitch)/admin/announcement_management/screen.png`

## Fichiers HTML Stitch trouvés

- `docs/mobile UI kit design (stitch)/login_screen/code.html`
- `docs/mobile UI kit design (stitch)/home_screen/code.html`
- `docs/mobile UI kit design (stitch)/events_list/code.html`
- `docs/mobile UI kit design (stitch)/event_detail/code.html`
- `docs/mobile UI kit design (stitch)/participations/code.html`
- `docs/mobile UI kit design (stitch)/announcements_list/code.html`
- `docs/mobile UI kit design (stitch)/announcement_detail/code.html`
- `docs/mobile UI kit design (stitch)/notifications_screen/code.html`
- `docs/mobile UI kit design (stitch)/profile_screen/code.html`
- `docs/mobile UI kit design (stitch)/edit_profile/code.html`
- `docs/mobile UI kit design (stitch)/bottom_tab_bar_component/code.html`
- `docs/mobile UI kit design (stitch)/admin/admin_dashboard/code.html`
- `docs/mobile UI kit design (stitch)/admin/admin_event_management/code.html`
- `docs/mobile UI kit design (stitch)/admin/member_directory/code.html`
- `docs/mobile UI kit design (stitch)/admin/announcement_management/code.html`

## Assets à insérer dans le rapport final

- Remplacer les placeholders UML de `docs/mobile-final-technical-section.md` après export des PNG PlantUML.
- Vérifier le rendu des chemins d’images Stitch lors de la conversion Markdown vers LaTeX/PDF.
- Adapter les chemins d’images au système de compilation LaTeX utilisé, si le rapport final est compilé depuis un autre dossier que `docs`.

## Captures suggérées depuis l’application en cours d’exécution

- Écran de connexion réel dans Expo.
- Écran d’accueil après authentification.
- Liste des événements avec données PostgreSQL.
- Détail d’un événement ouvert aux inscriptions.
- État d’un événement complet ou annulé.
- Confirmation d’inscription à un événement.
- Écran des participations après annulation.
- Notifications avec une section non lue et une section lue.
- Profil utilisateur connecté.
- Édition du profil avec sélection de photo.
- Vue administrateur ou responsable si l’accès est activé dans l’application de démonstration.
