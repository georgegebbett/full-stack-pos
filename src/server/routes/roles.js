const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { Role } = require('../db-setup');

module.exports = function (app) {
  app.use(bodyParser({ extended: false }));
  app.route('/api/roles')
    .get(async (req, res) => {
      const roles = await Role.find({});
      res.json(roles);
    })
    .post(async (req, res) => {
      bodyParser.json();
      console.log(req.body);
      Role.create({
        name: req.body.name,
        permissions: req.body.permissions
      })
        .then((createdRole) => {
          res.json({
            'Role created': {
              name: createdRole.name,
              permissions: createdRole.permissions,
              id: createdRole._id
            }
          });
        })
        .catch((err) => {
          console.log('Role not created');
          res.sendStatus(409);
        });
    });

  app.route('/api/roles/:roleId')
    .get(async (req, res) => {
      console.log(req.params.roleId);
      const foundRole = await Role.findById(req.params.userId);
      res.json({
        name: foundRole.name,
        permissions: foundRole.permissions
      });
    })
    .delete((req, res) => {
      Role.findByIdAndDelete(req.params.roleId)
        .then((deletedRole) => {
          res.json({
            'Role deleted':
              {
                name: deletedRole.name,
                permissions: deletedRole.permissions
              }
          });
        })
        .catch((err) => {
          console.log('Role not deleted');
          res.sendStatus(404);
        });
    });
};
