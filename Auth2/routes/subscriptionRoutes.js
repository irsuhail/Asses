const express = require("express");
const {
  subscribe,
  status,
  renew,
  cancel,
} = require("../controllers/subscriptionController");
const auth = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(auth);
router.post("/subscribe", subscribe);
router.get("/subscription-status", status);
router.patch("/renew", renew);
router.post("/cancel-subscription", cancel);

module.exports = router;
