async function getMovies() {
  try {
    const response = await fetch("http://localhost:8000/api/v1/titles/");
    const dataUrl = await response.json();
    return dataUrl;
  } catch (error) {
    console.error(error);
  }
}
urlBase = "http://localhost:8000/api/v1/titles/";

class BestMovie {
  constructor() {
    this.urlBase = "http://localhost:8000/api/v1/titles/";
    this.coverImage = document.querySelector(".cover_movie img");
    this.coverTitle = document.querySelector(".cover_title");
    this.coverDescription = document.querySelector(".cover_description");
  }

  async getBestMovie() {
    try {
      // récupération des films par ordre décroissant
      const response = await fetch(this.urlBase + "?sort_by=-imdb_score");
      const data = await response.json();

      // vérification si le tableau de résultats est vide
      if (data.results.length === 0) {
        console.log("Aucun élément trouvé !");
        return;
      }

      // récupération de l'image
      this.coverImage.src = data.results[0].image_url;

      // récupération du titre
      this.coverTitle.innerHTML = data.results[0].title;

      // récupération de l'URL du film
      const movieUrl = data.results[0].url;

      // récupération de la description
      const coverReponse = await fetch(movieUrl);
      const coverData = await coverReponse.json();
      this.coverDescription.innerHTML = coverData.description;
    } catch (error) {
      console.error(error);
    }
  }
}
const bestMovie = new BestMovie();
bestMovie.getBestMovie();

class MovieModal {
  constructor(id) {
    this.id = id;
    this.urlBase = "http://localhost:8000/api/v1/titles/";
    this.coverImage = document.querySelector(".image");
    this.coverTitle = document.querySelector(".title");
    this.coverGenre = document.querySelector(".genre");
    this.coverRated = document.querySelector(".rated");
    this.coverImdbScore = document.querySelector(".imdb_score");
    this.coverDirector = document.querySelector(".director");
    this.coverCastList = document.querySelector(".cast_list");
    this.coverDuration = document.querySelector(".duration");
    this.coverCountry = document.querySelector(".country");
    this.coverBoxOffice = document.querySelector(".box_office");
    this.coverSummary = document.querySelector(".summary");
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
    this.coverImage.src = data.image_url;
  }

  displayTitle(data) {
    this.coverTitle.innerHTML = "Titre du film : " + data.title;
  }

  displayGenre(data) {
    this.coverGenre.innerHTML = "Genre : " + data.genres;
  }

  displayRated(data) {
    this.coverRated.innerHTML = "Evalution : " + data.rated;
  }

  displayImdbScore(data) {
    this.coverImdbScore.innerHTML = "Score Imdb : " + data.imdb_score + "/10";
  }

  displayDirector(data) {
    this.coverDirector.innerHTML = "Réalisateur(s) : " + data.directors;
  }

  displayCastList(data) {
    this.coverCastList.innerHTML = "Casting : " + data.actors;
  }

  displayDuration(data) {
    this.coverDuration.innerHTML = "Durée : " + data.duration + " minutes";
  }

  displayCountry(data) {
    this.coverCountry.innerHTML = "Origine : " + data.countries;
  }

  displayBoxOffice(data) {
    this.coverBoxOffice.innerHTML =
      "Box-office : " + data.worldwide_gross_income;
  }

  displaySummary(data) {
    this.coverSummary.innerHTML = "Description : " + data.long_description;
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

function createModal(id) {
  // Récupérer le bouton qui ouvre le modal
  let btn = document.querySelector("#myBtn");

  // Récupérer le modal
  let modal = document.querySelector("#myModal");

  // Récupérer la croix qui ferme le modal
  let span = document.querySelector(".close");

  // Lorsque l'utilisateur clique sur le bouton, ouvrir le modal
  btn.onclick = function () {
    modal.style.display = "block";
    const movieModal = new MovieModal(id);
    movieModal.displayMovieData();
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
createModal(1508669);

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
    // <div class="carousel-item"> <img src="url"> </div>
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
    for (
      let i = this.currentIndex;
      i < this.currentIndex + this.itemsPerPage;
      i++
    ) {
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
      this.container.style.transform =
        "translateX(" + -this.currentIndex * 25 + "%)";
      this.showItems();
    }
  }

  // Passer à l'élément suivant dans le carrousel
  next(event) {
    event.preventDefault();

    // Vérifier si l'élément suivant existe
    if (this.currentIndex < this.items.length - this.itemsPerPage) {
      this.currentIndex++;
      this.container.style.transform =
        "translateX(" + -this.currentIndex * 25 + "%)";
      this.showItems();
    }
  }
}

// Récupérer les données depuis l'API
async function fetchMoviesByGenre(url, categoryClass) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const images = data.results;

    // Créer le carrousel avec les images récupérées
    const carousel = new Carousel(
      document.querySelector(categoryClass),
      images
    );
  } catch (error) {
    console.error(error);
  }
}

// Appeler la fonction pour récupérer les données et créer le carrousel pour chaque genre
fetchMoviesByGenre(
  `${urlBase}?sort_by=-imdb_score&page_size=7`,
  ".categorie_best"
);
fetchMoviesByGenre(
  `${urlBase}?sort_by=-imdb_score&genre=Adventure&page_size=7`,
  ".categorie_adventure"
);
fetchMoviesByGenre(
  `${urlBase}?sort_by=-imdb_score&genre=Animation&page_size=7`,
  ".categorie_animation"
);
fetchMoviesByGenre(
  `${urlBase}?sort_by=-imdb_score&genre=Action&page_size=7`,
  ".categorie_action"
);
