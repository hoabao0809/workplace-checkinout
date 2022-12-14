const Covid = require('../models/covid');

exports.getCovid = (req, res) => {
  Covid.findOne({ userId: req.user._id })
    .then((covid) => {
      if (!covid) {
        const newCovid = new Covid({
          userId: req.user._id,
          bodyTemps: [],
          vaccine: [],
          positive: [],
        });
        return newCovid.save();
      }
      return covid;
    })
    .then((covid) => {
      res.render('covid/covid', {
        pageTitle: 'Thông tin COVID-19',
        css: 'covid',
        user: req.user,
        vaccine: covid.vaccine,
      });
    })
    .catch((err) => console.log(err));
};

// Post Covid Details Page
exports.postCovid = (req, res, next) => {
  const type = req.query.type;
  Covid.findOne({ userId: req.user._id })
    .then((covid) => {
      // Check type of covid-form (temperature, vaccine, positive)
      if (type === 'temperature') {
        covid.bodyTemps.push({
          date: new Date(),
          temperature: req.body.temperature,
        });
      } else if (type === 'positive') {
        covid.positive.push({ date: req.body.positive });
      } else {
        const { vaccineDate, vaccineName } = req.body;
        covid.vaccine.push({ name: vaccineName, date: vaccineDate });
      }
      return covid.save();
    })
    .then((covid) => {
      res.redirect('/covid-details');
    })
    .catch((err) => console.log(err));
};

// Get Covid Details Page
exports.getCovidDetails = (req, res, next) => {
  Covid.findOne({ userId: req.user._id })
    .then((covid) => {
      if (covid) {
        return covid;
      } else {
        const newCovid = new Covid({
          userId: req.user._id,
          bodyTemperatures: [],
          vaccine: [],
          positive: [],
        });
        return newCovid.save();
      }
    })
    .then((covid) => {
      res.render(`covid/covid-details`, {
        css: 'covid',
        pageTitle: 'Thông tin Covid',
        user: req.user,
        covid: covid,
      });
    })
    .catch((err) => console.log(err));
};
