import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import reactImage from "./assets/react.svg"

function Page() {
  return (
    <>
      <header>
        <img src={reactImage} alt="React Logo" width="60px" />
      </header>
      <main>
        <h1>Reasons I'm excited to learn React</h1>
        <ol>
          <li>React is freaking diabolical library</li>
          <li>It is used in many of the websites</li>
          <li>There are many frameworks based on React like Next.js</li>
          <li>It is interesting to learn React</li>
        </ol>
        <footer>
          <small>© 2025 Anirudh development. All rights reserved.</small>
        </footer>
      </main>
    </>
  )
}

createRoot(document.querySelector("#root")).render(
  <Page />
)
