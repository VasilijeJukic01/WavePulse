const express = require("express");
const { SongReview } = require("../models");
const { handleRoute } = require("./handler/handler");
const { verifyTokenUser } = require('../../common-utils/modules/accessToken');
const Joi = require('joi');
const route = express.Router();

const songReviewSchema = Joi.object({
    review: Joi.string().required(),
    likes: Joi.number(),
    dislikes: Joi.number(),
    userId: Joi.number().required(),
    songId: Joi.number().required()
});

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

const getAllSongReviews = async () => {
    return await SongReview.findAll();
}

const getSongReviewById = async (id) => {
    return await SongReview.findByPk(id);
}

const createSongReview = async (songReviewData) => {
    return await SongReview.create(songReviewData);
}

const updateSongReview = async (id, songReviewData) => {
    const songReview = await SongReview.findByPk(id);
    songReview.review = songReviewData.review;
    songReview.likes = songReviewData.likes;
    songReview.dislikes = songReviewData.dislikes;
    songReview.userId = songReviewData.userId;
    songReview.songId = songReviewData.songId;
    await songReview.save();
    return songReview;
}

const deleteSongReview = async (id) => {
    const songReview = await SongReview.findByPk(id);
    await songReview.destroy();
    return songReview.id;
}

route.get("/", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, getAllSongReviews);
});

route.get("/:id", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, getSongReviewById);
});

route.post("/", verifyTokenUser(), async (req, res) => {
    const { error } = songReviewSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    await handleRoute(req, res, createSongReview);
});

route.put("/:id", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, updateSongReview);
});

route.delete("/:id", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, deleteSongReview);
});
