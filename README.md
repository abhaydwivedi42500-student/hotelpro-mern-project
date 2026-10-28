# HotelPro – Hotel Management System (MERN)

A full-stack hotel management platform: guests search live room availability, book and pay; staff handle check-in / check-out; admins manage rooms and see revenue and occupancy.

## Tech stack
- **Frontend:** React (JSX), React Router, Bootstrap 5, CSS, Axios, Vite
- **Backend:** Node.js, Express.js, MongoDB + Mongoose
- **Auth & security:** JWT, bcrypt password hashing, role-based access (guest / staff / admin), Helmet, CORS, rate limiting
- Async/await throughout, central error handler

## Features
- Register / login with JWT, session restored on refresh
- Room search by dates, guests and type, with real-time availability (overlap-checked, so double booking is blocked)
- Booking flow with automatic night count and total price
- Simulated payment with transaction id (drop-in point for Stripe / Razorpay)
- Guest: view bookings, pay, cancel
- Staff: check-in / check-out with enforced state transitions
- Admin: room CRUD, occupancy %, arrivals/departures today, revenue

## Run locally
Requirements: Node 18+, MongoDB running locally (or an Atlas URI).

```bash
# 1. API
cd server
cp .env.example .env      # set JWT_SECRET and MONGO_URI
npm install
npm run seed              # demo users and rooms
npm run dev               # http://localhost:5000

# 2. Client (new terminal)
cd client
npm install
npm run dev               # http://localhost:5173
```

Demo logins: `admin@hotelpro.com / admin123`, `staff@hotelpro.com / staff123`, `guest@hotelpro.com / guest123`

## API overview
| Method | Route | Access |
|---|---|---|
| POST | /api/auth/register, /api/auth/login | public |
| GET | /api/auth/me | logged in |
| GET | /api/rooms?checkIn&checkOut&guests&type | public |
| POST/PUT/DELETE | /api/rooms | admin |
| POST | /api/bookings | logged in |
| GET | /api/bookings/my | logged in |
| POST | /api/bookings/:id/pay | owner |
| PUT | /api/bookings/:id/cancel | owner / staff |
| GET | /api/bookings, /api/bookings/stats/summary | staff, admin |
| PUT | /api/bookings/:id/status | staff, admin |
