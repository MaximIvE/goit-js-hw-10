import Notiflix from 'notiflix';
import './css/styles.css';
import createCard from './createCard';
import createList from './createList';
import {fetchCountries} from './fetchCountries';

var  debounce  = require ('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const refs = {
    inputEl: document.querySelector('#search-box'),
    ulEl: document.querySelector('.country-list'),
    cardEl: document.querySelector('.country-info'),
};

refs.inputEl.value = 's';

refs.inputEl.addEventListener('input', debounce(countrySearch, DEBOUNCE_DELAY));

function countrySearch(e){
    const name = e.target.value.trim();
    if (name == ""){
        clean();
    }else{
        fetchCountries(name).then((countrys)=>{
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
    }
};

function renderCard(markup){
    refs.ulEl.innerHTML = "";
    refs.cardEl.innerHTML = markup;
};

function renderList(markup){
    refs.ulEl.innerHTML = markup;
    refs.cardEl.innerHTML = "";
};


function clean(){
    refs.ulEl.innerHTML = "";
    refs.cardEl.innerHTML = "";
};