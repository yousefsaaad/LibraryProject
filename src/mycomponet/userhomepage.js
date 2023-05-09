import Footer from "../shared/footer";
import BodyCard from "./Body-card";
import Books from "./Books";


import NavBar from "./navbar";


import UserCard from "./usercard";

const Userhomepage = () => {
    return ( 
        <div>
            <UserCard/>
        <NavBar/>
        
        
        <Books/>
        <Footer/>

        </div>
    )
    
};

export default Userhomepage;