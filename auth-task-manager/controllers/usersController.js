const Users = require('../models/User');
const bcrypt = require('bcrypt');


const getAllUsers = async (req, res) => {
    const users = await Users.find();
    if (!users) return res.status(204).json({ 'message': 'No users found.'});
    res.json(users);
};

const getUser = async (req, res) => {
    const user = await Users.findOne({ _id: req.params.id}).exec();
    if (!user) return res.status(204).json({ 'message': 'No user found'});
    res.json(user);
};

const createNewUser = async (req, res) => {
    if (!req?.body?.username || !req?.body?.password) return res.status(400).json({ 'message': 'Username and password are required.'});
    const roles = await Users.roles;
    const refreshToken = process.env.REFRESH_TOKEN_SECRET;
    const hashedPwd = await bcrypt.hash(req.body.password, 10)
    const newUser = await Users.create({
        username: req.body.username,
        password: hashedPwd,
        roles: roles,
        refreshToken: refreshToken
    });
    res.status(201).json(newUser);
};

const updateUser = async (req, res) => {
    const user = await Users.findOne({ _id: req.body.id}).exec();
    if (!user) return res.status(400).json({ 'message': 'No user found'});

    if (req.body.username) user.username = req.body.username;
    if (req.body.password) user.password = await bcrypt.hash(req.body.password, 10);;
    if (req.body.roles) user.roles = req.body.roles;

    const result = await user.save();
    res.json(result);
};

const deleteUser = async (req, res) => {
    const user = await Users.findOne({ _id: req.body.id}).exec();
    if (!user) return res.status(400).json({ 'message': 'No user found'});

    const result = await Users.deleteOne(user);
    res.json(result);
};

module.exports = { 
    getAllUsers,
    getUser,
    createNewUser,
    updateUser,
    deleteUser
};