import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed Users
  const users = Array.from({ length: 30 }).map((_, index) => ({
    username: `user${index + 1}`,
    email: `user${index + 1}@example.com`,
    password: `password${index + 1}`,
    profilePictureUrl: `https://example.com/picture${index + 1}.jpg`,
    isVerified: index % 2 === 0,
  }));

  await prisma.user.createMany({ data: users });

  // Seed Event Organizers
  const organizers = Array.from({ length: 30 }).map((_, index) => ({
    companyName: `EventOrganizer ${index + 1}`,
    phoneNumber: `123-456-789${index}`,
    pic: `pic${index + 1}`,
  }));

  await prisma.eventOrganizer.createMany({ data: organizers });

  // Seed Categories
  const categories = Array.from({ length: 30 }).map((_, index) => ({
    name: `Category ${index + 1}`,
  }));

  await prisma.category.createMany({ data: categories });

  // Seed Events
  const events = Array.from({ length: 30 }).map((_, index) => ({
    name: `Event ${index + 1}`,
    type: index % 2 === 0 ? 'ONLINE' : 'OFFLINE',
    locationName: `Location ${index + 1}`,
    location: `Location Address ${index + 1}`,
    startDate: new Date(`2024-12-01T0${index % 9}:00:00Z`),
    endDate: new Date(`2024-12-02T0${index % 9}:00:00Z`),
    isPaid: index % 2 === 0,
    capacity: 100 + index * 10,
    categoryId: index + 1,
    eoId: `EventOrganizerId${index + 1}`,
  }));

  await prisma.event.createMany({ data: events });

  // Seed Event Tickets
  const tickets = Array.from({ length: 30 }).map((_, index) => ({
    name: `Ticket ${index + 1}`,
    price: 50 + index * 5,
    available: 200 - index * 5,
    bookSeat: 0,
    eventId: `EventId${index + 1}`,
    startDate: new Date(`2024-12-01T0${index % 9}:00:00Z`),
    endDate: new Date(`2024-12-02T0${index % 9}:00:00Z`),
  }));

  await prisma.eventTicket.createMany({ data: tickets });

  // Seed Event Images
  const images = Array.from({ length: 30 }).map((_, index) => ({
    url: `https://example.com/image${index + 1}.jpg`,
    eventId: `EventId${index + 1}`,
  }));

  await prisma.eventImage.createMany({ data: images });

  // Seed Transactions
  const transactions = Array.from({ length: 30 }).map((_, index) => ({
    totalPrice: 100 + index * 10,
    eventId: `EventId${index + 1}`,
    userId: `UserId${index + 1}`,
  }));

  await prisma.transaction.createMany({ data: transactions });

  // Seed Transaction Details
  const transactionDetails = Array.from({ length: 30 }).map((_, index) => ({
    price: 50 + index * 5,
    qty: 1 + (index % 3),
    transactionId: `TransactionId${index + 1}`,
    ticketId: `TicketId${index + 1}`,
  }));

  await prisma.transactionDetail.createMany({ data: transactionDetails });

  // Seed Transaction Status
  const transactionStatuses = Array.from({ length: 30 }).map((_, index) => ({
    status: index % 3 === 0 ? 'WAITING_FOR_PAYMENT' : index % 3 === 1 ? 'PAID' : 'CANCELLED',
    transactionId: `TransactionId${index + 1}`,
  }));

  await prisma.transactionStatus.createMany({ data: transactionStatuses });

  // Seed Reviews
  const reviews = Array.from({ length: 30 }).map((_, index) => ({
    comments: `Great event experience ${index + 1}`,
    rating: (index % 5) + 1,
    feedback: `Feedback for event ${index + 1}`,
    userId: `UserId${index + 1}`,
    eventId: `EventId${index + 1}`,
  }));

  await prisma.review.createMany({ data: reviews });
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });