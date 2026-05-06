# PostgreSQL Migration Guide

## Overview
The API has been migrated from SQLite to PostgreSQL to support cloud deployment and concurrent connections.

## Setup Instructions

### Option 1: Docker Compose (Recommended for Development)

If you have Docker installed:

```bash
# Start PostgreSQL container
docker-compose up -d

# Verify it's running
docker-compose ps
```

The database will be available at `postgresql://postgres:postgres@localhost:5432/asata_dev`

### Option 2: Local PostgreSQL Installation

If you prefer a local PostgreSQL installation:

1. **Download PostgreSQL**: https://www.postgresql.org/download/
2. **Install and run** PostgreSQL (version 12+)
3. **Create database**:
   ```bash
   psql -U postgres
   CREATE DATABASE asata_dev;
   ```

### Option 3: Cloud PostgreSQL (Production)

For production deployment, use cloud providers:
- **Vercel Postgres** (easy integration)
- **Railway** (simple setup)
- **AWS RDS**
- **DigitalOcean Managed Databases**
- **Neon** (serverless PostgreSQL)

Update `DATABASE_URL` in `.env` with your cloud credentials.

## Running Migrations

After PostgreSQL is running:

```bash
cd apps/api

# Run migrations (creates tables)
npm run db:migrate

# Optional: seed database
npm run db:seed

# Open Prisma Studio to view data
npm run db:studio
```

## Environment Variables

Update `.env` in `apps/api/` with your PostgreSQL connection string:

```
DATABASE_URL=postgresql://user:password@host:port/database_name
```

**Development example:**
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/asata_dev
```

## Stopping PostgreSQL (Docker)

```bash
# Stop containers
docker-compose down

# Remove volumes (clears database)
docker-compose down -v
```

## Troubleshooting

### Connection refused
- Ensure PostgreSQL is running
- Check DATABASE_URL is correct
- For Docker: run `docker-compose ps` to verify container is up

### Port already in use
- Change port in docker-compose.yml: `5433:5432`
- Update DATABASE_URL to match new port

### Migration issues
- Check `.env` DATABASE_URL is valid
- Run `npm run db:generate` to update Prisma client
- Delete `.env` cache: `rm -rf node_modules/.prisma`

## Data Migration from SQLite

If you have existing data in SQLite:

1. Ensure old SQLite database file exists
2. Back it up: `cp apps/api/asata.db apps/api/asata.db.backup`
3. Use a migration tool if needed (data export/import)

For this project, a fresh PostgreSQL database is recommended since this is early stage.

## Production Deployment

Before deploying to production:

1. Set up managed PostgreSQL (AWS RDS, Vercel, etc.)
2. Update DATABASE_URL with production credentials
3. Run migrations on production: `npm run db:migrate`
4. Monitor database backups and performance

## Verifying Migration

After setup, verify it works:

```bash
cd apps/api
npm run dev
```

The API should connect to PostgreSQL without errors.
