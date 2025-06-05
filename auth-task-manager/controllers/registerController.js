const Users = require('../models/User');
const bcrypt = require('bcrypt');


const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    const duplicate = await Users.findOne({ username: user}).exec();
    if (duplicate) return res.sendStatus(409);
    try {
        const hashedPwd = await bcrypt.hash(pwd, 10);
        const roles = await Users.roles;
        const newUser = await Users.create({
            username: user,
            roles: roles,
            password: hashedPwd
        });
        res.json(newUser);
    } catch (err) {
        res.sendStatus(500);
    }

};

module.exports = { handleNewUser };