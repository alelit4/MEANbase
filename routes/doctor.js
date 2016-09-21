var express = require('express');
var router = express.Router();
var doctorController = require('../app/controllers/doctor');


/*
 * GET ALL
 */
router.get('/all', function(req, res) {
    doctorController.list(req, res);
});

/*
 * GET
 */
router.get('/:id', function(req, res) {
    doctorController.show(req, res);
});

/*
 * POST
 */
router.post('/', function(req, res) {
    doctorController.create(req, res);
});

/*
 * PUT
 */
router.put('/:id', function(req, res) {
    doctorController.update(req, res);
});

/*
 * DELETE
 */
router.delete('/:id', function(req, res) {
    doctorController.remove(req, res);
});

/*
 * DOCTORS VIEW
 */
router.get('/', function(req, res) {
    if (req.isAuthenticated()){
        res.render('doctor/index');
    }else{
        res.render('login/home');
    }
});


module.exports = router;
