const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { Table, Order } = require('../db-setup');

const axios = require('axios');

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
      console.log(req.query);
      if (req.query.open === 'true') {
        Table.find({ open: true })
          .sort({ tableNumber: 'asc' })
          .then((tables) => {
            res.json(tables);
          })
          .catch(() => {
            res.sendStatus(404);
          });
      } else {
        Table.find({})
          .sort({ tableNumber: 'asc' })
          .then((tables) => {
            res.json(tables);
          })
          .catch(() => {
            res.sendStatus(404);
          });
      }
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
              tableNumber: req.body.tableNumber,
              orders: [],
              totalPrice: 0,
              open: true,
              openTime: new Date()
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
    .get((req, res) => {
      Table.findById(req.params.tableId)
        .then((foundTable) => {
          res.json(foundTable.orders);
        })
        .catch(() => {
          res.sendStatus(404);
        });
    })
    .post((req, res) => {
      bodyParser.json();
      console.log(req.body);
      Table.findById(req.params.tableId)
        .then((foundTable) => {
          foundTable.orders = [...foundTable.orders, req.body.orderItems];
          foundTable.totalPrice += req.body.orderTotal;
          foundTable.save()
            .then(() => {
              res.sendStatus(200);
            });
        })
        .catch(() => {
          res.sendStatus(500);
        });
    });

  app.route('/api/tables/:tableId/tender')
    .post((req, res) => {
      bodyParser.json();
      Table.findById(req.params.tableId)
        .then((foundTable) => {
          foundTable.totalPrice -= req.body.tenderAmount;
          if (foundTable.totalPrice <= 0) {
            foundTable.open = false;
            foundTable.closeTime = new Date();
            foundTable.save();
            axios.post('/api/tables', {tableNumber: foundTable.tableNumber})
              .then((res1) => {
                console.log(res1);
                res.json({ success: 'table closed' });
              });
          } else {
            res.sendStatus(200);
          }
        })
        .catch(() => {
          res.sendStatus(500);
        });
    });
};
