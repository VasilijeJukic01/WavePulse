const express = require("express");
const { SongRating } = require("../models");
const { handleRoute } = require("./handler");
const Joi = require('joi');
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

route.get("/", async (req, res) => {
    await handleRoute(req, res, getAllSongRatings);
});

route.get("/:id", async (req, res) => {
    await handleRoute(req, res, getSongRatingById);
});

route.post("/", async (req, res) => {
    const { error } = songRatingSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    await handleRoute(req, res, createSongRating);
});

route.put("/:id", async (req, res) => {
    await handleRoute(req, res, updateSongRating);
});

route.delete("/:id", async (req, res) => {
    await handleRoute(req, res, deleteSongRating);
});

