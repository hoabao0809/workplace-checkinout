const Attendance = require('../models/attendance');

exports.getAttendance = (req, res, next) => {
  res.render('attendance', {
    user: req.user,
    pageTitle: 'Đăng ký làm việc',
    css: 'register'
  });
};

exports.postAttendance = (req, res, next) => {
  const workplace = req.body.workplace;
  const type = req.query.type;

  req.user
    .checkStatus(type, workplace)
    .then((status) => {
      switch (type) {
        case 'checkIn':
          res.redirect('/');
          return;
        case 'checkOut':
          res.redirect('/attendance-details');
          return;
      }
    })
    .catch((err) => console.log(err));
};

exports.getAttendanceDetails = (req, res, next) => {
  req.user
    .getAttendanceDetails()
    .then((attendance) => {
      res.render('attendance-details', {
        attendance,
        pageTitle: 'Dữ liệu giờ làm',
        css: 'attendance-details',
      });
    })
    .catch((err) => console.log(err));
};
