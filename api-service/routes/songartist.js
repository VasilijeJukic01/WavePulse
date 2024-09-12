const express = require("express");
const { SongArtist } = require("../models");
const { handleRoute } = require("./handler/handler");
const Joi = require('joi');
const { verifyTokenUser, verifyTokenArtist } = require('../../common-utils/modules/accessToken');
const route = express.Router();

const songArtistSchema = Joi.object({
    songId: Joi.number().required(),
    artistId: Joi.number().required()
});

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

const getAllSongArtists = async () => {
    return await SongArtist.findAll();
}

const getSongArtistById = async (id) => {
    return await SongArtist.findByPk(id);
}

const crateSongArtist = async (songArtistData) => {
    return await SongArtist.create(songArtistData);
}

const updateSongArtist = async (id, songArtistData) => {
    const songArtist = await SongArtist.findByPk(id);
    songArtist.songId = songArtistData.songId;
    songArtist.artistId = songArtistData.artistId;
    await songArtist.save();
    return songArtist;
}

const deleteSongArtist = async (id) => {
    const songArtist = await SongArtist.findByPk(id);
    await songArtist.destroy();
    return songArtist.id;
}

route.get("/",  verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, getAllSongArtists);
});

route.get("/:id", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, getSongArtistById);
});

route.post("/", verifyTokenArtist(), async (req, res) => {
    const { error } = songArtistSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    await handleRoute(req, res, crateSongArtist);
});

route.put("/:id", verifyTokenArtist(), async (req, res) => {
    await handleRoute(req, res, updateSongArtist);
});

route.delete("/:id", verifyTokenArtist, async (req, res) => {
    await handleRoute(req, res, deleteSongArtist);
});

