# MySQL to PostgreSQL Migration

This project now uses PostgreSQL as its Prisma datasource.

## Before You Switch

- Back up your current MySQL database.
- Provision an empty PostgreSQL database.
- Update your local `.env` so `DATABASE_URL` and `DIRECT_URL` point at PostgreSQL.

Example:

```env
DATABASE_URL=postgresql://postgres.project-ref:password@aws-0-region.pooler.supabase.com:5432/postgres
DIRECT_URL=postgresql://postgres:password@db.project-ref.supabase.co:5432/postgres
```

## Schema Migration

For a fresh PostgreSQL database:

```bash
npx prisma migrate deploy
npx prisma generate
```

If you are in local development and want Prisma to recreate the database from scratch:

```bash
npx prisma migrate reset
```

## Data Migration

The Prisma schema is portable, but an existing MySQL database is not automatically reused by PostgreSQL. You need to move the data.

Recommended flow:

1. Export data from MySQL as SQL or CSV.
2. Create the PostgreSQL schema with Prisma migrations.
3. Transform MySQL-specific values if needed, then import into PostgreSQL.
4. Run a smoke test against the app.

## Compatibility Notes

- MySQL `LONGTEXT` fields were mapped to PostgreSQL `TEXT`.
- JSON columns remain JSON-backed through Prisma.
- String comparison behavior can differ. MySQL commonly uses case-insensitive collations by default, while PostgreSQL comparisons are usually case-sensitive unless you opt into a different strategy.
- Existing MySQL migration history should not be reused against PostgreSQL. Start from the PostgreSQL migration set in this repository.
- On some networks, Supabase direct database hosts resolve to IPv6 only. If Prisma CLI cannot reach `db.<project-ref>.supabase.co`, set `DIRECT_URL` to the session pooler URL on port `5432` instead.

## Suggested Checks After Migration

- Sign in through GitHub and verify user creation or update still works.
- Create a repository record and confirm config JSON fields save correctly.
- Start a translation task and verify related file records are written.
- Review any queries that depend on case-insensitive matching.
