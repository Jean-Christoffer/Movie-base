import { useParams } from "react-router-dom";
import useFetch from "./useFetch.jsx";
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { Typography, Box, Container } from "@mui/material";
import { useState, useEffect } from "react";
import Loader from "./Loader.jsx";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Scrollbar, A11y } from "swiper";
import StarIcon from "@mui/icons-material/Star"
import {useRef } from 'react';
import "swiper/css/bundle";

SwiperCore.use([Navigation, Scrollbar, A11y]);

export default function Details(props) {
  const {handleFavorite,movieList} = props


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));



  let slidesPerView = 3;

  if (isMobile) {
    slidesPerView = 1;
  } else if (isTablet) {
    slidesPerView = 2;
  }

  const params = useParams();
  const { get, loading } = useFetch(`https://api.themoviedb.org/3/`);

  const [data, setData] = useState({});
  const [trailer, setTrailer] = useState([]);
  const [credits, setCredits] = useState({});
  const [images, setImages] = useState([]);

  const [releaseDate, setReleaseDate] = useState("");
  const [runTime, setRunTime] = useState();
  const [officialTrailer, setOfficialTrailer] = useState("");
  const [genres, setGenres] = useState([]);

  const [writers, setWrites] = useState([]);
  const [director, setDirector] = useState([]);

  const [toggleColor, setToggleColor] = useState('white')

  const ref = useRef(params.id)


  useEffect(() => {
    Promise.all([
      get(
        `movie/${params.id}?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=en-US`
      ),
      get(
        `movie/${params.id}/videos?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=en-US`
      ),
      get(
        `movie/${params.id}/credits?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=en-US`
      ),
      get(`movie/${params.id}/images?api_key=${import.meta.env.VITE_API_KEY}`),
    ])
      .then(([movieData, trailerData, creditsData, imageData]) => {
        setData(movieData);
        setTrailer(trailerData.results);
        setCredits(creditsData);
        setImages(imageData.backdrops);
      })
      .catch((error) => console.log(error));
  }, [params.id]);

  useEffect(() => {
    if (data.release_date) {
      setReleaseDate(data.release_date.substring(0, 4));
    }
    if (data.runtime) {
      const hours = Math.floor(data.runtime / 60);
      const minutes = data.runtime % 60;
      const formatedTime = `${hours}H ${minutes}`;
      setRunTime(formatedTime);
    }
    if (data.genres) {
      setGenres(data.genres);
    }
  }, [data]);

  useEffect(() => {
    let writers;
    let director;
    if (credits.crew) {
      writers = credits.crew.filter((person) => person.job === "Writer");
      director = credits.crew.filter((person) => person.job === "Director");
    }
    if (writers) {
      setWrites(writers);
    }
    if (director) {
      setDirector(director);
    }
  }, [credits]);

  useEffect(() => {
    let found;
    if (trailer) {
      found = trailer.find((movieTrailer) => movieTrailer.type === "Trailer");
    }
    if (found) {
      setOfficialTrailer(found.key);
    }
  }, [trailer]);

  useEffect(()=>{
    setToggleColor(prevState=> {
    
      if(movieList.includes(ref.current)){
        prevState = '#dba506'
          return prevState
      }else{  
        prevState = 'white'
        return prevState
            
      }
  
})
  },[movieList])
console.log(ref.current)
  return (
    <>
      <Container sx={{ mt: 2 }}>
        <Typography sx={{ color: "white" }} variant="h4" component={"h1"}>
          {data.name ?? data.original_title}
        </Typography>
        <Typography sx={{ color: "#dba506" }}>
          {releaseDate} : {runTime}{" "}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            mt: 2,
          }}
        >
          <Box
            sx={{ width: { xs: "100%", md: "320px" }, position: "relative" }}
          >
            {loading && <Loader />}
            <img alt={data.name ?? data.original_title}
              src={
                data.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${data.poster_path}`
                  : "/2922280_27002.jpg"
              }
              className="bear-img"
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              height: { xs: "350px", md: "auto" },
              position: "relative",
            }}
          >
            {loading && <Loader />}
            {officialTrailer ? (
              <iframe
                className="iframe"
                src={`https://www.youtube.com/embed/${officialTrailer}`}
                allow="accelerometer; clipboard-write; encrypted-media;  picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <Typography sx={{ textAlign: "center", mt: 20 }}>
                No trailer found
              </Typography>
            )}
          </Box>
        </Box>

        <Container
          sx={{ mt: 2, bgcolor: "#191919", p: 1, borderRadius: "5px" }}
        >
          <Box sx={{ display: "flex", gap: "20px", mb: 1, flexWrap:'wrap' }}>
            {genres.map((genre, index) => (
              <Typography key={index} sx={{ color: "#dba506" }}>
                {genre.name}
              </Typography>
            ))}
          </Box>

          {data.vote_average && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                mt: 1,
                mb: 1,
              }}
            >
              <StarIcon sx={{ color: "#dba506" }} />
              <Typography sx={{ fontWeight: "bold" }}>
                {data.vote_average === 0
                  ? "No rating yet"
                  : data.vote_average % 1 === 0
                  ? data.vote_average
                  : data.vote_average.toFixed(1)}
              </Typography>
              <IconButton  variant='text' onClick={handleFavorite} value={params.id} sx={{ml:'auto', color:`${toggleColor}`}}>
                  <FavoriteIcon fontSize='medium' sx={{ pointerEvents: 'none',color:{toggleColor} }} />
                </IconButton>
            </Box>
            
          )}
          <Box sx={{ maxWidth:'750px' }}>
            <Typography sx={{ mb: 0.1, fontWeight: "bold" }}>
              Overview:
            </Typography>
            <Typography variant='body'>{data.overview}</Typography>
          </Box>
          <Box sx={{ display: "flex", fontWeight: "bold", mt: 1, flexWrap:'wrap' }}>
            Writers:{`\u00A0`}
            {writers.slice(0, -1).map((writer, index) => (
              <Typography variant='body2' key={index}>
                {writer.name}
                {`\u00A0`} - {`\u00A0`}
              </Typography>
            ))}
            {writers.length > 0 && (
              <Typography variant='body2'>{writers[writers.length - 1].name}</Typography>
            )}
          </Box>

          <Box sx={{ display: "flex", fontWeight: "bold", mt: 1, flexWrap:'wrap' }}>
            Directors:{`\u00A0`}
            {director.slice(0, -1).map((director, index) => (
              <Typography variant='body2' key={index}>
                {director.name}
                {`\u00A0`} - {`\u00A0`}
              </Typography>
            ))}
            {director.length > 0 && (
              <Typography variant='body2'>{director[director.length - 1].name}</Typography>
            )}
          </Box>
        </Container>
        {images.length > 0 && (
          <Container
            sx={{
              mb: 2,
              mt: 2,
              bgcolor: "#191919",
              p: 1,
              borderRadius: "5px",
              width: "100%",
            }}
          >
            <Box>
              <Typography variant="h4" sx={{ mb: 1 }} component={"h2"}>
                Photos
              </Typography>
            </Box>
            {loading && <Loader />}
            <Swiper
              modules={[Navigation, Scrollbar, A11y]}
              navigation
              scrollbar={{ draggable: true }}
              spaceBetween={50}
              slidesPerView={slidesPerView}
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img alt={data.name ?? data.original_title}
                    className="swiper-img"
                    src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Container>
        )}
      </Container>
    </>
  );
}
