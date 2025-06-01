import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from "./Header"
import MainContent from './MainContent'
import Footer from './Footer'

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