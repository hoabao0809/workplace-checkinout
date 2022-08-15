const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const imageStorage = multer.diskStorage({
  destination: 'public/assets/images/avatars/', // Destination to store image
  filename: (req, file, cb) => {
    cb(null, file.originalname + '_' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: imageStorage,
});

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
router.post(
  '/user-detail',
  upload.single('avatar'),
  userController.postUserDetail
);

module.exports = router;
