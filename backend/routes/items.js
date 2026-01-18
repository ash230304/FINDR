const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const auth = require("../middlewares/auth");
const {
  createItem,
  getItems,
  claimItem
} = require("../controllers/itemController");

router.post(
  "/",
  auth,
  upload.array("images", 5),
  createItem
);

router.get("/", getItems);
router.post("/claim", auth, claimItem);

module.exports = router;
