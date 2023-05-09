import "../style/Header.css";
import img1 from "../assessts/imgs/img1.jpg"
const Header  = () => {
    return ( 
        
        <header className="main-header" >
            <div className="logo" ><img src={img1} alt="here"></img> </div>
            <nav>
                <ul>
                    <li>home</li>
                    <li>log in</li>
                    <li>contact us</li>
                    <li>about us</li>

                    
                    
        
                </ul>
            </nav>
            
            


        </header>



    );
}

export default Header ;