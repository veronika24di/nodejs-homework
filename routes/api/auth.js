const express = require("express");
const router = express.Router();
const { users: ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");
const { authenticate, validation, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");

router.post(
  "/register",
  validation(schemas.registerUser),
  ctrlWrapper(ctrl.register)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

router.post(
  "/verify",
  validation(schemas.verifyEmailSchema),
  ctrlWrapper(ctrl.reverifyEmail)
);

router.post("/login", validation(schemas.loginUser), ctrlWrapper(ctrl.login));

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.patch(
  "/update",
  authenticate,
  validation(schemas.updateSubUser),
  ctrlWrapper(ctrl.updateSubscription)
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;