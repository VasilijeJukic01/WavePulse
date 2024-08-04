const express = require("express");
const { LogEntry } = require("../models");
const { handleRoute } = require("./handler/handler");
const Joi = require('joi');
const route = express.Router();

const logEntrySchema = Joi.object({
    message: Joi.string().required(),
    timestamp: Joi.date().required(),
    service: Joi.string().required(),
    component: Joi.string().required(),
    context: Joi.object().optional(),
    categoryId: Joi.number().required()
});

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

const getAllLogEntries = async () => {
    return await LogEntry.findAll();
}

const getLogEntryById = async (id) => {
    return await LogEntry.findByPk(id);
}

const createLogEntry = async (logEntryData) => {
    return await LogEntry.create(logEntryData);
}

const updateLogEntry = async (id, logEntryData) => {
    const logEntry = await LogEntry.findByPk(id);
    logEntry.message = logEntryData.message;
    logEntry.timestamp = logEntryData.timestamp;
    logEntry.service = logEntryData.service;
    logEntry.component = logEntryData.component;
    logEntry.context = logEntryData.context;
    logEntry.categoryId = logEntryData.categoryId;
    await logEntry.save();
    return logEntry;
}

const deleteLogEntry = async (id) => {
    const logEntry = await LogEntry.findByPk(id);
    await logEntry.destroy();
    return logEntry.id;
}

route.get("/", async (req, res) => {
    await handleRoute(req, res, getAllLogEntries);
});

route.get("/:id", async (req, res) => {
    await handleRoute(req, res, getLogEntryById);
});

route.post("/", async (req, res) => {
    const { error } = logEntrySchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    await handleRoute(req, res, createLogEntry);
});

route.put("/:id", async (req, res) => {
    await handleRoute(req, res, updateLogEntry);
});

route.delete("/:id", async (req, res) => {
    await handleRoute(req, res, deleteLogEntry);
});