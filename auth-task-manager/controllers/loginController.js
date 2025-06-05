const Users = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.'});

    const foundUser = await Users.findOne({ username: user}).exec();
    if (!foundUser) return res.sendStatus(401);
    try {
        const match = await bcrypt.compare(pwd, foundUser.password);
        if (match) {
            const roles = Object.values(foundUser.roles)
            const accessToken = jwt.sign(
                { "UserInfo": { 
                    username: foundUser.username,
                    roles: roles
                    }
            },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1d'}
            );

            const refreshToken = jwt.sign(
                { username: foundUser.username},
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d'}
            );

            foundUser.refreshToken = refreshToken;
            await foundUser.save();
            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000});
            res.json({accessToken});
        }
    } catch (err) {
        res.sendStatus(500).json(err);
    }
};

module.exports = { handleLogin };