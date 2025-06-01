import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// Imperative
// const headerElement = document.createElement("h1")
// headerElement.textContent = "Hello Word"
// headerElement.className = "header"

// document.querySelector("#root").appendChild(headerElement)


// Declarative
// createRoot(document.querySelector("#root")).render(
//   <h1 className='header'>Hello</h1>
// )

createRoot(document.querySelector("#root")).render(
    [<img src="https://i.ytimg.com/vi/SaOnUc9gGuY/maxresdefault.jpg" alt="" />,
    <img src="https://i.ytimg.com/vi/SaOnUc9gGuY/maxresdefault.jpg" alt="" /> ]
)