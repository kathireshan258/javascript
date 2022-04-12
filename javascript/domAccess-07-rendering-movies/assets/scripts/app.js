const addMovieModel = document.getElementById('add-modal');
const startAddMovieButton  = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieButton = addMovieModel.querySelector('.modal__actions .btn--passive');
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModel.querySelectorAll('input');
const movies = [];

const removeErrorMsg = () => {
    const isTitleErrMsgDisplayed =  (userInputs[0].nextElementSibling!== null && userInputs[0].nextElementSibling.tagName === 'P' && userInputs[0].nextElementSibling.textContent) || false;
    const isImageURLErrMsgDisplayed = (userInputs[1].nextElementSibling!== null && userInputs[1].nextElementSibling.tagName === 'P' && userInputs[1].nextElementSibling.textContent) || false;
    const isratingErrMsgDisplayed = (userInputs[2].nextElementSibling!== null && userInputs[2].nextElementSibling.tagName === 'P' && userInputs[2].nextElementSibling.textContent) || false;

    if (isTitleErrMsgDisplayed) {
        userInputs[0].nextElementSibling.remove();
    }

    if (isImageURLErrMsgDisplayed) {
        userInputs[1].nextElementSibling.remove();
    }

    if (isratingErrMsgDisplayed) {
        userInputs[2].nextElementSibling.remove();
    }
}

const clearUserInputs = () => {
    userInputs[0].value = '';
    userInputs[1].value = '';
    userInputs[2].value = '';
}

const toggleBackDrop = () => {
    backdrop.classList.toggle('visible');
}

const toggleMovieModal = () => {
    addMovieModel.classList.toggle('visible');
    toggleBackDrop();
}

const backDropClickHandler = () => {
    toggleMovieModal();
}

const cancelAddMovieHandler = () => {
    toggleMovieModal();
    clearUserInputs();
    removeErrorMsg();
}

const isEmptyTitle = (title) => title.trim() === '' ? true : false;

const isEmptyImageURL = (imageURL) => imageURL.trim() === '' ? true : false;

const isEmptyRating = (rating) => rating.trim() === '' ? true : false;

const isValidRating = (rating) => rating.trim() < 1 || rating.trim() > 5 ? true : false;

const createErrorMsgElement = () => {
        const errElement = document.createElement('p');
        errElement.style.color = "red";
        errElement.style.fontSize = "15px";
        return errElement;
    }

const addMovieHandler = () => {

    const isTitleErrMsgDisplayed =  (userInputs[0].nextElementSibling!== null && userInputs[0].nextElementSibling.tagName === 'P' && userInputs[0].nextElementSibling.textContent) || false;
    const isImageURLErrMsgDisplayed = (userInputs[1].nextElementSibling!== null && userInputs[1].nextElementSibling.tagName === 'P' && userInputs[1].nextElementSibling.textContent) || false;
    const isratingErrMsgDisplayed = (userInputs[2].nextElementSibling!== null && userInputs[2].nextElementSibling!== null && userInputs[2].nextElementSibling.tagName === 'P' && userInputs[2].nextElementSibling.textContent) || false;
    let isValid = true;

    if(isTitleErrMsgDisplayed || isImageURLErrMsgDisplayed || isratingErrMsgDisplayed) {
        isValid = false;
        return;
    }

    const titleValue = userInputs[0].value;
    const imageURLValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if(isEmptyTitle(titleValue)) {
        const errElement = createErrorMsgElement();
        errElement.textContent = "Please enter a valid title.";
        userInputs[0].insertAdjacentElement('afterEnd',errElement);
        isValid = false;
    }

    if(isEmptyImageURL(imageURLValue)) {
        const errElement = createErrorMsgElement();
        errElement.textContent = 'Please enter a valid image url';
        userInputs[1].insertAdjacentElement('afterend', errElement);
        isValid = false;
    }

    if(isEmptyRating(ratingValue)) {
        const errElement = createErrorMsgElement();
        errElement.textContent = "Please enter a valid rating.";
        userInputs[2].insertAdjacentElement('afterend', errElement);
        isValid = false;
    }

    if(+ratingValue > 5 || +ratingValue < 1 && ratingValue.trim() !== '') {
        const errElement = createErrorMsgElement();
        errElement.textContent = "Please enter a valid rating between 1 & 5.";
        userInputs[2].insertAdjacentElement('afterend', errElement);
        isValid = false;
    }

    if (isValid) {
        const newMovie = {
        title: titleValue.trim(),
        imageURL: imageURLValue.trim(),
        rating: ratingValue.trim()
    };

    movies.push(newMovie);
    console.log(movies);
    toggleMovieModal();
    clearUserInputs();
    removeErrorMsg();
    }
}

startAddMovieButton.addEventListener('click', toggleMovieModal);
backdrop.addEventListener('click', backDropClickHandler); 
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);
userInputs[0].addEventListener('keydown', () => {
    const isTitleErrMsgDisplayed = (userInputs[0].nextElementSibling.tagName === 'P' && userInputs[0].nextElementSibling.textContent) || false;
    if (isTitleErrMsgDisplayed) {
        userInputs[0].nextElementSibling.remove();
    }
});