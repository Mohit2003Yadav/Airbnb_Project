const express = require("express");
const router = express.Router({ mergeParams: true }); // mergeParams is important!
const multer  = require('multer');
const { storage } = require("../cloudConfig");
const upload = multer({ storage: storage });

// Models & Utils
const Listing = require("../models/listing")
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");

// Middlewares
const { isLoggedIn, isOwner, validateListings } = require("../middleware.js");

// Controllers
const listingController = require("../controller/listing.js");

/* ----------------------------
   ROUTES
----------------------------- */

// All Listings
router.route("/")
  .get(wrapAsync(listingController.index))          // Show all listings
  .post(
    isLoggedIn,
    validateListings,
    upload.single("image"),
    wrapAsync(listingController.createListing)      // Create new listing
  );
 


// New Listing Form
router.get("/new", isLoggedIn, wrapAsync(listingController.renderNewForm));


// Single Listing (Show / Edit / Update)
router.route("/:id")
  .get(wrapAsync(listingController.showListing))    // Show a listing
  .put(
    isLoggedIn,
    isOwner,
    // validateListings,
     upload.single("image"),
    wrapAsync(listingController.editListing)        // Update listing
  );

// Edit Form
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

// Delete Listing
router.delete(
  "/:id/delete",
  isOwner,
  wrapAsync(listingController.destroyListing)
);

module.exports = router;
