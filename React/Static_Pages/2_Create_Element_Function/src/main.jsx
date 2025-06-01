import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createElement } from 'react'
import './index.css'
import App from './App.jsx'

// Creating a single Element
// createRoot(document.getElementById('root')).render(
//   createElement("h2", null, "Freaking Diabolical")
// )

// Using a Parent Element to wrap the content
// createRoot(document.getElementById('root')).render(
//   createElement("div", null,   
//     createElement("h1", null, "Frigging Diabolical 😈😈"),
//     createElement("h3", null, "Freaking Diabolical 😈")
//   )
// )

// Using React Fragments
// createRoot(document.querySelector('#root')).render(
//   createElement(React.Fragment, null, 
//     createElement("h1", null, "Frigging Diabolical 😈😈"),
//     createElement("h3", null, "Frigging Diabolical 😈😈"),
//   )
// )

// Using an array
// createRoot(document.querySelector("#root")).render(
//   [
//     createElement("h1", null, "Frigging Diabolical 😈😈"),
//     createElement("h2", null, "Frigging Diabolical 😈😈"),
//   ]
// )

const reactElement = createElement("h3", null, "Freaking Diabolical 😈😈")
console.log(reactElement)

createRoot(document.querySelector("#root")).render(
  reactElement
)