import { fontSize } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import './Home.scss';

function Home () {
    
    const [name, setName] = useState("David Geller");
    const nameRef = useRef(null);
    
    const animateName = () => {
        setName("デビッドゲラー");
        nameRef.current.style.fontSize = "3em";
        setTimeout(() => {
            setName ("데이비드 겔러");
            nameRef.current.style.fontSize = "3.55em";
         }, 250);
         setTimeout(() => {
            setName ("01000100 01100001 01110110 01101001 01100100");
            nameRef.current.style.fontSize = "2em";
         }, 500);
         setTimeout(() => {
             setName("David Geller");
             nameRef.current.style.fontSize = "4em";
         }, 1000);
    }

    useEffect(() => {
        animateName();
        setInterval(animateName, 10000);
    }, []);



    return <div className='Home section' id='Home'> 
        <h2>
            <code>Hello world! My name is</code>
        </h2>

        <h1 className='Big-Heading' ref={nameRef}>
            {name}
            <div class="glitch1">
            {name}
            </div>
            <div class="glitch2">
            {name}
            </div>
        </h1>

        <h3 className='Big-Heading'>
            Welcome to my portfolio website.
        </h3>

        <p>
            I'm passionate about computer science, data science and cyber security. 
        </p>

        <a className='button' href='/david-geller-resume.pdf' target="_blank">
            Download my resume!
        </a>
    </div>
 }
export default Home;