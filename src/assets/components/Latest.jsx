import {Typography, Box, Paper} from '@mui/material';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import {Link} from 'react-router-dom'
export default function Latest({details}){
    return(
        <>

            <Paper sx={{display:'flex',flexDirection:'column', bgcolor:'#191919',width:'100%',textAlign:'center' }}>

                    <Box sx={{ height:'320px' }}> 
                        <img src={`http://image.tmdb.org/t/p/w500/${details.poster_path}`} className='latest-img'  />
                    </Box>
                    <Typography  variant='subtitle2' component='p' sx={{color:'white', mb:0.5,height:'2.5rem',textAlign:'left', p:1 }}>{details.original_title ?? details.title}</Typography>
                    <Stack spacing={1} sx={{ pl:1 }}>
                        <Rating name="half-rating-read"  size="small" value={details.vote_average / 2} precision={0.5} readOnly />
                    </Stack>
                    <Box>
                        <Link className=' cta-up' to={`details/${details.id}`}>Details</Link>
                    </Box>
 
            </Paper>

        </>
    )
}