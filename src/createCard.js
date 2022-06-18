export default function createCard(countrys){
    const country = countrys[0];
    const flags = country.flags.svg;
    const name = country.name.official;
    const capital = country.capital[0];
    const population = country.population;
    let langauge = "";
    const langaugeArr = Object.values(country.languages);

      for (let i = 0; i<langaugeArr.length; i+=1) {
        if(i>0){
          langauge = langauge + ", ";
        };
        langauge = langauge + langaugeArr[i];
      }
      
   return `<div class="title-block">
    <img src="${flags}" alt="flags" class ="imgFlag">
    <h2 class="title-text">${name}</h2>
    </div>
    <ul class="listOfProperties">
      <li class ="properties">Capital: <span>${capital}</span></li>
      <li class ="properties">Population: <span>${population}</span></li>
      <li class ="properties">Languages: <span>${langauge}</span></li>
    </ul>`
};