import Notiflix from 'notiflix';
import './css/styles.css';
import createCard from './createCard';
import createList from './createList';
import {fetchCountries} from './fetchCountries';


const DEBOUNCE_DELAY = 300;

const refs = {
    inputEl: document.querySelector('#search-box'),
    ulEl: document.querySelector('.country-list'),
    cardEl: document.querySelector('.country-info'),
};
console.dir(refs.inputEl);
console.dir(refs.ulEl);
console.dir(refs.cardEl);
refs.inputEl.value = 's';

refs.inputEl.addEventListener('input', countrySearch);

function countrySearch(e){
    const name = e.target.value;
    // console.log(name.length);
    fetchCountries(name)
    .then((countrys)=>{
        console.log(countrys);
        if (countrys.length > 10){
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            return;
        };
        if (countrys.length ==1){
            renderCard(createCard(countrys));
            return;
        };
        renderList(createList(countrys));
    })
    .catch((error) => console.log(error));

};

function renderCard(markup){
    refs.ulEl.innerHTML = "";
    refs.cardEl.innerHTML = markup;
};

function renderList(markup){
    refs.ulEl.innerHTML = markup;
    refs.cardEl.innerHTML = "";
};