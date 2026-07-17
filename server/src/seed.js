// import dotenv from 'dotenv';
// dotenv.config({
//   path: '../.env'
// });
import prisma from './utils/prisma.js';

async function seed() {
  try {
    // await prisma.user.update({
    //   where: { email: "taydeluevano@gmail.com" },
    //   data: { role: "ADMIN" },
    // });

    //Create some users
    // const user1 = await prisma.user.create({
    //   data: {
    //     name: 'Katy Luevano',
    //     email: 'katy_luevano@example.com'
    //   }
    // });

    // const user2 = await prisma.user.create({
    //   data: {
    //     name: 'Cristy Euan',
    //     email: 'cristy_euan@example.com'
    //   }
    // });

    // Create some buldings
    const building1 = await prisma.building.create({
      data: {
        name: 'Library',
        location: '123 Main St'
      }
    });

    const building2 = await prisma.building.create({
      data: {
        name: 'Engineering Building',
        location: '456 College Ave'
      }
    });

    const building3 = await prisma.building.create({
      data: {
        name: 'STEM Center',
        location: '789 University Blvd'
      }
    });

    const building4 = await prisma.building.create({
      data: {
        name: 'Student Center',
        location: '321 Campus Dr'
      }
    });

    // // Create some rooms
    const room1 = await prisma.room.create({
      data: {
        name: 'Luke Skywalker Room 1B',
        capacity: 6,
        building: {
          connect: { name: 'Student Center' }
        }
      }
    });

    const room2 = await prisma.room.create({
      data: {
        name: 'Franco Escamilla Room 2A',
        capacity: 8,
        building: {
          connect: { name: 'Student Center' } 
        }
      }
    });
    const room3 = await prisma.room.create({
      data: {
        name: 'Conference Room A',
        capacity: 10,
        building: {
          connect: { name: 'Student Center' }
        }
      }
    });

    const room4 = await prisma.room.create({
      data: {
        name: 'Study Room B',
        capacity: 4,
        building: {
          connect: { name: 'Engineering Building' }
        }
      }
    });

    const room5 = await prisma.room.create({
      data: {
        name: 'Lorenzo Snow Room A',
        capacity: 5,
        building: {
          connect: { name: 'Student Center' }
        }
      }
    });

    const room6 = await prisma.room.create({
      data: {
        name: 'Study Room C',
        capacity: 8,
        building: {
          connect: { name: 'Library' }
        }
      }
    });

    const room7 = await prisma.room.create({
      data: {
        name: 'Luke Skywalker Room 1A',
        capacity: 6,
        building: {
          connect: { name: 'Student Center' }
        }
      }
    });

    const room8 = await prisma.room.create({
      data: {
        name: 'Room 101',
        capacity: 3,
        building: {
          connect: { name: 'Library' }
        }
      }
    });

    const room9 = await prisma.room.create({
      data: {
        name: 'Room 102',
        capacity: 5,
        building: {
          connect: { name: 'Library' }
        }
      }
    });

    const room10 = await prisma.room.create({
      data: {
        name: 'Lab A',
        capacity: 6,
        building: {
          connect: { name: 'STEM Center' }
        }
      }
    });

    const room11 = await prisma.room.create({
      data: {
        name: 'Lab B',
        capacity: 4,
        building: {
          connect: { name: 'STEM Center' }
        }
      }
    });

    // console.log('Database seeded successfully!');
    // // console.log('Users:', user4, user5);
    // console.log('Rooms:', room4, room5);
    // console.log('Buildings:', building1, building2);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();