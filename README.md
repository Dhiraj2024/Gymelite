# 🏋️ GYME - Fitness Website MERN Stack

A **production-level, fully responsive fitness website** built with MongoDB, Express.js, React.js, and Node.js featuring dark theme with neon green (#c6ff00) accents, glassmorphism effects, and smooth animations.

## 🎨 Features Implemented

### Frontend (React + Vite + Tailwind CSS)
- ✅ Responsive navigation bar with hamburger menu
- ✅ Home page with hero section, features, stats, testimonials preview
- ✅ Programs page with category filtering and rating system
- ✅ Trainers page with profile cards
- ✅ Testimonials page with review submission
- ✅ Pricing page with plan selection
- ✅ Tips page with beginner/intermediate/advanced guides
- ✅ Contact page with form and info
- ✅ About page
- ✅ Authentication (Login/Signup) with JWT
- ✅ Admin dashboard (protected route)
- ✅ Dark theme with neon color scheme
- ✅ Glassmorphism + gradient effects
- ✅ Smooth CSS animations
- ✅ Mobile-first responsive design

### Backend (Node.js + Express + MongoDB)
- ✅ REST API with CORS enabled
- ✅ JWT authentication with token refresh
- ✅ Role-based access control (Admin)
- ✅ 7 MongoDB models: User, Program, Review, Trainer, Booking, Contact, Pricing
- ✅ Complete CRUD operations for all entities
- ✅ Password hashing with bcryptjs
- ✅ Error handling & validation
- ✅ Request interceptors in API client

## 📁 Project Structure

```
Gyme/
├── client/                      # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Programs.jsx
│   │   │   ├── Trainers.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   ├── Pricing.jsx
│   │   │   ├── Tips.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── Auth/
│   │   │       ├── Login.jsx
│   │   │       └── Signup.jsx
│   │   ├── admin/
│   │   │   └── AdminDashboard.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── assets/
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   ├── .env
│   └── .gitignore
│
└── server/                      # Node.js Backend
    ├── controllers/
    │   ├── authController.js
    │   ├── programController.js
    │   ├── reviewController.js
    │   ├── trainerController.js
    │   ├── bookingController.js
    │   ├── contactController.js
    │   └── pricingController.js
    ├── models/
    │   ├── User.js
    │   ├── Program.js
    │   ├── Review.js
    │   ├── Trainer.js
    │   ├── Booking.js
    │   ├── Contact.js
    │   └── Pricing.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── programRoutes.js
    │   ├── reviewRoutes.js
    │   ├── trainerRoutes.js
    │   ├── bookingRoutes.js
    │   ├── contactRoutes.js
    │   └── pricingRoutes.js
    ├── middleware/
    │   └── auth.js
    ├── config/
    │   └── db.js
    ├── server.js
    ├── package.json
    ├── .env
    └── .gitignore
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Database Setup

**Option A: Local MongoDB**
```bash
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create cluster and get connection string
3. Update `MONGODB_URI` in `server/.env`

### 2. Server Setup

```bash
cd server

# Install dependencies
npm install

# Start development server
npm run dev

# Server runs on http://localhost:5000
```

### 3. Client Setup

```bash
cd client

# Install dependencies
npm install

# Start development server
npm run dev

# Client runs on http://localhost:5173
```

## 🔐 Authentication

### Test Credentials
After signup, you can test login with your credentials.

### Admin Account
Create a user and modify in MongoDB:
```javascript
// In MongoDB, find your user and set:
{
  isAdmin: true
}
```
Then access admin panel at `/admin`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Get profile (protected)
- `PUT /api/auth/profile` - Update profile (protected)

### Programs
- `GET /api/programs` - Get all programs
- `GET /api/programs/:id` - Get program by ID
- `POST /api/programs` - Create (admin only)
- `PUT /api/programs/:id` - Update (admin only)
- `DELETE /api/programs/:id` - Delete (admin only)
- `POST /api/programs/:id/like` - Like program (protected)

### Reviews
- `POST /api/reviews` - Add review (protected)
- `GET /api/reviews/program/:programId` - Get reviews
- `DELETE /api/reviews/:id` - Delete (admin only)

### Trainers
- `GET /api/trainers` - Get all
- `POST /api/trainers` - Create (admin only)
- `PUT /api/trainers/:id` - Update (admin only)
- `DELETE /api/trainers/:id` - Delete (admin only)

### Bookings
- `POST /api/bookings` - Create booking (protected)
- `GET /api/bookings/my` - Get user bookings (protected)
- `PUT /api/bookings/:id/payment` - Update payment (protected)
- `DELETE /api/bookings/:id` - Cancel booking (protected)

### Pricing
- `GET /api/pricing` - Get all active pricing plans
- `POST /api/pricing` - Create (admin only)
- `PUT /api/pricing/:id` - Update (admin only)
- `DELETE /api/pricing/:id` - Delete (admin only)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all messages (admin only)
- `DELETE /api/contact/:id` - Delete message (admin only)

## 🎨 Color Scheme

| Role | Color | Hex Code |
|------|-------|----------|
| Primary | Neon Green | #c6ff00 |
| Background | Dark Black | #0a0a0a |
| Secondary BG | Dark Gray | #1a1a1a |
| Tertiary BG | Lighter Gray | #2a2a2a |
| Accent | Pink | #ff006e |
| Success | Cyan | #00d9ff |

## 📝 Database Schemas

### User
```javascript
{
  name, email, password (hashed),
  phone, age, gender, fitnessGoal,
  isAdmin, bookedPrograms[], createdAt
}
```

### Program
```javascript
{
  name, description, category,
  image, duration, difficulty, price,
  likes, rating, reviews[], trainer,
  createdAt
}
```

### Review
```javascript
{
  user, program, rating (1-5),
  comment, createdAt
}
```

### Trainer
```javascript
{
  name, speciality, image,
  experience, bio, certification,
  programs[], createdAt
}
```

### Booking
```javascript
{
  user, plan, slots (Mon-Sun boolean),
  startDate, endDate,
  paymentStatus, transactionId, amount,
  createdAt
}
```

### Contact
```javascript
{
  name, email, message,
  status (new/read/replied), createdAt
}
```

### Pricing
```javascript
{
  name, duration, price, features[],
  isActive, daysCount, createdAt
}
```

## 🛠️ Customization

### Update Logo
Replace ⚡ in Navbar.jsx with your logo component

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: "#c6ff00",  // Change primary color
  dark: "#0a0a0a",     // Change background
  // ...
}
```

### Add Images
Place images in `client/src/assets/` and import

### Modify Programs
Add sample data in MongoDB or through admin panel

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

All pages are mobile-first responsive!

## 🔒 Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT token authentication
- ✅ Protected routes with middleware
- ✅ Admin role-based access control
- ✅ CORS enabled for frontend origin
- ✅ Environment variables for secrets
- ✅ Token stored in localStorage

## 🐛 Troubleshooting

### MongoDB Connection Error
- Check MongoDB is running
- Verify connection string in `.env`
- Check firewall permissions

### CORS Error
- Ensure server and client URLs match in `.env`
- Check `CLIENT_URL` in server `.env`

### Port Already in Use
```bash
# Kill process on port 5000 (server)
lsof -ti:5000 | xargs kill -9

# Kill process on port 5173 (client)
lsof -ti:5173 | xargs kill -9
```

### Token Expired
- User needs to login again
- Tokens expire in 7 days (configurable in authController)

## 📈 Next Steps

1. **Payment Integration**: Add Stripe for bookings
2. **Image Upload**: Implement multer for program images
3. **Email Notifications**: Send booking confirmations
4. **Advanced Filtering**: Add search and advanced filters
5. **Real-time Notifications**: Implement Socket.io
6. **User Dashboard**: Add personal booking management
7. **Analytics**: Track bookings and revenue

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Support

For issues or questions, please refer to the code comments or contact the development team.

---

**Built with ❤️ for fitness enthusiasts worldwide**
