const express = require('express')
const router = express.Router()


router.get('/todo', function (req, res) {
    res.send('todo');
  });

module.exports = router