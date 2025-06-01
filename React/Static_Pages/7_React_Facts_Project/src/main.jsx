import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import reactLogo from './assets/react.svg'

function FactsList() {
  return (
    <div>
      <img src={reactLogo} alt="React Logo" width="40px" />,
      <h1>Fun facts about React</h1>,
      <ul>
        <li>Was first released in 2013</li>
        <li>Was originally by Jordan Walke</li>
        <li>Has well over 100K stars on GitHub</li>
        <li>Is maintained by Meta</li>
        <li>Powers thousands of enterprise apps, including mobile apps</li>
      </ul>
    </div>
  )
}

createRoot(document.querySelector("#root")).render(
  <FactsList />
)