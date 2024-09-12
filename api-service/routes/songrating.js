const express = require("express");
const { SongRating } = require("../models");
const { handleRoute } = require("./handler/handler");
const Joi = require('joi');
const { verifyTokenUser, verifyTokenAdmin } = require('../../common-utils/modules/accessToken');
const route = express.Router();

const songRatingSchema = Joi.object({
    rate: Joi.number().required(),
    userId: Joi.number().required(),
    songId: Joi.number().required()
});

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

const getAllSongRatings = async () => {
    return await SongRating.findAll();
}

const getSongRatingById = async (id) => {
    return await SongRating.findByPk(id);
}

const createSongRating = async (songRatingData) => {
    return await SongRating.create(songRatingData);
}

const updateSongRating = async (id, songRatingData) => {
    const songRating = await SongRating.findByPk(id);
    songRating.rate = songRatingData.rate;
    songRating.userId = songRatingData.userId;
    songRating.songId = songRatingData.songId;
    await songRating.save();
    return songRating;
}

const deleteSongRating = async (id) => {
    const songRating = await SongRating.findByPk(id);
    await songRating.destroy();
    return songRating.id;
}

route.get("/", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, getAllSongRatings);
});

route.get("/:id", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, getSongRatingById);
});

route.post("/", verifyTokenUser(), async (req, res) => {
    const { error } = songRatingSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    await handleRoute(req, res, createSongRating);
});

route.put("/:id", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, updateSongRating);
});

route.delete("/:id", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, deleteSongRating);
});

