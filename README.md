This is a Next.js application for managing repository translation workflows.

## Database

The project now targets PostgreSQL through Prisma.

- Update `DATABASE_URL` and `DIRECT_URL` in your local `.env` to PostgreSQL connection strings.
- The checked-in Prisma migrations are PostgreSQL migrations.
- If you are moving existing data from MySQL, follow [docs/mysql-to-postgres.md](docs/mysql-to-postgres.md).

## Getting Started

Install dependencies, generate Prisma Client, and start the dev server:

```bash
npx prisma generate
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
