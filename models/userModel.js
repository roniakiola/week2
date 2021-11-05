'use strict';

const { httpError } = require('../utils/errors');
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllUsers = async () => {
  try {
    const [rows] = await promisePool.execute('SELECT user_id, name, email, role FROM wop_user');
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

const getUser = async (id) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT user_id, name, email, role FROM wop_user WHERE user_id = ?',
      [id]
    );
    return rows.pop();
  } catch (e) {
    console.error('error', e.message);
  }
};

const addUser = async (name, email, password, next) => {
  try {
    const [rows] = await promisePool.execute(
      'INSERT INTO wop_user (name, email, password) VALUES (?, ?, ?)', [name, email, password]
    );
    return rows;
  } catch (e) {
    console.error('addUser error', e.message);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  addUser
};