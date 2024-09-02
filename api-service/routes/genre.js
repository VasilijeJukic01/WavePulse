const express = require("express");
const { Genre } = require("../models");
const { handleRoute } = require("./handler/handler");
const { verifyTokenAdmin, verifyTokenUser } = require('../../common-utils/modules/accessToken');
const Joi = require('joi');
const route = express.Router();

const genreSchema = Joi.object({
    name: Joi.string().required()
});

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

const getAllGenres = async () => {
    return await Genre.findAll();
}

const getGenreById = async (id) => {
    return await Genre.findByPk(id);
}

const createGenre = async (genreData) => {
    return await Genre.create(genreData);
}

const updateGenre = async (id, genreData) => {
    const genre = await Genre.findByPk(id);
    genre.name = genreData.name;
    await genre.save();
    return genre;
}

const deleteGenre = async (id) => {
    const genre = await Genre.findByPk(id);
    await genre.destroy();
    return genre.id;
}

route.get("/", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, getAllGenres);
});

route.get("/:id", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, getGenreById);
});

route.post("/", verifyTokenAdmin(), async (req, res) => {
    const { error } = genreSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    await handleRoute(req, res, createGenre);
});

route.put("/:id", verifyTokenAdmin(), async (req, res) => {
    await handleRoute(req, res, updateGenre);
});

route.delete("/:id", verifyTokenAdmin(), async (req, res) => {
    await handleRoute(req, res, deleteGenre);
});