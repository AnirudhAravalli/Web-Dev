import reactImage from "./assets/react.svg"

export default function Header() {
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