export default function createList(countrys){
let listCountru = "";
countrys.map((country) => {
    let li = `<li class ="listOfProperties title-block">
    <img src="${country.flags.svg}" alt="flags" class ="imgFlag">
    <p class="properties">${country.name.official}</p>
</span></li> `;
    listCountru =  listCountru + li;
  });
  return listCountru;
};