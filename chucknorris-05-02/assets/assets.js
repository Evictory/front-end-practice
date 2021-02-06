const URL_FETCH_CATEGORIES = 'https://api.chucknorris.io/jokes/categories';

const BASE_URL = 'https://api.chucknorris.io/jokes/';
const METHOD = 'GET';
const CONTENT_TYPE = 'application/json';
const MODE = 'cors';
const CARD_STYLES = ['content-category', 'text-category--default'];
// const CATEGORIES_DIVS = ['categorie-1', 'categorie-2', 'categorie-3', 'categorie-4'];
const CATEGORIES_DIVS = ['categorie-1'];


const AVALIABLE_THEMES = {
    Animal: "animal",
    Carreira: "career",
    Celebridade: "celebrity",
    Dev: "dev",
    Explicita: "explicit",
    Moda: "fashion",
    Comida: "food",
    Historia: "history",
    Dinheiro: "money",
    Filmes: "movie",
    Musica: "music",
    Politica: "political",
    Religiao: "religion",
    Ciencia: "science",
    Esporte: "sport",
    Viagem: "travel"
}

async function getJoke(category){
  const joke = await getRandomJokeByCategory(category);

  renderJoke(joke);
}

async function getFreeJoke(searchValue){
    const { result } = await getJokeByWord(searchValue);
    
    for (let joke in result){
        renderJoke(result[joke]);
    }
}

async function getRandomJoke(){
  try {
    const response = await fetch(`${BASE_URL}random`, {
      method: METHOD,
      mode: MODE,
      headers: {
        'Content-type': CONTENT_TYPE
      }
    });
    
    return await response.json();
    
  } catch (error) {
    console.error(error);    
  } finally {
    
  }
}


async function getRandomJokeByCategory(category){
  try {
    const response = await fetch(`${BASE_URL}random?category=${category}`, {
      method: METHOD,
      mode: MODE,
      headers: {
        'Content-type': CONTENT_TYPE
      }
    });
    
    return await response.json();
    
  } catch (error) {
    console.error(error)
    
  } finally {
    
  }

}

async function getJokeByWord(searchQuery){
  
  try {
    const response = await fetch(`${BASE_URL}search?query=${searchQuery}`, {
      method: METHOD,
      mode: MODE,
      headers: {
        'Content-type': CONTENT_TYPE
      }
    });
    
    return await response.json();
    
  } catch (error) {
    console.error(error)
    
  } finally {
    
  }
}

function renderJoke(joke){
  let imgNode = document.getElementById('avatar_joke');
  let paragraphJoke = document.getElementById('paragraph_joke');

  imgNode.src = joke.icon_url;
  imgNode.alt = 'Chuck image';

  paragraphJoke.innerHTML = joke.value;

}

function renderThemes(){
  CATEGORIES_DIVS.forEach(div => {
    let newDiv = document.getElementById(div);
    themes = AVALIABLE_THEMES;
    createElement(newDiv, themes);
  });  
}

function createElement(categoriesDiv, themes){

  for (theme in themes){
      let newCard = document.createElement('div');
      CARD_STYLES.forEach(style => newCard.classList.add(style));
      newCard.innerText = theme;

      newCard.addEventListener('click', e => getJoke(themes[theme]));

      categoriesDiv.appendChild(newCard);
  }
  
}

function bindEvents(){
  var searchInput = document.getElementById('input_search');
  
  searchInput.addEventListener('change', async (e) => {
      var searchValue = e.target.value;

      if(searchValue)
          await getFreeJoke(searchValue);
      
  });
}

renderThemes();
bindEvents();