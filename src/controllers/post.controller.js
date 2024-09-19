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

        // Mapea sobre las publicaciones para agregar el número de likes
        const publicacionesConLikes = publicaciones.map((publicacion) => {
            return {
                ...publicacion.toObject(),  // Convierte el documento de Mongoose a un objeto simple
                likesCount: publicacion.likes.length, // Agrega el número de likes
            };
        });

        return res.status(200).json(publicacionesConLikes);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const reactions = async (req, res) => {
    try {
        console.log(req.body);
        const { _id, user } = req.body;
        
        const post = await Post.findOne({ _id });

        if (!post) {
            return res.status(404).json({ message: 'No se encontró la publicación' });
        }

        // Verificar si el usuario ya está en la lista de likes
        const userIndex = post.likes.findIndex(
            like => like.user.userId.toString() === user.userId
        );

        if (userIndex > -1) {
            // Si el usuario ya ha dado like, eliminarlo
            post.likes.splice(userIndex, 1);
            await post.save();
            return res.status(200).json({ message: 'Like eliminado' });
        } else {
            // Si el usuario no ha dado like, agregarlo
            post.likes.push({ user });
            await post.save();
            return res.status(200).json({ message: 'Like agregado' });
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
