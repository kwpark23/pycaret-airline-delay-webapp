import './App.scss';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Experience from './components/Experience/Experience';
import Home from './components/Home/Home';
import Logo from './components/Logo/Logo';
import Projects from './components/Projects/Projects';




function App() {


  return (
    <div className="App">

      <header className="App-header">
        <div className="Logo-container">
        <Logo size="0.6em"> </Logo>  
        </div>

        <div className='Menu'> 
          <ul>
            <li>
              <a className='link' href='#About'>About</a>
            </li>
            <li>
              <a className='link' href='#Experience'>Experience</a>
            </li>
            <li>
              <a className='link' href='#Projects'>Projects</a>
            </li>
            <li>
              <a  className='link' href='#Contact'>Contact</a>
            </li>
            <li>
              <a className='button' href='/david-geller-resume.pdf' target="_blank">
                Resume
              </a>
            </li>
          </ul>
        </div>

      </header>
    
      <div className='Body'> 
        <Home></Home>
        <About></About>
        <Experience></Experience>
        <Projects></Projects>
        <Contact></Contact>
      </div>
    </div>
  );


}

export default App;
