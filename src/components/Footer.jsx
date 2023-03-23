import {Typography, Box} from '@mui/material';
import {Link} from 'react-router-dom'
export default function Footer(){

    return (
        <>
        <Box component='footer' sx={{ p:1, width:'100%',display:'flex',
         justifyContent:'center',alignItems:'center',marginTop:'auto' }}>
          <Typography component='p' variant='subtitle2'>API from <Link to='https://www.themoviedb.org/'
           target="_blank">TMDB</Link></Typography>
        </Box>
        </>
      )
}