const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { User } = require('../db-setup');


module.exports = async function (app) {
  app.use(bodyParser({ extended: false }));

  await mongoose.connect(process.env.MONGO_URI);

  app.route('/api/login')
    .post(async (req, res) => {
      bodyParser.json();
      console.log(req.body);
      const foundUser = await User.findOne({ username: req.body.username });
      if (!foundUser) {
        res.status(401);
        return res.json({ error: 'no such user' });
      }
      if (req.body.password !== foundUser.password) {
        res.status(401);
        return res.json({ error: 'incorrect password' });
      }
      return res.json({
        user: foundUser.username,
        name: foundUser.name,
        roles: foundUser.roles,
        token: foundUser._id
      });
    });

};
