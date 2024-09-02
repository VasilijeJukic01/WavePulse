const express = require("express");
const { Concert } = require("../models");
const { handleRoute } = require("./handler/handler");
const { verifyTokenUser } = require('../../common-utils/modules/accessToken');
const Joi = require('joi');
const route = express.Router();

const concertSchema = Joi.object({
    name: Joi.string().required(),
    concertDate: Joi.date().required(),
    countryId: Joi.number().required(),
});

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

const getAllConcerts = async () => {
    return await Concert.findAll();
}

const getConcertById = async (id) => {
    return await Concert.findByPk(id);
}

const createConcert = async (concertData) => {
    return await Concert.create(concertData);
}

const updateConcert = async (id, concertData) => {
    const concert = await Concert.findByPk(id);
    concert.name = concertData.name;
    concert.concertDate = concertData.concertDate;
    concert.countryId = concertData.countryId;
    await concert.save();
    return concert;
}

const deleteConcert = async (id) => {
    const concert = await Concert.findByPk(id);
    await concert.destroy();
    return concert.id;
}

route.get("/", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, getAllConcerts);
});

route.get("/:id", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, getConcertById);
});

// TODO: Change to verifyArtistToken
route.post("/", verifyTokenUser(), async (req, res) => {
    const { error } = concertSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    await handleRoute(req, res, createConcert);
});

// TODO: Change to verifyArtistToken
route.put("/:id", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, updateConcert);
});

// TODO: Change to verifyArtistToken
route.delete("/:id", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, deleteConcert);
});