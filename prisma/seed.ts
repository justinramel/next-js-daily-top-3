import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const top3 = await prisma.top3.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      todos: {
        create: [
          { title: "Research Next.js beta changes", complete: false },
          { title: "Write Next.js article", complete: false },
          { title: "Publish Next.js article on LinkedIn", complete: false },
        ],
      },
    },
  });
  console.log({ top3 });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
