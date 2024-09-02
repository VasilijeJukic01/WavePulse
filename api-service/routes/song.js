const express = require("express");
const { Song, Artist, Genre, SongArtist, SongGenre } = require("../models");
const { handleRoute } = require("./handler/handler");
const Joi = require('joi');
const { verifyTokenUser, verifyTokenAdmin } = require('../../common-utils/modules/accessToken');
const route = express.Router();

const songSchema = Joi.object({
    name: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    albumId: Joi.number().required(),
});

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

const getAllSongs = async () => {
    return await Song.findAll();
}

const getFullSongs = async () => {
    return await Song.findAll({
        include: [
            {
                model: SongArtist,
                as: 'songArtists',
                include: [
                    {
                        model: Artist,
                        attributes: ['name'],
                    },
                ],
            },
            {
                model: SongGenre,
                as: 'songGenres',
                include: [
                    {
                        model: Genre,
                        attributes: ['name'],
                    },
                ],
            },
        ],
    });
}

const getSongById = async (id) => {
    return await Song.findByPk(id);
}

const getFullSongById = async (id) => {
    return await Song.findByPk(id, {
        include: [
            {
                model: SongArtist,
                as: 'songArtists',
                include: [
                    {
                        model: Artist,
                        attributes: ['name'],
                    },
                ],
            },
            {
                model: SongGenre,
                as: 'songGenres',
                include: [
                    {
                        model: Genre,
                        attributes: ['name'],
                    },
                ],
            },
        ],
    });
}

const createSong = async (songData) => {
    return await Song.create(songData);
}

const updateSong = async (id, songData) => {
    const song = await Song.findByPk(id);
    song.name = songData.name;
    song.duration = songData.duration;
    song.year = songData.year;
    song.albumId = songData.albumId;
    await song.save();
    return song;
}

const deleteSong = async (id) => {
    const song = await Song.findByPk(id);
    await song.destroy();
    return song.id;
}

route.get("/", verifyTokenUser(),  async (req, res) => {
    await handleRoute(req, res, getAllSongs);
});

route.get("/full", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, getFullSongs);
});

route.get("/normal/:id", verifyTokenUser(),  async (req, res) => {
    await handleRoute(req, res, getSongById);
});

route.get("/full/:id", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, getFullSongById);
});

//TODO: Change (POST, PUT, DELETE) to verifyArtistToken when Artist is implemented
route.post("/", verifyTokenUser(), async (req, res) => {
    const { error } = songSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    await handleRoute(req, res, createSong);
});

route.put("/:id", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, updateSong);
});

route.delete("/:id", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, deleteSong);
});
