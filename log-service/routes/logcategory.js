const express = require("express");
const LogCategory = require("../models/logcategory");
const { handleRoute } = require("./handler/handler");
const { verifyToken } = require('../modules/serviceToken');
const { verifyTokenAdmin } = require('../../common-utils/modules/accessToken');
const Joi = require('joi');
const route = express.Router();

const logCategorySchema = Joi.object({
    name: Joi.string().required()
});

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

const getAllLogCategories = async () => {
    return LogCategory.find();
}

const getLogCategoryById = async (id) => {
    return LogCategory.findById(id);
}

const createLogCategory = async (logCategoryData) => {
    return LogCategory.create(logCategoryData);
}

const updateLogCategory = async (id, logCategoryData) => {
    return LogCategory.findByIdAndUpdate(id, logCategoryData, { new: true });
}

const deleteLogCategory = async (id) => {
    return LogCategory.findByIdAndDelete(id);
}

route.get("/", verifyTokenAdmin(), async (req, res) => {
    await handleRoute(req, res, getAllLogCategories);
});

route.get("/:id", verifyTokenAdmin(), async (req, res) => {
    await handleRoute(req, res, getLogCategoryById);
});

route.post("/", verifyToken("logService"), async (req, res) => {
    const { error } = logCategorySchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    await handleRoute(req, res, createLogCategory);
});

route.put("/:id", verifyTokenAdmin(), async (req, res) => {
    await handleRoute(req, res, updateLogCategory);
});

route.delete("/:id", verifyTokenAdmin(), async (req, res) => {
    await handleRoute(req, res, deleteLogCategory);
});