module.exports = (app) => {
    const express = require('express');
    const router = express.Router();

    const base = require('../controllers/base.controller')

    router.get('/', base.findAll)

    app.use('/api/baseRoute', router)
}