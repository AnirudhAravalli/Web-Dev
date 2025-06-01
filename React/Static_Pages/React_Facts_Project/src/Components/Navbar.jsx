import reactImage from "../assets/react.svg"

export default function Navbar() {
    return (
        <header className="header">
            <nav className="nav">
                <img src={reactImage} alt="React Logo" />
                <h1>ReactFacts</h1>
            </nav>
        </header>
    )
}