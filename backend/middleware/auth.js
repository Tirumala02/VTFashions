import jwt from 'jsonwebtoken';
const authUser = async (req, res, next) => {
    const { token, "temp-user": tempUser } = req.headers;

    if (!token && !tempUser) {
        return res.json({ success: false, message: "Not Authorized. Login or continue as a guest." });
    }

    try {
        if (token) {
            const token_decode = jwt.verify(token, process.env.JWT_SECRET);
            req.body.userId = token_decode.id; // Logged-in user
        } else {
            req.body.userId = tempUser; // Guest user ID
        }
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export default authUser;
