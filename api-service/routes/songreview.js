const express = require("express");
const { SongReview, User } = require("../models");
const { handleRoute } = require("./handler/handler");
const { verifyTokenUser } = require('../../common-utils/modules/accessToken');
const { loadModel, isReviewToxic } = require('./handler/nlpFilter');
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

loadModel();

const getAllSongReviews = async () => {
    return await SongReview.findAll({
        include: [{
            model: User,
            attributes: ['username']
        }]
    });
}

const getSongReviewById = async (id) => {
    return await SongReview.findByPk(id, {
        include: [{
            model: User,
            attributes: ['username']
        }]
    });
}

const getSongReviewsBySongId = async (songId) => {
    return await SongReview.findAll({
        where: { songId },
        include: [{
            model: User,
            attributes: ['username']
        }]
    });
};

const createSongReview = async (songReviewData) => {
    const isToxic = await isReviewToxic(songReviewData.review);
    if (isToxic) {
        throw new Error("Review contains offensive language");
    }

    const newReview = await SongReview.create(songReviewData);
    return await SongReview.findByPk(newReview.id, {
        include: [{
            model: User,
            attributes: ['username']
        }]
    });
}

const updateSongReview = async (id, { likes, dislikes }) => {
    const songReview = await SongReview.findByPk(id, {
        include: [{
            model: User,
            attributes: ['username']
        }]
    });
    if (likes !== undefined) songReview.likes += likes;
    if (dislikes !== undefined) songReview.dislikes += dislikes;
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

route.get("/song/:songId", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, () => getSongReviewsBySongId(req.params.songId));
});

route.post("/", verifyTokenUser(), async (req, res) => {
    const { error } = songReviewSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        await handleRoute(req, res, createSongReview);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

route.put("/:id", verifyTokenUser(), async (req, res) => {
    const { error } = Joi.object({
        likes: Joi.number(),
        dislikes: Joi.number()
    }).validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    await handleRoute(req, res, updateSongReview);
});

route.delete("/:id", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, deleteSongReview);
});
