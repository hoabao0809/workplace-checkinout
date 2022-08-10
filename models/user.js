const mongoose = require('mongoose');
const Status = require('../models/status');
const Attendance = require('../models/attendance');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  doB: {
    type: Date,
    required: true,
  },
  salaryScale: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  annualLeave: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

userSchema.methods.checkStatus = function (type, workplace) {
  const user = this;
  let currentAttendId;
  return Status.findOne({ userId: user._id }).then((status) => {
    currentAttendId = status.attendId;
    if (type === 'checkIn') {
      return this.addAttendance(
        currentAttendId,
        new Date().toLocaleDateString(),
        new Date(),
        workplace
      )
        .then((result) => {
          currentAttendId = result._id;
          return Status.findOne({ userId: user._id });
        })
        .then((status) => {
          status.attendId = currentAttendId;
          status.workplace = workplace;
          status.isWorking = true;
          return status.save();
        })
        .catch((err) => console.log(err));
    }
  });
};

// Start Working
userSchema.methods.addAttendance = function (
  attendId,
  date,
  startTime,
  workplace
) {
  if (attendId) {
    return Attendance.findById(attendId).then((attendance) => {
      // Check if the attendance is not finished
      if (date === attendance.date) {
        attendance.details.unshift({
          startTime: startTime,
          endTime: null,
          workplace: workplace,
        });
        return attendance.save();
      } else {
        const newAttend = new Attendance({
          userId: this._id,
          date: date,
          details: [
            {
              startTime: startTime,
              endTime: null,
              workplace: workplace,
            },
          ],
        });
        return newAttend.save();
      }
    });
  } else {
    const newAttend = new Attendance({
      userId: this._id,
      date: date,
      details: [
        {
          startTime: startTime,
          endTime: null,
          workplace: workplace,
        },
      ],
    });
    return newAttend.save();
  }
};

module.exports = mongoose.model('User', userSchema);
