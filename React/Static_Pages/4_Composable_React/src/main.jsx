import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

function MainComponent() {
  return (
    <h1>React is Diabolical 😈</h1>
  )
}

createRoot(document.querySelector("#root")).render(
    <MainComponent />
)
