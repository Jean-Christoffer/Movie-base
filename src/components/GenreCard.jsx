import {Typography, Box,Paper,Button} from '@mui/material';
import {Link} from 'react-router-dom'
export default function GenreCard(props){
    const {details,handleClick} = props
    return(
        <>
            <Button onClick={handleClick} value={details.id}><Paper sx={{width:'200px', display:'flex', justifyContent:'center',alignItems:'center', p:2 }}>
                <Typography>{details.name}</Typography>
            </Paper></Button>
        </>
    )
}