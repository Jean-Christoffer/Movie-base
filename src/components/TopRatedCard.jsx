import {Typography, Box, Paper} from '@mui/material';
import { Link } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';

export default function TopRated(props){
    const {details, rank,loading, loaderSpinner} = props
    return(
        <>
            <Paper  sx={{ bgcolor:'#f5f5f5',color:'black', display:'flex', width:'100%',p:1, alignItems:'center', mb:1}}>
                <Box sx={{ width:'90px' }}>
                    {loading ? loaderSpinner : <img alt={details.original_title ?? details.name} src={details.poster_path ? `http://image.tmdb.org/t/p/w500/${details.poster_path}` : '/2922280_27002.jpg'} className='toprated'/>}
                </Box>
                <Typography sx={{ ml:1 }}>{rank}.{`\u00A0`}</Typography>

                <Box sx={{ width:'100%', p:1,display:'flex',justifyContent:'flex-start' }}>
                    <Box sx={{ display:'flex',alignItems:'center' }}>
                        <Typography  sx={{display:'inline-block', width:{xs:'100px',sm:'100%',md:'100%'}, whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'  }}>
                            <Link className='top-rated-title genreLink'
                                to={`/details/${details.id}`}>{details.original_title ?? details.name}</Link>
                        </Typography>

                        <Typography  variant='subtitle'>{`\u00A0`}({details.release_date.substring(0,4)})</Typography>                    
                    </Box>


                    <Box sx={{ display:'flex',alignItems:'center',gap:'5px' }}>
                        <StarIcon sx={{ color:'#dba506' }}  />
                        <Typography sx={{ fontWeight:'bold' }}>{details.vote_average === 0 ? 'No rating yet' :
                         details.vote_average % 1 === 0 ? details.vote_average : details.vote_average.toFixed(1)}
                         </Typography>
                    </Box>
                </Box>

            </Paper>
        </>
    )
}


