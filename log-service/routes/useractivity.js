const express = require("express");
const { UserActivity } = require("../models");
const { handleRoute } = require("./handler/handler");
const Joi = require('joi');
const route = express.Router();

const userActivitySchema = Joi.object({
    userId: Joi.number().required(),
    action: Joi.string().required(),
    timestamp: Joi.date().required(),
    context: Joi.object().optional()
});

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

const getAllUserActivities = async () => {
    return await UserActivity.findAll();
}

const getUserActivityById = async (id) => {
    return await UserActivity.findByPk(id);
}

const createUserActivity = async (userActivityData) => {
    return await UserActivity.create(userActivityData);
}

const updateUserActivity = async (id, userActivityData) => {
    const userActivity = await UserActivity.findByPk(id);
    userActivity.userId = userActivityData.userId;
    userActivity.action = userActivityData.action;
    userActivity.timestamp = userActivityData.timestamp;
    userActivity.context = userActivityData.context;
    await userActivity.save();
    return userActivity;
}

const deleteUserActivity = async (id) => {
    const userActivity = await UserActivity.findByPk(id);
    await userActivity.destroy();
    return userActivity.id;
}

route.get("/", async (req, res) => {
    await handleRoute(req, res, getAllUserActivities);
});

route.get("/:id", async (req, res) => {
    await handleRoute(req, res, getUserActivityById);
});

route.post("/", async (req, res) => {
    const { error } = userActivitySchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    await handleRoute(req, res, createUserActivity);
});

route.put("/:id", async (req, res) => {
    await handleRoute(req, res, updateUserActivity);
});

route.delete("/:id", async (req, res) => {
    await handleRoute(req, res, deleteUserActivity);
});