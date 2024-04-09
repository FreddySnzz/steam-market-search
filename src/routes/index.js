var express = require('express');
var RouterForIndex = express.Router();

const IndexController = require('../controllers/Index/IndexController');

RouterForIndex.get(
  '/',
  IndexController.search
);

module.exports = RouterForIndex;
