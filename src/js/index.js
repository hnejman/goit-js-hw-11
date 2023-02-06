import Notiflix from 'notiflix';
import simpleLightbox from 'simplelightbox';

let id = 1;

const canvas = document.querySelector('.container');

function render(r) {
  r.forEach(element => {
    const a = document.createElement("a");
    const image = document.createElement("img");
    a.classList.add("gallery__link");
    a.href = element.largeImageURL;
    a.insertAdjacentElement("afterbegin", image);

    
    image.classList.add("gallery__image");
    image.alt = element.tags;
    image.src=element.webformatURL;
    // image.dataset.source = element.webformatURL;
    canvas.insertAdjacentElement("afterbegin", a);
    // picture.src = element.webformatURL;
    // picture.alt = element.tags;
    // tags - wiersz z opisem obrazka. Będzie pasować do atrybutu alt.
    // likes - liczba lajków.
    // views - liczba wyświetleń.
    // comments - liczba komentarzy.
    // downloads - liczba pobrań.
    const lightbox = new simpleLightbox(".container .gallery__link", {
      additionalHtml: `<span class = tag>likes: </span>
      <span class = decription>${element.likes}</span>
      </br>
      <span class = tag>views: </span>
      <span class = decription>${element.views}</span>
      </br>
      <span class = tag>comments: </span>
      <span class = decription>${element.comments}</span>
      </br>
      <span class = tag>downloads: </span>
      <span class = decription>${element.downloads}</span>
      </br>`
    });
    console.log(lightbox);
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
      console.log(r);
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
