import Adversiting from "../Componets/Advertising";
import NewPost from "../Componets/NewPost";
import Post from "../Componets/Post";
import VideoPost from "../Componets/VideoPost";
import { useAuth } from "../context/AuthContext.jsx";
import './DashBoard.css'

const DashBoard = () => {
    const imagenes = [
        'src/assets/imagen1.jpeg',
        'src/assets/imagen2.jpg',
        'src/assets/imagen3.jpeg',
        'src/assets/not1.png',
        'src/assets/not2.png'
    ];

    const { isAuthenticated } = useAuth();

    return (
        <>
            {isAuthenticated && <NewPost />}
            <section className="main">
                <div className="dashboard">
                    <div className="mainContent">
                        <Post imagen={imagenes[0]} />
                        <Post imagen={imagenes[1]} />
                        <VideoPost />
                        <Post imagen={imagenes[2]} />
                        <Post imagen="" />
                        <Post />
                    </div>
                    <div className="rightContent">
                        <Adversiting imagen={imagenes[3]} />
                        <Adversiting imagen={imagenes[4]} />
                        <Adversiting />
                    </div>
                </div>
            </section>
        </>
    );
}

export default DashBoard