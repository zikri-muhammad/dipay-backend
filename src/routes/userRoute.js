const express = require("express")

const router = express.Router();

router
  .route("/users")
  .get(getUsers)
  .post(createUsers)

