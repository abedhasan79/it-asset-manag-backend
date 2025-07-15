require('dotenv').config();
const mongoose = require('mongoose');

const User = require('../models/User');
const Clinic = require('../models/Clinic');
const Asset = require('../models/Asset');
const License = require('../models/License');
const Ticket = require('../models/Ticket');

const bcrypt = require('bcryptjs');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/it-db';

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    // Clear collections
    await User.deleteMany({});
    await Clinic.deleteMany({});
    await Asset.deleteMany({});
    await License.deleteMany({});
    await Ticket.deleteMany({});

    console.log('Cleared existing data');

    // Create a clinic
    const clinic = new Clinic({
      name: 'Test Clinic',
      address: '123 Main St, Test City',
    });
    await clinic.save();

    // Create a user
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = new User({
      name: 'Admin User',
      email: 'admin@test.com',
      password: hashedPassword,
      clinicId: clinic._id,
    });
    await user.save();

    // Create some assets
    const assets = [
      {
        clinicId: clinic._id,
        name: 'Laptop Dell XPS',
        type: 'Laptop',
        serialNumber: 'DXPS123456',
        location: 'Room 101',
        purchaseDate: new Date('2021-05-01'),
        warrantyExpiry: new Date('2023-05-01'),
        notes: 'Used by receptionist',
      },
      {
        clinicId: clinic._id,
        name: 'HP Laser Printer',
        type: 'Printer',
        serialNumber: 'HPLP987654',
        location: 'Room 102',
        purchaseDate: new Date('2020-08-15'),
        warrantyExpiry: new Date('2022-08-15'),
        notes: '',
      },
    ];
    await Asset.insertMany(assets);

    // Create some licenses
    const licenses = [
      {
        clinicId: clinic._id,
        softwareName: 'Microsoft Office 365',
        licenseKey: 'XXXX-XXXX-XXXX-XXXX',
        purchaseDate: new Date('2022-01-01'),
        renewalDate: new Date('2023-01-01'),
        notes: '',
      },
      {
        clinicId: clinic._id,
        softwareName: 'Adobe Photoshop',
        licenseKey: 'YYYY-YYYY-YYYY-YYYY',
        purchaseDate: new Date('2022-06-01'),
        renewalDate: new Date('2023-06-01'),
        notes: '',
      },
    ];
    await License.insertMany(licenses);

    // Create some tickets
    const tickets = [
      {
        clinicId: clinic._id,
        title: 'Wi-Fi not working in room 101',
        description: 'Patient unable to connect to Wi-Fi.',
        status: 'open',
        priority: 'high',
      },
      {
        clinicId: clinic._id,
        title: 'Printer paper jam',
        description: 'Paper jam in HP Laser Printer.',
        status: 'in-progress',
        priority: 'medium',
      },
    ];
    await Ticket.insertMany(tickets);

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

seed();