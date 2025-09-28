let Listing = require("../models/listing");

module.exports.index = async (req, res) => {
  let list = await Listing.find({});
  res.render("listing.ejs", { list });
};

module.exports.renderNewForm = (req, res) => {
  res.render("new.ejs");
};

module.exports.createListing = async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;
  let newlisting = new Listing(req.body.listing);
 newlisting.image={url,filename};

  // ✅ Change: safer way to handle image check
  if (req.body.listing.image && !req.body.listing.image.url) {
    delete req.body.listing.image.url; // remove empty string
  }

  newlisting.owner = req.user._id; // set the owner to the logged-in user
  await newlisting.save();
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

  res.render("edit.ejs", { listitem });
};

module.exports.editListing = async (req, res) => {
  let { id } = req.params;
  let listing=await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image={url,filename};
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
