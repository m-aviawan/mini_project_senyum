// prisma/seed.ts
const { PrismaClient, Gender, EventType, Status } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Create Users
  const user1 = await prisma.user.create({
    data: {
      username: 'john_doe',
      email: 'john.doe@example.com',
      password: 'password123',
      referralCode: 'ref12345',
      isVerified: true,
      phoneNumber: '123-456-7890',
      birthDate: new Date('1990-01-01'),
      address: '123 Main St, Springfield, USA',
      gender: Gender.MALE,
      role: 'CUSTOMER',
      totalPoint: 150,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'jane_doe',
      email: 'jane.doe@example.com',
      password: 'password123',
      referralCode: 'ref12346',
      isVerified: true,
      phoneNumber: '987-654-3210',
      birthDate: new Date('1992-05-14'),
      address: '456 Elm St, Springfield, USA',
      gender: Gender.FEMALE,
      role: 'CUSTOMER',
      totalPoint: 200,
    },
  });

  // Create Event Organizers
  const eo1 = await prisma.eventOrganizer.create({
    data: {
      email: 'company1@example.com',
      password: 'password123',
      companyName: 'EventCorp',
      address: '123 Business Rd, City, USA',
      phoneNumber: '123-555-1234',
      pic: 'eventpic1.png',
      role: 'EO',
    },
  });

  const eo2 = await prisma.eventOrganizer.create({
    data: {
      email: 'company2@example.com',
      password: 'password123',
      companyName: 'PartyPlanners',
      address: '456 Event Blvd, City, USA',
      phoneNumber: '123-555-5678',
      pic: 'eventpic2.png',
      role: 'EO',
    },
  });

  // Create Categories
  const category1 = await prisma.category.create({
    data: { name: 'Music' },
  });

  const category2 = await prisma.category.create({
    data: { name: 'Art' },
  });

  // Create Events
  const event1 = await prisma.event.create({
    data: {
      name: 'Rock Concert',
      type: EventType.OFFLINE,
      locationName: 'Stadium A',
      location: '123 Stadium St, City, USA',
      startDate: new Date('2024-12-01T18:00:00'),
      endDate: new Date('2024-12-01T22:00:00'),
      capacity: 1000,
      categoryId: category1.id,
      eoId: eo1.id,
    },
  });

  const event2 = await prisma.event.create({
    data: {
      name: 'Art Exhibition',
      type: EventType.ONLINE,
      locationName: 'Gallery B',
      location: 'Online',
      startDate: new Date('2024-12-05T10:00:00'),
      endDate: new Date('2024-12-05T18:00:00'),
      capacity: 500,
      categoryId: category2.id,
      eoId: eo2.id,
    },
  });

  // Create Tickets for Events
  const ticket1 = await prisma.eventTicket.create({
    data: {
      name: 'General Admission',
      price: 50,
      available: 500,
      bookSeat: 0,
      totalSeat: 500,
      startDate: new Date('2024-12-01T00:00:00'),
      endDate: new Date('2024-12-01T23:59:59'),
      eventId: event1.id,
    },
  });

  const ticket2 = await prisma.eventTicket.create({
    data: {
      name: 'VIP Admission',
      price: 150,
      available: 100,
      bookSeat: 0,
      totalSeat: 100,
      startDate: new Date('2024-12-01T00:00:00'),
      endDate: new Date('2024-12-01T23:59:59'),
      eventId: event1.id,
    },
  });

  // Create Referral Points
  await prisma.referralPoint.create({
    data: {
      point: 100,
      expiry: new Date('2025-12-31'),
      userId: user1.id,
    },
  });

  await prisma.referralPoint.create({
    data: {
      point: 50,
      expiry: new Date('2025-12-31'),
      userId: user2.id,
    },
  });

  // Create Referral Discounts
  await prisma.referralDiscount.create({
    data: {
      percentDiscount: 10,
      expiry: new Date('2024-12-31'),
      userId: user1.id,
    },
  });

  await prisma.referralDiscount.create({
    data: {
      percentDiscount: 5,
      expiry: new Date('2024-12-31'),
      userId: user2.id,
    },
  });

  // Create Transactions
  const transaction1 = await prisma.transaction.create({
    data: {
      totalPrice: 200,
      status: Status.PAID,
      userId: user1.id,
      details: {
        create: [
          {
            price: 50,
            qty: 2,
            ticketId: ticket1.id,
          },
        ],
      },
    },
  });

  const transaction2 = await prisma.transaction.create({
    data: {
      totalPrice: 150,
      status: Status.PAID,
      userId: user2.id,
      details: {
        create: [
          {
            price: 150,
            qty: 1,
            ticketId: ticket2.id,
          },
        ],
      },
    },
  });

  // Create Reviews for Events
  await prisma.review.create({
    data: {
      rating: 5,
      feedback: 'Amazing concert! Highly recommend.',
      userId: user1.id,
      eventId: event1.id,
    },
  });

  await prisma.review.create({
    data: {
      rating: 4,
      feedback: 'Great exhibition, but could have been more interactive.',
      userId: user2.id,
      eventId: event2.id,
    },
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
