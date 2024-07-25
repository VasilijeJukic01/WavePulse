const express = require("express");
const { ConcertArtist } = require("../models");
const { handleRoute } = require("./handler");
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

route.get("/", async (req, res) => {
    await handleRoute(req, res, getAllConcertArtists);
});

route.get("/:id", async (req, res) => {
    await handleRoute(req, res, getConcertArtistById);
});

route.post("/", async (req, res) => {
    const { error } = concertArtistSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    await handleRoute(req, res, crateConcertArtist);
});

route.put("/:id", async (req, res) => {
    await handleRoute(req, res, updateConcertArtist);
});

route.delete("/:id", async (req, res) => {
    await handleRoute(req, res, deleteConcertArtist);
});

