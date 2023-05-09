
import './App.css';


import Footer from './shared/footer';
import Lists from './mycomponet/body-list';
import SearchBar from './mycomponet/searchbar';
import NavBar from './mycomponet/navbar';
import UserCard from './mycomponet/usercard';


function App() {
  return (
    <>
    <UserCard/>

      <NavBar/>
      <SearchBar/>
      <Lists/>
      
      
      

      <Footer/>
      
    </>
  );
}

export default App;
