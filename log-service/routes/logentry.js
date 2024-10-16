const express = require("express");
const LogEntry = require("../models/logentry");
const { handleRoute } = require("./handler/handler");
const { verifyToken } = require('../modules/serviceToken');
const { verifyTokenAdmin } = require('../../common-utils/modules/accessToken');
const Joi = require('joi');
const route = express.Router();

const logEntrySchema = Joi.object({
    message: Joi.string().required(),
    timestamp: Joi.date().required(),
    service: Joi.string().required(),
    component: Joi.string().required(),
    context: Joi.object().optional(),
    categoryId: Joi.string().required()
});

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

const getAllLogEntries = async () => {
    return LogEntry.find();
}

const getLogEntryById = async (id) => {
    return LogEntry.findById(id);
}

const createLogEntry = async (logEntryData) => {
    return LogEntry.create(logEntryData);
}

const updateLogEntry = async (id, logEntryData) => {
    return LogEntry.findByIdAndUpdate(id, logEntryData, { new: true });
}

const deleteLogEntry = async (id) => {
    return LogEntry.findByIdAndDelete(id);
}

route.get("/", verifyTokenAdmin(), async (req, res) => {
    await handleRoute(req, res, getAllLogEntries);
});

route.get("/:id", verifyTokenAdmin(), async (req, res) => {
    await handleRoute(req, res, getLogEntryById);
});

route.post("/", verifyToken("logService"), async (req, res) => {
    const { error } = logEntrySchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    await handleRoute(req, res, createLogEntry);
});

route.put("/:id", verifyTokenAdmin(), async (req, res) => {
    await handleRoute(req, res, updateLogEntry);
});

route.delete("/:id", verifyTokenAdmin(), async (req, res) => {
    await handleRoute(req, res, deleteLogEntry);
});