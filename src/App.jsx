import {Container} from '@mui/material'
import {Route, Routes,BrowserRouter} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Details from './components/Details.jsx'
import Movies from './components/Movies.jsx'
function App() {

return(
  <>
 

    <BrowserRouter>
      <Navbar/>
      <Container>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/details/:id' element={<Details/>}></Route>
        <Route path='/movies/' element={<Movies/>}></Route>
      </Routes>
      </Container>
    </BrowserRouter>

  </>
)
}

export default App
