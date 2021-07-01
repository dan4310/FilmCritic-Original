import secrets from './secrets';
const API_KEY = secrets.theMovieDBAPIKey;

const DISCOVER_URL = "https://api.themoviedb.org/3/discover/movie?api_key=" + API_KEY;

const requests = {
    fetchPopular: {name: "Trending", url: DISCOVER_URL + "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate"},
    fetchNewReleases: {name: "New Releases", url: DISCOVER_URL + "&language=en-US&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&primary_release_year="+(new Date().getFullYear())+"&with_watch_monetization_types=flatrate"},
    fetchHorror: {name: "Horror", url: DISCOVER_URL + "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=27&with_watch_monetization_types=flatrat"},
    fetchAction: {name: "Action", url: DISCOVER_URL + "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=28&with_watch_monetization_types=flatrat"},
    fetchComedy: {name: "Comedy", url: DISCOVER_URL + "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=35&with_watch_monetization_types=flatrate"},
};

export default requests;