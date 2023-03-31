import {Container} from '@mui/material'
import {Route, Routes,BrowserRouter} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Details from './components/Details.jsx'
import TopratedPage from './components/TopratedPage.jsx'
import MoviesByGenre from './components/MoviesByGenre.jsx'
import SearchResults from './components/SearchResults.jsx'
import Footer from './components/Footer.jsx'
import Favorites from './components/Favorites.jsx'
import {useState,useEffect} from 'react'
function App() {

  const [movieIds, setMovieIds] = useState(JSON.parse(localStorage.getItem('moveId')) || [])
  useEffect(() => {
    localStorage.setItem('moveId', JSON.stringify(movieIds))
  }, [movieIds])
  function handleFavorite(e){

    if(!e.target.value){
        return
    }
    setMovieIds(prevState=> {
    
            if(prevState.includes(e.target.value)){
                return prevState
            }else{  
             
         
                return [...prevState, e.target.value]
            }
 
        
    })
    
}    

return(
  <>
  
    <BrowserRouter>
      <Navbar/>

      <Container sx={{ display:'flex', flexDirection:'column',minHeight:'100vh' }} >
      <Routes>
        <Route path='/' element={<Home handleFavorite={handleFavorite}  />}></Route>
        <Route path='/details/:id' element={<Details />}></Route>
        <Route path='/movies/' element={<TopratedPage />}></Route>
        <Route path='/genre/' element={<MoviesByGenre />}></Route>
        <Route path='/searchresults/' element={<SearchResults/>}></Route>
        <Route path='/favorites/' element={<Favorites movieIds={movieIds}/>}></Route>
      </Routes>
      </Container>

      <Footer/>
    </BrowserRouter>

  </>
)
}

export default App
