const Notification = require('./models/notification');
const moment = require('moment-timezone');
const sendMail = require('./mailer');

const sendNotification = async (user) => {
  console.log('send notification running');
  const now = moment().tz(user.timezone);
  if (now.hour() === 9 && now.minute() === 0) {
    const message = `Good Morning! Greeting from your daily notification`;
    user = user.toJSON()
    console.log(user.id, 'user user user');
    await Notification.create({ userId: user.id, message, receivedAt: now.toDate() });

    await sendMail(user.email, 'Daily Notification', message)
  }
}

module.exports = sendNotification;