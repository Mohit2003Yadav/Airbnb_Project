const Booking = require("../models/booking");
const Listing = require("../models/listing");

const MS_PER_DAY = 1000 * 60 * 60 * 24;

function getNights(checkIn, checkOut) {
  return Math.ceil((checkOut - checkIn) / MS_PER_DAY);
}

module.exports.createBooking = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing does not exist");
    return res.redirect("/listings");
  }

  if (listing.owner && listing.owner.equals(req.user._id)) {
    req.flash("error", "You cannot book your own listing");
    return res.redirect(`/listings/${id}`);
  }

  const checkIn = new Date(req.body.booking.checkIn);
  const checkOut = new Date(req.body.booking.checkOut);
  const guests = Number(req.body.booking.guests);
  const nights = getNights(checkIn, checkOut);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (checkIn < today || nights < 1) {
    req.flash("error", "Please select valid booking dates");
    return res.redirect(`/listings/${id}`);
  }

  const existingBooking = await Booking.findOne({
    listing: id,
    status: "confirmed",
    checkIn: { $lt: checkOut },
    checkOut: { $gt: checkIn },
  });

  if (existingBooking) {
    req.flash("error", "This listing is already booked for the selected dates");
    return res.redirect(`/listings/${id}`);
  }

  await Booking.create({
    listing: id,
    guest: req.user._id,
    checkIn,
    checkOut,
    guests,
    totalPrice: nights * listing.price,
  });

  req.flash("success", "Booking confirmed successfully");
  res.redirect("/bookings");
};

module.exports.index = async (req, res) => {
  const bookings = await Booking.find({ guest: req.user._id })
    .populate("listing")
    .sort({ createdAt: -1 });

  res.render("bookings/index.ejs", { bookings });
};

module.exports.cancelBooking = async (req, res) => {
  const { bookingId } = req.params;
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    req.flash("error", "Booking does not exist");
    return res.redirect("/bookings");
  }

  if (!booking.guest.equals(req.user._id)) {
    req.flash("error", "You do not have permission to cancel this booking");
    return res.redirect("/bookings");
  }

  booking.status = "cancelled";
  await booking.save();

  req.flash("success", "Booking cancelled");
  res.redirect("/bookings");
};
