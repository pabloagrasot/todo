const express = require('express')
import controllers from '../controlers/users'
import middlewares from '../middlewares/verify.user'

const router = express.Router()

router.get('/users/acceso', function (req, res) {
    res.send('Accede');
  });

router.get('/users/registro', function (req, res) {
  res.render('registro.pug')
  });


  router.post('/users/registro', 
    middlewares.verifyUser,
	  controllers.signUp,
    function (req, res) {
    console.log(req.body)
    res.send('Registrado');
  });
module.exports = router