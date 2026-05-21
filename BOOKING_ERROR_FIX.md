# 🔧 Booking Error Troubleshooting Guide

## Error: "Error processing booking. Please try again."

### Common Causes & Solutions

---

## 1️⃣ **Backend Not Running**

### Check:
```bash
# Make sure server is running on port 5000
curl http://localhost:5000/api/health
```

### Expected Response:
```json
{ "message": "Server is running 🚀" }
```

### Fix:
```bash
cd server
npm run dev
```

---

## 2️⃣ **Razorpay Dependency Not Installed**

### Check:
```bash
cd server
npm list razorpay
```

### Should show: `razorpay@2.9.6`

### Fix if missing:
```bash
cd server
npm install razorpay
```

---

## 3️⃣ **Razorpay Keys Not Configured**

### Check `.env` file exists with:
```
RAZORPAY_KEY_ID=rzp_test_SqgTQeqyoQcuS3
RAZORPAY_KEY_SECRET=ERPHw3cq7tbQz79GRePAHRD2
```

### Debug:
```bash
# In server terminal, you should see these logged when server starts
# Add this to server.js temporarily:
console.log("Razorpay Key ID:", process.env.RAZORPAY_KEY_ID);
```

---

## 4️⃣ **Browser Console Errors**

### Open Browser DevTools (F12)
1. Click **Console** tab
2. Fill booking form and click "Proceed to Pay"
3. Look for error messages starting with:
   - "Creating booking with data..."
   - "Booking created..."
   - "Creating payment order..."
   - "Error in booking process..."

### Common Errors:

**"401 Unauthorized"**
→ Token not being sent or expired
→ Solution: Re-login and try again

**"Cannot read property 'Razorpay' of undefined"**
→ Razorpay script not loaded
→ Check: Network tab in DevTools
→ Solution: Hard refresh (Ctrl+Shift+R)

**"Failed to create payment order"**
→ Backend error with Razorpay SDK
→ Check: Backend logs
→ Solution: Verify Razorpay keys in .env

---

## 5️⃣ **Backend Logs to Check**

### When booking fails, look at server logs for:
```
Payment Order Error: [actual error]
```

### Examples:

**"Payment Order Error: Invalid key_id"**
→ RAZORPAY_KEY_ID is wrong
→ Fix: Update in /server/.env

**"Payment Order Error: Booking not found"**
→ bookingId doesn't exist in database
→ Check: Was booking created successfully?

**"Payment Order Error: amount is required"**
→ amount parameter missing or 0
→ Check: Does plan.price exist and have a value?

---

## 6️⃣ **Network Request Debugging**

### Open DevTools → Network tab
1. Fill form and click "Proceed to Pay"
2. Look for requests:
   - `POST /api/bookings` → Should be **201**
   - `POST /api/bookings/payment/order` → Should be **200**

### Check Response:
- Click request → **Response** tab
- Should show booking data and orderId

### If 4xx or 5xx error:
- Click **Response** tab
- Read error message
- Report that specific message

---

## 7️⃣ **Form Validation Issues**

### The form checks:
- ✓ Name: Not empty
- ✓ Age: Between 13-120
- ✓ Address: Not empty
- ✓ Bio: Not empty
- ✓ Start Date: Future date only

### If form won't submit:
- Check all red error messages below fields
- Fix each field error
- Click "Proceed to Pay" again

---

## 8️⃣ **Authentication Check**

### Make sure:
1. You are **logged in** to the app
2. Token exists in localStorage:
   ```javascript
   // In browser console:
   localStorage.getItem('token')
   // Should return a long string starting with "eyJ"
   ```

### If no token:
→ Login first, then try booking again

---

## 9️⃣ **Database Connection**

### Check MongoDB connection in server logs:
```
✅ MongoDB connected
```

### If connection fails:
- Check MONGODB_URI in .env
- Verify MongoDB service is running
- Test connection: `mongoose.connect()`

---

## 🔟 **CORS Issues**

### If getting CORS error in browser console:
```
Access to XMLHttpRequest blocked by CORS policy
```

### Check server `.env`:
```
CLIENT_URL=http://localhost:5173
```

### Should match your frontend URL

### Fix:
```javascript
// In /server/server.js
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
```

---

## 🎯 **Step-by-Step Debugging**

### 1. Clear Everything
```bash
# Backend: Restart
cd server && npm run dev

# Frontend: Hard refresh
Ctrl+Shift+R (or Cmd+Shift+R on Mac)
```

### 2. Check Logs
- Open browser Console (F12)
- Open server terminal
- Watch for error messages

### 3. Fill Form Slowly
- Fill each field one by one
- Check for validation errors
- Watch console for logs

### 4. Read Error Messages
- Don't ignore error details
- Copy exact error text
- Search for that error in guide

### 5. Check Network Requests
- DevTools → Network tab
- Watch each API call
- Check response for details

---

## 📋 **Complete Checklist**

- [ ] Backend running (`npm run dev` in server folder)
- [ ] Frontend running (`npm run dev` in client folder)  
- [ ] Razorpay installed (`npm list razorpay`)
- [ ] .env keys configured (RAZORPAY_KEY_ID & SECRET)
- [ ] User is logged in
- [ ] Form fields all filled correctly
- [ ] Browser console shows no errors
- [ ] Network requests returning 200/201
- [ ] MongoDB connected

---

## 🚨 **Still Not Working?**

### Run this debugging script in browser console:
```javascript
// Check environment
console.log('Token:', localStorage.getItem('token') ? 'YES' : 'NO');
console.log('Razorpay:', window.Razorpay ? 'LOADED' : 'NOT LOADED');

// Try API manually
fetch('http://localhost:5000/api/health')
  .then(r => r.json())
  .then(d => console.log('Server:', d))
  .catch(e => console.log('Server Error:', e.message));
```

### Expected Output:
```
Token: YES
Razorpay: LOADED
Server: {message: "Server is running 🚀"}
```

---

## 📞 **Getting Help**

When asking for help, provide:
1. Exact error message (screenshot of console)
2. Server logs (what appears when error happens)
3. Network request details (from DevTools)
4. Steps to reproduce the error
5. Output of checklist above

---

## ✅ **If Everything Works**

You should see:
1. ✓ Form opens when clicking "Buy Now"
2. ✓ Form validates fields
3. ✓ Console shows "Creating booking with data..."
4. ✓ Console shows "Booking created: {booking}"
5. ✓ Console shows "Creating payment order..."
6. ✓ Console shows "Payment order created: order_xxx"
7. ✓ Razorpay modal opens
8. ✓ Fill payment details
9. ✓ Success message appears
10. ✓ Booking appears in admin dashboard

---

**Happy Booking! 🎉**
