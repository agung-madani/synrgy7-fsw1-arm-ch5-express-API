// routes/productsRouter.js
const router = require('express').Router();
const { getJobs } = require('../services/jobService.js');

router.get('/', getJobs);

module.exports = router;