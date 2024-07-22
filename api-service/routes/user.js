const express = require("express");
const { User } = require("../models");
const { handleRoute } = require("./handler");
const Joi = require('joi');
const route = express.Router();

const userSchema = Joi.object({
    username: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    countryId: Joi.number().required(),
    role: Joi.string().required()
});

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

const getAllUsers = async () => {
    return await User.findAll();
}

const getUserById = async (id) => {
    return await User.findByPk(id);
}

const createUser = async (userData) => {
    return await User.create(userData);
}

const updateUser = async (id, userData) => {
    const user = await User.findByPk(id);
    user.username = userData.username;
    user.firstName = userData.firstName;
    user.lastName = userData.lastName;
    user.email = userData.email;
    user.countryId = userData.countryId;
    user.role = userData.role;
    await user.save();
    return user;
}

const deleteUser = async (id) => {
    const user = await User.findByPk(id);
    await user.destroy();
    return user.id;
}

route.get("/", async (req, res) => {
    await handleRoute(req, res, getAllUsers);
});

route.get("/:id", async (req, res) => {
    await handleRoute(req, res, getUserById);
});

route.post("/", async (req, res) => {
    const { error } = userSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    await handleRoute(req, res, createUser);
});

route.put("/:id", async (req, res) => {
    await handleRoute(req, res, updateUser);
});

route.delete("/:id", async (req, res) => {
    await handleRoute(req, res, deleteUser);
});