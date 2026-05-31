/**
 * @swagger
 * /api/rooms:
 *   get:
 *     summary: Get all available rooms
 *     description: Retrieve a list of all hotel rooms with their details
 *     tags:
 *       - Rooms
 *     responses:
 *       200:
 *         description: List of rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: "Standard Room"
 *                   description:
 *                     type: string
 *                   price:
 *                     type: number
 *                     example: 110
 *                   capacity:
 *                     type: integer
 *                     example: 2
 */

/**
 * @swagger
 * /api/reviews:
 *   get:
 *     summary: Get all reviews
 *     tags:
 *       - Reviews
 *     responses:
 *       200:
 *         description: List of reviews
 *   post:
 *     summary: Create a new review
 *     tags:
 *       - Reviews
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - stars
 *               - title
 *               - message
 *               - author
 *             properties:
 *               stars:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 5
 *               title:
 *                 type: string
 *                 example: "Great Stay"
 *               message:
 *                 type: string
 *                 example: "The room was clean and comfortable"
 *               author:
 *                 type: string
 *                 example: "John Doe"
 *     responses:
 *       201:
 *         description: Review created successfully
 *       400:
 *         description: Missing required fields
 */

/**
 * @swagger
 * /api/reviews/{id}:
 *   put:
 *     summary: Update a review
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stars:
 *                 type: integer
 *               title:
 *                 type: string
 *               message:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       200:
 *         description: Review updated
 *       404:
 *         description: Review not found
 *   delete:
 *     summary: Delete a review
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Review deleted
 *       404:
 *         description: Review not found
 */

/**
 * @swagger
 * /api/services:
 *   get:
 *     summary: Get all services
 *     tags:
 *       - Services
 *     responses:
 *       200:
 *         description: List of services
 *   post:
 *     summary: Create a new service
 *     tags:
 *       - Services
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Room Service"
 *               description:
 *                 type: string
 *                 example: "24/7 dining service"
 *               category:
 *                 type: string
 *                 default: "General"
 *     responses:
 *       201:
 *         description: Service created
 *       400:
 *         description: Missing required fields
 */

/**
 * @swagger
 * /api/services/{id}:
 *   put:
 *     summary: Update a service
 *     tags:
 *       - Services
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Service updated
 *   delete:
 *     summary: Delete a service
 *     tags:
 *       - Services
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Service deleted
 */

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     summary: Get all bookings
 *     tags:
 *       - Bookings
 *     responses:
 *       200:
 *         description: List of bookings
 *   post:
 *     summary: Create a new booking
 *     tags:
 *       - Bookings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roomName
 *               - roomType
 *               - roomId
 *               - guestName
 *               - guestId
 *               - checkin
 *               - checkout
 *               - guests
 *               - nights
 *               - totalCost
 *             properties:
 *               roomName:
 *                 type: string
 *                 example: "Standard Room"
 *               roomType:
 *                 type: string
 *                 example: "standard"
 *               roomId:
 *                 type: integer
 *                 example: 1
 *               guestName:
 *                 type: string
 *                 example: "John Doe"
 *               guestId:
 *                 type: string
 *                 example: "G001"
 *               checkin:
 *                 type: string
 *                 format: date
 *                 example: "2024-05-28"
 *               checkout:
 *                 type: string
 *                 format: date
 *                 example: "2024-05-30"
 *               guests:
 *                 type: integer
 *                 example: 2
 *               nights:
 *                 type: integer
 *                 example: 2
 *               totalCost:
 *                 type: number
 *                 example: 220
 *     responses:
 *       201:
 *         description: Booking created
 *       400:
 *         description: Missing required fields
 */

/**
 * @swagger
 * /api/bookings/{id}:
 *   put:
 *     summary: Update a booking
 *     tags:
 *       - Bookings
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Booking updated
 *   delete:
 *     summary: Delete a booking
 *     tags:
 *       - Bookings
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Booking deleted
 */

/**
 * @swagger
 * /api/availability:
 *   post:
 *     summary: Check room availability
 *     description: Check if a specific room type is available for given dates
 *     tags:
 *       - Availability
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - checkin
 *               - checkout
 *               - guests
 *               - roomId
 *               - roomType
 *             properties:
 *               checkin:
 *                 type: string
 *                 format: date
 *                 example: "2024-05-28"
 *               checkout:
 *                 type: string
 *                 format: date
 *                 example: "2024-05-30"
 *               guests:
 *                 type: integer
 *                 example: 2
 *               roomId:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 1
 *               roomType:
 *                 type: string
 *                 enum: [standard, deluxe, suite, family, penthouse]
 *                 example: "standard"
 *     responses:
 *       200:
 *         description: Availability check result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 available:
 *                   type: boolean
 *                 nights:
 *                   type: integer
 *                 totalCost:
 *                   type: number
 *                 roomId:
 *                   type: integer
 *                 roomName:
 *                   type: string
 *                 roomType:
 *                   type: string
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid parameters
 */
