const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { Table, Order } = require('../db-setup');

module.exports = function (app) {
  app.route('/api/tables/:tableId')
    .get(async (req, res) => {
      console.log(req.params.tableId);
      Table.findById(req.params.tableId)
        .then((foundTable) => {
          res.json(foundTable);
        })
        .catch(() => {
          res.sendStatus(404);
        });
    });


  app.route('/api/tables')
    .get((req, res) => {
      Table.find({}).sort({tableNumber: 'asc' })
        .then((tables) => {
          res.json(tables);
        })
        .catch(() => {
          res.sendStatus(404);
        });
    })
    .post(async (req, res) => {
      bodyParser.json();
      console.log(req.body.tableNumber);
      Table.find({ tableNumber: req.body.tableNumber, open: true })
        .then((foundTable) => {
          if (foundTable.length > 0) {
            res.json({
              'Could not create table': {
                error: 'Open table already exists with this number'
              }
            });
          } else {
            Table.create({
              tableNumber: req.body.tableNumber, orders: [], totalPrice: 0, open: true
            })
              .then(() => {
                res.sendStatus(201);
              })
              .catch(() => {
                res.sendStatus(209);
              });
          }
        });
    });

  app.route('/api/tables/:tableId/orders')
    .post((req, res) => {
      bodyParser.json();
      Table.findById(req.params.tableId)
        .then(foundTable => {
          Order.create({
            items: req.body.orderItems
          })
            .then(createdOrder => {
              foundTable.orders = [...foundTable.orders, createdOrder._id];
              foundTable.totalPrice = foundTable.totalPrice + req.body.orderTotal;
              foundTable.save()
                .then(() => {
                  res.sendStatus(201);
                });
            })
            .catch(() => {
              res.sendStatus(500);
            });
        })
        .catch(() => {
          res.sendStatus(500);
        });
    });
};
