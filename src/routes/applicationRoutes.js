const express = require('express');
const router = express.Router();
const { 
  createApplication, 
  getAllApplications, 
  getApplicationById 
} = require('../controllers/applicationController');

router.post('/', createApplication);
router.get('/', getAllApplications);
router.get('/:id', getApplicationById);

module.exports = router;