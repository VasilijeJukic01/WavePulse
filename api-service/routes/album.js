const express = require("express");
const { Album } = require("../models");
const { handleRoute } = require("./handler/handler");
const Joi = require('joi');
const { verifyTokenUser, verifyTokenAdmin } = require('../../common-utils/modules/accessToken');
const route = express.Router();

const albumSchema = Joi.object({
    name: Joi.string().required(),
    year: Joi.number().required(),
    songNumber: Joi.number().required(),
    score: Joi.number().required(),
    artistId: Joi.number().required()
});

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.get("/", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, getAllAlbums);
});

route.get("/:id", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, getAlbumById);
});

route.post("/", verifyTokenAdmin(), async (req, res) => {
    const { error } = albumSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    await handleRoute(req, res, createAlbum);
});

route.put("/:id", verifyTokenAdmin(), async (req, res) => {
    await handleRoute(req, res, updateAlbum);
});

route.delete("/:id", verifyTokenAdmin(), async (req, res) => {
    await handleRoute(req, res, deleteAlbum);
});

module.exports = route;

const getAllAlbums = async () => {
    return await Album.findAll();
}

const getAlbumById = async (id) => {
    return await Album.findByPk(id);
}

const createAlbum = async (albumData) => {
    return await Album.create(albumData);
}

const updateAlbum = async (id, albumData) => {
    const album = await Album.findByPk(id);
    album.name = albumData.name;
    album.year = albumData.year;
    album.songNumber = albumData.songNumber;
    album.score = albumData.score;
    album.artistId = albumData.artistId;
    await album.save();
    return album;
}

const deleteAlbum = async (id) => {
    const album = await Album.findByPk(id);
    await album.destroy();
    return album.id;
}