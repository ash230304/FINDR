const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const { createItem, getItems, claimItem } = require("../controllers/itemController");

// UPLOAD MULTIPLE IMAGES (frontend sends "images")
router.post("/", upload.array("images", 5), createItem);

router.get("/", getItems);
router.post("/claim", claimItem);

module.exports = router;
