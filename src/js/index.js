import Notiflix from 'notiflix';

let id = 1;

function render(r) {
  r.forEach(element => {
    const canvas = document.querySelector('.container');
    const card = document.createElement('div');
    const wrapper = document.createElement('div');
    const picture = document.createElement('img');
    const description = document.createElement('p');

    picture.src = element.webformatURL;
    picture.alt = element.tags;
    description.textContent = 
    "likes: "+element.likes+
    "views: "+element.views+
    "comments: "+element.comments+
    "downloads: "+element.downloads;
    // tags - wiersz z opisem obrazka. Będzie pasować do atrybutu alt.
    // likes - liczba lajków.
    // views - liczba wyświetleń.
    // comments - liczba komentarzy.
    // downloads - liczba pobrań.


    card.classList.add('card');
    wrapper.classList.add('card__wrapper')
    picture.classList.add('card__picture');
    description.classList.add('card__description');

    canvas.append(card);
    card.append(wrapper)
    wrapper.append(picture);
    card.append(description);
  });
}

function loadPage(id) {
  console.log(id);
  const url = 'https://pixabay.com/api/';
  const key = '33400250-146930462e7f20f0c64c3f7c9';
  const textInpunt = document.querySelector(`.search__input`);

  fetch(
    `${url}?key=${key}&q=${textInpunt.value}&image_type=photo&page=${id}&per_page=51`
  )
    .then(r => r.json())
    .then(r => {
      render(r.hits);
      Notiflix.Notify.success(`We have found ${r.totalHits} hits`);
    })
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure(error);
    });
}

const form = document.querySelector('.search');
form.addEventListener('submit', e => {
  e.preventDefault();
  loadPage(id);
  id = id + 1;
});

//infinity scroll

document.addEventListener('scroll', ev => {
  if (window.scrollY >= document.documentElement.scrollHeight * 0.7) {
    loadPage(id);
    id = id + 1;
  }
});
