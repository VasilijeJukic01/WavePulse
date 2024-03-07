const express = require("express");
const { SongTag } = require("../models");
const { handleRoute } = require("./handler");
const Joi = require('joi');
const route = express.Router();

const songTagSchema = Joi.object({
    tag: Joi.string().required(),
    songId: Joi.number().required()
});

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

const getAllSongTags = async () => {
    return await SongTag.findAll();
}

const getSongTagById = async (id) => {
    return await SongTag.findByPk(id);
}

const createSongTag = async (songTagData) => {
    return await SongTag.create(songTagData);
}

const updateSongTag = async (id, songTagData) => {
    const songTag = await SongTag.findByPk(id);
    songTag.tag = songTagData.tag;
    songTag.songId = songTagData.songId;
    await songTag.save();
    return songTag;
}

const deleteSongTag = async (id) => {
    const songTag = await SongTag.findByPk(id);
    await songTag.destroy();
    return songTag.id;
}

route.get("/", async (req, res) => {
    await handleRoute(req, res, getAllSongTags);
});

route.get("/:id", async (req, res) => {
    await handleRoute(req, res, getSongTagById);
});

route.post("/", async (req, res) => {
    const { error } = songTagSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    await handleRoute(req, res, createSongTag);
});

route.put("/:id", async (req, res) => {
    await handleRoute(req, res, updateSongTag);
});

route.delete("/:id", async (req, res) => {
    await handleRoute(req, res, deleteSongTag);
});