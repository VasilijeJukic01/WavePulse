const express = require("express");
const { Playlist } = require("../models");
const { handleRoute } = require("./handler/handler");
const Joi = require('joi');
const { verifyTokenUser } = require('../../common-utils/modules/accessToken');
const route = express.Router();

const playlistSchema = Joi.object({
    name: Joi.string().required(),
    userId: Joi.number().required()
});

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

const getAllPlaylists = async () => {
    return await Playlist.findAll();
}

const getPlaylistById = async (id) => {
    return await Playlist.findByPk(id);
}

const createPlaylist = async (playlistData) => {
    return await Playlist.create(playlistData);
}

const updatePlaylist = async (id, playlistData) => {
    const playlist = await Playlist.findByPk(id);
    playlist.name = playlistData.name;
    playlist.userId = playlistData.userId;
    await playlist.save();
    return playlist;
}

const deletePlaylist = async (id) => {
    const playlist = await Playlist.findByPk(id);
    await playlist.destroy();
    return playlist.id;
}

route.get("/", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, getAllPlaylists);
});

route.get("/:id", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, getPlaylistById);
});

route.post("/", verifyTokenUser(), async (req, res) => {
    const { error } = playlistSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    await handleRoute(req, res, createPlaylist);
});

route.put("/:id", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, updatePlaylist);
});

route.delete("/:id", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, deletePlaylist);
});