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
    const description = document.createElement('div');

    picture.src = element.webformatURL;
    link.href = element.webformatURL;
    picture.alt = element.tags;

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

    const tagLikes = document.createElement('p');
    tagLikes.classList.add("gallery__tag");
    tagLikes.textContent = "likes";
    description.append(tagLikes);

    const tagViews = document.createElement('p');
    tagViews.classList.add("gallery__tag");
    tagViews.textContent = "views";
    description.append(tagViews);

    const tagComments = document.createElement('p');
    tagComments.classList.add("gallery__tag");
    tagComments.textContent = "comments";
    description.append(tagComments);

    const tagDownoloads = document.createElement('p');
    tagDownoloads.classList.add("gallery__tag");
    tagDownoloads.textContent = "downloads";
    description.append(tagDownoloads);

    const contentLikes = document.createElement('p');
    contentLikes.textContent = element.likes;
    description.append(contentLikes);

    const contentViews = document.createElement('p');
    contentViews.textContent = element.views;
    description.append(contentViews);


    const contentComments = document.createElement('p');
    contentComments.textContent = element.comments;
    description.append(contentComments);

    const contentDownloads = document.createElement('p');
    contentDownloads.textContent = element.downloads;
    description.append(contentDownloads);

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
    `${url}?key=${key}&q=${textInpunt.value}&image_type=photo&page=${id}&per_page=52`
  )
    .then(r => r.json())
    .then(r => {
      if(id * 52 > r.totalHits){refresh.classList.add("invisible");}
      if(r.totalHits=0){Notiflix.Notify.failure(`We have found ${r.totalHits} hits`);}
      else{
        Notiflix.Notify.success(`We have found ${r.totalHits} hits`);
        render(r.hits);
      }
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
