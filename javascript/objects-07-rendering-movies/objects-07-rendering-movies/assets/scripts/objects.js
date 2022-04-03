const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');

const movies = [];

const clearInputs = () => {
  document.getElementById('title').value = '';
  document.getElementById('extra-name').value = '';
  document.getElementById('extra-value').value = '';
}

const renderMovies = (filterText = '') => {
  const movieList = document.getElementById('movie-list');

  if (movies.length === 0) {
    movieList.classList.remove('visible');
    return;
  } else {
    movieList.classList.add('visible');
  }
  movieList.innerHTML = '';

  const filterMovie = !filterText ? movies : movies.filter( movie => movie.info.title.includes(filterText));

  filterMovie.forEach((movie) => {
    const movieEl = document.createElement('li');
    let addOntxt;
    for(key in movie.info) {
      if(key !== 'title') {
        addOntxt = `${key} : ${movie.info[key]}`;
      }
    }
    movieEl.textContent = `${movie.info.title} - ${addOntxt}`;
    movieList.append(movieEl);
  });
};

const addMovieHandler = () => {
  const title = document.getElementById('title').value;
  const extraName = document.getElementById('extra-name').value;
  const extraValue = document.getElementById('extra-value').value;

  if (
    title.trim() === '' ||
    extraName.trim() === '' ||
    extraValue.trim() === ''
  ) {
    return;
  }

  const newMovie = {
    info: {
      title,
      [extraName]: extraValue
    },
    id: Math.random()
  };

  movies.push(newMovie);
  renderMovies();
  clearInputs();
};


const filterMovieHandler = () => {
  const filterText = document.querySelector('#filter-title').value;
  renderMovies(filterText);
}

addMovieBtn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click', filterMovieHandler)