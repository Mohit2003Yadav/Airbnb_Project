let Listing = require("../models/listing");
let mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
let mapBoxToken = process.env.MAP_TOKEN;
let geocodingClient = mbxGeocoding({ accessToken: mapBoxToken });
module.exports.index = async (req, res) => {
  let list = await Listing.find({});
  res.render("listing", { list }); // or "listings/index" if that file exists
};

module.exports.renderNewForm = (req, res) => {
  res.render("new.ejs");
};

module.exports.createListing = async (req, res) => {
  let response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();

  let url = req.file.path;
  let filename = req.file.filename;
  let newlisting = new Listing(req.body.listing);
  newlisting.image = { url, filename };

  // ✅ Change: safer way to handle image check
  if (req.body.listing.image && !req.body.listing.image.url) {
    delete req.body.listing.image.url; // remove empty string
    // console.log(req.body.listing.image.url);
  }
  newlisting.owner = req.user._id; // set the owner to the logged-in user
  newlisting.geometry = response.body.features[0].geometry;
  let savedListing = await newlisting.save();
  // console.log(savedListing);
  req.flash("success", "New Listing Created succesfully");
  res.redirect("/listings");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  let item = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: { path: "author" },
    })
    .populate("owner");

  if (!item) {
    req.flash("error", "Listing you have requested for does not exist");
    return res.redirect("/listings"); // ✅ Added return (prevents multiple responses)
  }

  res.render("show.ejs", { item });
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  let listitem = await Listing.findById(id);

  if (!listitem) {
    req.flash("error", "Listing you have requested for does not exist");
    return res.redirect("/listings"); // ✅ Added return (prevents multiple responses)
  }
  let originalImageURl = listitem.image.url;
  originalImageURl = originalImageURl.replace("/upload", "/upload/w_250");
  res.render("edit.ejs", { listitem, originalImageURl });
};

module.exports.editListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    listing.save();
  }
  req.flash("success", "Listing Updated Successfully");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted Successfully");
  res.redirect("/listings");
};
