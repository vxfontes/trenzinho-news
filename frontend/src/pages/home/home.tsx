import BackgroundTriangle from "../../components/background/backgroundIMG";
import Navbar from "../../components/navbar/Navbar";
import ExibicaoDeEventos from "./eventos";

const Home = () => {
    return (
        <BackgroundTriangle>

            <Navbar />
            <ExibicaoDeEventos />

        </BackgroundTriangle>
    );
}

export default Home;