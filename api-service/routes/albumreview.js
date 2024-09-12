const express = require("express");
const { AlbumReview } = require("../models");
const { handleRoute } = require("./handler/handler");
const { verifyTokenUser } = require('../../common-utils/modules/accessToken');
const Joi = require('joi');
const route = express.Router();

const reviewSchema = Joi.object({
    review: Joi.string().required(),
    likes: Joi.number().required(),
    dislikes: Joi.number().required(),
    userId: Joi.number().required(),
    albumId: Joi.number().required()
});

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

const getAllReviews = async () => {
    return await AlbumReview.findAll();
}

const getReviewById = async (id) => {
    return await AlbumReview.findByPk(id);
}

const createReview = async (reviewData) => {
    return await AlbumReview.create(reviewData);
}

const updateReview = async (id, reviewData) => {
    const review = await AlbumReview.findByPk(id);
    review.review = reviewData.review;
    review.likes = reviewData.likes;
    review.dislikes = reviewData.dislikes;
    review.userId = reviewData.userId;
    review.albumId = reviewData.albumId;
    await review.save();
    return review;
}

const deleteReview = async (id) => {
    const review = await AlbumReview.findByPk(id);
    await review.destroy();
    return review.id;
}

route.get("/", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, getAllReviews);
});

route.get("/:id", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, getReviewById);
});

route.post("/", verifyTokenUser(), async (req, res) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    await handleRoute(req, res, createReview);
});

route.put("/:id", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, updateReview);
});

route.delete("/:id", verifyTokenUser(), async (req, res) => {
    await handleRoute(req, res, deleteReview);
});