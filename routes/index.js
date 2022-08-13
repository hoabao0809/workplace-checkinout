const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const attendanceController = require('../controllers/attendance');

// Homepage
router.get('/', userController.getHome);

// Attendance page
router.get('/attendance', attendanceController.getAttendance);
router.post('/attendance', attendanceController.postAttendance);
router.get('/attendance-details', attendanceController.getAttendanceDetails);

// USer detail
router.get('/user-detail', userController.getUserDetail);
router.post('/user-detail', userController.postUserDetail);

module.exports = router;
