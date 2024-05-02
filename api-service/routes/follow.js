const express = require("express");
const { Follow } = require("../models");
const { handleRoute } = require("./handler");
const Joi = require('joi');
const route = express.Router();

const followSchema = Joi.object({
    userId: Joi.number().required(),
    artistId: Joi.number().required()
});

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

const getAllFollows = async () => {
    return await Follow.findAll();
}

const getFollowById = async (id) => {
    return await Follow.findByPk(id);
}

const createFollow = async (followData) => {
    return await Follow.create(followData);
}

const updateFollow = async (id, followData) => {
    const follow = await Follow.findByPk(id);
    follow.userId = followData.userId;
    follow.artistId = followData.artistId;
    await follow.save();
    return follow;
}

const deleteFollow = async (id) => {
    const follow = await Follow.findByPk(id);
    await follow.destroy();
    return follow.id;
}

route.get("/", async (req, res) => {
    await handleRoute(req, res, getAllFollows);
});

route.get("/:id", async (req, res) => {
    await handleRoute(req, res, getFollowById);
});

route.post("/", async (req, res) => {
    const { error } = followSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    await handleRoute(req, res, createFollow);
});

route.put("/:id", async (req, res) => {
    await handleRoute(req, res, updateFollow);
});

route.delete("/:id", async (req, res) => {
    await handleRoute(req, res, deleteFollow);
});