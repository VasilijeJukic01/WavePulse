const express = require("express");
const { LogCategory } = require("../models");
const { handleRoute } = require("./handler//handler");
const Joi = require('joi');
const route = express.Router();

const countrySchema = Joi.object({
    name: Joi.string().required()
});

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

const getAllLogCategories = async () => {
    return await LogCategory.findAll();
}

const getLogCategoryById = async (id) => {
    return await LogCategory.findByPk(id);
}

const createLogCategory = async (logCategoryData) => {
    return await LogCategory.create(logCategoryData);
}

const updateLogCategory = async (id, logCategoryData) => {
    const logCategory = await LogCategory.findByPk(id);
    logCategory.name = logCategoryData.name;
    await logCategory.save();
    return logCategory;
}

const deleteLogCategory = async (id) => {
    const logCategory = await LogCategory.findByPk(id);
    await logCategory.destroy();
    return logCategory.id;
}

route.get("/", async (req, res) => {
    await handleRoute(req, res, getAllLogCategories);
});

route.get("/:id", async (req, res) => {
    await handleRoute(req, res, getLogCategoryById);
});

route.post("/", async (req, res) => {
    const { error } = countrySchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    await handleRoute(req, res, createLogCategory);
});

route.put("/:id", async (req, res) => {
    await handleRoute(req, res, updateLogCategory);
});

route.delete("/:id", async (req, res) => {
    await handleRoute(req, res, deleteLogCategory);
});