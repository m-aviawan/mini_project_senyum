// const { PrismaClient } = require('@prisma/client')
// const prisma = new PrismaClient()
// const bcrypt = require('bcrypt') for hashing password

// const sample = [
//     {
//             firstName: 'Ryan',
//             lastName: 'Defryan',
//             email: 'mdefr@edu.api',
//             gender: 'male',
//             birthDate: '1995-07-10',
//             idCardNumber: '9870111007950001',
//     }
// ]

// async function main() {
//     sample.forEach(async(item) => {
//         await prisma.sample.create({
//             data: item
//         })
//     })
// }

// main().catch((err) => {
//     console.log(err)
// }).finally(async() => {
//     await prisma.$disconnect()
// })

const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  // Seed Users
  for (let i = 1; i <= 30; i++) {
    await prisma.user.create({
      data: {
        username: `user${i}`,
        email: `user${i}@example.com`,
        password: await hash('password123', 10), // Hashing password
        referralCode: `REF${i}`,
        isVerified: i % 2 === 0, // Set half verified
        gender: i % 2 === 0 ? 'FEMALE' : 'MALE',
        role: 'CUSTOMER',
        totalPoint: Math.floor(Math.random() * 100),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  // Seed Event Organizers
  for (let i = 1; i <= 30; i++) {
    await prisma.eventOrganizer.create({
      data: {
        email: `organizer${i}@example.com`,
        password: await hash('organizer123', 10),
        companyName: `Company ${i}`,
        phoneNumber: `12345678${i}`,
        pic: `pic_url_${i}`,
        isVerified: i % 3 === 0, // Set every third organizer as verified
      },
    });
  }

  // Seed Categories
  const categories = ['Concert', 'Workshop', 'Seminar', 'Webinar', 'Festival'];
  for (const category of categories) {
    for (let i = 0; i < 6; i++) { // 6 rows for each category
      await prisma.category.create({
        data: {
          name: `${category} ${i + 1}`,
        },
      });
    }
  }

  // Seed Events
  const organizers = await prisma.eventOrganizer.findMany();
  const categoryIds = await prisma.category.findMany();

  for (let i = 1; i <= 30; i++) {
    await prisma.event.create({
      data: {
        name: `Event ${i}`,
        type: i % 2 === 0 ? 'ONLINE' : 'OFFLINE',
        locationName: i % 2 === 0 ? 'Virtual' : 'Venue ' + i,
        location: i % 2 === 0 ? 'Zoom' : `Location ${i}`,
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
        capacity: 100,
        categoryId: categoryIds[i % categoryIds.length].id,
        eoId: organizers[i % organizers.length].id,
      },
    });
  }

  // Seed Event Tickets
  const events = await prisma.event.findMany();

  for (let i = 1; i <= 30; i++) {
    await prisma.eventTicket.create({
      data: {
        name: `Ticket ${i}`,
        price: Math.floor(Math.random() * 100) + 20, // Price between 20 to 119
        available: 50,
        bookSeat: 0,
        totalSeat: 50,
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
        eventId: events[i % events.length].id,
      },
    });
  }

  // Seed Reviews
  const users = await prisma.user.findMany();

  for (const event of events) {
    for (let i = 0; i < 3; i++) { // 3 reviews per event
      await prisma.review.create({
        data: {
          comments: `This is a review for ${event.name} - comment ${i + 1}`,
          rating: Math.floor(Math.random() * 5) + 1, // Random rating between 1 and 5
          userId: users[i % users.length].id,
          eventId: event.id,
        },
      });
    }
  }

  console.log("Seeding completed!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

