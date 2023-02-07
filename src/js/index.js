import Notiflix from 'notiflix';
import simpleLightbox from 'simplelightbox';

let id = 1;
const refresh = document.querySelector('.refresh');

function render(r) {
  r.forEach(element => {
    const canvas = document.querySelector('.gallery');
    const card = document.createElement('div');
    const wrapper = document.createElement('div');
    const link = document.createElement('a');
    const picture = document.createElement('img');
    const description = document.createElement('p');

    picture.src = element.webformatURL;
    link.href = element.webformatURL;
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


    card.classList.add('gallery__card');
    link.classList.add('gallery__link');
    wrapper.classList.add('gallery__wrapper');
    picture.classList.add('gallery__picture');
    description.classList.add('gallery__description');

    canvas.append(card);
    card.append(link);
    link.append(wrapper);
    wrapper.append(picture);
    card.append(description);
  });
  const lightbox = new simpleLightbox('.container a');
  lightbox.on('error.simplelightbox', function (e) {
    console.log(e);
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
  refresh.classList.remove("invisible");
  e.preventDefault();
  loadPage(id);
  id = id + 1;
});

//infinity scroll

refresh.addEventListener('click', ev => {
    loadPage(id);
    id = id + 1;
});
