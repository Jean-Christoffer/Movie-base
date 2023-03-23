import {Container} from '@mui/material'
import {Route, Routes,BrowserRouter} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Details from './components/Details.jsx'
import TopratedPage from './components/TopratedPage.jsx'
import MoviesByGenre from './components/MoviesByGenre.jsx'
import SearchResults from './components/SearchResults.jsx'
import Footer from './components/Footer.jsx'

function App() {

return(
  <>
 

    <BrowserRouter>
      <Navbar/>

      <Container sx={{ display:'flex', flexDirection:'column',minHeight:'100vh' }} >
      <Routes>
        <Route path='/' element={<Home  />}></Route>
        <Route path='/details/:id' element={<Details />}></Route>
        <Route path='/movies/' element={<TopratedPage />}></Route>
        <Route path='/genre/' element={<MoviesByGenre />}></Route>
        <Route path='/searchresults/' element={<SearchResults/>}></Route>
      </Routes>
      </Container>

      <Footer/>
    </BrowserRouter>

  </>
)
}

export default App
