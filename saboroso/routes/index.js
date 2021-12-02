var conn = require('./../inc/db');
var menus = require('./../inc/menus');
var reservations = require('./../inc/reservations');
var contacts = require('./../inc/contacts');
var emails = require('./../inc/emails');
var validation = require('./../inc/dataValidation');
var express = require('express');
var router = express.Router();

/* GET home page. */


module.exports = function(io){

  router.get('/', function(req, res, next) {

    menus.getMenus().then(results => {
  
      res.render('index', { 
        title: 'Restaurante Saboroso!',
        menus: results,
        isHome: true
      });
  
    });
  });
  
  router.get('/contacts', function(req, res, next){
  
    res.render('contacts', { 
      title: 'Contatos - Restaurante Saboroso!',
      background: 'images/img_bg_3.jpg',
      h1: 'Diga um oi!',
      isHome: false
    });
  });
  
  router.post('/contacts', function(req, res, next){
  
    let isValid = validation.isValidContact(req.body);
  
    if (isValid !== true) {
  
      contacts.render(req, res, isValid);
    } else {

      contacts.save(req.body).then(results => {
        
        io.emit('dashboard update');
        req.body = {};
        contacts.render(req, res, null, "Mensagem enviada!");
  
      }).catch(err => {
  
        contacts.render(req, res, err.message);
      });
    }
  });
  
  router.get('/menus', function(req, res, next){
  
    menus.getMenus().then(results => {
  
      res.render('menus', { 
        title: 'Menus - Restaurante Saboroso!',
        background: 'images/img_bg_1.jpg',
        h1: 'Saboreie o nosso menu!',
        menus: results,
        isHome: false
      });
  
    });
  });
  
  router.get('/reservations', function(req, res, next){
  
    reservations.render(req, res);
  
  });
  
  router.post('/reservations', function(req, res, next){
  
    let isValid = validation.isValid(req.body);
  
    if (isValid !== true) {
  
      reservations.render(req, res, isValid);
    } else {

      reservations.save(req.body).then(results => {
        
        io.emit('dashboard update');
        req.body = {};
        reservations.render(req, res, null, "Reserva realizada!");
  
      }).catch(err => {
  
        reservations.render(req, res, err.message);
      });
    }
  });
  
  router.get('/services', function(req, res, next){
  
    res.render('services', { 
      title: 'Serviços - Restaurante Saboroso!',
      background: 'images/img_bg_1.jpg',
      h1: 'É um prazer poder servir!',
      isHome: false
    });
  });
  
  router.post('/subscribe', function(req, res, next) {
  
    emails.save(req).then(results => {
      
      res.send(results);
      
    }).catch(err => {
  
      res.send(err);
    });
  });

  return router;
};
