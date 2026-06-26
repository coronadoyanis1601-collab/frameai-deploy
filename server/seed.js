const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  const adminPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@frameai.com' },
    update: {},
    create: {
      email: 'admin@frameai.com',
      password: adminPassword,
      name: 'Admin FrameAI',
      role: 'ADMIN'
    }
  });

  const sellerPassword = await bcrypt.hash('seller123', 10);
  await prisma.user.upsert({
    where: { email: 'vendeur@frameai.com' },
    update: {},
    create: {
      email: 'vendeur@frameai.com',
      password: sellerPassword,
      name: 'Jean Dupont',
      role: 'SELLER'
    }
  });

  const products = [
    {
      name: 'Lincoln View Brown',
      shape: 'Pantos / ronde carrée douce',
      color: 'Écaille marron miel',
      material: 'Acétate premium',
      price: 189,
      stock: 12,
      style: 'Vintage / Rétro',
      availability: 'En stock',
      imageUrl: null,
      weight: 28,
      score: 0
    },
    {
      name: 'Arc Titanium Silver',
      shape: 'Rectangulaire fine',
      color: 'Argent brossé',
      material: 'Titane',
      price: 295,
      stock: 8,
      style: 'Minimaliste / Contemporain',
      availability: 'En stock',
      imageUrl: null,
      weight: 18,
      score: 0
    },
    {
      name: 'Riviera Tort Gold',
      shape: 'Aviateur',
      color: 'Écaille dorée',
      material: 'Métal doré + acétate',
      price: 245,
      stock: 15,
      style: 'Classic / Élégant',
      availability: 'En stock',
      imageUrl: null,
      weight: 22,
      score: 0
    },
    {
      name: 'Metro Black Square',
      shape: 'Carrée',
      color: 'Noir mat',
      material: 'Acétate mat',
      price: 165,
      stock: 20,
      style: 'Urbain / Modern',
      availability: 'En stock',
      imageUrl: null,
      weight: 25,
      score: 0
    },
    {
      name: 'Boho Crystal Rose',
      shape: 'Ronde',
      color: 'Rose cristal',
      material: 'Acétate transparent teinté',
      price: 179,
      stock: 10,
      style: 'Bohème / Romantique',
      availability: 'En stock',
      imageUrl: null,
      weight: 24,
      score: 0
    }
  ];

  for (const product of products) {
    const existing = await prisma.product.findFirst({ where: { name: product.name } });
    if (!existing) {
      await prisma.product.create({ data: product });
    }
  }

  console.log('✅ Database seeded successfully!');
  console.log('👤 Admin: admin@frameai.com / admin123');
  console.log('👤 Vendeur: vendeur@frameai.com / seller123');
}

main()
  .catch((e) => { console.error('Seed error (non-fatal):', e.message); })
  .finally(async () => { await prisma.$disconnect(); process.exit(0); });
