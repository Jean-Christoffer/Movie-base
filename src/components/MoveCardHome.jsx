import { Paper,Box,Button } from '@mui/material'
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom'
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
export default function MovieCardsHome(props){
    const {details, handleFavorite,value} = props
    return(
        <>


        <Paper id={details.id} sx={{display:'flex',flexDirection:'column', bgcolor:'#191919',width:'100%',textAlign:'center',maxWidth:'220px' }}>

            <Box sx={{ height:'320px' }}> 
                <img src={`http://image.tmdb.org/t/p/w500/${details.poster_path}`} className='latest-img'  />
            </Box>
            <Typography  variant='subtitle2' component='p' sx={{color:'white', mb:0.5,height:'2.5rem',textAlign:'left', p:1 }}>{details.original_title ?? details.title}</Typography>
            <Box sx={{ display:'flex',alignItems:'center',gap:'5px',justifyContent:'space-between' }}>
                <Box sx={{ display:'flex',alignItems:'center',gap:'5px',ml:1}}>
                    <StarIcon sx={{ color:'#dba506' }}  />
                    <Typography sx={{ fontWeight:'bold',color:'white' }}>{details.vote_average === 0 ? 'No rating yet' :
                            details.vote_average % 1 === 0 ? details.vote_average : details.vote_average.toFixed(1)}
                    </Typography>
                </Box>
                <Button onClick={handleFavorite} value={details.id} sx={{ color:'#dba506' }}>
                    <FavoriteIcon  fontSize='small' sx={{cursor:'pointer'}}/>
                </Button>
            </Box>
            <Box>
                <Link className=' cta-up' to={`details/${details.id}`}>Details</Link>
            </Box>

        </Paper>

        </>
    )
}