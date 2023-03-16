import {Container} from '@mui/material'
import {Route, Routes,BrowserRouter} from 'react-router-dom'
import Navbar from './assets/components/Navbar'
function App() {

return(
  <>
  <Navbar/>
  <Container>
    <BrowserRouter>
      <Routes>

      </Routes>
    </BrowserRouter>
  </Container>
  </>
)
}

export default App
