const initData = require("./data.js");
const Listing = require("../models/listing.js");
const mongoose = require("mongoose");

const mong_url = 'mongodb://127.0.0.1:27017/wanderlust';

const initDB = async () => {
  await Listing.deleteMany({});
   initData.data = initData.data.map((item) => {
    item.owner = "68d18ec43681a88b5d2957cd"; // Replace with a valid User ID from your database
    return item;
  });
  await Listing.insertMany(initData.data);
  console.log("data is initialised");
};

async function main() {
  await mongoose.connect(mong_url);
  await initDB(); // call after connection
}



main()
  .then(() => {
    console.log("MongoDB connected and data initialised");
  })
  .catch((err) => {
    console.log(err);
  });