const bodyParser = require('body-parser');
const { OrderItem, ItemCategory } = require('../db-setup');

module.exports = function (app) {
  app.use(bodyParser({ extended: false }));
  app.route('/api/items')
    .get(async (req, res) => {
      const foundItems = await OrderItem.find({});
      res.json(foundItems);
    })
    .post(async (req, res) => {
      bodyParser.json();
      console.log(req.body);
      await OrderItem.create({ name: req.body.name, price: req.body.price, category: req.body.category });
      res.sendStatus(201);
    })
    .delete(async (req, res) => {
      bodyParser.json();
      console.log(req.body);
      const deletedItem = await OrderItem.findByIdAndDelete(req.body.itemId);
      console.log(deletedItem);
      res.json(deletedItem);
    });

  app.route('/api/items/categories')
    .get(async (req, res) => {
      const foundCats = await ItemCategory.find({});
      res.json(foundCats);
    })
    .post(async (req, res) => {
      bodyParser.json();
      await ItemCategory.create({ name: req.body.name });
      res.sendStatus(201);
    });
};
