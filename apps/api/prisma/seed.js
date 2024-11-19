// prisma/seed.ts
const { PrismaClient, Gender, EventType, Status } = require('@prisma/client');
const bcrypt = require('bcrypt')
const { v4 } = require('uuid')

const hashPassword = async(password) => {
  const saltRound = 10
  return await bcrypt.hash(password, saltRound)
}

const prisma = new PrismaClient();

const dataEvent = [
  {
    name: 'Rock Concert',
      type: EventType.OFFLINE,
      locationName: 'Stadium A',
      location: '123 Stadium St, City, USA',
      startDate: new Date('2024-12-01T18:00:00.000Z'),
      endDate: new Date('2024-12-01T22:00:00.000Z'),
      capacity: 1000,
      categoryId: 1,
      eoId: 'cm3fbchsr0002mh0zg4zewila',
    },
    {
      name: 'FIBA ASIA CUP 2025 QUALIFIER - INA VS THA',
      type: EventType.OFFLINE,
      locationName: 'INDONESIA ARENA',
      location: 'INDONESIA ARENA, DKI Jakarta',
      startDate: new Date('2024-11-24T17:00:00.000Z'),
      endDate: new Date('2024-11-24T22:00:00.000Z'),
      capacity: 100,
      categoryId: 3,
      eoId: 'cm3fbchsr0002mh0zg4zewila',
    },
    {
      name: 'Indonesia Blockchain Week 2024',
      type: EventType.OFFLINE,
      locationName: 'The Ritz-Carlton',
      location: 'The Ritz-Carlton Jakarta Pacific Place, Jakarta',
      startDate: new Date('2024-11-19T09:00:00.000Z'),
      endDate: new Date('2024-11-19T22:00:00.000Z'),
      capacity: 100,
      categoryId: 4,
      eoId: 'cm3fbchsr0002mh0zg4zewila',
    },
    {
      name: 'Djakarta Warehouse Project 2024',
      type: EventType.OFFLINE,
      locationName: 'JIEXPO Kemayoran',
      location: 'JIEXPO Kemayoran, DKI Jakarta',
      startDate: new Date('2024-12-13T17:00:00.000Z'),
      endDate: new Date('2024-12-16T03:00:00.000Z'),
      capacity: 9000,
      categoryId: 1,
      eoId: 'cm3fbchsr0002mh0zg4zewila',
    },
    {
      name: 'Festa Djagad : The Jansen Intimate Show',
      type: EventType.OFFLINE,
      locationName: 'PORT 99',
      location: 'PORT 99 Pontianak, Kalimantan Barat',
      startDate: new Date('2024-11-15T19:00:00.000Z'),
      endDate: new Date('2024-11-15T22:00:00.000Z'),
      capacity: 100,
      categoryId: 1,
      eoId: 'cm3fbchsr0002mh0zg4zewila',
    },
    {
      name: 'Konser 13 Tahun NDX AKA - Palembang',
      type: EventType.OFFLINE,
      locationName: 'JAKABARING SPORTS CITY',
      location: 'JAKABARING SPORTS CITY, Sumatera Selatan',
      startDate: new Date('2024-11-15T15:00:00.000Z'),
      endDate: new Date('2024-11-15T23:00:00.000Z'),
      capacity: 100,
      categoryId: 1,
      eoId: 'cm3fbchsr0002mh0zg4zewila',
    },
    {
      name: 'Imagine A Dragon',
      type: EventType.ONLINE,
      locationName: 'SPH Kemang Village',
      location: 'SPH Kemang Village, Jakarta Selatan',
      startDate: new Date('2024-12-15T17:00:00.000Z'),
      endDate: new Date('2024-12-16T19:00:00.000Z'),
      capacity: 100,
      categoryId: 1,
      eoId: 'cm3fbchsr0002mh0zg4zewila',
    },
    {
      name: 'Planetboom Indonesia Tour 2024-Solo',
      type: EventType.OFFLINE,
      locationName: 'Keluarga Solo Widuran',
      location: 'Keluarga Solo Widuran, Jawa Timur',
      startDate: new Date('2024-11-16T18:00:00.000Z'),
      endDate: new Date('2024-11-16T21:00:00.000Z'),
      capacity: 100,
      categoryId: 1,
      eoId: 'cm3fbchsr0002mh0zg4zewila',
    },
    {
      name: 'PEE WEE GASKINS - IN YOUR FACE',
      type: EventType.OFFLINE,
      locationName: 'KRAPELA',
      location: 'KRAPELA, DKI Jakarta',
      startDate: new Date('2024-11-20T20:00:00.000Z'),
      endDate: new Date('2024-11-20T23:00:00.000Z'),
      capacity: 100,
      categoryId: 1,
      eoId: 'cm3fbchsr0002mh0zg4zewila',
    },
    {
      name: 'LOUD KRAP365: BARASUARA & THE COTTONS',
      type: EventType.OFFLINE,
      locationName: 'KRAPELA',
      location: 'KRAPELA, DKI Jakarta',
      startDate: new Date('2024-11-27T20:00:00.000Z'),
      endDate: new Date('2024-11-27T23:45:00.000Z'),
      capacity: 100,
      categoryId: 1,
      eoId: 'cm3fbchsr0002mh0zg4zewila',
    },

    // EO2

    {
      name: 'Gamers to Gamers (G2G) Festival & TLGA 2024',
      type: EventType.OFFLINE,
      locationName: 'New Luxus Grand Ballroom',
      location: 'New Luxus Grand Ballroom, DKI Jakarta',
      startDate: new Date('2024-11-23T10:00:00.000Z'),
      endDate: new Date('2024-11-24T21:00:00.000Z'),
      capacity: 100,
      categoryId: 3,
      eoId: 'cm3fbchsu0003mh0zkltm4zn5',
    },
    {
      name: 'Marathon 10 KM',
      type: EventType.OFFLINE,
      locationName: 'Gelora Bung Karno',
      location: 'Gelora Bung Karno, DKI Jakarta',
      startDate: new Date('2024-11-16T10:00:00.000Z'),
      endDate: new Date('2024-11-16T13:00:00.000Z'),
      capacity: 100,
      categoryId: 3,
      eoId: 'cm3fbchsu0003mh0zkltm4zn5',
    },
    {
      name: 'Junior Coder Olympiad',
      type: EventType.ONLINE,
      locationName: 'Event Online',
      location: '',
      startDate: new Date('2024-12-28T07:00:00.000Z'),
      endDate: new Date('2024-12-29T16:00:00.000Z'),
      capacity: 100,
      categoryId: 3,
      eoId: 'cm3fbchsu0003mh0zkltm4zn5',
    },
    {
      name: 'YOUTH SKATE COMPETITION 2024',
      type: EventType.OFFLINE,
      locationName: 'Elbricks Skatepark',
      location: 'Elbricks Skatepark, DKI Jakarta',
      startDate: new Date('2024-11-30T08:00:00.000Z'),
      endDate: new Date('2024-11-30T18:00:00.000Z'),
      capacity: 50,
      categoryId: 3,
      eoId: 'cm3fbchsu0003mh0zkltm4zn5',
    },
    {
      name: 'Sengkuni 6',
      type: EventType.OFFLINE,
      locationName: 'Fakultas Bahasa dan Seni, Universitas Negeri Surabaya',
      location: 'Gedung T3, Fakultas Bahasa dan Seni (FBS), Universitas Negeri Surabaya (Unesa) Kampus 2 Lidah Wetan, Surabaya',
      startDate: new Date('2024-11-30T08:00:00.000Z'),
      endDate: new Date('2024-11-30T08:00:00.000Z'),
      capacity: 100,
      categoryId: 2,
      eoId: 'cm3fbchsu0003mh0zkltm4zn5',
    },
    {
      name: 'SERLOK 2.0',
      type: EventType.OFFLINE,
      locationName: 'DIMIGO',
      location: 'DIMIGO, Sumatera Utara',
      startDate: new Date('2024-12-07T12:00:00.000Z'),
      endDate: new Date('2024-12-07T22:00:00.000Z'),
      capacity: 100,
      categoryId: 2,
      eoId: 'cm3fbchsu0003mh0zkltm4zn5',
    },
    {
      name: 'NO INSTANT NOODLE TODAY',
      type: EventType.OFFLINE,
      locationName: 'UYCC ART GALLERY',
      location: 'UYCC ART GALLERY, Jawa Timur',
      startDate: new Date('2024-11-07T12:00:00.000Z'),
      endDate: new Date('2025-01-30T20:00:00.000Z'),
      capacity: 1000,
      categoryId: 2,
      eoId: 'cm3fbchsu0003mh0zkltm4zn5',
    },
    {
      name: 'INTERNATIONAL AUTOMODIFIED (IAM)',
      type: EventType.OFFLINE,
      locationName: 'Jakarta Convention Center',
      location: 'Jakarta Convention Center, DKI Jakarta',
      startDate: new Date('2024-12-14T10:00:00.000Z'),
      endDate: new Date('2024-12-15T22:00:00.000Z'),
      capacity: 100,
      categoryId: 2,
      eoId: 'cm3fbchsu0003mh0zkltm4zn5',
    },
    {
      name: 'Indonesia Software Developer Conference 2024',
      type: EventType.OFFLINE,
      locationName: 'GetCourse Hall',
      location: 'GetCourse Hall, DKI Jakarta',
      startDate: new Date('2024-11-16T09:00:00.000Z'),
      endDate: new Date('2024-11-17T17:00:00.000Z'),
      capacity: 100,
      categoryId: 4,
      eoId: 'cm3fbchsu0003mh0zkltm4zn5',
    },
    {
      name: 'MARKPLUS CONFERENCE 2025',
      type: EventType.OFFLINE,
      locationName: 'Glass House, The Ritz-Carlton',
      location: 'Glass House, The Ritz-Carlton, DKI Jakarta',
      startDate: new Date('2024-11-04T09:30:00.000Z'),
      endDate: new Date('2024-11-05T21:30:00.000Z'),
      capacity: 200,
      categoryId: 4,
      eoId: 'cm3fbchsu0003mh0zkltm4zn5',
    },

    //EO 3
    {
      name: 'VolunTree by BumiBaik',
      type: EventType.OFFLINE,
      locationName: 'Desa Sumberejo',
      location: 'Desa Sumberejo, Gunung Banyak, Jawa Tengah',
      startDate: new Date('2024-11-24T08:00:00.000Z'),
      endDate: new Date('2024-11-24T15:30:00.000Z'),
      capacity: 50,
      categoryId: 5,
      eoId: 'cm3fbchsu0006mh0zkltm4zn5',
    },
    {
      name: 'Gesit Ulin Keliling Jogjakarta',
      type: EventType.OFFLINE,
      locationName: 'PO City Trans Utama',
      location: 'PO City Trans Utama, Bandung',
      startDate: new Date('2025-02-13T15:30:00.000Z'),
      endDate: new Date('2025-02-15T02:00:00.000Z'),
      capacity: 50,
      categoryId: 5,
      eoId: 'cm3fbchsu0006mh0zkltm4zn5',
    },
    {
      name: 'Imagination Unleashed: A Weeklong Educational Odyssey',
      type: EventType.OFFLINE,
      locationName: 'Noble Academy',
      location: 'Noble Academy, DKI Jakarta',
      startDate: new Date('2024-12-16T07:00:00.000Z'),
      endDate: new Date('2024-12-20T16:00:00.000Z'),
      capacity: 100,
      categoryId: 5,
      eoId: 'cm3fbchsu0006mh0zkltm4zn5',
    },
    {
      name: 'Menyapa Keraton',
      type: EventType.OFFLINE,
      locationName: 'Keraton Kasepuhan',
      location: 'Keraton Kasepuhan, Jawa Barat',
      startDate: new Date('2024-08-27T10:00:00.000Z'),
      endDate: new Date('2024-12-31T17:00:00.000Z'),
      capacity: 1,
      categoryId: 5,
      eoId: 'cm3fbchsu0006mh0zkltm4zn5',
    },
    {
      name: 'Wisata Kampoeng Koena',
      type: EventType.OFFLINE,
      locationName: 'KAMPOENG KOENA',
      location: 'KAMPOENG KOENA, Jawa Timur',
      startDate: new Date('2024-12-30T10:00:00.000Z'),
      endDate: new Date('2028-01-01T10:00:00.000Z'),
      capacity: 1000,
      categoryId: 5,
      eoId: 'cm3fbchsu0006mh0zkltm4zn5',
    },
    {
      name: 'Jinland',
      type: EventType.OFFLINE,
      locationName: 'The Park Pejaten Mall',
      location: 'The Park Pejaten Mall, DKI Jakarta',
      startDate: new Date('2024-12-07T10:00:00.000Z'),
      endDate: new Date('2024-12-07T10:00:00.000Z'),
      capacity: 100,
      categoryId: 2,
      eoId: 'cm3fbchsu0006mh0zkltm4zn5',
    },
    {
      name: 'JBRX Sportainment',
      type: EventType.OFFLINE,
      locationName: 'DOME UMM',
      location: 'DOME UMM, Jawa Timur',
      startDate: new Date('2024-12-14T10:00:00.000Z'),
      endDate: new Date('2024-12-14T22:00:00.000Z'),
      capacity: 300,
      categoryId: 3,
      eoId: 'cm3fbchsu0006mh0zkltm4zn5',
    },
    {
      name: 'BRI Mini Soccer Clash',
      type: EventType.OFFLINE,
      locationName: 'Mahaka Square',
      location: 'Mahaka Square, DKI Jakarta',
      startDate: new Date('2024-11-24T08:00:00.000Z'),
      endDate: new Date('2024-11-24T22:00:00.000Z'),
      capacity: 100,
      categoryId: 3,
      eoId: 'cm3fbchsu0006mh0zkltm4zn5',
    },
    {
      name: 'CINTA KALA SENJA',
      type: EventType.OFFLINE,
      locationName: 'Bengkel Space',
      location: 'Bengkel Space, DKI Jakarta',
      startDate: new Date('2024-12-18T20:00:00.000Z'),
      endDate: new Date('2024-12-18T22:30:00.000Z'),
      capacity: 1000,
      categoryId: 2,
      eoId: 'cm3fbchsu0006mh0zkltm4zn5',
    },
    {
      name: 'Joyland Festival Jakarta 2024',
      type: EventType.OFFLINE,
      locationName: 'GBK Senayan',
      location: 'GBK Senayan, DKI Jakarta',
      startDate: new Date('2024-11-22T15:00:00.000Z'),
      endDate: new Date('2024-11-24T19:00:00.000Z'),
      capacity: 1000,
      categoryId: 2,
      eoId: 'cm3fbchsu0006mh0zkltm4zn5',
    },
    
  
]

const dataEo = [
  {
    id: 'cm3fbchsr0002mh0zg4zewila',
    email: 'company1@example.com',
    password:'password123',
    companyName: 'EventCorp',
    address: '123 Business Rd, City, USA',
    phoneNumber: '123-555-1234',
    profilePictureUrl: null,
    isVerified: true,
    pic: 'eventpic1.png',
    role: 'EO',
  },
  {
    id: 'cm3fbchsu0003mh0zkltm4zn5',
    email: 'company2@example.com',
    password:'password123',
    companyName: 'PartyPlanners',
    address: '456 Event Blvd, City, USA',
    phoneNumber: '123-555-5678',
    profilePictureUrl: null,
    isVerified: true,
    pic: 'eventpic2.png',
    role: 'EO',
  },
  {
    id: 'cm3fbchsu0006mh0zkltm4zn5',
    email: 'hafizganteng@gmail.com',
    password:'hafizganteng',
    companyName: 'Ganteng',
    address: 'Jln Ganteng 123',
    phoneNumber: '123-666-8888',
    profilePictureUrl: null,
    isVerified: true,
    pic: 'eventpic2.png',
    role: 'EO',
  }
]

const eventImage = [
  [
    {
      url: 'https://i0.wp.com/busestoconcerts.com/wp-content/uploads/2017/11/concert-banner.jpg?fit=2436%2C814&ssl=1',
      eventId: 'cm3mjawgx000w1062o83k1mqi'
    },
    {
      url: 'https://assets.loket.com/neo/production/images/banner/HCSYk_1731574796549508.png',
      eventId: 'cm3mjawgx000x10625rkj72ef'
    },
    {
      url: 'https://assets.loket.com/neo/production/images/banner/20240906150431_66dab78f5e1ea.jpg',
      eventId: 'cm3mjawgx000y1062eg13c8uv'
    },
    {
      url: 'https://assets.loket.com/neo/production/images/banner/K7TEz_1724747212487826.png',
      eventId: 'cm3mjawgx000z1062ld2r6pr7'
    },
    {
      url: 'https://assets.loket.com/neo/production/images/banner/20241107190029_672cabdd5e785.jpg',
      eventId: 'cm3mjawgx00101062ng7aitvp'
    },
    {
      url: 'https://assets.loket.com/neo/production/images/banner/Kkgqk_1726144786979182.jpeg',
      eventId: 'cm3mjawgx00111062a3bfu7iu'
    },
    {
      url: 'https://assets.loket.com/neo/production/images/banner/20241024161741_671a10b50929c.jpg',
      eventId: 'cm3mjawgx00121062vpb4bq6a'
    },
    {
      url: 'https://assets.loket.com/neo/production/images/banner/20241114204032_6735fdd0b89a4.jpg',
      eventId: 'cm3mjawgx001310621e2818ul'
    },
    {
      url: 'https://assets.loket.com/neo/production/images/banner/20241106175337_672b4ab18a24b.jpg',
      eventId: 'cm3mjawgx00141062etfw7o4m'
    },
    {
      url: 'https://assets.loket.com/neo/production/images/banner/20241007155148_6703a124efb7e.jpg',
      eventId: 'cm3mjawgx00151062l95rjn9b'
    },
    {
      url: 'https://assets.loket.com/neo/production/images/banner/20241031100444_6722f3cc920b9.jpg',
      eventId: 'cm3mjawgx00161062jkdlu565'
    },
    {
      url: 'https://assets.loket.com/neo/production/images/banner/20241110151622_67306bd623604.jpg',
      eventId: 'cm3mjawgx00171062381uv6xh'
    },
    {
      url: 'https://assets.loket.com/neo/production/images/banner/20241113172126_67347da6bad18.jpg',
      eventId: 'cm3mjawgx001810620svd7ltq'
    },
    {
      url: 'https://assets.loket.com/neo/production/images/banner/20241026225326_671d107629419.jpg',
      eventId: 'cm3mjawgx00191062o2t65efi'
    },
    {
      url: 'https://assets.loket.com/neo/production/images/banner/20241024205924_671a52bc68d4b.jpg',
      eventId: 'cm3mjawgx001a1062x4uqonwk'
    },
    {
      url: 'https://assets.loket.com/neo/production/images/banner/20241107104812_672c387cdb9c5.jpg',
      eventId: 'cm3mjawgx001b1062hrra67uq'
    },
    {
      url: 'https://assets.loket.com/neo/production/images/banner/20240912130049_66e2839150dce.jpg',
      eventId: 'cm3mjawgx001c1062sw1u2wmu'
    },
    {
      url: 'https://assets.loket.com/neo/production/images/banner/20241024102300_6719bd944f39c.jpg',
      eventId: 'cm3mjawgy001d10625wx6rk4t'
    },
    {
      url: 'https://assets.loket.com/neo/production/images/banner/20240919133431_66ebc5f757b51.jpg',
      eventId: 'cm3mjawgy001e1062za9xhb02'
    },
    {
      url: 'https://assets.loket.com/neo/production/images/banner/20241024102300_6719bd944f39c.jpg',
      eventId: 'cm3mjawgy001f1062p6dxd33y'
    },
    {
      url: 'https://assets.loket.com/neo/production/images/banner/20241006091527_6701f2bf28fee.jpg',
      eventId: 'cm3mjawgy001g10625jwzuzfw'
    },
    {
      url: 'https://assets.loket.com/neo/production/images/banner/20241027102433_671db27142f67.jpg',
      eventId: 'cm3mjawgy001h1062qjn8zbt2'
    },
    {
      url: 'https://assets.loket.com/neo/production/images/banner/20240912133611_66e28bdbae884.jpg',
      eventId: 'cm3mjawgy001i1062x0i6zhk9'
    },
    {
      url: 'https://assets.loket.com/neo/production/images/banner/20241005123502_6700d006ac6b7.jpg',
      eventId: 'cm3mjawgy001j106231zl47rp'
    },
    {
      url: 'https://assets.loket.com/neo/production/images/banner/20221230142038_63ae9146a9f68.jpg',
      eventId: 'cm3mjawgy001k10622i9vm1yo'
    },
    {
      url: 'https://assets.loket.com/neo/production/images/banner/20241110124826_6730492aa46be.jpg',
      eventId: 'cm3mjawgy001l1062j8nhsov3'
    },
    {
      url: 'https://assets.loket.com/neo/production/images/banner/20241017150214_6710c4866ae0f.jpg',
      eventId: 'cm3mjawgy001m1062ww214p8c'
    },
    {
      url: 'https://assets.loket.com/neo/production/images/banner/XS6XW_1730453108607371.jpeg',
      eventId: 'cm3mjawgy001n1062q2iitpx3'
    },
    {
      url: 'https://assets.loket.com/neo/production/images/banner/20241029131528_67207d8061df8.jpg',
      eventId: 'cm3mjawgy001o10628hplbyi8'
    },
    {
      url: 'https://assets.loket.com/neo/production/images/banner/20240503020209.png',
      eventId: 'cm3mjawgy001p1062w7prozwi'
    }
  ]
  
]

async function main() {
    // Create Categories
    const category1 = await prisma.category.create({
      data: { name: 'Music' },
    });
  
    const category2 = await prisma.category.create({
      data: { name: 'Exhibition' },
    });
  
    const category3 = await prisma.category.create({
      data: { name: 'Competition'},
    })
  
    const category4 = await prisma.category.create({
      data: { name: 'Conference'},
    })
  
    const category5 = await prisma.category.create({
      data: { name: 'Tour'},
    })


  dataEo.forEach(async(item, index)=>{
    const dataEo = await prisma.eventOrganizer.create({
      data: {...item, password: await hashPassword(item.password)},
    })
    // dataEvent.forEach(async(itm,idx)=>{
      //   const dataEvent = await prisma.event.create({
    //     data: {...itm}
    //   })
      // eventImage[idx].forEach(async(items)=>{
      //   await prisma.eventImage.create ({
      //     data: {...items, eventId:dataEvent?.id}
      //   })
      // })
    })
  
  // dataEvent.forEach(async(itm,idx)=>{
  //   const dataEvent = await prisma.event.create({
  //     data: {...itm}
  //   })
  // })
  // Create Users
  // const user1 = await prisma.user.create({
  //   data: {
  //     username: 'john_doe',
  //     email: 'john.doe@example.com',
  //     password: await hashPassword('password123'),
  //     referralCode: 'ref12345',
  //     isVerified: true,
  //     phoneNumber: '123-456-7890',
  //     birthDate: new Date('1990-01-01'),
  //     address: '123 Main St, Springfield, USA',
  //     gender: Gender.MALE,
  //     role: 'CUSTOMER',
  //     totalPoint: 150,
  //   },
  // });

  // const user2 = await prisma.user.create({
  //   data: {
  //     username: 'jane_doe',
  //     email: 'jane.doe@example.com',
  //     password:await hashPassword('password123'),
  //     referralCode: 'ref12346',
  //     isVerified: true,
  //     phoneNumber: '987-654-3210',
  //     birthDate: new Date('1992-05-14'),
  //     address: '456 Elm St, Springfield, USA',
  //     gender: Gender.FEMALE,
  //     role: 'CUSTOMER',
  //     totalPoint: 200,
  //   },
  // });

  const userPromises = [];
  const usersData = [
    { username: 'john_doe', email: 'john.doe@example.com', phone: '081234567890', address: 'Jl. Merdeka 1, Jakarta', gender: 'MALE' },
    { username: 'jane_smith', email: 'jane.smith@example.com', phone: '081234567891', address: 'Jl. Merdeka 2, Jakarta', gender: 'FEMALE' },
    { username: 'alice_wonder', email: 'alice.wonder@example.com', phone: '081234567892', address: 'Jl. Merdeka 3, Jakarta', gender: 'FEMALE' },
    { username: 'bob_builder', email: 'bob.builder@example.com', phone: '081234567893', address: 'Jl. Merdeka 4, Jakarta', gender: 'MALE' },
    { username: 'charlie_brown', email: 'charlie.brown@example.com', phone: '081234567894', address: 'Jl. Merdeka 5, Jakarta', gender: 'MALE' },
    { username: 'david_williams', email: 'david.williams@example.com', phone: '081234567895', address: 'Jl. Merdeka 6, Jakarta', gender: 'MALE' },
    { username: 'emily_clark', email: 'emily.clark@example.com', phone: '081234567896', address: 'Jl. Merdeka 7, Jakarta', gender: 'FEMALE' },
    { username: 'frank_miller', email: 'frank.miller@example.com', phone: '081234567897', address: 'Jl. Merdeka 8, Jakarta', gender: 'MALE' },
    { username: 'george_white', email: 'george.white@example.com', phone: '081234567898', address: 'Jl. Merdeka 9, Jakarta', gender: 'MALE' },
    { username: 'hannah_green', email: 'hannah.green@example.com', phone: '081234567899', address: 'Jl. Merdeka 10, Jakarta', gender: 'FEMALE' },
    { username: 'ian_black', email: 'ian.black@example.com', phone: '081234567800', address: 'Jl. Merdeka 11, Jakarta', gender: 'MALE' },
    { username: 'julia_perez', email: 'julia.perez@example.com', phone: '081234567801', address: 'Jl. Merdeka 12, Jakarta', gender: 'FEMALE' },
    { username: 'kyle_jones', email: 'kyle.jones@example.com', phone: '081234567802', address: 'Jl. Merdeka 13, Jakarta', gender: 'MALE' },
    { username: 'lily_king', email: 'lily.king@example.com', phone: '081234567803', address: 'Jl. Merdeka 14, Jakarta', gender: 'FEMALE' },
    { username: 'michael_smith', email: 'michael.smith@example.com', phone: '081234567804', address: 'Jl. Merdeka 15, Jakarta', gender: 'MALE' },
    { username: 'nina_lee', email: 'nina.lee@example.com', phone: '081234567805', address: 'Jl. Merdeka 16, Jakarta', gender: 'FEMALE' },
    { username: 'oliver_wang', email: 'oliver.wang@example.com', phone: '081234567806', address: 'Jl. Merdeka 17, Jakarta', gender: 'MALE' },
    { username: 'paula_morris', email: 'paula.morris@example.com', phone: '081234567807', address: 'Jl. Merdeka 18, Jakarta', gender: 'FEMALE' },
    { username: 'quinn_lee', email: 'quinn.lee@example.com', phone: '081234567808', address: 'Jl. Merdeka 19, Jakarta', gender: 'MALE' },
    { username: 'rachel_white', email: 'rachel.white@example.com', phone: '081234567809', address: 'Jl. Merdeka 20, Jakarta', gender: 'FEMALE' },
    { username: 'steve_harris', email: 'steve.harris@example.com', phone: '081234567810', address: 'Jl. Merdeka 21, Jakarta', gender: 'MALE' },
    { username: 'tina_woods', email: 'tina.woods@example.com', phone: '081234567811', address: 'Jl. Merdeka 22, Jakarta', gender: 'FEMALE' },
    { username: 'ursula_ford', email: 'ursula.ford@example.com', phone: '081234567812', address: 'Jl. Merdeka 23, Jakarta', gender: 'FEMALE' },
    { username: 'vicky_miller', email: 'vicky.miller@example.com', phone: '081234567813', address: 'Jl. Merdeka 24, Jakarta', gender: 'FEMALE' },
    { username: 'william_brown', email: 'william.brown@example.com', phone: '081234567814', address: 'Jl. Merdeka 25, Jakarta', gender: 'MALE' },
    { username: 'xander_garcia', email: 'xander.garcia@example.com', phone: '081234567815', address: 'Jl. Merdeka 26, Jakarta', gender: 'MALE' },
    { username: 'yasmine_martinez', email: 'yasmine.martinez@example.com', phone: '081234567816', address: 'Jl. Merdeka 27, Jakarta', gender: 'FEMALE' },
    { username: 'zachary_jackson', email: 'zachary.jackson@example.com', phone: '081234567817', address: 'Jl. Merdeka 28, Jakarta', gender: 'MALE' },
    { username: 'andrew_harris', email: 'andrew.harris@example.com', phone: '081234567818', address: 'Jl. Merdeka 29, Jakarta', gender: 'MALE' },
    { username: 'brenda_evans', email: 'brenda.evans@example.com', phone: '081234567819', address: 'Jl. Merdeka 30, Jakarta', gender: 'FEMALE' },
    { username: 'cameron_james', email: 'cameron.james@example.com', phone: '081234567820', address: 'Jl. Merdeka 31, Jakarta', gender: 'MALE' },
    { username: 'danielle_clark', email: 'danielle.clark@example.com', phone: '081234567821', address: 'Jl. Merdeka 32, Jakarta', gender: 'FEMALE' },
  ];

  // Membuat pengguna dengan data di atas
  for (let userData of usersData) {
    const { username, email, phone, address, gender } = userData;
    const referralCode = `${v4().split(0,8)}`;

    userPromises.push(
      prisma.user.create({
        data: {
          username,
          email,
          password: await hashPassword('password123'), // Gunakan password yang aman dalam aplikasi nyata
          referralCode,
          isVerified: true,
          profilePictureUrl: null,
          phoneNumber: phone,// Misalnya, tanggal lahir default
          address,
          gender,
          role: 'CUSTOMER', // Mengatur role sebagai 'CUSTOMER'
          totalPoint: 0,
          isGoogleRegistered: false,
          countResetPass: 0,
        },
      })
    );
  }

  // Tunggu hingga semua pengguna selesai dibuat
  const users = await Promise.all(userPromises);


  // // Create Event Organizers
  // const eo1 = await prisma.eventOrganizer.create({
  //   data: {
  //     email: 'company1@example.com',
  //     password:'password123',
  //     companyName: 'EventCorp',
  //     address: '123 Business Rd, City, USA',
  //     phoneNumber: '123-555-1234',
  //     pic: 'eventpic1.png',
  //     role: 'EO',
  //   },
  // });

  // const eo2 = await prisma.eventOrganizer.create({
  //   data: {
  //     email: 'company2@example.com',
  //     password:'password123',
  //     companyName: 'PartyPlanners',
  //     address: '456 Event Blvd, City, USA',
  //     phoneNumber: '123-555-5678',
  //     pic: 'eventpic2.png',
  //     role: 'EO',
  //   },
  // });



  const createEvent = await prisma.event.createMany({
    data: dataEvent
  })

  const events = await prisma.event.findMany()
  // Create Events

  
  for (let i = 0; i < events.length; i++) {
    // Membuat tiket
    await prisma.eventTicket.create({
      data: {
        name: `Regular Ticket - ${events[i].name}`,
        price: 150000, // Harga tiket (misalnya 100000)
        available: 1000, // Kapasitas tersedia
        bookSeat: 0, // Jumlah tempat yang sudah dibooking (dimulai dari 0)
        totalSeat: 1000, // Jumlah total tempat yang tersedia
        discount: 0, // Tidak ada diskon pada awalnya
        startDate: events[i].startDate,
        endDate: events[i].endDate,
        eventId: events[i].id, // Menghubungkan tiket dengan event
      },
    });
  }
  // Create Tickets for Events
  const ticket1 = await prisma.eventTicket.create({
    data: {
      name: 'General Admission',
      price: 50,
      available: 500,
      bookSeat: 0,
      totalSeat: 500,
      startDate: new Date('2024-12-01T00:00:00.000Z'),
      endDate: new Date('2024-12-01T23:59:59'),
      eventId: events[0].id
    },
  });

  const ticket2 = await prisma.eventTicket.create({
    data: {
      name: 'VIP Admission',
      price: 150,
      available: 100,
      bookSeat: 0,
      totalSeat: 100,
      startDate: new Date('2024-12-01T00:00:00.000Z'),
      endDate: new Date('2024-12-01T23:59:59'),
      eventId: events[0].id,
    },
  });

  // Create Referral Points
  // await prisma.referralPoint.create({
  //   data: {
  //     point: 100,
  //     expiry: new Date('2025-12-31'),
  //     userId: user1.id,
  //   },
  // });

  // await prisma.referralPoint.create({
  //   data: {
  //     point: 50,
  //     expiry: new Date('2025-12-31'),
  //     userId: user2.id,
  //   },
  // });

  // Create Referral Discounts
  // await prisma.referralDiscount.create({
  //   data: {
  //     percentDiscount: 10,
  //     expiry: new Date('2024-12-31'),
  //     userId: user1.id,
  //   },
  // });

  // await prisma.referralDiscount.create({
  //   data: {
  //     percentDiscount: 5,
  //     expiry: new Date('2024-12-31'),
  //     userId: user2.id,
  //   },
  // });

  const tickets = await prisma.eventTicket.findMany({
    take: 25, // Ambil 10 tiket event untuk digunakan dalam transaksi
  });

  const getUsers = await prisma.user.findMany({})

  // Total jumlah TransactionDetails yang ingin dibuat

  // Hitung berapa banyak transaksi yang diperlukan untuk mencapai 200 transaction details
  const numTransactions = 500; // Misalnya, setiap transaksi memiliki 10 detail tiket

  // Loop untuk membuat transaksi
  for (let i = 0; i < numTransactions; i++) {
    // Ambil beberapa tiket acak dari daftar tiket yang sudah ada
    const selectedTickets = [];
    // const numberOfTickets = Math.floor((Math.random() * tickets.length)) + 1; // Tentukan berapa banyak tiket yang ingin dimasukkan dalam satu transaksi
    const randomTicket = tickets[Math.floor(Math.random() * tickets.length)];

    // Pilih tiket secara acak
    selectedTickets.push(randomTicket);

    // Buat transaksi baru
    const transaction = await prisma.transaction.create({
      data: {
        totalPrice: 0, // Harga total sementara, akan diupdate nanti
        status: 'PAID', // Status transaksi, dapat disesuaikan
        userId: getUsers[Math.floor(Math.random() * 25) + 1].id, // User ID bisa disesuaikan, misal mengambil ID user dari database
        createdAt: randomTicket.startDate,
        details: {
          create: selectedTickets.map(ticket => ({
            price: ticket.price,
            qty: Math.floor(Math.random() * 7) + 1, // Jumlah tiket yang dibeli per transaksi (1-3 tiket)
            ticketId: ticket.id,
            createdAt: ticket.startDate
          })),
        },
      },
      include: {
        details: true
      }
    });

    // Hitung dan update totalPrice berdasarkan detail transaksi
    const updatedTransaction = await prisma.transaction.update({
      where: { id: transaction.id },
      data: {
        totalPrice: transaction.details.reduce(
          (total, detail) => total + detail.price * detail.qty,
          0
        ),
      },
    });

    // console.log(`Transaction with ID ${updatedTransaction.id} has been created and updated!`);
  }


  // Create Transactions
  // const transaction1 = await prisma.transaction.create({
  //   data: {
  //     totalPrice: 20000,
  //     status: Status.PAID,
  //     userId: user1.id,
  //     details: {
  //       create: [
  //         {
  //           price: 50,
  //           qty: 2,
  //           ticketId: ticket1.id,
  //         },
  //       ],
  //     },
  //   },
  // });

  // const transaction2 = await prisma.transaction.create({
  //   data: {
  //     totalPrice: 150000,
  //     status: Status.PAID,
  //     userId: user2.id,
  //     details: {
  //       create: [
  //         {
  //           price: 150,
  //           qty: 1,
  //           ticketId: ticket2.id,
  //         },
  //       ],
  //     },
  //   },
  // });

  // // Create Reviews for Events
  // await prisma.review.create({
  //   data: {
  //     rating: 5,
  //     feedback: 'Amazing concert! Highly recommend.',
  //     userId: user1.id,
  //     eventId: events[0].id,
  //   },
  // });

  // await prisma.review.create({
  //   data: {
  //     rating: 4,
  //     feedback: 'Great exhibition, but could have been more interactive.',
  //     userId: user2.id,
  //     eventId: events[1].id,
  //   },
  // });

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
