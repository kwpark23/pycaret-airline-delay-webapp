import './Logo.scss';

function Logo (props) {
    return <div className="Logo" style={{fontSize : props.size}}> 
        <a href="/">
        Dg.
        </a>
    </div>
 }

export default Logo;