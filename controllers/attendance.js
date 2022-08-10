exports.getAttendance = (req, res, next) => {
  res.render('attendance', {
    user: req.user,
    pageTitle: 'Register attendance',
  });
};

exports.postAttendance = (req, res, next) => {
  const workplace = req.body.workplace;
  const type = req.query.type;

  req.user
    .checkStatus(type, workplace)
    .then((status) => {
      if (type === 'start') {
        res.redirect('/');
      }
      res.redirect('/attendance-details');
    })
    .catch((err) => console.log(err));
};
