const express = require("express");
const { Country } = require("../models");
const { handleRoute } = require("./handler");
const Joi = require('joi');
const route = express.Router();

const countrySchema = Joi.object({
    name: Joi.string().required()
});

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

const getAllCountries = async () => {
    return await Country.findAll();
}

const getCountryById = async (id) => {
    return await Country.findByPk(id);
}

const createCountry = async (countryData) => {
    return await Country.create(countryData);
}

const updateCountry = async (id, countryData) => {
    const country = await Country.findByPk(id);
    country.name = countryData.name;
    await country.save();
    return country;
}

const deleteCountry = async (id) => {
    const country = await Country.findByPk(id);
    await country.destroy();
    return country.id;
}

route.get("/", async (req, res) => {
    await handleRoute(req, res, getAllCountries);
});

route.get("/:id", async (req, res) => {
    await handleRoute(req, res, getCountryById);
});

route.post("/", async (req, res) => {
    const { error } = countrySchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    await handleRoute(req, res, createCountry);
});

route.put("/:id", async (req, res) => {
    await handleRoute(req, res, updateCountry);
});

route.delete("/:id", async (req, res) => {
    await handleRoute(req, res, deleteCountry);
});