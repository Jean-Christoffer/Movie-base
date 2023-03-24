
import { Paper,Box } from '@mui/material'
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom'
export default function ImageCarousel({details})
{  
    return (

        <Paper sx={{bgcolor:'rgb(0, 0, 0)',mt:2, width:{xs:'100%' } }} >
          <Box sx={{display:'flex', flexDirection:'column', alignItems:'center' }}>
            <Box sx={{width:{xs:'100%', md:'100%'}, position:'relative' }}>
                <img src={`http://image.tmdb.org/t/p/w500/${details.backdrop_path}`} className='caro-img'/>
            </Box>
            <Box sx={{width:{xs:'60px', sm:'100px',md:'120px'}, position:'absolute', display:{xs:'none', md:'block'}, bottom:'40px',left:'10px' }}>
                <img src={`http://image.tmdb.org/t/p/w500/${details.poster_path}`} className='absolute-img caro-img'/>
            </Box>
            <Typography variant='h6' component='h2' sx={{color:'white', }}>{details.title ?? details.name}</Typography>
            <Link className='details-cta' to={`details/${details.id}`}>Details</Link>
          </Box>
        </Paper>

    ) 
}

