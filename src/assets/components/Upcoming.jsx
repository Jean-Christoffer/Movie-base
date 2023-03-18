import { Paper, Button,Box } from '@mui/material'
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import {Link} from 'react-router-dom'
export default function Upcoming({details}){
    return(
        <>

            <Paper sx={{display:'flex',flexDirection:'column', justifyContent:'center',mb:1, p:1, bgcolor:'#191919',width:'320px',height:'180px' }}>
            <Typography variant='subtitle2' component='p' sx={{color:'white', mb:0.5 }}>{details.original_title ?? details.title}</Typography>
            <Box sx={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <Box sx={{width:'100px'}}>
                    <img src={`http://image.tmdb.org/t/p/w500/${details.poster_path}`} className='caro-img' />
                </Box>
                <Stack spacing={1}>
                    <Rating name="half-rating-read"  size="small" value={details.vote_average / 2} precision={0.5} readOnly />
                </Stack>
                <Box>
                    <Link className='details-cta cta-up' to={`details/${details.id}`}>Details</Link>
                </Box>
            </Box>
            </Paper>

        </>
    )
}