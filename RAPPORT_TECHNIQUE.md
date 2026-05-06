# Rapport Technique — Projet ASATA
## Plateforme de Gestion de l'Association Sportive ASATA

**Date** : 6 Mai 2026
**Projet** : ASATA — Association Sportive Atlas Toutes Activités
**Statut** : ✅ En Production

---

## Table des Matières

1. [Vue d'ensemble du projet](#1-vue-densemble-du-projet)
2. [Architecture générale](#2-architecture-générale)
3. [Stack technique complète](#3-stack-technique-complète)
4. [Frontend — Interface Publique & Admin](#4-frontend--interface-publique--admin)
5. [Backend — API REST](#5-backend--api-rest)
6. [Base de données](#6-base-de-données)
7. [Déploiement & Infrastructure Cloud](#7-déploiement--infrastructure-cloud)
8. [Sécurité](#8-sécurité)
9. [Flux de données](#9-flux-de-données)
10. [Pipeline de déploiement](#10-pipeline-de-déploiement)
11. [Endpoints API](#11-endpoints-api)
12. [Modèles de données](#12-modèles-de-données)
13. [Variables d'environnement](#13-variables-denvironnement)
14. [Problèmes rencontrés & Solutions](#14-problèmes-rencontrés--solutions)
15. [État actuel du système](#15-état-actuel-du-système)
16. [Améliorations futures](#16-améliorations-futures)
17. [Équipe](#17-équipe)

---

## 1. Vue d'ensemble du projet

ASATA est une plateforme web complète pour la gestion d'une association sportive. Elle comprend :

- **Un site public** accessible à tous les visiteurs
- **Un panneau d'administration** réservé aux admins
- **Une API REST** qui alimente les deux

### Pages Publiques
| Page | URL | Description |
|------|-----|-------------|
| Accueil | `/` | Page principale avec présentation |
| À propos | `/about` | Histoire et mission de l'association |
| Ski | `/ski` | Activités ski & montagne |
| Football | `/football` | Activités football |
| Athlétisme | `/athletisme` | Activités athlétisme |
| Équipe | `/equipe` | Membres et entraîneurs |
| Galerie | `/galerie` | Photos des activités (live depuis API) |
| Événements | `/evenements` | Calendrier des événements (live depuis API) |
| Contact | `/contact` | Formulaire de contact (enregistré en BDD) |
| Don | `/don` | Formulaire de donation (enregistré en BDD) |

### Pages Admin
| Page | URL | Description |
|------|-----|-------------|
| Connexion | `/admin/login` | Authentification JWT |
| Tableau de bord | `/admin` | Gestion complète |

---

## 2. Architecture Générale

```
┌─────────────────────────────────────────────────────────┐
│                    UTILISATEURS                         │
└──────────────────────────┬──────────────────────────────┘
                           │ HTTPS
┌──────────────────────────▼──────────────────────────────┐
│              FRONTEND (Vercel CDN Global)                │
│           asata-website.vercel.app                      │
│          React 18 + TypeScript + Vite                   │
│          TailwindCSS + Framer Motion                    │
└──────────────────────────┬──────────────────────────────┘
                           │ HTTPS / REST API
┌──────────────────────────▼──────────────────────────────┐
│              BACKEND API (Railway)                       │
│        asata-production.up.railway.app                  │
│           Node.js + Express.js + TypeScript             │
│        JWT Auth + CORS + Rate Limiting                  │
└──────────────────────────┬──────────────────────────────┘
                           │ TCP / SSL
┌──────────────────────────▼──────────────────────────────┐
│           BASE DE DONNÉES (Neon PostgreSQL)              │
│     ep-soft-bonus-an348266.neon.tech                    │
│     PostgreSQL 16 + Connection Pooling (PgBouncer)      │
└─────────────────────────────────────────────────────────┘
```

---

## 3. Stack Technique Complète

### Vue résumée

| Couche | Technologie | Rôle |
|--------|-------------|------|
| **Frontend** | React 18 | Interface utilisateur |
| **Langage** | TypeScript | Typage statique |
| **Build tool** | Vite 5 | Compilation & dev server |
| **Style** | TailwindCSS 3 | Design utilitaire |
| **Animations** | Framer Motion 11 | Transitions & animations |
| **Routing (frontend)** | React Router 6 | Navigation SPA |
| **Backend** | Express.js 4 | Serveur API REST |
| **Runtime** | Node.js 18+ | Exécution JavaScript serveur |
| **ORM** | Prisma 5 | Accès base de données |
| **Base de données** | PostgreSQL 16 | Stockage relationnel |
| **Auth** | JWT + bcryptjs | Authentification admin |
| **Validation** | Zod | Validation des données |
| **Emails** | Nodemailer + Gmail | Notifications contact |
| **Upload** | Multer | Gestion des fichiers |
| **Hébergement frontend** | Vercel | CDN global |
| **Hébergement API** | Railway | Container cloud |
| **Hébergement BDD** | Neon | PostgreSQL managé |
| **Versioning** | Git + GitHub | Contrôle de version |

---

## 4. Frontend — Interface Publique & Admin

### 4.1 React 18
**Rôle** : Bibliothèque UI principale
- Composants fonctionnels avec hooks
- Rendu déclaratif
- Gestion d'état local avec `useState`, `useEffect`, `useMemo`
- Architecture basée sur des composants réutilisables

### 4.2 TypeScript
**Rôle** : Typage statique pour JavaScript
- Détection des erreurs à la compilation
- Autocomplétion IDE améliorée
- Interfaces pour les données API (`ApiEvent`, `ApiPhoto`, `ApiDonation`...)
- Prévention des erreurs de type à l'exécution

### 4.3 Vite 5
**Rôle** : Build tool et serveur de développement
- Compilation ultra-rapide (Hot Module Replacement)
- Build de production optimisé
- Gestion des variables d'environnement (`VITE_API_URL`)
- Plugin React (`@vitejs/plugin-react`)

### 4.4 TailwindCSS 3
**Rôle** : Framework CSS utilitaire
- Classes CSS directement dans le JSX
- Design responsive intégré
- Pas de CSS personnalisé nécessaire
- Build optimisé (purge des classes inutilisées)

### 4.5 Framer Motion 11
**Rôle** : Animations et transitions
- Transitions entre les pages (`AnimatePresence`)
- Animations d'entrée/sortie des composants
- Animations de la galerie photos
- Scroll animations

### 4.6 React Router 6
**Rôle** : Navigation SPA (Single Page Application)
- Routes publiques avec layout (Navbar + Footer)
- Routes admin sans layout
- Routes protégées (`ProtectedRoute`)
- Configuration dans `App.tsx`

### 4.7 Structure du Frontend
```
apps/web/src/
├── pages/
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Ski.tsx
│   ├── Football.tsx
│   ├── Athletisme.tsx
│   ├── Equipe.tsx
│   ├── Galerie.tsx          ← connecté à l'API
│   ├── Evenements.tsx       ← connecté à l'API
│   ├── Contact.tsx          ← envoie à l'API
│   ├── Don.tsx              ← envoie à l'API
│   └── admin/
│       ├── AdminLogin.tsx
│       └── AdminDashboard.tsx
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── PageHero.tsx
│   ├── Lightbox.tsx
│   ├── PageTransition.tsx
│   └── admin/
│       └── ProtectedRoute.tsx
├── context/
│   └── AdminAuthContext.tsx
├── lib/
│   └── api.ts               ← client API centralisé
└── data/
    └── images.ts            ← données statiques (fallback galerie)
```

### 4.8 Client API (`lib/api.ts`)
Fichier centralisé qui gère toutes les communications avec le backend :
- `authApi` — Connexion admin, vérification token
- `eventsApi` — CRUD événements
- `galleryApi` — CRUD photos galerie
- `donationsAdminApi` — Gestion des dons
- `uploadApi` — Upload d'images
- `contactAdminApi` — Gestion des messages contact

### 4.9 vercel.json (SPA Routing)
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```
Permet à Vercel de servir `index.html` pour toutes les routes (nécessaire pour les SPA React).

---

## 5. Backend — API REST

### 5.1 Express.js 4
**Rôle** : Framework serveur web
- Serveur HTTP léger et rapide
- Middleware CORS, rate limiting, body parsing
- Routing modulaire par domaine métier
- Gestion des erreurs centralisée

### 5.2 Architecture modulaire
```
apps/api/src/
├── main.ts                          ← Point d'entrée
├── app.ts                           ← Configuration Express
├── config/
│   ├── env.ts                       ← Variables d'environnement (Zod)
│   ├── database.ts                  ← Client Prisma
│   └── mailer.ts                    ← Configuration Nodemailer
├── modules/
│   ├── auth/
│   │   ├── auth.router.ts           ← POST /api/admin/login, GET /api/admin/me
│   │   └── auth.middleware.ts       ← Vérification JWT
│   ├── events/
│   │   ├── events.router.ts         ← CRUD /api/events
│   │   └── events.schema.ts         ← Validation Zod
│   ├── gallery/
│   │   └── gallery.router.ts        ← CRUD /api/gallery
│   ├── donations/
│   │   ├── donations.router.ts      ← CRUD /api/donations
│   │   ├── donations.service.ts
│   │   └── donations.schema.ts
│   ├── contact/
│   │   ├── contact.router.ts        ← POST /api/contact
│   │   ├── contact.service.ts
│   │   └── contact.schema.ts
│   └── upload/
│       └── upload.router.ts         ← POST /api/upload
└── utils/
    └── response.ts                  ← Helpers réponses standardisées
```

### 5.3 Node.js 18+
**Rôle** : Runtime JavaScript côté serveur
- I/O asynchrone non-bloquant
- Gestion des connexions HTTP concurrentes
- npm pour la gestion des dépendances

### 5.4 TypeScript (backend)
- Compilation : `tsc` → `apps/api/dist/`
- Exécution en production : `node dist/main.js`
- Dev : `ts-node-dev` (rechargement à chaud)

### 5.5 Zod
**Rôle** : Validation des données à l'exécution
- Schémas de validation pour chaque endpoint
- Validation des variables d'environnement au démarrage
- Messages d'erreur typés et précis

### 5.6 Nodemailer + Gmail
**Rôle** : Envoi d'emails
- Notification admin lors d'un message contact
- Configuration via `GMAIL_USER` + `GMAIL_APP_PASSWORD`

### 5.7 Multer
**Rôle** : Gestion des uploads de fichiers
- Réception des images via `multipart/form-data`
- Stockage local dans `uploads/` (temporaire sur Railway)

### 5.8 Express Rate Limit
**Rôle** : Protection contre les abus
- Limite générale : sur toutes les routes `/api`
- Limite donations : 10/heure en production
- Limite contact : 5/heure en production
- Configuration `trust proxy: 1` pour Railway

---

## 6. Base de Données

### 6.1 PostgreSQL 16
**Rôle** : Base de données relationnelle principale
- Remplace SQLite (migration effectuée)
- Supporte les connexions concurrentes
- ACID compliance (Atomicity, Consistency, Isolation, Durability)
- Scalable pour multi-utilisateurs

### 6.2 Neon (PostgreSQL managé)
**Rôle** : Hébergement PostgreSQL cloud
- **Projet** : neon-blue-xylophone
- **Endpoint** : `ep-soft-bonus-an348266.neon.tech`
- **Tier** : Free (0.5 GB stockage, 100 CU-hrs/mois)
- Connexion poolée (PgBouncer) pour les requêtes
- Connexion directe pour les migrations
- Scale-to-zero automatique (inactif → veille)

### 6.3 Prisma 5 (ORM)
**Rôle** : Object-Relational Mapping et toolkit BDD
- Schéma déclaratif (`schema.prisma`)
- Migrations versionnées automatiques
- Client type-safe généré automatiquement
- Studio graphique pour inspecter les données

**Schéma** : `apps/api/prisma/schema.prisma`
```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")        // pooled (requêtes)
  directUrl = env("DATABASE_URL_UNPOOLED") // direct (migrations)
}
```

### 6.4 Tables de la base de données

| Table | Champs principaux | Description |
|-------|-------------------|-------------|
| `Event` | id, title, date, sport, status, highlight | Événements sportifs |
| `Admin` | id, email, passwordHash | Comptes administrateurs |
| `Donation` | id, reference, amount, donorName, status | Dons reçus |
| `GalleryPhoto` | id, src, caption, category | Photos galerie |
| `ContactMessage` | id, firstName, email, subject, status | Messages contact |

### 6.5 Migration SQLite → PostgreSQL
Le projet utilisait initialement SQLite (fichier local). Migration effectuée :
- Changement du provider dans `schema.prisma`
- Création du schéma PostgreSQL initial
- Seed des données : 1 admin + 9 événements + 28 photos

---

## 7. Déploiement & Infrastructure Cloud

### 7.1 Vercel (Frontend)
**URL** : `https://asata-website.vercel.app`

- Déploiement automatique depuis GitHub (`XaMiNeZH/ASATA`)
- CDN global pour distribution rapide
- SSL/HTTPS automatique
- Variable d'environnement : `VITE_API_URL=https://asata-production.up.railway.app`

**Workflow** :
```
Push GitHub → Vercel détecte → Build Vite → Deploy CDN → Live
```

### 7.2 Railway (API Backend)
**URL** : `https://asata-production.up.railway.app`

- Déploiement automatique depuis `Hamzaaxx/ASATA`
- Build via Nixpacks (détection auto Node.js)
- SSL/HTTPS automatique
- Restart automatique en cas d'échec

**Configuration** (`railway.toml`) :
```toml
[build]
builder = "NIXPACKS"
buildCommand = "npm install --include=dev && npm run build"

[deploy]
startCommand = "npm start"
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 3
```

**Étapes de build Railway** :
1. Détection Node.js 18
2. `npm install --include=dev` (inclut TypeScript)
3. `npm run build` (compilation TypeScript → JavaScript)
4. `node dist/main.js` (exécution)

### 7.3 Neon (Base de données)
**Endpoint** : `ep-soft-bonus-an348266-pooler.c-6.us-east-1.aws.neon.tech`

- PostgreSQL serverless
- Connection pooling via PgBouncer
- Sauvegarde automatique
- Scale-to-zero (économie de ressources)

### 7.4 Docker & Nixpacks
Railway utilise Nixpacks (alternative open-source à Docker) :
- Détecte automatiquement le langage (Node.js)
- Installe les dépendances système (`openssl` pour Prisma)
- Construit l'image et déploie le container

### 7.5 GitHub (Contrôle de version)
**Dépôts** :
| Repo | Utilisation |
|------|-------------|
| `XaMiNeZH/ASATA` | Dépôt principal (source Vercel) |
| `Hamzaaxx/ASATA` | Fork contributeur (source Railway) |

**Branches** :
- `main` : Production, déploiement automatique
- `feat/admin-panel` : Branche feature (mergée)
- `feat/mobile-api-integration` : Intégration mobile (mergée)

---

## 8. Sécurité

### 8.1 Authentification JWT
```
1. Admin POST /api/admin/login (email + password)
2. API vérifie le hash bcrypt en BDD
3. API retourne un token JWT signé (expire en 7 jours)
4. Frontend stocke le token dans localStorage
5. Chaque requête protégée : Authorization: Bearer <token>
6. Middleware vérifie et décode le token à chaque requête
```

### 8.2 Hachage des mots de passe (bcryptjs)
- Les mots de passe ne sont **jamais** stockés en clair
- Algorithme bcrypt avec salt automatique
- Résistant aux attaques par force brute

### 8.3 CORS
```javascript
// Seuls les origines autorisées peuvent appeler l'API
ALLOWED_ORIGINS = "https://asata-website.vercel.app"
methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
```

### 8.4 Rate Limiting
| Route | Limite | Fenêtre |
|-------|--------|---------|
| `/api/*` (général) | Configurable | 15 minutes |
| `/api/donations` | 10 requêtes | 1 heure |
| `/api/contact` | 5 requêtes | 1 heure |

### 8.5 Validation des données (Zod)
- Chaque endpoint valide les données entrantes
- Rejet des requêtes malformées avec code 422
- Typage strict des données reçues

### 8.6 Variables d'environnement
- Aucun secret dans le code source
- Secrets gérés via Railway Variables et Vercel Environment Variables
- `.env` exclu du git via `.gitignore`

### 8.7 HTTPS/TLS
- Vercel et Railway fournissent SSL automatique
- Toutes les communications sont chiffrées
- Neon utilise SSL pour les connexions PostgreSQL

### Tableau récapitulatif sécurité
| Couche | Technologie | Protection |
|--------|-------------|------------|
| Auth | JWT | Vérification identité admin |
| Mot de passe | bcryptjs | Hash + salt |
| Transport | HTTPS/TLS | Chiffrement communications |
| Origines | CORS | Filtre les domaines autorisés |
| Abus | Rate Limiting | Prévention brute force |
| Secrets | Env Variables | Credentials hors du code |
| BDD | Neon SSL | Connexion chiffrée |

---

## 9. Flux de données

### 9.1 Flux d'authentification admin
```
1. Admin → asata-website.vercel.app/admin/login
2. Saisit email + mot de passe
3. Frontend → POST /api/admin/login
4. API vérifie hash bcrypt en PostgreSQL
5. API retourne { token, email }
6. Frontend stocke token dans localStorage
7. Requêtes suivantes → Authorization: Bearer <token>
8. ProtectedRoute vérifie le token avant affichage
```

### 9.2 Flux gestion des événements
```
1. Admin crée un événement (formulaire dashboard)
2. Frontend → POST /api/upload (image)
3. API sauvegarde l'image localement, retourne l'URL
4. Frontend → POST /api/events (données + URL image)
5. API valide via Zod schema
6. Prisma sauvegarde en PostgreSQL
7. Frontend recharge la liste → GET /api/events
8. Événements visibles sur /evenements (public)
```

### 9.3 Flux galerie photos
```
1. Admin ajoute une photo (dashboard galerie)
2. Photo uploadée et sauvegardée en BDD
3. Visiteur accède à /galerie
4. Frontend → GET /api/gallery
5. Photos affichées dynamiquement
6. Si API indisponible → fallback photos statiques
```

### 9.4 Flux formulaire de contact
```
1. Visiteur remplit le formulaire /contact
2. Frontend → POST /api/contact
3. API valide les données (Zod)
4. Prisma sauvegarde en PostgreSQL
5. Nodemailer envoie email à l'admin (Gmail)
6. Admin voit le message dans le dashboard
7. Admin peut changer le statut : UNREAD → READ → REPLIED
```

### 9.5 Flux donation
```
1. Visiteur remplit le formulaire /don
2. Frontend → POST /api/donations
3. API crée un enregistrement avec référence unique
4. Statut initial : PENDING
5. Admin voit la donation dans le dashboard
6. Admin peut confirmer/rejeter la donation
```

---

## 10. Pipeline de déploiement

### 10.1 Frontend (Vercel)
```
Developer push → GitHub (XaMiNeZH/ASATA main)
      ↓
Vercel webhook déclenché automatiquement
      ↓
Vercel clone le repo
      ↓
npm install + tsc + vite build
      ↓
Assets déployés sur CDN global
      ↓
✅ Live sur asata-website.vercel.app (~2 min)
```

### 10.2 Backend (Railway)
```
Developer push → GitHub (Hamzaaxx/ASATA main)
      ↓
Railway webhook déclenché automatiquement
      ↓
Nixpacks détecte Node.js 18
      ↓
npm install --include=dev
      ↓
npm run build (tsc → dist/)
      ↓
Container Docker créé et déployé
      ↓
npm start (node dist/main.js)
      ↓
✅ Live sur asata-production.up.railway.app (~5 min)
```

---

## 11. Endpoints API

### Authentification
| Méthode | Endpoint | Accès | Description |
|---------|----------|-------|-------------|
| POST | `/api/admin/login` | Public | Connexion admin |
| GET | `/api/admin/me` | Admin | Info admin connecté |

### Événements
| Méthode | Endpoint | Accès | Description |
|---------|----------|-------|-------------|
| GET | `/api/events` | Public | Liste tous les événements |
| GET | `/api/events/:id` | Public | Détail d'un événement |
| POST | `/api/events` | Admin | Créer un événement |
| PUT | `/api/events/:id` | Admin | Modifier un événement |
| DELETE | `/api/events/:id` | Admin | Supprimer un événement |

### Galerie
| Méthode | Endpoint | Accès | Description |
|---------|----------|-------|-------------|
| GET | `/api/gallery` | Public | Liste les photos |
| POST | `/api/gallery` | Admin | Ajouter une photo |
| DELETE | `/api/gallery/:id` | Admin | Supprimer une photo |

### Donations
| Méthode | Endpoint | Accès | Description |
|---------|----------|-------|-------------|
| POST | `/api/donations` | Public | Enregistrer un don |
| GET | `/api/donations` | Admin | Liste des dons |
| GET | `/api/donations/stats` | Admin | Statistiques dons |
| PATCH | `/api/donations/:id/status` | Admin | Changer statut don |

### Contact
| Méthode | Endpoint | Accès | Description |
|---------|----------|-------|-------------|
| POST | `/api/contact` | Public | Envoyer un message |
| GET | `/api/contact` | Admin | Liste des messages |
| PATCH | `/api/contact/:id/status` | Admin | Changer statut message |

### Upload & Santé
| Méthode | Endpoint | Accès | Description |
|---------|----------|-------|-------------|
| POST | `/api/upload` | Admin | Upload d'image |
| GET | `/health` | Public | Vérification état API |

---

## 12. Modèles de données

### Event
```typescript
{
  id: string              // CUID unique
  title: string           // Titre de l'événement
  subtitle?: string       // Sous-titre optionnel
  date: string            // Date de début
  endDate?: string        // Date de fin optionnelle
  location: string        // Lieu
  locationDetail?: string // Détail du lieu
  sport: string           // ski | football | athletisme
  category: string        // Catégorie de compétition
  status: string          // upcoming | ongoing | past
  description: string     // Description complète
  result?: string         // Résultat (si terminé)
  highlight: boolean      // Événement mis en avant
  image?: string          // URL de l'image
  createdAt: DateTime
  updatedAt: DateTime
}
```

### Admin
```typescript
{
  id: string              // CUID unique
  email: string           // Email unique
  passwordHash: string    // Hash bcrypt
  createdAt: DateTime
}
```

### Donation
```typescript
{
  id: string              // CUID unique
  reference: string       // Référence unique automatique
  amount: number          // Montant
  currency: string        // MAD (par défaut)
  method: string          // Méthode de paiement
  status: string          // PENDING | CONFIRMED | REJECTED
  donorName: string       // Nom du donateur
  donorEmail: string      // Email du donateur
  donorPhone?: string     // Téléphone optionnel
  message?: string        // Message optionnel
  createdAt: DateTime
  updatedAt: DateTime
}
```

### GalleryPhoto
```typescript
{
  id: string              // CUID unique
  src: string             // URL de l'image
  caption?: string        // Légende optionnelle
  category: string        // ski | football | athletisme
  createdAt: DateTime
}
```

### ContactMessage
```typescript
{
  id: string              // CUID unique
  firstName: string       // Prénom
  lastName: string        // Nom
  email: string           // Email
  phone?: string          // Téléphone optionnel
  subject: string         // Sujet
  message: string         // Contenu
  status: string          // UNREAD | READ | REPLIED
  createdAt: DateTime
  updatedAt: DateTime
}
```

---

## 13. Variables d'environnement

### Railway (API)
| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | URL PostgreSQL Neon (pooled) |
| `DATABASE_URL_UNPOOLED` | URL PostgreSQL Neon (directe, migrations) |
| `NODE_ENV` | `production` |
| `PORT` | `3001` |
| `JWT_SECRET` | Clé secrète JWT |
| `JWT_EXPIRES_IN` | Durée validité token (défaut: 7d) |
| `ADMIN_EMAIL` | Email admin par défaut |
| `ADMIN_PASSWORD` | Mot de passe admin par défaut |
| `ALLOWED_ORIGINS` | `https://asata-website.vercel.app` |
| `CONTACT_RECEIVER` | Email réception des messages contact |
| `GMAIL_USER` | Compte Gmail pour envoi emails |
| `GMAIL_APP_PASSWORD` | Mot de passe app Gmail |
| `RATE_LIMIT_MAX` | Limite requêtes par 15 min |

### Vercel (Frontend)
| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | `https://asata-production.up.railway.app` |

---

## 14. Problèmes rencontrés & Solutions

| Problème | Cause | Solution |
|----------|-------|----------|
| Page `/admin` → 404 | Vercel ne gère pas les routes SPA | Ajout `vercel.json` avec règle de réécriture |
| "Failed to fetch" au login | URL API avec slash final → double `//` | Suppression du `/` final dans `VITE_API_URL` |
| Erreur 500 au login | `express-rate-limit` + `X-Forwarded-For` sans `trust proxy` | Ajout `app.set('trust proxy', 1)` |
| "Can't reach database" | Base de données Neon en veille | Réveil automatique après première requête |
| Build Railway échoue | TypeScript non trouvé | `npm install --include=dev` dans le build command |
| Édition événements échoue | Méthode `PUT` absente du CORS | Ajout de `PUT` dans les méthodes CORS autorisées |
| Push rejeté | Divergence entre repos | `git pull --rebase` avant chaque push |
| Page galerie statique | Import depuis `data/images.ts` | Connexion à `GET /api/gallery` avec fallback |
| Migration SQLite → PostgreSQL | Types incompatibles | Suppression migrations SQLite, création migration PostgreSQL |

---

## 15. État actuel du système

### URLs de production
| Service | URL | Statut |
|---------|-----|--------|
| Frontend | https://asata-website.vercel.app | ✅ Live |
| API | https://asata-production.up.railway.app | ✅ Live |
| Admin | https://asata-website.vercel.app/admin | ✅ Live |
| Base de données | Neon PostgreSQL | ✅ Active |

### Fonctionnalités opérationnelles
| Fonctionnalité | Statut |
|----------------|--------|
| Site public complet | ✅ |
| Page événements (live API) | ✅ |
| Page galerie (live API + fallback) | ✅ |
| Formulaire contact → BDD + email | ✅ |
| Formulaire don → BDD | ✅ |
| Panneau admin — login JWT | ✅ |
| CRUD événements (admin) | ✅ |
| CRUD galerie (admin) | ✅ |
| Gestion donations (admin) | ✅ |
| Messages contact (admin) | ✅ |
| Upload images | ✅ (temporaire) |

### Limites connues
| Limite | Description | Priorité |
|--------|-------------|----------|
| Images temporaires | Uploads perdus au redéploiement Railway | 🟡 Moyen |
| Railway crédit | ~$5 crédit gratuit (~30 jours) | 🟡 Moyen |
| Neon scale-to-zero | 1-2s de latence au réveil | 🟢 Faible |

---

## 16. Améliorations futures

| Domaine | Amélioration | Priorité |
|---------|--------------|----------|
| **Stockage** | Cloud storage (Cloudinary/Supabase Storage) pour images | 🔴 Haute |
| **Hébergement API** | Migration vers Render.com (gratuit, pas de crédit) | 🟡 Moyen |
| **Sécurité** | 2FA pour les comptes admin | 🟡 Moyen |
| **Performance** | Cache Redis pour données fréquentes | 🟢 Faible |
| **BDD** | Réplicas Neon pour les analytics | 🟢 Faible |
| **Monitoring** | Alertes erreurs API (Sentry) | 🟡 Moyen |
| **SEO** | Meta tags et sitemap | 🟢 Faible |
| **Mobile** | Application mobile (intégration en cours) | 🔵 En cours |

---

## 17. Équipe

| Rôle | Personne | GitHub | Responsabilité |
|------|----------|--------|----------------|
| Co-fondateur / Owner | XaMiNeZH | `XaMiNeZH/ASATA` | Repo principal, Vercel, architecture |
| Contributeur | Hamzaaxx | `Hamzaaxx/ASATA` | API, migration PostgreSQL, Railway, admin panel |

---

## Glossaire

| Terme | Définition |
|-------|-----------|
| **ORM** | Object-Relational Mapping — pont entre objets code et tables BDD |
| **JWT** | JSON Web Token — authentification par token signé |
| **CORS** | Cross-Origin Resource Sharing — autorise le frontend à appeler l'API |
| **SPA** | Single Page Application — React gère la navigation côté client |
| **CDN** | Content Delivery Network — serveurs distribués mondialement |
| **Pooling** | Réutilisation des connexions BDD au lieu d'en créer de nouvelles |
| **ACID** | Atomicité, Cohérence, Isolation, Durabilité — garanties d'une BDD |
| **Nixpacks** | Alternative Docker qui détecte automatiquement le langage du projet |
| **Webhook** | Déclencheur automatique (ex: push GitHub → déploiement) |
| **Bcrypt** | Algorithme de hachage sécurisé pour les mots de passe |
| **Zod** | Bibliothèque de validation et typage runtime en TypeScript |
| **PgBouncer** | Gestionnaire de pool de connexions PostgreSQL (utilisé par Neon) |

---

**Rapport généré le** : 6 Mai 2026
**Prochaine révision** : 6 Juin 2026
