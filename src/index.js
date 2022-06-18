import Notiflix from 'notiflix';
import './css/styles.css';
import createCard from './createCard';
import createList from './createList';
import {fetchCountries} from './fetchCountries';

// var  debounce  = require ('lodash.debounce');
var  _  = require ('lodash');

const DEBOUNCE_DELAY = 300;
const notiflyParams = {
    showOnlyTheLastOne: true,
    clickToClose: true,
    cssAnimationDuration: 500, 
}

const refs = {
    inputEl: document.querySelector('#search-box'),
    ulEl: document.querySelector('.country-list'),
    cardEl: document.querySelector('.country-info'),
};

refs.inputEl.addEventListener('input', _.debounce(countrySearch, DEBOUNCE_DELAY));

function countrySearch(e){
    const name = e.target.value.trim();
    if (name == ""){
        clean();
    }else{
        fetchCountries(name).then((countrys)=>{
            if (countrys.length > 10){
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.', notiflyParams);
                return;
            };
            if (countrys.length == 1){
                renderCard(createCard(countrys));
            }else{
                renderList(createList(countrys));
            }
        })
        .catch((error)=>{
            if (error.message == '404'){
                Notiflix.Notify.failure('Oops, there is no country with that name', notiflyParams);
            }
        });
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