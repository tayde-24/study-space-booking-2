import prisma from './utils/prisma.js';

async function seed() {
  try {
    // Create some users
    const user1 = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john@example.com'
      }
    });

    const user2 = await prisma.user.create({
      data: {
        name: 'Jane Smith',
        email: 'jane@example.com'
      }
    });

    // Create some rooms
    const room1 = await prisma.room.create({
      data: {
        name: 'Conference Room A',
        capacity: 10
      }
    });

    const room2 = await prisma.room.create({
      data: {
        name: 'Study Room B',
        capacity: 4
      }
    });

    console.log('Database seeded successfully!');
    console.log('Users:', user1, user2);
    console.log('Rooms:', room1, room2);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();