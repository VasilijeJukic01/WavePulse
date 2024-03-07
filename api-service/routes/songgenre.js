const express = require("express");
const { SongGenre } = require("../models");
const { handleRoute } = require("./handler");
const Joi = require('joi');
const route = express.Router();

const songGenreSchema = Joi.object({
    songId: Joi.number().required(),
    genreId: Joi.number().required()
});

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

const getAllSongGenres = async () => {
    return await SongGenre.findAll();
}

const getSongGenreById = async (id) => {
    return await SongGenre.findByPk(id);
}

const createSongGenre = async (songGenreData) => {
    return await SongGenre.create(songGenreData);
}

const updateSongGenre = async (id, songGenreData) => {
    const songGenre = await SongGenre.findByPk(id);
    songGenre.songId = songGenreData.songId;
    songGenre.genreId = songGenreData.genreId;
    await songGenre.save();
    return songGenre;
}

const deleteSongGenre = async (id) => {
    const songGenre = await SongGenre.findByPk(id);
    await songGenre.destroy();
    return songGenre.id;
}

route.get("/", async (req, res) => {
    await handleRoute(req, res, getAllSongGenres);
});

route.get("/:id", async (req, res) => {
    await handleRoute(req, res, getSongGenreById);
});

route.post("/", async (req, res) => {
    const { error } = songGenreSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    await handleRoute(req, res, createSongGenre);
});

route.put("/:id", async (req, res) => {
    await handleRoute(req, res, updateSongGenre);
});

route.delete("/:id", async (req, res) => {
    await handleRoute(req, res, deleteSongGenre);
});

