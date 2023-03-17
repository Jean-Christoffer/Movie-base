
import { Paper, Button,Box } from '@mui/material'
import Typography from '@mui/material/Typography';

export default function ImageCarousel({details})
{

    
    return (

        <Paper sx={{bgcolor:'rgb(0, 0, 0)',mt:2, width:{xs:'100%' } }} >
          <Box sx={{display:'flex', flexDirection:'column', alignItems:'center' }}>
            <Box sx={{width:{xs:'100%', md:'360px'} }}>
                <img src={`http://image.tmdb.org/t/p/w500/${details.poster_path}`} className='caro-img'/>
            </Box>
            
            <Typography variant='h6' component='h2' sx={{color:'white' }}>{details.title ?? details.name}</Typography>
            <Button sx={{color:'#dba506',fontWeight:'700' }}>Details</Button>
          </Box>
        </Paper>

    )
}

