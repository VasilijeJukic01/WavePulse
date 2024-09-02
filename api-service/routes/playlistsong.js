const express = require("express");
const { PlaylistSong } = require("../models");
const { handleRoute } = require("./handler/handler");
const Joi = require('joi');
const { verifyTokenUser, verifyTokenAdmin } = require('../../common-utils/modules/accessToken');
const route = express.Router();

const playlistSongSchema = Joi.object({
    playlistId: Joi.number().required(),
    songId: Joi.number().required()
});

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

const getAllPlaylistSongs = async () => {
    return await PlaylistSong.findAll();
}

const getPlaylistSongById = async (id) => {
    return await PlaylistSong.findByPk(id);
}

const createPlaylistSong = async (playlistSongData) => {
    return await PlaylistSong.create(playlistSongData);
}

const updatePlaylistSong = async (id, playlistSongData) => {
    const playlistSong = await PlaylistSong.findByPk(id);
    playlistSong.playlistId = playlistSongData.playlistId;
    playlistSong.songId = playlistSongData.songId;
    await playlistSong.save();
    return playlistSong;
}

const deletePlaylistSong = async (id) => {
    const playlistSong = await PlaylistSong.findByPk(id);
    await playlistSong.destroy();
    return playlistSong.id;
}

route.get("/", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, getAllPlaylistSongs);
});

route.get("/:id", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, getPlaylistSongById);
});

route.post("/", verifyTokenUser(), async (req, res) => {
    const { error } = playlistSongSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    await handleRoute(req, res, createPlaylistSong);
});

route.put("/:id", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, updatePlaylistSong);
});