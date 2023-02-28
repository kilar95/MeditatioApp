import { Link } from "react-router-dom";

const Home = () => {

    return (
        <div className='home'>
            <h1>Welcome!</h1>
            <h3>Take a deep Breath. Relax. Stay healthy.</h3>
            <button
                className='button'
                style={{
                    background: "#fafafa",
                    color: "#202020",
                    width: "10rem",
                    paddingBlock: "15px",
                    marginTop: "2rem",
                }}
            >
                <Link
                    to='/timer'
                    style={{ textDecoration: "none", color: "inherit" }}
                >
                    Meditate Now!
                </Link>
            </button>
        </div>
    )
}

export default Home