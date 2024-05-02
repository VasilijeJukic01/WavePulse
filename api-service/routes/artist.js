const express = require("express");
const { Artist } = require("../models");
const { handleRoute } = require("./handler");
const Joi = require('joi');
const route = express.Router();

const artistSchema = Joi.object({
    name: Joi.string().required(),
    establishmentYear: Joi.date().required(),
    description: Joi.string().required(),
    countryId: Joi.number().required()
});

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

const getAllArtists = async () => {
    return await Artist.findAll();
}

const getArtistById = async (id) => {
    return await Artist.findByPk(id);
}

const createArtist = async (artistData) => {
    return await Artist.create(artistData);
}

const updateArtist = async (id, artistData) => {
    const artist = await Artist.findByPk(id);
    artist.name = artistData.name;
    artist.establishmentYear = artistData.establishmentYear;
    artist.description = artistData.description;
    artist.countryId = artistData.countryId;
    await artist.save();
    return artist;
}

const deleteArtist = async (id) => {
    const artist = await Artist.findByPk(id);
    await artist.destroy();
    return artist.id;
}

route.get("/", async (req, res) => {
    await handleRoute(req, res, getAllArtists);
});

route.get("/:id", async (req, res) => {
    await handleRoute(req, res, getArtistById);
});

route.post("/", async (req, res) => {
    const { error } = artistSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    await handleRoute(req, res, createArtist);
});

route.put("/:id", async (req, res) => {
    await handleRoute(req, res, updateArtist);
});

route.delete("/:id", async (req, res) => {
    await handleRoute(req, res, deleteArtist);
});

