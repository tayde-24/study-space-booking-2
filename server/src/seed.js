import prisma from './utils/prisma.js';

async function seed() {
  try {
    // Create some users
    // const user4 = await prisma.user.create({
    //   data: {
    //     name: 'Katy Luevano',
    //     email: 'katy_luevano@example.com'
    //   }
    // });

    // const user5 = await prisma.user.create({
    //   data: {
    //     name: 'Cristy Euan',
    //     email: 'cristy_euan@example.com'
    //   }
    // });

    // Create some rooms
    const room4 = await prisma.room.create({
      data: {
        name: 'Luke Skywalker Room 1B',
        capacity: 6
      }
    });

    const room5 = await prisma.room.create({
      data: {
        name: 'Franco Escamilla Room 2A',
        capacity: 8
      }
    });

    console.log('Database seeded successfully!');
    console.log('Users:', user4, user5);
    console.log('Rooms:', room4, room5);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();