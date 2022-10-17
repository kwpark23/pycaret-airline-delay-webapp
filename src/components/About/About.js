import './About.scss';
import profilepic from "../../assets/profilepic.jpg"

function About () {
    return <div className='About section' id='About'> 
        <h2 className='Heading'>
            <span>
                About Me
            </span>
        </h2>
        <div className= 'description'>
            <p>
                Hello, My name is David Geller. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sem ligula, dignissim ac ligula quis, sollicitudin pulvinar est. Ut pulvinar, elit sed varius facilisis, est ipsum aliquet tellus, sit amet condimentum urna orci et risus. Cras ac sagittis neque.
                <br/><br/> Proin eget ex in lacus elementum dapibus ac quis ante. Phasellus non nulla egestas, molestie ante sit amet, bibendum lorem. Nunc nibh nunc, facilisis nec est quis, convallis convallis neque. Integer sagittis velit in nunc auctor, eu vulputate nisl hendrerit. Donec non sem sed ipsum sagittis congue non ornare enim. In hac habitasse platea dictumst. Suspendisse id ornare ipsum, vel laoreet sapien. Aenean vehicula consequat neque, viverra fringilla sem posuere sit amet. Quisque finibus sapien et lectus mattis, eget varius arcu laoreet.
            </p>

            <img src={profilepic}></img>
        </div>
            
    </div>
 }
export default About;