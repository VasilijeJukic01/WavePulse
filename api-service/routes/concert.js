const express = require("express");
const { Concert } = require("../models");
const { handleRoute } = require("./handler");
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

route.get("/", async (req, res) => {
    await handleRoute(req, res, getAllConcerts);
});

route.get("/:id", async (req, res) => {
    await handleRoute(req, res, getConcertById);
});

route.post("/", async (req, res) => {
    const { error } = concertSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    await handleRoute(req, res, createConcert);
});

route.put("/:id", async (req, res) => {
    await handleRoute(req, res, updateConcert);
});

route.delete("/:id", async (req, res) => {
    await handleRoute(req, res, deleteConcert);
});