'use strict';
const { httpError } = require('../utils/errors');
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllCats = async () => {
  try {
    const [rows] = await promisePool.execute('SELECT * FROM wop_cat');
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

const getCat = async (id, next) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT * FROM wop_cat WHERE cat_id = ?',
      [id]
    );
    return rows;
  } catch (e) {
    console.error('getCat error', e.message);
    next(httpError('Database error', 500));
  }
};


const addCat = async (name, weight, owner, filename, birthdate, next) => {
  try{
    const [rows] = await promisePool.execute(
      'INSERT INTO wop_cat (name, weight, owner, filename, birthdate) VALUES (?, ?, ?, ?, ?)', [name, weight, owner, filename, birthdate]
    );
    return rows;
  } catch (e){
    console.error('addCat error', e.message);
    next(httpError('Database error', 500));
  }
};

const updateCat = async (name, weight, owner, birthdate, id, next) => {
  try {
    const [rows] = await promisePool.execute(
      'UPDATE wop_cat SET name = ?, weight = ?, owner = ?, birthdate = ? WHERE cat_id = ?', [name, weight, owner, birthdate, id]
    );
    return rows;
  } catch (e) {
    console.error('updateCat error', e.message);
    next(httpError('Database error', 500));
  }
};

const deleteCat = async (id, next) => {
  try {
    const [rows] = await promisePool.execute(
      'DELETE FROM wop_cat WHERE cat_id = ?', [id]
    );
    return rows;
  } catch (e){
    console.error('deleteCat error', e.message);
    next(httpError('Database error', 500));
  }
};

module.exports = {
  getAllCats,
  getCat,
  addCat,
  updateCat,
  deleteCat
};