const express = require("express");
const UserActivity = require("../models/useractivity");
const { handleRoute } = require("./handler/handler");
const { verifyToken } = require("../modules/serviceToken");
const { verifyTokenAdmin } = require('../../common-utils/modules/accessToken');
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
    return UserActivity.find();
}

const getUserActivityById = async (id) => {
    return UserActivity.findById(id);
}

const createUserActivity = async (userActivityData) => {
    return UserActivity.create(userActivityData);
}

const updateUserActivity = async (id, userActivityData) => {
    return UserActivity.findByIdAndUpdate(id, userActivityData, { new: true });
}

const deleteUserActivity = async (id) => {
    return UserActivity.findByIdAndDelete(id);
}

route.get("/", verifyTokenAdmin(), async (req, res) => {
    await handleRoute(req, res, getAllUserActivities);
});

route.get("/:id", verifyTokenAdmin(), async (req, res) => {
    await handleRoute(req, res, getUserActivityById);
});

route.post("/", verifyToken("logService"), async (req, res) => {
    const { error } = userActivitySchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    await handleRoute(req, res, createUserActivity);
});

route.put("/:id", verifyTokenAdmin(), async (req, res) => {
    await handleRoute(req, res, updateUserActivity);
});

route.delete("/:id", verifyTokenAdmin(), async (req, res) => {
    await handleRoute(req, res, deleteUserActivity);
});