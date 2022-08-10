const User = require('../models/user');
const Status = require('../models/status');

exports.getHome = (req, res, next) => {
  res.render('home', { pageTitle: 'Trang chủ', user: req.user });
};

// check if user checked in
exports.checkedIn = (req, res, next) => {
  User.findById('62f258c5f303a1cb52676250')
    .then((user) => {
      if (user) {
        req.user = user;
        return Status.findOne({ userId: user._id });
      }
    })
    .then((result) => {
      if (!result) {
        const status = new Status({
          userId: req.user._id,
          workplace: 'Chưa xác định',
          isWorking: false,
          attendId: null,
        });
        return status.save();
      } else {
        return result;
      }
    })
    .then((result) => {
      req.user.workplace = result.workplace;
      req.user.isWorking = result.isWorking;
      next();
    })
    .catch((err) => console.log(err));
};
