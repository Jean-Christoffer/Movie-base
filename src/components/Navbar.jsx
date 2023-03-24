import {useState,useEffect} from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { NavLink,Link,useNavigate  } from "react-router-dom";



const pages = [{
  name:'Top 100 movies',
  route:'movies'
,}
,{
  name:'Movies by genre',
  route:'genre'
}]




const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));



export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

const [query, setQuery] = useState(null)
const [searchInput,setSearchInput] = useState('')
let navigate  = useNavigate();

function handleQuery(event){
  event.preventDefault()

  let cleaner
  if(searchInput !== ''){
    cleaner = searchInput
    cleaner = encodeURIComponent(cleaner.trim().toLowerCase());
  } 
  setQuery(cleaner)
}
useEffect(() => {
  if (query !== null) {
    navigate('/searchresults', { state: { query,searchInput }});
    setQuery(null)
    setSearchInput('')
  }
}, [query])

  return (
    <AppBar position="sticky" sx={{ bgcolor:'#191919', display:'flex', justifyContent:'space-between' }}>
      <Container maxWidth="xl">
 
        <Toolbar disableGutters> 

        <Box 
            sx={{mt:1, display: { xs: 'none', md: 'flex' }, mr: 1 }} >
           <Link to='/'> <img src='/mdb.svg' width={'80px'} /></Link>
          </Box>


          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <NavLink key={index}  to={`/${page.route}`} >{page.name}</NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>  
         
          <form onSubmit={handleQuery}>
            <Search sx={{ position:'relative' }} value={searchInput} onInput={(event) => setSearchInput(event.target.value)}>
            <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={searchInput}
              />
              <IconButton sx={{ color:'white',position:'absolute',right:'10px',top:'15px' }} size='small' type="submit" aria-label="search">
                  <SearchIcon sx={{ position:'absolute' }}  />
              </IconButton>

            </Search>
          </form>
  
          <Box 
            sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, mt:1 }} >
            <Link to='/'> <img src='/mdb.svg' width={'80px'} /></Link>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent:'flex-end' } }}>
            {pages.map((page,index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                <NavLink key={index}  to={`/${page.route}`} >{page.name}</NavLink>
              </MenuItem>
            ))}
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}
