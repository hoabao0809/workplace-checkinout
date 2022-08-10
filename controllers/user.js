

exports.getHome = (req, res, next) => {
  const user = req.user;
  res.render('home', { pageTitle: 'Trang chủ', user });
};
