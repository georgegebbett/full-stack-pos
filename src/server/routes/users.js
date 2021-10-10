const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { User } = require('../db-setup');

module.exports = function (app) {
  app.route('/api/users')
    .get(async (req, res) => {
      const users = await User.find({});
      res.json(users);
    });

  app.route('/api/users/:userId')
    .get(async (req, res) => {
      console.log(req.params.userId);
      const foundUser = await User.findById(req.params.userId);
      res.json({
        user: foundUser.username,
        name: foundUser.name
      });
    });
};
