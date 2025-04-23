const { check } = require("express-validator");
const validatorMW = require("../../middlewares/validatorMW");

exports.createCourseValidator = [
  check("title").notEmpty().withMessage("Course title is required..!!").trim(),
  check("description").notEmpty().withMessage("Description is required"),
  check("image")
    .notEmpty()
    .withMessage("Image is required")
    .isURL()
    .withMessage("Image must be a valid URL"),
  check("startDate")
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage("Start date must be a valid date"),

  check("endDate")
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage("End date must be a valid date"),

  check("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),

  validatorMW,
];

exports.getCourseValidator = [
  check("id").isMongoId().withMessage("Invalid ID format..!!"),
  validatorMW,
];
exports.updateCourseValidator = [
  check("id").isMongoId().withMessage("Invalid ID format..!!"),
  check("title").optional().trim(),
  check("description").optional(),
  check("image").optional().isURL().withMessage("Image must be a valid URL"),
  check("startDate")
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage("Start date must be a valid date"),

  check("endDate")
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage("End date must be a valid date"),

  check("price")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),
  validatorMW,
];
exports.deleteCourseValidator = [
  check("id").isMongoId().withMessage("Invalid ID format..!!"),
  validatorMW,
];
