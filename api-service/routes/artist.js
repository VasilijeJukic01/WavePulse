const express = require("express");
const { Artist, SongRating, Song, SongArtist } = require("../models");
const { handleRoute } = require("./handler/handler");
const { verifyTokenAdmin, verifyTokenUser } = require('../../common-utils/modules/accessToken');
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

route.get("/", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, getAllArtists);
});

route.get("/:id", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, getArtistById);
});

route.post("/", verifyTokenAdmin(), async (req, res) => {
    const { error } = artistSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    await handleRoute(req, res, createArtist);
});

// TODO: Change to verifyTokenArtist
route.put("/:id", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, updateArtist);
});

// TODO: Change to verifyTokenArtist
route.delete("/:id", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, deleteArtist);
});

// routes/artist.js
route.get('/ratings/:id', async (req, res) => {
    const { id: artistId } = req.params;
    try {
        const ratings = await SongRating.findAll({
            include: {
                model: Song,
                include: {
                    model: SongArtist,
                    as: 'songArtists',
                    where: { artistId },
                },
            },
        });
        res.json(ratings);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});