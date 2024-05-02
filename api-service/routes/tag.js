const express = require("express");
const { Tag } = require("../models");
const { handleRoute } = require("./handler");
const Joi = require('joi');
const route = express.Router();

const tagSchema = Joi.object({
    name: Joi.string().required()
});

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

const getAllTags = async () => {
    return await Tag.findAll();
}

const getTagById = async (id) => {
    return await Tag.findByPk(id);
}

const createTag = async (tagData) => {
    return await Tag.create(tagData);
}

const updateTag = async (id, tagData) => {
    const tag = await Tag.findByPk(id);
    tag.name = tagData.name;
    await tag.save();
    return tag;
}

const deleteTag = async (id) => {
    const tag = await Tag.findByPk(id);
    await tag.destroy();
    return tag.id;
}

route.get("/", async (req, res) => {
    await handleRoute(req, res, getAllTags);
});

route.get("/:id", async (req, res) => {
    await handleRoute(req, res, getTagById);
});

route.post("/", async (req, res) => {
    const { error } = tagSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    await handleRoute(req, res, createTag);
});

route.put("/:id", async (req, res) => {
    await handleRoute(req, res, updateTag);
});

route.delete("/:id", async (req, res) => {
    await handleRoute(req, res, deleteTag);
});