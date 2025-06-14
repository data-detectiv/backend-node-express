const Users = require('../models/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await Users.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403);

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            const roles = Object.values(foundUser.roles)
            const accessToken = jwt.sign(
                { "UserInfo": { 
                    username: decoded.username,
                    roles: roles
                    }
            },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '60s'}
            );
            res.json({ accessToken });
        }
    )
    

};

module.exports = { handleRefreshToken };