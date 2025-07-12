const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Asset = require("../models/Asset");

dotenv.config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/it-db')
    .then(() => {
        console.log("Connected to MongoDB");
        return Asset.insertMany([
            {
                name: "Dell OptiPlex 7090",
                type: "Desktop",
                serialNumber: "D7090-001",
                purchaseDate: new Date("2023-04-15"),
                warrantyExpiry: new Date("2026-04-15"),
                assignedTo: "Dr. Ahmed",
                location: "Exam Room 1",
            },
            {
                name: "HP LaserJet Pro M404n",
                type: "Printer",
                serialNumber: "HP-M404N-323",
                purchaseDate: new Date("2022-08-10"),
                warrantyExpiry: new Date("2024-08-10"),
                assignedTo: "",
                location: "Reception",
            },
            {
                name: "MacBook Pro 14”",
                type: "Laptop",
                serialNumber: "MBP2022-ABED",
                purchaseDate: new Date("2022-12-01"),
                warrantyExpiry: new Date("2025-12-01"),
                assignedTo: "Manager",
                location: "Admin Office",
            },
        ]);
    })
    .then((result) => {
        console.log(`✅ Inserted ${result.length} assets`);
        mongoose.disconnect();
    })
    .catch((err) => {
        console.error("❌ Error inserting assets:", err);
        mongoose.disconnect();
    });