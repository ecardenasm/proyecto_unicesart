import User from '../models/user.model.js';

export const update = async (req, res) => {
    const user = req.body

    try {

        const updatedUser = await user.update();
        const token = await createAccesToken({ id: savedUser._id });
        res.cookie('token', token);
        res.json({
            id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email,
            createdAt: savedUser.createdAt,
            updatedAt: savedUser.updatedAt,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}