import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.json({ success: false, message: 'Not Authorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 

        if (!decoded || !decoded.id) {
            return res.json({ success: false, message: 'Not Authorized' });
        }

        req.user = await User.findById(decoded.id).select("-password"); 

        next();
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
