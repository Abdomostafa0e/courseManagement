const express = require("express");
const {
  createCourse,
  getAllCourses,
  getCourseById,
  deleteCourse,
  updateCourse,
} = require("../services/courseService");

const {
  getCourseValidator,
  deleteCourseValidator,
  createCourseValidator,
  updateCourseValidator,
} = require("../utils/validators/courseValidator");

const router = express.Router();


router.get("/", getAllCourses);
router.post("/", createCourseValidator, createCourse);


router.get("/:id", getCourseValidator, getCourseById);
router.delete("/:id", deleteCourseValidator, deleteCourse);
router.put("/:id", updateCourseValidator, updateCourse);

module.exports = router;
