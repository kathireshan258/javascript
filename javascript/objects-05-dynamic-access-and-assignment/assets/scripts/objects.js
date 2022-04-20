const addMovieBtn  = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');
const movies = [];

const  renderMovies = (filter = '') => {
  const movieList = document.getElementById('movie-list');
  if (movies.length <= 0) {
    movieList.classList.remove('visible');
    return;
  } else {
    movieList.classList.add('visible');
  }
  movieList.innerHTML = '';

  const filteredMovies = !filter ? movies : movies.filter(movie => movie.info.title.includes(filter));

  filteredMovies.forEach((movie) => {
    const movieEl = document.createElement('li');
    const {info: movieInfo, ...otherProperty} = movie;
    // let text = movieInfo.title + ' - ';
    let text = movie.getFormattedTitle() + ' - ';
    for (const key in movieInfo) {
      if (key !== 'title') {
        text = text + `${key}: ${movieInfo[key]}`;
      }
    }
    movieEl.textContent = text;
    movieList.insertAdjacentElement('afterbegin', movieEl);
  })
}

const addMovieHandler = () => {
  const title = document.getElementById('title').value.trim();
  const extraName = document.getElementById('extra-name').value.trim();
  const extraValue = document.getElementById('extra-value').value.trim();

  if (title === '' || extraName === '' || extraValue === '') {
    return;
  }

  const newMovie = {
    info: {
        title,
        [extraName] : extraValue
    },
    id: Math.random(),
    getFormattedTitle() { // this can be written as getFormattedTitle: functio() {}
      return this.info.title.toUpperCase();
    }
  };
  movies.push(newMovie);
  console.log(movies);
  renderMovies();
}

const searchMovieHandler = () => {
  const filterTerm = document.getElementById('filter-title').value;
  renderMovies(filterTerm);
}

searchBtn.addEventListener('click', searchMovieHandler);
addMovieBtn.addEventListener('click', addMovieHandler);