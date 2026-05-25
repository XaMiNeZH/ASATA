# Export des diagrammes PlantUML

Les fichiers PlantUML source sont disponibles dans `docs/UML`. Le rendu local n'a pas ete genere dans cet environnement car Java n'est pas disponible dans le PATH. Graphviz `dot` est egalement absent.

## Tentatives effectuees

- `npx --yes @plantuml/plantuml -tpng docs/UML/*.puml -o rendered`
  - resultat : paquet npm introuvable, erreur `404 Not Found - @plantuml/plantuml`.
- `npx --yes -p node-plantuml puml generate "docs\UML\Use Case Diagram.puml" -p -o "docs\UML\rendered\use-case-diagram.png"`
  - resultat : echec du `postinstall` du paquet `node-plantuml`.
- `npm exec --yes --ignore-scripts --package=node-plantuml -- puml generate "docs\UML\Use Case Diagram.puml" -p -o "docs\UML\rendered\use-case-diagram.png"`
  - resultat : le binaire `puml` demarre, puis echoue avec `Error: spawn java ENOENT`.
- `npx --yes plantuml --help`
  - resultat : `npm error could not determine executable to run`.
- `java -version`
  - resultat : `java` n'est pas reconnu.
- `dot -V`
  - resultat : `dot` n'est pas reconnu.

Conclusion : l'installation de Java est le prerequis bloquant pour utiliser PlantUML localement. Graphviz sera aussi necessaire pour garantir le rendu du diagramme de classes et des diagrammes structurels.

## Export avec l'extension VS Code PlantUML

1. Installer l'extension **PlantUML** dans VS Code.
2. Ouvrir chaque fichier `.puml` depuis `docs/UML`.
3. Lancer la commande `PlantUML: Export Current Diagram`.
4. Choisir le format `png`.
5. Enregistrer les fichiers dans `docs/UML/rendered` avec les noms suivants :

- `use-case-diagram.png` pour `docs/UML/Use Case Diagram.puml`
- `class-diagram.png` pour `docs/UML/Class Diagram.puml`
- `sequence-authentication.png` pour `docs/UML/Sequence Diagrams/Authentification.puml`
- `sequence-event-registration.png` pour `docs/UML/Sequence Diagrams/InscriptionEvent.puml`
- `sequence-participation-cancellation.png` pour `docs/UML/Sequence Diagrams/CancelParticipation.puml`
- `sequence-event-management.png` pour `docs/UML/Sequence Diagrams/EventsManagement(Coach-Admin).puml`
- `sequence-user-management.png` pour `docs/UML/Sequence Diagrams/UsersManagement(Admin).puml`

## Export avec PlantUML CLI

Depuis la racine du depot, apres installation de PlantUML :

```powershell
plantuml -tpng -o rendered "docs/UML/Use Case Diagram.puml"
plantuml -tpng -o rendered "docs/UML/Class Diagram.puml"
plantuml -tpng -o "../rendered" "docs/UML/Sequence Diagrams/Authentification.puml"
plantuml -tpng -o "../rendered" "docs/UML/Sequence Diagrams/InscriptionEvent.puml"
plantuml -tpng -o "../rendered" "docs/UML/Sequence Diagrams/CancelParticipation.puml"
plantuml -tpng -o "../rendered" "docs/UML/Sequence Diagrams/EventsManagement(Coach-Admin).puml"
plantuml -tpng -o "../rendered" "docs/UML/Sequence Diagrams/UsersManagement(Admin).puml"
```

Renommer ensuite les fichiers produits selon la liste ci-dessus afin de correspondre aux liens utilises dans le rapport.
