import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // ── Admin user ─────────────────────────────────────────────────────────────
  const email = process.env.ADMIN_EMAIL ?? "admin@asata.ma";
  const password = process.env.ADMIN_PASSWORD ?? "asata2024!";
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.admin.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash },
  });
  console.log(`Admin seeded: ${email}`);

  // ── Seed events ────────────────────────────────────────────────────────────
  const count = await prisma.event.count();
  if (count > 0) {
    console.log("Events already seeded, skipping.");
    return;
  }

  const events = [
    {
      title: "Stage d'Été Ski & Montagne",
      subtitle: "Formation technique — Toutes catégories",
      date: "2026-06-20",
      endDate: "2026-06-27",
      location: "Oukaimeden",
      locationDetail: "Station de ski d'Oukaimeden — Alt. 2 600 m",
      sport: "ski",
      category: "stage",
      status: "upcoming",
      description: "Stage intensif d'une semaine pour les jeunes skieurs du club. Au programme : perfectionnement technique, initiation au slalom géant et randonnée en haute montagne avec nos moniteurs certifiés.",
      highlight: true,
    },
    {
      title: "Tournoi de Football Asni",
      subtitle: "3ème Édition — Garçons & Filles",
      date: "2026-05-15",
      endDate: "2026-05-17",
      location: "Asni",
      locationDetail: "Terrain de football d'Asni",
      sport: "football",
      category: "tournoi",
      status: "upcoming",
      description: "La troisième édition du tournoi de football de l'ASATA réunit les équipes des communes d'Al Haouz. Catégories U12, U16, et senior masculin et féminin.",
    },
    {
      title: "Championnat National d'Athlétisme",
      subtitle: "Délégation ASATA — FRMA",
      date: "2026-09-06",
      location: "Rabat",
      locationDetail: "Complexe sportif Prince Moulay Abdallah",
      sport: "athletisme",
      category: "competition",
      status: "upcoming",
      description: "Notre délégation d'athlètes participera au Championnat National sous les couleurs de l'ASATA.",
    },
    {
      title: "Journée Portes Ouvertes ASATA",
      subtitle: "16ème anniversaire de l'association",
      date: "2026-06-06",
      location: "Asni",
      locationDetail: "Siège de l'ASATA — Village d'Asni",
      sport: "general",
      category: "ceremonie",
      status: "upcoming",
      description: "Pour célébrer les 16 ans de l'ASATA, nous ouvrons nos portes à la communauté.",
    },
    {
      title: "Open African Masters Athletics",
      subtitle: "1ère place · 100m & 110m haies",
      date: "2025-10-12",
      location: "Tunis, Tunisie",
      locationDetail: "Stade El Menzah",
      sport: "athletisme",
      category: "competition",
      status: "past",
      description: "M. Ahmed BIRI a représenté brillamment l'ASATA lors de l'Open African Masters à Tunis.",
      result: "🥇 1ère place — 100m & 110m haies",
      highlight: true,
    },
    {
      title: "Tournoi Ramadan de Football",
      subtitle: "Trophée ASATA · Édition 2025",
      date: "2025-03-20",
      endDate: "2025-03-28",
      location: "Asni",
      sport: "football",
      category: "tournoi",
      status: "past",
      description: "L'ASATA a organisé et remporté le tournoi de football du Ramadan.",
      result: "🏆 Vainqueur du tournoi",
      image: "/footballActivitiesPics/asata tournoi raman winners.jpg",
    },
    {
      title: "Championnat International — Shkodër",
      subtitle: "110m haies & 200m · Albanie",
      date: "2025-06-08",
      location: "Shkodër, Albanie",
      sport: "athletisme",
      category: "competition",
      status: "past",
      description: "Participation internationale de M. Ahmed BIRI au championnat de Shkodër.",
      result: "🥇 1ère place — 110m haies · 🥇 1ère place — 200m",
    },
    {
      title: "2ème Édition Compétition Ski Alpin",
      subtitle: "Coupe ASATA — Slalom Géant",
      date: "2025-01-25",
      location: "Oukaimeden",
      locationDetail: "Pistes noires & rouges · Alt. 2 600 m",
      sport: "ski",
      category: "competition",
      status: "past",
      description: "La deuxième édition de la compétition de ski alpin organisée par l'ASATA.",
      image: "/skiActivitiesPics/Ski comp 2eme edution fiche.jpg",
    },
    {
      title: "Rencontre Amicale Football",
      subtitle: "ASATA vs Club Ait Ourir",
      date: "2025-09-14",
      location: "Ait Ourir",
      sport: "football",
      category: "rencontre",
      status: "past",
      description: "Match amical entre l'équipe senior de l'ASATA et le club d'Ait Ourir.",
      result: "2 – 1 (Victoire ASATA)",
    },
  ];

  for (const ev of events) {
    await prisma.event.create({ data: ev });
  }
  console.log(`Seeded ${events.length} events.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
