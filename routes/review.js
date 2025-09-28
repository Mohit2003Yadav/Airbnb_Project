const express = require("express");
let router = express.Router({ mergeParams: true }); // <-- mergeParams is important!

let Listing = require("../models/listing");
let wrapAsync = require("../utils/wrapAsync.js");
let ExpressError = require("../utils/ExpressError.js");
let { reviewSchema } = require("../schema.js");
let Review = require("../models/review");
let { isLoggedIn, validateReview, isreviewAuthor } = require("../middleware.js");
let reviewController = require("../controller/review.js");


// reviews post route
router.post(
  "/", isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

router.delete(
  "/:reviewId", isLoggedIn, isreviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;