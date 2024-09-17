import Post from '../models/post.models.js';

export const createPost = async (req, res) => {
    // try {
    console.log(req.body);
    const { title, description, category, imageUrl, userId, username } = req.body;

    const newPost = new Post(
        {
            title: title,
            description: description,
            category: category,
            imageUrl: imageUrl,
            user: {
                userId: userId,
                userName: username
            },
        }
    )

    const savedPost = await newPost.save();

    if (savedPost) {
        res.status(200).json({ message: 'La publicacion ha sido guardada Exitosamente' });
    }

    /* } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    } */
};

export const getPost = async (req, res) => {
    try {
        const publicaciones = await Post.find();

        if (!publicaciones || publicaciones.length === 0) {
            return res.status(404).json({ message: 'No se encontraron publicaciones' });
        }

        return res.status(200).json(publicaciones);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}