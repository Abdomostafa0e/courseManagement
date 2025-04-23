const express = require("express");
const {
  createCourse,
  getAllCourses,
  getCourseById,
  deleteCourse,
  updateCourse,
} = require("../services/courseService");

const router = express.Router();

router.get("/", getAllCourses);
router.post("/", createCourse);

router.get("/:id", getCourseById);
router.delete("/:id", deleteCourse);
router.put("/:id", updateCourse);

module.exports = router;
