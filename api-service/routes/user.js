const express = require("express");
const { User, UserSettings } = require("../models");
const { handleRoute } = require("./handler/handler");
const Joi = require('joi');
const { verifyTokenUser, verifyTokenAdmin } = require('../../common-utils/modules/accessToken');
const route = express.Router();

const userSchema = Joi.object({
    username: Joi.string().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    countryId: Joi.number().required(),
    roleId: Joi.number().required()
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
    const user = await User.create(userData);
    await createDefaultSettings(user.id);
    return user;
};

const updateUser = async (id, userData) => {
    const user = await User.findByPk(id);
    user.username = userData.username;
    user.firstname = userData.firstname;
    user.lastname = userData.lastname;
    user.email = userData.email;
    await user.save();
    return user;
}

const deleteUser = async (id) => {
    const user = await User.findByPk(id);
    if (!user) {
        throw new Error('User not found');
    }

    const userSettings = await UserSettings.findOne({ where: { userId: id } });
    if (userSettings) {
        await userSettings.destroy();
    }

    await user.destroy();
    return user.id;
}

const createDefaultSettings = async (userId) => {
    const defaultSettings = {
        userId: userId,
        language: 'EN',
        theme: 1
    };
    await UserSettings.create(defaultSettings);
};

route.get("/", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, getAllUsers);
});

route.get("/:id", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, getUserById);
});

route.post("/", verifyTokenAdmin(), async (req, res) => {
    const { error } = userSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    await handleRoute(req, res, createUser);
});
//TODO: Change to verifyService
route.put("/:id",  async (req, res) => {
    await handleRoute(req, res, updateUser);
});

route.delete("/:id", verifyTokenAdmin(),  async (req, res) => {
    await handleRoute(req, res, deleteUser);
});