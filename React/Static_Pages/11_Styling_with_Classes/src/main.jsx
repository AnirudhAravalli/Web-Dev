import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import reactImage from "./assets/react.svg"

function Header() {
  return (
    <header className='header-class'>
      <img src={reactImage} alt="React Logo" className='react-logo' />
      <nav>
        <ul className='nav-list'>
          <li className='nav-list-item'>Pricing</li>
          <li className='nav-list-item'>About</li>
          <li className='nav-list-item'>Contact</li>
        </ul>
      </nav>
    </header>
  )
}

function MainContent() {
  return (
    <main>
      <h1>Reasons I'm excited to learn React</h1>
      <ol>
        <li>React is freaking diabolical library</li>
        <li>It is used in many of the websites</li>
        <li>There are many frameworks based on React like Next.js</li>
        <li>It is interesting to learn React</li>
      </ol>
    </main>
  )
}

function Footer() {
  return (
    <footer className='footer'>
      <small>© 2025 Anirudh development. All rights reserved.</small>
    </footer>
  )
}

function Page() {
  return (
    <>
      <div className='content'>
        <Header />
        <MainContent />
        <Footer />
      </div>
    </>
  )
}
createRoot(document.querySelector("#root")).render(
  <Page />
)