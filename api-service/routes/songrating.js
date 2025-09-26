const express = require("express");
const { SongRating } = require("../models");
const { handleRoute } = require("./handler/handler");
const Joi = require('joi');
const { verifyTokenUser, verifyTokenAdmin } = require('../../common-utils/modules/accessToken');
const { sequelize } = require("../models");
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
    if (!songRating) {
        throw new Error('SongRating not found');
    }
    songRating.rate = songRatingData.rate;
    await songRating.save();
    return songRating;
};

const deleteSongRating = async (id) => {
    const songRating = await SongRating.findByPk(id);
    await songRating.destroy();
    return songRating.id;
}

const getAverageRatingBySongId = async (songId) => {
    const ratings = await SongRating.findAll({
        where: { songId },
        attributes: [[sequelize.fn('AVG', sequelize.col('rate')), 'averageRating']],
        raw: true,
    });
    return parseFloat(ratings[0].averageRating) || 0;
};

const createOrUpdateSongRating = async (songRatingData) => {
    const { userId, songId, rate } = songRatingData;
    const existingRating = await SongRating.findOne({ where: { userId, songId } });

    if (existingRating) {
        existingRating.rate = rate;
        await existingRating.save();
        return existingRating;
    } else {
        return await SongRating.create(songRatingData);
    }
};

route.get("/", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, getAllSongRatings);
});

route.get("/rating", verifyTokenUser(), async (req, res) => {
    const { userId, songId } = req.query;
    if (userId && songId) {
        try {
            const existingRating = await SongRating.findOne({ where: { userId, songId } });
            return res.json(existingRating);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Error fetching rating", data: err });
        }
    } else {
        await handleRoute(req, res, getAllSongRatings);
    }
});

route.get("/:id", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, getSongRatingById);
});

route.get("/average/:songId", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, () => getAverageRatingBySongId(req.params.songId));
});

route.post("/", verifyTokenUser(), async (req, res) => {
    const { error } = songRatingSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    await handleRoute(req, res, createOrUpdateSongRating);
});

route.put("/:id", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, updateSongRating);
});

route.delete("/:id", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, deleteSongRating);
});
