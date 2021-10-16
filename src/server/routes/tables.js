const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mathjs = require('mathjs');

const axios = require('axios');
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
      } else if (req.query.open === 'false') {
        Table.find({ open: false })
          .sort({ closeTime: 'desc' })
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
    })
    .delete((req, res) => {
      Table.deleteMany({})
        .then(() => {
          res.sendStatus(418);
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
          foundTable.totalPrice = mathjs.round(foundTable.totalPrice + req.body.orderTotal, 2);
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
    .get((req, res) => {
      Table.findById(req.params.tableId)
        .then((foundTable) => {
          res.json(foundTable.payments);
        });
    })
    .post((req, res) => {
      bodyParser.json();
      Table.findById(req.params.tableId)
        .then((foundTable) => {
          foundTable.totalPrice = mathjs.round(foundTable.totalPrice - req.body.tenderAmount, 2);
          foundTable.payments = [
            ...foundTable.payments,
            {
              type: req.body.tenderType,
              amount: req.body.tenderAmount
            }
          ];
          if (foundTable.totalPrice <= 0) {
            foundTable.open = false;
            foundTable.closeTime = new Date();
            foundTable.save();
            Table.create({
              tableNumber: foundTable.tableNumber,
              orders: [],
              totalPrice: 0,
              open: true,
              openTime: new Date()
            })
              .then(() => {
                res.json({
                  'table closed':
                    {
                      changeGiven: (!(mathjs.abs(foundTable.totalPrice) === 0)),
                      change: mathjs.abs(foundTable.totalPrice)
                    }
                });
              })
              .catch(() => {
                res.sendStatus(209);
              });
          } else {
            foundTable.save();
            res.sendStatus(200);
          }
        })
        .catch(() => {
          res.sendStatus(500);
        });
    });
};
