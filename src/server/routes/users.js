const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { User } = require('../db-setup');

module.exports = function (app) {
  app.use(bodyParser({ extended: false }));
  app.route('/api/users')
    .get(async (req, res) => {
      const users = await User.find({});
      res.json(users);
    })
    .post(async (req, res) => {
      bodyParser.json();
      console.log(req.body);
      User.create({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        roles: req.body.roles
      })
        .then((createdUser) => {
          res.json({
            'User created': {
              name: createdUser.name,
              username: createdUser.username,
              id: createdUser._id
            }
          });
        })
        .catch((err) => {
          console.log('User not created');
          res.sendStatus(409);
        });
    });

  app.route('/api/users/:userId')
    .get(async (req, res) => {
      console.log(req.params.userId);
      const foundUser = await User.findById(req.params.userId);
      res.json({
        user: foundUser.username,
        name: foundUser.name
      });
    })
    .delete((req, res) => {
      User.findByIdAndDelete(req.params.userId)
        .then((deletedUser) => {
          res.json({
            'User deleted':
              {
                user: deletedUser.username,
                name: deletedUser.name
              }
          });
        })
        .catch((err) => {
          console.log('User not deleted');
          res.sendStatus(404);
        });
    });
};
