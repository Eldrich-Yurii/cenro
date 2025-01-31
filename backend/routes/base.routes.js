module.exports = (app) => {
    const express = require('express');
    const router = express.Router();

    const base = require('../controllers/base.controller')

    // create new 
    router.post('/', base.create);

    // get all
    router.get('/', base.findAll);

    // get one via id
    router.get('/:id', base.findOne);

    // update one 
    router.put('/:id', base.update);

    // delete all 
    router.delete('/', base.deleteAll);

    // delete one via id
    router.delete('/:id', base.deleteOne);

    app.use('/api/baseRoute', router)
}