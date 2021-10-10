const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { Table, Order } = require('../db-setup');

module.exports = function (app) {
  app.route('/api/tables/:tableNumber')
    .get(async (req, res) => {
      console.log(req.params.tableNumber);
      const foundTable = await Table.findOne({ tableNumber: req.params.tableNumber });
      res.json(foundTable);
    })
    .post(async (req, res) => {
      console.log(req.params.tableNumber);
      await Table.create({ tableNumber: req.params.tableNumber, orders: [], totalPrice: 0 });
      res.sendStatus(201);
    });
};
