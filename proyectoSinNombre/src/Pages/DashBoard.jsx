import Adversiting from "../Componets/Advertising";
import NewPost from "../Componets/NewPost";
import Post from "../Componets/Post";
import { useAuth } from "../context/AuthContext.jsx";
import { usePost } from "../context/PostContext.jsx";
import './DashBoard.css'

const DashBoard = () => {
    const imagenes = [
        'src/assets/not1.png',
        'src/assets/not2.png'
    ];

    const { publicaciones } = usePost(); // Aquí obtienes las publicaciones desde el contexto de Post
    const { isAuthenticated } = useAuth();

    return (
        <>
            {isAuthenticated && <NewPost />}
            <section className="main">
                <div className="dashboard">
                    <div className="mainContent">
                        {/* Mapea las publicaciones y pasa la información de cada una al componente Post */}
                        {publicaciones.map((post) => (
                            <Post key={post._id} post={post} />
                        ))}                        
                    </div>
                    <div className="rightContent">
                        <Adversiting imagen={imagenes[0]} />
                        <Adversiting imagen={imagenes[1]} />
                    </div>
                </div>
            </section>
        </>
    );
}

export default DashBoard;
