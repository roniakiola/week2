'use strict';

const express = require('express');
const { body } = require('express-validator');
const multer = require('multer');

//check if file to be uploaded is IMAGE
const fileFilter = (req, file, cb) => {
  if(file.mimetype.includes('image')){
    cb(null, true);
  }else{
    cb(null, false);
  }
}
//upload and run fileFilter
const upload = multer({ dest: './uploads/', fileFilter });

const { cat_list_get, cat_get, cat_post, cat_update_put, cat_delete } = require('../controllers/catController');
const router = express.Router();

router.get('/', cat_list_get);

router.get('/:id', cat_get);

router.post('/',
  upload.single('cat'),
  body('name').notEmpty().escape(),
  body('birthdate').isDate(),
  body('weight').isNumeric(),
  body('owner').isNumeric(),
  cat_post);

router.put('/',
  body('name').notEmpty().escape(),
  body('birthdate').isDate(),
  body('weight').isNumeric(),
  body('owner').isNumeric(),
  cat_update_put);

router.delete('/:id', cat_delete);

module.exports = router;