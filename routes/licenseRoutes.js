const express = require("express");
const router = express.Router();
const licenseController = require("../controllers/licenseController");

router.get("/", licenseController.getLicenses);
router.post("/", licenseController.createLicense);
router.put("/:id", licenseController.updateLicense);
router.delete("/:id", licenseController.deleteLicense);

module.exports = router;
