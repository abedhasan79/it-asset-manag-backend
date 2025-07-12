const mongoose = require("mongoose");
const dotenv = require("dotenv");
const License = require("../models/License");

dotenv.config();

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/it-db")
  .then(() => {
    console.log("✅ Connected to MongoDB");
    return License.insertMany([
      {
        name: "Microsoft 365 Business",
        vendor: "Microsoft",
        key: "XXXX-1234-ABCD-5678",
        startDate: new Date("2023-01-01"),
        expiryDate: new Date("2024-12-31"),
        assignedTo: "Admin Staff",
      },
      {
        name: "Kaspersky Endpoint Security",
        vendor: "Kaspersky",
        key: "KASP-5678-SECURE-9999",
        startDate: new Date("2022-11-01"),
        expiryDate: new Date("2024-11-01"),
        assignedTo: "Reception PC",
      },
      {
        name: "Jane EMR",
        vendor: "Jane",
        key: "JANE-EMR-2023-0001",
        startDate: new Date("2023-06-01"),
        expiryDate: new Date("2024-06-01"),
        assignedTo: "All Staff",
      },
    ]);
  })
  .then((result) => {
    console.log(`✅ Seeded ${result.length} licenses`);
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("❌ Error inserting licenses:", err);
    mongoose.disconnect();
  });