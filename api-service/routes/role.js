const express = require("express");
const { Role } = require("../models");
const { handleRoute } = require("./handler");
const Joi = require('joi');
const route = express.Router();

const roleSchema = Joi.object({
    role: Joi.string().required(),
    description: Joi.string().required()
});

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

const getAllRoles = async () => {
    return await Role.findAll();
}

const getRoleById = async (id) => {
    return await Role.findByPk(id);
}

const getRoleByName = async (role) => {
    return await Role.findOne({ where: { role } });
}

const createRole = async (roleData) => {
    return await Role.create(roleData);
}

const updateRole = async (id, roleData) => {
    const role = await Role.findByPk(id);
    role.role = roleData.role;
    await role.save();
    return role;
}

const deleteRole = async (id) => {
    const role = await Role.findByPk(id);
    await role.destroy();
    return role.id;
}

route.get("/", async (req, res) => {
    await handleRoute(req, res, getAllRoles);
});

route.get("/:id", async (req, res) => {
    await handleRoute(req, res, getRoleById);
});

route.get("/name/:role", async (req, res) => {
    try {
        const role = req.params.role;
        const result = await getRoleByName(role);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

route.post("/", async (req, res) => {
    const { error } = roleSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    await handleRoute(req, res, createRole);
});

route.put("/:id", async (req, res) => {
    await handleRoute(req, res, updateRole);
});

route.delete("/:id", async (req, res) => {
    await handleRoute(req, res, deleteRole);
});