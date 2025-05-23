const express = require("express");
const {
  getFreeContent,
  getPremiumContent,
  createContent,
  deleteContent,
} = require("../controllers/contentController");

const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

const router = express.Router();

router.get("/free", auth, getFreeContent);
router.get("/premium", auth, getPremiumContent);

router.post("/", auth, role(["admin"]), createContent);
router.delete("/:id", auth, role(["admin"]), deleteContent);

module.exports = router;
