require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Room = require('./models/Room');
const Booking = require('./models/Booking');

const rooms = [
  { number: '101', type: 'Single', price: 1800, capacity: 1, amenities: ['WiFi', 'AC', 'TV'], description: 'Compact room for solo travellers.' },
  { number: '102', type: 'Single', price: 1900, capacity: 1, amenities: ['WiFi', 'AC', 'Work desk'], description: 'Quiet single with a work desk.' },
  { number: '201', type: 'Double', price: 3200, capacity: 2, amenities: ['WiFi', 'AC', 'TV', 'Mini fridge'], description: 'Queen bed, ideal for couples.' },
  { number: '202', type: 'Double', price: 3400, capacity: 3, amenities: ['WiFi', 'AC', 'TV', 'Balcony'], description: 'Double room with balcony.' },
  { number: '301', type: 'Deluxe', price: 4800, capacity: 3, amenities: ['WiFi', 'AC', 'Smart TV', 'Bathtub', 'Breakfast'], description: 'Spacious room with bathtub and breakfast.' },
  { number: '401', type: 'Suite', price: 8500, capacity: 4, amenities: ['WiFi', 'AC', 'Smart TV', 'Living area', 'Breakfast', 'Airport pickup'], description: 'Two-room suite with a living area.' },
];

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Promise.all([User.deleteMany(), Room.deleteMany(), Booking.deleteMany()]);
  await User.create([
    { name: 'Admin', email: 'admin@hotelpro.com', password: 'admin123', role: 'admin' },
    { name: 'Front Desk', email: 'staff@hotelpro.com', password: 'staff123', role: 'staff' },
    { name: 'Demo Guest', email: 'guest@hotelpro.com', password: 'guest123', role: 'guest' },
  ]);
  await Room.insertMany(rooms);
  console.log('Seeded. Admin: admin@hotelpro.com / admin123 | Guest: guest@hotelpro.com / guest123');
  process.exit(0);
})();
