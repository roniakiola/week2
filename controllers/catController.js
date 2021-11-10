'use strict';

const { getAllCats, getCat, addCat, updateCat, deleteCat } = require('../models/catModel');
const { httpError } = require('../utils/errors');

const cat_list_get = async (req, res, next) => {
  try {
    const cats = await getAllCats(next);
    if (cats.length > 0) {
      res.json(cats);
    } else {
      next('No cats found', 404);
    }
  } catch (e) {
    console.log('cat_list_get error', e.message);
    next(httpError('internal server error', 500));
  }
};

const cat_get = async (req, res, next) => {
  try {
    const vastaus = await getCat(req.params.id, next);
    if (vastaus.length > 0) {
      res.json(vastaus.pop());
    } else {
      next(httpError('No cat found', 404));
    }
  } catch (e) {
    console.log('cat_get error', e.message);
    next(httpError('internal server error', 500));
  }
};

const cat_post = async (req, res, next) => {
  try {
    console.log('lomakkeesta', req.body);
    const { name, weight, owner, birthdate } = req.body;
    const tulos = await addCat(name, weight, owner, req.file.filename, birthdate, next);
    if (tulos.affectedRows > 0) {
      res.json({
        message: 'cat added',
        cat_id: tulos.insertId,
      });
    } else {
      next(httpError('No cat inserted', 400));
    }
  } catch (e) {
    console.log('cat_post error', e.message);
    next(httpError('internal server error', 500));
  }
};

const cat_update_put = async (req, res, next) => {
  try {
    console.log('cat_update_put', req.body);
    //date YYYY-MM-DD
    const { name, weight, owner, birthdate, id } = req.body;
    const result = await updateCat(name, weight, owner, birthdate, id, next);
    if (result.affectedRows > 0){
      res.json(result);
    } else {
      next(httpError('No cat updated', 400));
    }
  } catch (e){
    console.log('cat_update_put error', e.message);
    next(httpError('internal server error', 500));
  }
};

const cat_delete = async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await deleteCat(req.params.id, next);
    if (result.affectedRows > 0) {
      res.json({
        message: 'cat deleted'
      });
    } else {
      next(httpError('Cat not deleted', 400));
    }
  } catch (e) {
    console.log('cat_delete error', e.message);
    next(httpError('internal server error', 500));
  }
};

module.exports = {
  cat_list_get,
  cat_get,
  cat_post,
  cat_update_put,
  cat_delete
};