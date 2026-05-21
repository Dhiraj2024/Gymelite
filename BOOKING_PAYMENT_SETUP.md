# Booking & Payment Feature Setup Guide

## Overview
This feature allows users to book fitness plans through a modal form and make payments via Razorpay. Admins can view all bookings with payment status on the admin dashboard.

## Changes Made

### Backend Changes

#### 1. **Updated Models** (`/server/models/Booking.js`)
- Added `bio` field to store user's fitness goals
- Added `razorpayOrderId` field for payment tracking

#### 2. **Enhanced BookingController** (`/server/controllers/bookingController.js`)
- Added `createPaymentOrder()` - Creates a Razorpay order for payment
- Added `verifyPayment()` - Verifies payment and updates booking status
- Updated `createBooking()` to accept bio field

#### 3. **Updated BookingRoutes** (`/server/routes/bookingRoutes.js`)
- Added `POST /payment/order` - Create payment order
- Added `POST /payment/verify` - Verify payment completion

#### 4. **Added Razorpay Dependency** (`/server/package.json`)
- Added `razorpay` package (v2.9.1)

#### 5. **Environment Variables** (`/server/.env`)
- Added `RAZORPAY_KEY_ID` (test key: rzp_test_sample_key)
- Added `RAZORPAY_KEY_SECRET` (test key: rzp_test_sample_secret)

### Frontend Changes

#### 1. **Created BookingForm Component** (`/client/src/components/BookingForm.jsx`)
- Modal form with fields: Name, Age, Address, Bio, Start Date
- Form validation
- Razorpay payment integration
- Handles full booking + payment flow

#### 2. **Updated Pricing Page** (`/client/src/pages/Pricing.jsx`)
- "Buy Now" button now opens BookingForm modal
- Added auth check (redirects to login if not authenticated)
- Handles booking success feedback

#### 3. **Enhanced Admin Dashboard** (`/client/src/admin/AdminDashboard.jsx`)
- Bookings tab now shows summary stats:
  - Total Bookings
  - Completed Payments (green)
  - Pending Payments (yellow)
- Enhanced table with Bio column
- Better date formatting

#### 4. **Added Razorpay Script** (`/client/index.html`)
- Added Razorpay Checkout script for payment processing

#### 5. **Environment Variables** (`/client/.env`)
- Added `REACT_APP_RAZORPAY_KEY_ID` for frontend

## Installation & Setup

### 1. Install Backend Dependencies
```bash
cd server
npm install
```

### 2. Update Environment Variables

**For Production:**
- Get real Razorpay credentials from https://razorpay.com
- Update `/server/.env` with:
  ```
  RAZORPAY_KEY_ID=your_actual_key_id
  RAZORPAY_KEY_SECRET=your_actual_key_secret
  ```
- Update `/client/.env` with:
  ```
  REACT_APP_RAZORPAY_KEY_ID=your_actual_key_id
  ```

**For Testing:** (Already configured)
- Use test keys provided in .env files
- Test with Razorpay test card: 4111 1111 1111 1111
- Any future date and any CVV

### 3. Start Services
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

## Feature Workflow

### User Booking Flow
1. User navigates to Pricing page
2. Clicks "Buy Now" on any plan
3. BookingForm modal opens
4. Fills: Name, Age, Address, Bio, Start Date
5. Clicks "Proceed to Pay"
6. Razorpay payment modal opens
7. User completes payment
8. Booking is marked as "completed"
9. Success notification shown

### Admin View Flow
1. Admin goes to Admin Dashboard
2. Clicks "Bookings" tab
3. Sees summary stats (Total, Completed, Pending)
4. Views detailed table with:
   - User profile photo
   - User details (name, email, age, address)
   - User bio/fitness goals
   - Plan details
   - Payment amount
   - Payment status (badge color-coded)
   - Booking date

## Database Schema Updates

### Booking Collection
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  plan: ObjectId (ref: Pricing),
  bio: String,
  slots: { mon: Bool, tue: Bool, ... },
  startDate: Date,
  endDate: Date,
  paymentStatus: String (pending|completed|failed),
  transactionId: String,
  amount: Number,
  razorpayOrderId: String,
  createdAt: Date
}
```

## API Endpoints

### Create Booking
```
POST /api/bookings
Authorization: Bearer {token}
Body: {
  planId: ObjectId,
  slots: {},
  startDate: Date,
  endDate: Date,
  bio: String
}
```

### Create Payment Order
```
POST /api/bookings/payment/order
Authorization: Bearer {token}
Body: {
  bookingId: ObjectId,
  amount: Number
}
Response: { orderId: String }
```

### Verify Payment
```
POST /api/bookings/payment/verify
Authorization: Bearer {token}
Body: {
  bookingId: ObjectId,
  razorpayOrderId: String,
  razorpayPaymentId: String,
  razorpaySignature: String
}
```

### Get Admin Bookings
```
GET /api/bookings
Authorization: Bearer {token}
(Requires admin access)
```

## Testing

### Manual Testing Steps
1. Register/login as a user
2. Go to Pricing page
3. Click "Buy Now" on any plan
4. Fill form with test data
5. Use Razorpay test card: 4111 1111 1111 1111
6. Complete payment
7. Check admin dashboard bookings page
8. Verify booking appears with "completed" status

### Test Payment Credentials
- Test Card: 4111 1111 1111 1111
- Expiry: Any future date (e.g., 12/25)
- CVV: Any 3 digits (e.g., 123)

## Troubleshooting

### Payment Modal Not Opening
- Check if Razorpay script is loaded in browser console
- Verify `REACT_APP_RAZORPAY_KEY_ID` is set in .env

### Bookings Not Showing in Admin Dashboard
- Ensure user is logged in as admin
- Check backend logs for API errors
- Verify database connection

### Form Not Validating
- Check browser console for errors
- Ensure all required fields are filled
- Verify date input is valid (future date)

## Future Enhancements
1. Add payment status email notifications
2. Implement refund functionality
3. Add booking modification/cancellation
4. Add package/subscription management
5. Implement payment history/invoices
6. Add multiple payment method options
7. Email receipt generation
