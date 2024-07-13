const express = require('express');
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator')
const cron = require('node-cron');
const User = require('./models/user');
const Notification = require('./models/notification');
const sendNotification = require('./sendNotifcation');
const sequelize = require('./config/database');
const PORT = process.env.PORT || 4000;

const app = express();
app.use(bodyParser.json());

app.post('/register', [
  check('email').isEmail(),
  check('password').isLength({ min: 5 }),
  check('timezone').isString(),
],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password, timezone } = req.body
    try {
      const user = await User.create({ email, password, timezone });
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
);

app.get('/notification/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const notificationList = await Notification.findAll({ where: { userId } });
    res.status(200).json(notificationList);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// schedule notification with cron job
cron.schedule('* * * * *', async () => {
  console.log('notification cron run every second');
  const users = await User.findAll();
  users.forEach(user => sendNotification(user));
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

sequelize.sync({ force: true }).then(() => {
  console.log('Database & tables created!');
})

module.exports = app;