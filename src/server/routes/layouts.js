const bodyParser = require('body-parser');
const { ItemLayout } = require('../db-setup');

module.exports = function (app) {
  app.route('/api/layouts')
    .get((req, res) => {
      ItemLayout.find({})
        .then((foundLayouts) => {
          res.json(foundLayouts);
        });
    })
    .post((req, res) => {
      bodyParser.json();
      ItemLayout.create({name: req.body.name, layout: []})
        .then((createdLayout) => {
          res.json(createdLayout);
        });
    });
};
