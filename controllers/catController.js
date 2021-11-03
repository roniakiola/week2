'use strict';
// catController

const catModel = require('../models/catModel');

const {cats, getCat} = catModel;

const cat_list_get = (req, res) => {
    res.json(cats);
};

const cat_get = (req, res) => {
    const vastaus = getCat(req.params.id);
    res.json(vastaus);
    //lähetä yksi kissa
};

const cat_post = (req, res) => {
    console.log(req.file, req.body);
};

module.exports = {
    cat_list_get,
    cat_get,
    cat_post
}