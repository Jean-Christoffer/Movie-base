import {Container} from '@mui/material'
import {Route, Routes,BrowserRouter } from 'react-router-dom'

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

  const [movieIds, setMovieIds] = useState(JSON.parse(sessionStorage.getItem('moveId')) || [])




  useEffect(() => {
    sessionStorage.setItem('moveId', JSON.stringify(movieIds))
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
          <Route exact  path='/' element={<Home   />}></Route>
          <Route path='/details/:id' element={<Details handleFavorite={handleFavorite} movieList={movieIds}  />}></Route>
          <Route path='/movies/' element={<TopratedPage />}></Route>
          <Route path='/genre/' element={<MoviesByGenre />}></Route>
          <Route path='/searchresults/' element={<SearchResults/>}></Route>
          <Route path='/favorites/' element={<Favorites movieIds={movieIds} setMovieIds={setMovieIds}/>}></Route>
        </Routes>

      </Container>

      <Footer/>
    </BrowserRouter>

  </>
)
}

export default App
