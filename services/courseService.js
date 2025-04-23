const asyncHandler = require("express-async-handler");
const Course = require("../models/courseModel");

exports.createCourse = asyncHandler(async (req, res) => {
  const newCourse = await Course.create(req.body);
  res.status(201).json({
    status: "Success",
    data: {
      newCourse,
    },
  });
});

exports.getAllCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find();
  res.status(200).json({
    results: courses.length,
    data: courses,
  });
});

exports.getCourseById = asyncHandler(async (req, res, nxt) => {
  const { id } = req.params;
  const course = await Course.findById(id);

  res.status(200).json({
    status: "Success",
    data: course,
  });
});

exports.deleteCourse = asyncHandler(async (req, res, nxt) => {
  const { id } = req.params;
  const course = await Course.findByIdAndDelete(id);

  res.status(204).send();
});

exports.updateCourse = asyncHandler(async (req, res, nxt) => {
  const { id } = req.params;
  const course = await Course.findByIdAndUpdate(id, req.body, { new: true });

  res.status(200).json({
    status: "Success",
    data: course,
  });
});
