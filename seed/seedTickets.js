const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Ticket = require("../models/Ticket");

dotenv.config();

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/it-db")
  .then(() => {
    console.log("✅ Connected to MongoDB");
    return Ticket.insertMany([
      {
        title: "Printer not responding",
        description: "HP LaserJet in Reception won't print anything.",
        status: "Open",
        submittedBy: "reception@clinic.ca",
        assignedTo: "IT Team",
        asset: "HP LaserJet Pro M404n",
        priority: "High",
      },
      {
        title: "Computer slow on startup",
        description: "Takes 10 minutes to load Windows.",
        status: "In Progress",
        submittedBy: "dr.lee@clinic.ca",
        assignedTo: "John (IT)",
        asset: "Dell OptiPlex 7090",
        priority: "Medium",
      },
      {
        title: "Can’t login to EMR",
        description: "Getting authentication error in Jane EMR system.",
        status: "Closed",
        submittedBy: "nurse@clinic.ca",
        assignedTo: "Mary (IT)",
        asset: "MacBook Pro 14”",
        priority: "Low",
      },
    ]);
  })
  .then((result) => {
    console.log(`✅ Seeded ${result.length} tickets`);
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("❌ Error inserting tickets:", err);
    mongoose.disconnect();
  });