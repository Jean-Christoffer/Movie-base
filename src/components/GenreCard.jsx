import {Typography, Box,Paper} from '@mui/material';
import {Link} from 'react-router-dom'
export default function GenreCard(props){
    const {details} = props
    return(
        <>
            <Paper sx={{width:'200px', display:'flex', justifyContent:'center',alignItems:'center' }}>
                <Typography>{details.name}</Typography>
            </Paper>
        </>
    )
}