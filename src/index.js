import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';

import { Report } from 'notiflix/build/notiflix-report-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const el = {
    selectInput: document.querySelector('.breed-select'),
    containerCatInfo: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
};

el.selectInput.addEventListener('change', handlerSelect);

Loading.hourglass('Loading data, please wait...');

fetchBreeds()
    .then(data => {
        createOptions(data.data);
        new SlimSelect({
            select: '.breed-select',
        });
        el.selectInput.classList.remove('hidden');
    })
    .catch(error => {
        Report.failure(
            `${error}!!!😢😢😢`,
            'Oops! Something went wrong! Try reloading the page!',
            'OK'
        );
    })
    .finally(Loading.remove());

function createOptions(arrCats) {
    el.selectInput.innerHTML = arrCats
        .map(({ id, name }) => `<option value=${id}>${name}</option>`)
        .join('');
}

function createCard(selectedCat) {
    el.containerCatInfo.innerHTML = `<article class="flex-container"><img src=${selectedCat.url} alt=${selectedCat.breeds[0].name} width="300"><div class="cat-description"><h3>${selectedCat.breeds[0].name}</h3><p>${selectedCat.breeds[0].description}</p><p><b>Temperament: </b>${selectedCat.breeds[0].temperament}</p></div></article>`;
}

function handlerSelect(e) {
    Loading.hourglass('Loading data, please wait...');
    el.containerCatInfo.innerHTML = '';
    fetchCatByBreed(e.target.value)
        .then(data => {
            createCard(...data.data);
            el.containerCatInfo.classList.remove('hidden');
        })
        .catch(error => {
            Report.failure(
                `${error}!!!😢😢😢`,
                'Oops! Something went wrong! Try reloading the page!',
                'OK'
            );
        })
        .finally(Loading.remove());
}