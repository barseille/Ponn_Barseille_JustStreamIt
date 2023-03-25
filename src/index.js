async function getMovies() {
  try {
    const response = await fetch("http://localhost:8000/api/v1/titles/");
    const dataUrl = await response.json();
    return dataUrl;
  } catch (error) {
    console.error(error);
  }
}

const urlBase = "http://localhost:8000/api/v1/titles/";

getMovies();

async function bestMovie() {
  let coverMovie = document.querySelector(".cover_movie img");
  let coverTitle = document.querySelector(".cover_title");
  let coverDescription = document.querySelector(".cover_description");

  try {
    // récupération des films par ordre décroissant
    const response = await fetch(urlBase + "?sort_by=-imdb_score");

    // récupération du titre
    const data = await response.json();
    coverMovie.src = data.results[0].image_url;
    coverTitle.innerHTML = data.results[0].title;

    // récupération de la description
    const coverReponse = await fetch(data.results[0].url);
    const coverData = await coverReponse.json();
    coverDescription.innerHTML = coverData.description;
  } catch (error) {
    console.error(error);
  }
}
bestMovie();

function createModal() {
  // Récupérer le bouton qui ouvre le modal
  let btn = document.querySelector("#myBtn");

  // Récupérer le modal
  let modal = document.querySelector("#myModal");

  // Récupérer la croix qui ferme le modal
  let span = document.querySelector(".close");

  // Lorsque l'utilisateur clique sur le bouton, ouvrir le modal
  btn.onclick = function () {
    modal.style.display = "block";
    const movie = new Movie(1508669);
    movie.displayMovieData();
  };

  // Lorsque l'utilisateur clique sur la croix, fermer le modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // Lorsque l'utilisateur clique en dehors du modal, fermer le modal
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}
// Appeler la fonction pour créer le modal
createModal();

class Movie {
  constructor(id) {
    this.id = id;
    this.urlBase = "http://localhost:8000/api/v1/titles/";
  }

  async fetchMovieData() {
    try {
      const response = await fetch(this.urlBase + this.id);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  displayImage(data) {
    let image = document.querySelector(".image");
    image.src = data.image_url;
  }

  displayTitle(data) {
    let title = document.querySelector(".title");
    title.innerHTML = "Titre du film : " + data.title;
  }

  displayGenre(data) {
    let genre = document.querySelector(".genre");
    genre.innerHTML = "Genre : " + data.genres;
  }

  displayRated(data) {
    let rated = document.querySelector(".rated");
    rated.innerHTML = "Evalution : " + data.rated;
  }

  displayImdbScore(data) {
    let imdbScore = document.querySelector(".imdb_score");
    imdbScore.innerHTML = "Score Imdb : " + data.imdb_score + "/10";
  }

  displayDirector(data) {
    let director = document.querySelector(".director");
    director.innerHTML = "Réalisateur(s) : " + data.directors;
  }

  displayCastList(data) {
    let cast_list = document.querySelector(".cast_list");
    cast_list.innerHTML = "Casting : " + data.actors;
  }

  displayDuration(data) {
    let duration = document.querySelector(".duration");
    duration.innerHTML = "Durée : " + data.duration + " minutes";
  }

  displayCountry(data) {
    let country = document.querySelector(".country");
    country.innerHTML = "Origine : " + data.countries;
  }

  displayBoxOffice(data) {
    let boxOffice = document.querySelector(".box_office");
    boxOffice.innerHTML = "Box-office : " + data.worldwide_gross_income;
  }

  displaySummary(data) {
    let summary = document.querySelector(".summary");
    summary.innerHTML = "Description : " + data.long_description;
  }

  async displayMovieData() {
    const data = await this.fetchMovieData();
    if (data) {
      this.displayImage(data);
      this.displayTitle(data);
      this.displayGenre(data);
      this.displayRated(data);
      this.displayImdbScore(data);
      this.displayDirector(data);
      this.displayCastList(data);
      this.displayDuration(data);
      this.displayCountry(data);
      this.displayBoxOffice(data);
      this.displaySummary(data);
    }
  }
}



url_best_movies = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7"

class Carousel {
  constructor(carouselElement, images) {
    // Eléments du carrousel

    this.carousel = carouselElement;
    this.container = this.carousel.querySelector(".carousel-container");
    this.prevBtn = this.carousel.querySelector(".carousel-prev");
    this.nextBtn = this.carousel.querySelector(".carousel-next");

    // Initialiser les propriétés du carrousel
    this.items = [];
    this.currentIndex = 0;
    this.itemsPerPage = 4;

    // Créer les éléments img à partir des données récupérées
    for (let image of images) {
      let item = document.createElement("div");
      let img = document.createElement("img");
      img.src = image.image_url;
      item.classList.add("carousel-item");
      item.appendChild(img);
      this.items.push(item);
      this.container.appendChild(item);
    }

    // Afficher les éléments du carrousel
    this.showItems();
    
    // Ajouter les écouteurs d'événements pour les boutons 
    this.prevBtn.addEventListener("click", this.prev.bind(this));
    this.nextBtn.addEventListener("click", this.next.bind(this));
  }

  showItems() {
    // Masquer tous les éléments
    for (let item of this.items) {
      item.classList.remove("active");
    }

    // Afficher les éléments dans la plage d'index actuelle
    for (let i = this.currentIndex; i < this.currentIndex + this.itemsPerPage; i++) {
      if (this.items[i]) {
        this.items[i].classList.add("active");
      }
    }
  }

  // Passer à l'élément précédent dans le carrousel
  prev(event) { 
    event.preventDefault();

    // Vérifier si l'élément précédent existe
    if (this.currentIndex > 0) {
      // Décrémenter l'index actuel et déplacer le conteneur en conséquence
      this.currentIndex--;
      this.container.style.transform = "translateX(" + (-this.currentIndex * 25) + "%)";
      this.showItems();
    }
  }

  // Passer à l'élément suivant dans le carrousel
  next(event) {
    event.preventDefault();

    // Vérifier si l'élément suivant existe
    if (this.currentIndex < this.items.length - this.itemsPerPage) {
      this.currentIndex++;
      this.container.style.transform = "translateX(" + (-this.currentIndex * 25) + "%)";
      this.showItems();
    }
  }
}

// Récupérer les données depuis l'API
async function fetchAndCreateCarousel() {
  try {
    const response = await fetch(url_best_movies);
    const data = await response.json();
    const images = data.results;

    // Créer le carrousel avec les images récupérées
    const carousel = new Carousel(document.querySelector(".carousel"), images);
  } catch (error) {
    console.error(error);
  }
}

// Appeler la fonction pour récupérer les données et créer le carrousel
fetchAndCreateCarousel();









































