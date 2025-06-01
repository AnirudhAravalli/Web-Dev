import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import { createElement } from 'react'

const root = createRoot(document.querySelector("#root"))
// const reactElement = createElement("h1", null, 
//   createElement("span", null, "Hello")
// )

// const reactElement = <h1><span style={{color:"blue", backgroundColor: "red"}}>Hello</span></h1>
const reactElement = <h1><span>Hello World</span></h1>

console.log(reactElement)

root.render(
  reactElement
) 