import { Paper,Box } from '@mui/material'
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom'
import StarIcon from '@mui/icons-material/Star';
export default function MovieCardsHome({details}){
    return(
        <>


        <Paper sx={{display:'flex',flexDirection:'column', bgcolor:'#191919',width:'100%',textAlign:'center',maxWidth:'220px' }}>

            <Box sx={{ height:'320px' }}> 
                <img src={`http://image.tmdb.org/t/p/w500/${details.poster_path}`} className='latest-img'  />
            </Box>
            <Typography  variant='subtitle2' component='p' sx={{color:'white', mb:0.5,height:'2.5rem',textAlign:'left', p:1 }}>{details.original_title ?? details.title}</Typography>
            <Box sx={{ display:'flex',alignItems:'center',gap:'5px',ml:1 }}>
                <StarIcon sx={{ color:'#dba506' }}  />
                 <Typography sx={{ fontWeight:'bold',color:'white' }}>{details.vote_average === 0 ? 'No rating yet' :
                         details.vote_average % 1 === 0 ? details.vote_average : details.vote_average.toFixed(1)}
                </Typography>
            </Box>
            <Box>
                <Link className=' cta-up' to={`details/${details.id}`}>Details</Link>
            </Box>

        </Paper>

        </>
    )
}