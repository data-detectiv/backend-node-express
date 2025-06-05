const Users = require('../models/User');

const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies) return res.sendStatus(204);

    const refreshToken = cookies.jwt;

    const foundUser = await Users.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true});
        return res.sendStatus(204);
    };

    foundUser.refreshToken = "";
    await foundUser.save();
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true});
    res.sendStatus(204);

};

module.exports = { handleLogout };