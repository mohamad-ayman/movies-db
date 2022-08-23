class Api {
    constructor(key) {
        this.key = key;
    }
}
export default class MovieApi extends Api {
    #url = "https://api.themoviedb.org/3";
    #imgUrl = "https://image.tmdb.org/t/p/w500"
    constructor(key) {
        super(key);
    }

    #justifyPosterPath(movies) {
        for (const movie of movies) {
            movie.poster_path = `${this.#imgUrl}/${movie.poster_path}`
        }
    }

    async getTrendingMovies(callback) {
        let response = await fetch(`${this.#url}/trending/all/day?api_key=${this.key}`);
        let responseJson = await response.json();

        if (response.ok) {
            this.#justifyPosterPath(responseJson.results);
            callback(responseJson.results);
        }
    }
    async getMoviesByCategory(category, callback) { 
        let response = await fetch(`${this.#url}/movie/${category}?api_key=${this.key}`);
        let responseJson = await response.json();
    
        if (response.ok) {
            this.#justifyPosterPath(responseJson.results);
            callback(responseJson.results);
        }
    }
    async getMoviesByName(query, callback) {
        let response = await fetch(`${this.#url}/search/movie?api_key=${this.key}&query=${query}`);
        let responseJson = await response.json();
    
        if (response.ok) {
            this.#justifyPosterPath(responseJson.results);
            callback(responseJson.results);
        }
    }
}