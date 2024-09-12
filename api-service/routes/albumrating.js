const express = require("express");
const { AlbumRating, Album} = require("../models");
const { handleRoute } = require("./handler/handler");
const { verifyTokenUser } = require('../../common-utils/modules/accessToken');
const Joi = require('joi');
const route = express.Router();

const albumRatingSchema = Joi.object({
    score: Joi.number().required(),
    albumId: Joi.number().required()
});

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

const getAllAlbumRatings = async () => {
    return await AlbumRating.findAll();
}

const getAlbumRatingById = async (id) => {
    return await AlbumRating.findByPk(id);
}

const createAlbumRating = async (albumRatingData) => {
    return await AlbumRating.create(albumRatingData);
}

const updateAlbumRating = async (id, albumRatingData) => {
    const albumRating = await AlbumRating.findByPk(id);
    albumRating.score = albumRatingData.score;
    albumRating.albumId = albumRatingData.albumId;
    await albumRating.save();
    return albumRating;
}

const deleteAlbumRating = async (id) => {
    const albumRating = await AlbumRating.findByPk(id);
    await albumRating.destroy();
    return albumRating.id;
}

route.get("/", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, getAllAlbumRatings);
});

route.get("/:id", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, getAlbumRatingById);
});

route.post("/", verifyTokenUser(),async (req, res) => {
    const { error } = albumRatingSchema.validate(req.body);
    if (error) res.status(400).send(error.details[0].message);
    await handleRoute(req, res, createAlbumRating);
});

route.put("/:id", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, updateAlbumRating);
});

route.delete("/:id", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, deleteAlbumRating);
});