const express = require("express");
const router = express.Router();
const { contacts: ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");
const { authenticate, validation, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", authenticate, ctrlWrapper(ctrl.getAll));

router.get(
  "/:contactId",
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.findOneById)
);

router.delete("/:contactId", authenticate, isValidId, ctrlWrapper(ctrl.remove));

router.post(
  "/",
  authenticate,
  validation(schemas.addContact),
  ctrlWrapper(ctrl.add)
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validation(schemas.addContact),
  ctrlWrapper(ctrl.findByIdAndUpdate)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validation(schemas.updateFavorite),
  ctrlWrapper(ctrl.updateOneField)
);

module.exports = router;