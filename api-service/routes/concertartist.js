const express = require("express");
const { ConcertArtist } = require("../models");
const { handleRoute } = require("./handler/handler");
const { verifyTokenUser } = require('../../common-utils/modules/accessToken');
const Joi = require('joi');
const route = express.Router();

const concertArtistSchema = Joi.object({
    concertId: Joi.number().required(),
    artistId: Joi.number().required()
});

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

const getAllConcertArtists = async () => {
    return await ConcertArtist.findAll();
}

const getConcertArtistById = async (id) => {
    return await ConcertArtist.findByPk(id);
}

const crateConcertArtist = async (concertArtistData) => {
    return await ConcertArtist.create(concertArtistData);
}

const updateConcertArtist = async (id, concertArtistData) => {
    const concertArtist = await ConcertArtist.findByPk(id);
    concertArtist.songId = concertArtistData.songId;
    concertArtist.genreId = concertArtistData.genreId;
    await concertArtist.save();
    return concertArtist;
}

const deleteConcertArtist = async (id) => {
    const concertArtist = await ConcertArtist.findByPk(id);
    await concertArtist.destroy();
    return concertArtist.id;
}

route.get("/", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, getAllConcertArtists);
});

route.get("/:id", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, getConcertArtistById);
});

// TODO: Change to verifyArtistToken
route.post("/", verifyTokenUser(), async (req, res) => {
    const { error } = concertArtistSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    await handleRoute(req, res, crateConcertArtist);
});

// TODO: Change to verifyArtistToken
route.put("/:id", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, updateConcertArtist);
});

// TODO: Change to verifyArtistToken
route.delete("/:id", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, deleteConcertArtist);
});

