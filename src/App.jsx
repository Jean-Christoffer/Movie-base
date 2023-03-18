import {Container} from '@mui/material'
import {Route, Routes,BrowserRouter} from 'react-router-dom'
import Navbar from './assets/components/Navbar'
import Home from './assets/components/Home'
import Details from './assets/components/Details.jsx'
function App() {

return(
  <>
 

    <BrowserRouter>
      <Navbar/>
      <Container>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/details/:id' element={<Details/>}></Route>
      </Routes>
      </Container>
    </BrowserRouter>

  </>
)
}

export default App
