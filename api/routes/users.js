const express = require("express");

const router = express.Router();

const tokenChecker = require("../middleware/token_checker");

const { createUser, getUser, updateUser } = require("../controllers/users");

router.post("/", createUser);
router.get("/", tokenChecker, getUser);
router.patch("/", tokenChecker, updateUser);

module.exports = router;
