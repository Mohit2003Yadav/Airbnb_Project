const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, validateBooking } = require("../middleware.js");
const bookingController = require("../controller/booking.js");

router.get("/bookings", isLoggedIn, wrapAsync(bookingController.index));

router.post(
  "/listings/:id/bookings",
  isLoggedIn,
  validateBooking,
  wrapAsync(bookingController.createBooking)
);

router.patch(
  "/bookings/:bookingId/cancel",
  isLoggedIn,
  wrapAsync(bookingController.cancelBooking)
);

module.exports = router;
