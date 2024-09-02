const express = require("express");
const { UserSettings } = require("../models");
const { handleRoute } = require("./handler/handler");
const { verifyTokenUser } = require('../../common-utils/modules/accessToken');
const Joi = require('joi');
const route = express.Router();

const userSettingsSchema = Joi.object({
    userId: Joi.number().required(),
    language: Joi.string().required(),
    theme: Joi.number().required()
});

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

const getAllUserSettings = async () => {
    return await UserSettings.findAll();
}

const getUserSettingsById = async (id) => {
    return await UserSettings.findByPk(id);
}

const createUserSettings = async (userSettingsData) => {
    return await UserSettings.create(userSettingsData);
}

const updateUserSettings = async (id, userSettingsData) => {
    const userSettings = await UserSettings.findByPk(id);
    userSettings.userId = userSettingsData.userId;
    userSettings.language = userSettingsData.language;
    userSettings.theme = userSettingsData.theme;
    await userSettings.save();
    return userSettings;
}

const deleteUserSettings = async (id) => {
    const userSettings = await UserSettings.findByPk(id);
    await userSettings.destroy();
    return userSettings.id;
}

route.get("/", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, getAllUserSettings);
});

route.get("/:id", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, getUserSettingsById);
});

route.post("/", verifyTokenUser(), async (req, res) => {
    const { error } = userSettingsSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    await handleRoute(req, res, createUserSettings);
});

route.put("/:id", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, updateUserSettings);
});

route.delete("/:id", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, deleteUserSettings);
});