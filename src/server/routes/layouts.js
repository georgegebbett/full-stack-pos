const bodyParser = require('body-parser');
const { ItemLayout } = require('../db-setup');

const newLayoutArray = Array.from(Array(30), () => ({ type: 'blank' }));
const betterLayoutArray = (`${Array(30)}`).split(',').map(function () { return { key: this[0]++, content: { type: 'blank' } }; }, [0]);


module.exports = function (app) {
  app.route('/api/layouts/:layoutId')
    .get((req, res) => {
      ItemLayout.findById(req.params.layoutId)
        .then((foundLayout) => {
          res.json(foundLayout);
        });
    })
    .delete((req, res) => {
      ItemLayout.findByIdAndDelete(req.params.layoutId)
        .then(() => {
          res.sendStatus(200);
        });
    })
    .put((req, res) => {
      bodyParser.json();
      ItemLayout.findByIdAndUpdate(
        req.params.layoutId,
        { name: req.body.name },
        { new: true }
      )
        .then((updatedLayout) => {
          res.json(updatedLayout);
        });
    });

  app.route('/api/layouts')
    .get((req, res) => {
      ItemLayout.find({})
        .then((foundLayouts) => {
          res.json(foundLayouts);
        });
    })
    .post((req, res) => {
      bodyParser.json();
      console.log(newLayoutArray);
      ItemLayout.create({
        name: req.body.name,
        isPrimary: false,
        items: newLayoutArray
      })
        .then((createdLayout) => {
          res.json(createdLayout);
        });
    });
};
