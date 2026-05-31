const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const dataPath = path.join(__dirname, 'data.json');
const publicPath = path.join(__dirname, '..', 'public');

app.use(cors());
app.use(express.json());
app.use(express.static(publicPath));

// 📝 Request Logging Middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// ✅ Validation Helper
function validateRoomId(roomId) {
  const num = Number(roomId);
  return !isNaN(num) && num >= 1 && num <= 5;
}

function validateStars(stars) {
  const num = Number(stars);
  return !isNaN(num) && num >= 1 && num <= 5;
}

function validateDateRange(checkinStr, checkoutStr) {
  const checkin = new Date(checkinStr);
  const checkout = new Date(checkoutStr);
  return checkin instanceof Date && checkout instanceof Date && checkout > checkin;
}

async function readData() {
  const json = await fs.readFile(dataPath, 'utf8');
  return JSON.parse(json);
}

async function writeData(data) {
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf8');
}

app.get('/api/v1/rooms', async (req, res) => {
  const data = await readData();
  res.json(data.rooms);
});

app.get('/api/v1/reviews', async (req, res) => {
  const data = await readData();
  res.json(data.reviews);
});

app.get('/api/v1/staff', async (req, res) => {
  const data = await readData();
  res.json(data.staff);
});

app.post('/api/v1/reviews', async (req, res) => {
  const { stars, title, message, author } = req.body;
  if (!stars || !title || !message || !author) {
    return res.status(400).json({ error: 'All review fields are required.' });
  }
  if (!validateStars(stars)) {
    return res.status(400).json({ error: 'Stars must be between 1 and 5.' });
  }

  const data = await readData();
  const nextId = data.reviews.length ? Math.max(...data.reviews.map((item) => item.id)) + 1 : 1;
  const review = { id: nextId, stars, title, message, author, createdAt: new Date().toISOString() };
  data.reviews.push(review);
  await writeData(data);
  res.status(201).json(review);
});

app.post('/api/v1/staff', async (req, res) => {
  const { name, role, status } = req.body;
  if (!name || !role) {
    return res.status(400).json({ error: 'Staff name and role are required.' });
  }

  const data = await readData();
  const nextId = data.staff.length ? Math.max(...data.staff.map((item) => item.id)) + 1 : 1;
  const staff = { id: nextId, name, role, status: status || 'Available' };
  data.staff.push(staff);
  await writeData(data);
  res.status(201).json(staff);
});

app.put('/api/v1/reviews/:id', async (req, res) => {
  const reviewId = Number(req.params.id);
  const { stars, title, message, author } = req.body;
  if (!stars || !title || !message || !author) {
    return res.status(400).json({ error: 'All review fields are required.' });
  }

  const data = await readData();
  const index = data.reviews.findIndex((item) => item.id === reviewId);
  if (index === -1) {
    return res.status(404).json({ error: 'Review not found.' });
  }

  const existing = data.reviews[index];
  data.reviews[index] = { id: reviewId, stars, title, message, author, createdAt: existing.createdAt || new Date().toISOString() };
  await writeData(data);
  res.json(data.reviews[index]);
});

app.delete('/api/v1/reviews/:id', async (req, res) => {
  const reviewId = Number(req.params.id);
  const data = await readData();
  const index = data.reviews.findIndex((item) => item.id === reviewId);
  if (index === -1) {
    return res.status(404).json({ error: 'Review not found.' });
  }

  const removed = data.reviews.splice(index, 1)[0];
  await writeData(data);
  res.json(removed);
});

app.put('/api/v1/staff/:id', async (req, res) => {
  const staffId = Number(req.params.id);
  const { name, role, status } = req.body;
  if (!name || !role) {
    return res.status(400).json({ error: 'Staff name and role are required.' });
  }

  const data = await readData();
  const index = data.staff.findIndex((item) => item.id === staffId);
  if (index === -1) {
    return res.status(404).json({ error: 'Staff member not found.' });
  }

  const existing = data.staff[index];
  data.staff[index] = {
    id: staffId,
    name,
    role,
    status: status ?? existing.status ?? 'Available',
  };
  await writeData(data);
  res.json(data.staff[index]);
});

app.delete('/api/v1/staff/:id', async (req, res) => {
  const staffId = Number(req.params.id);
  const data = await readData();
  const index = data.staff.findIndex((item) => item.id === staffId);
  if (index === -1) {
    return res.status(404).json({ error: 'Staff member not found.' });
  }

  const removed = data.staff.splice(index, 1)[0];
  await writeData(data);
  res.json(removed);
});

app.get('/api/v1/services', async (req, res) => {
  const data = await readData();
  res.json(data.services || []);
});

app.post('/api/v1/services', async (req, res) => {
  const { name, description, category } = req.body;
  if (!name || !description) {
    return res.status(400).json({ error: 'Service name and description are required.' });
  }

  const data = await readData();
  const nextId = data.services && data.services.length ? Math.max(...data.services.map((item) => item.id)) + 1 : 1;
  const service = { id: nextId, name, description, category: category || 'General' };
  data.services = data.services || [];
  data.services.push(service);
  await writeData(data);
  res.status(201).json(service);
});

app.put('/api/v1/services/:id', async (req, res) => {
  const serviceId = Number(req.params.id);
  const { name, description, category } = req.body;
  if (!name || !description) {
    return res.status(400).json({ error: 'Service name and description are required.' });
  }

  const data = await readData();
  const index = data.services.findIndex((item) => item.id === serviceId);
  if (index === -1) {
    return res.status(404).json({ error: 'Service not found.' });
  }

  const existing = data.services[index];
  data.services[index] = {
    id: serviceId,
    name,
    description,
    category: category || existing.category || 'General',
  };
  await writeData(data);
  res.json(data.services[index]);
});

app.delete('/api/v1/services/:id', async (req, res) => {
  const serviceId = Number(req.params.id);
  const data = await readData();
  const index = data.services.findIndex((item) => item.id === serviceId);
  if (index === -1) {
    return res.status(404).json({ error: 'Service not found.' });
  }

  const removed = data.services.splice(index, 1)[0];
  await writeData(data);
  res.json(removed);
});

app.post('/api/v1/availability', async (req, res) => {
  const { checkin, checkout, guests, roomId, roomType } = req.body;
  if (!checkin || !checkout || !guests || !roomId || !roomType) {
    return res.status(400).json({ error: 'Check-in, check-out, guests, room ID, and room type are required.' });
  }

  if (!validateRoomId(roomId)) {
    return res.status(400).json({ error: 'Room ID must be a number between 1 and 5.' });
  }

  if (!validateDateRange(checkin, checkout)) {
    return res.status(400).json({ error: 'Check-out date must be after check-in date.' });
  }

  const nights = Math.round((new Date(checkout) - new Date(checkin)) / (1000 * 60 * 60 * 24));
  const data = await readData();
  const room = data.rooms.find((item) => item.slug === roomType);
  if (!room) {
    return res.status(400).json({ error: 'Unknown room type.' });
  }

  const availability = Math.random() > 0.2;
  const totalCost = room.price * nights;
  res.json({
    available: availability,
    nights,
    totalCost,
    roomId: Number(roomId),
    roomName: room.title,
    roomType: room.slug,
    guests,
    checkin,
    checkout,
    message: availability
      ? `${room.title} is available for ${nights} night(s). Total estimate: $${totalCost}.`
      : `${room.title} is not available for those dates. Please try a different room or date range.`,
  });
});

app.get('/api/v1/bookings', async (req, res) => {
  const data = await readData();
  res.json(data.bookings);
});

app.post('/api/v1/bookings', async (req, res) => {
  const { roomName, roomType, roomId, guestName, guestId, checkin, checkout, guests, nights, totalCost } = req.body;
  if (!roomName || !roomType || !checkin || !checkout || !guests || !nights || !totalCost) {
    return res.status(400).json({ error: 'All booking fields are required.' });
  }

  const data = await readData();
  const nextId = data.bookings.length ? Math.max(...data.bookings.map((item) => item.id)) + 1 : 1;
  const booking = {
    id: nextId,
    roomName,
    roomType,
    roomId,
    guestName,
    guestId,
    checkin,
    checkout,
    guests,
    nights,
    totalCost,
    createdAt: new Date().toISOString(),
  };
  data.bookings.push(booking);
  await writeData(data);
  res.status(201).json(booking);
});

app.put('/api/v1/bookings/:id', async (req, res) => {
  const bookingId = Number(req.params.id);
  const { roomName, roomType, roomId, guestName, guestId, checkin, checkout, guests, nights, totalCost } = req.body;
  if (!roomName || !roomType || !checkin || !checkout || !guests || !nights || !totalCost) {
    return res.status(400).json({ error: 'All booking fields are required.' });
  }

  const data = await readData();
  const index = data.bookings.findIndex((item) => item.id === bookingId);
  if (index === -1) {
    return res.status(404).json({ error: 'Booking not found.' });
  }

  data.bookings[index] = {
    ...data.bookings[index],
    roomName,
    roomType,
    roomId,
    guestName,
    guestId,
    checkin,
    checkout,
    guests,
    nights,
    totalCost,
  };
  await writeData(data);
  res.json(data.bookings[index]);
});

app.delete('/api/v1/bookings/:id', async (req, res) => {
  const bookingId = Number(req.params.id);
  const data = await readData();
  const index = data.bookings.findIndex((item) => item.id === bookingId);
  if (index === -1) {
    return res.status(404).json({ error: 'Booking not found.' });
  }

  const removed = data.bookings.splice(index, 1)[0];
  await writeData(data);
  res.json(removed);
});

app.listen(PORT, () => {
  console.log(`Hotel backend running on http://localhost:${PORT}`);
});
