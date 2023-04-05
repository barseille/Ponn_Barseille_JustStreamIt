// URL de l'API
const urlBase = "http://localhost:8000/api/v1/titles/";

// Fonction pour récupérer le meilleur film
async function fetchCoverMovie() {
  let coverTitle = document.getElementById("js_cover-title");
  let coverImg = document.getElementById("cover-img");
  let coverInfo = document.getElementById("js_cover-infos");
  let coverButton = document.getElementsByClassName("button")[0];

  try {
    // On envoie une requête à l'API pour récupérer les données du meilleur film
    const response = await fetch(urlBase + "?sort_by=-imdb_score");
    const data = await response.json();

    // On met à jour les éléments HTML avec les données récupérées
    coverTitle.innerHTML = data["results"][0].title;
    coverImg.src = data["results"][0].image_url;
    coverButton.setAttribute(
      "onclick",
      `openModal("${data["results"][0].id}")`
    );

    // On envoie une deuxième requête à l'API pour récupérer la description du meilleur film
    const movieResponse = await fetch(data["results"][0].url);
    const movieData = await movieResponse.json();
    coverInfo.innerHTML = movieData.description;
  } catch (error) {
    // En cas d'erreur, on affiche l'erreur dans la console
    console.error(error);
  }
}

// ouvrir le modal sur le clique du film
function openModal(id) {
  let modal = document.getElementById("modal");
  let span = document.getElementsByClassName("close")[0];

  fetchModalData(id);

  modal.style.display = "block";

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target === modal) modal.style.display = "none";
  };
}

async function fetchModalData(id) {
  try {
    const response = await fetch(urlBase + id);
    const data = await response.json();

    // Mettre à jour les éléments de la boîte de dialogue modale avec les données récupérées
    document.getElementById("modal-cover").src = data.image_url;
    document.getElementById("modal-title").innerHTML = data.title;
    document.getElementById("modal-date").innerHTML = data.date_published;
    document.getElementById("modal-duration").innerHTML =
      data.duration + " minutes";
    document.getElementById("modal-genres").innerHTML = data.genres;
    document.getElementById("modal-imdb").innerHTML = data.imdb_score + "/10";
    document.getElementById("modal-directors").innerHTML = data.directors;
    document.getElementById("modal-cast").innerHTML = data.actors;
    document.getElementById("modal-country").innerHTML = data.countries;
    document.getElementById("modal-info").innerHTML = data.long_description;

    let modalRating = document.getElementById("modal-rated");
    if (data.rated === "Not rated or unkown rating") {
      modalRating.innerHTML = "Non renseigné";
    }

    // Mettre à jour l'élément du box-office en fonction des données récupérées
    let modalBoxOffice = document.getElementById("modal-box-office");
    if (data["worldwide_gross_income"] == null) {
      modalBoxOffice.innerHTML = "Non renseigné";
    }

    let modalInfo = document.getElementById("modal-info");
    if (data["long_description"] == "|") {
      modalInfo.innerHTML = "Non renseigné";
    }
  } catch (error) {
    console.error(error);
  }
}

// catégories meilleurs films à partir du deuxième film jusqu'aux derniers
async function BestMovieCategories() {
  try {
    const response = await fetch(
      `${urlBase}?sort_by=-imdb_score&genre=&page_size=8`
    );
    const data = await response.json();
    const bestMovies = [];

    for (let i = 1; i < data.results.length; i++) {
      bestMovies.push(data.results[i]);
    }

    return bestMovies;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * Cette fonction récupère les données des films pour une catégorie donnée.
//  * @param {string} name - Le nom de la catégorie.
//  * @param {number} total - Le nombre total de films à récupérer (par défaut 7).
//  * @returns {Array} - Un tableau contenant les données des films.
 */
async function fetchCategories(name, total = 7) {
  // Crée l'URL de la requête pour récupérer les films de la catégorie triés par ordre décroissant
  const url = `${urlBase}?sort_by=-imdb_score&genre=${name}&page_size=${total}`;
  const response = await fetch(url);

  if (!response.ok) {
    console.error(`Erreur HTTP ${response.status}`);
    return null;
  }

  const data = await response.json();
  const moviesData = data.results;

  // Retourne les données des films
  return moviesData;
}
/**
 * category : Nom de la catégorie pour chaque section
 * name : Nom de la catégorie récupérer depuis l'API
 */
class CarouselBuilder {
  constructor(category, name) {
    this.category = category;
    this.name = name;
    this.movies = [];
  }

  async build() {
    // Créer une section pour le carrousel.
    const section = document.createElement("section");
    section.classList.add("categories");

    // Créer un conteneur pour le carrousel.
    const carousel = document.createElement("div");
    carousel.classList.add("container");

    // Créer un titre pour la catégorie.
    const categoryTitle = document.createElement("h2");
    categoryTitle.innerHTML = `Genre : ${this.category}`;
    carousel.append(categoryTitle);

    // Créer un conteneur pour les films dans le carrousel.
    const carouselContainer = document.createElement("div");
    carouselContainer.classList.add("carousel-container");

    // Créer un conteneur pour le contenu du carrousel.
    const carouselContent = document.createElement("div");
    carouselContent.classList.add("carousel-content");
    carouselContent.setAttribute("id", `${this.name}-movies`);

    // Création d'un élément HTML pour les contrôles du carrousel
    const controls = document.createElement("div");
    controls.classList.add("controls");

    // Création d'un bouton pour faire défiler le carrousel vers la gauche
    const leftButton = document.createElement("button");
    leftButton.classList.add("left");
    leftButton.setAttribute("id", this.name);
    leftButton.setAttribute("onclick", `moveCarouselRight("${this.name}")`);
    leftButton.innerHTML = '<i class="fa fa-chevron-left"></i>';
    controls.appendChild(leftButton);

    // Création d'un bouton pour faire défiler le carrousel vers la droite
    const rightButton = document.createElement("button");
    rightButton.classList.add("right");
    rightButton.setAttribute("id", this.name);
    rightButton.setAttribute("onclick", `moveCarouselLeft("${this.name}")`);
    rightButton.innerHTML = '<i class="fa fa-chevron-right"></i>';
    controls.appendChild(rightButton);

    // Ajout des éléments du carrousel (contenu et contrôles) au conteneur du carrousel
    carouselContainer.appendChild(carouselContent);
    carouselContainer.appendChild(controls);

    // Ajout du conteneur du carrousel au carrousel lui-même
    carousel.appendChild(carouselContainer);

    // Ajout du carrousel à la section des carrousel sur la page HTML
    section.appendChild(carousel);

    document.querySelector(".carousels").appendChild(section);

    // http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=&page_size=7
    let categorieName = this.name;
    if (this.name === "best") {
      categorieName = "";
    }

    if (this.name === "best") {
      // Obtenir tous les films de la catégorie "best" à partir de l'API
      this.movies = await BestMovieCategories();
    } else {
      // Obtenir les films de la catégorie spécifiée à partir de l'API
      this.movies = await fetchCategories(categorieName);
    }

    // Boucle à travers chaque film dans la catégorie.
    let i = 0;
    for (const movie of this.movies) {
      // Container pour chaque film
      const box = document.createElement("div");
      box.classList.add("box");

      // Création de l'apparence de chaque film
      const movieCover = document.createElement("img");
      movieCover.setAttribute("alt", movie.title);
      movieCover.src = movie.image_url;
      box.appendChild(movieCover);

      // Création de l'apparence au survole de chaque film
      const hover_movie = document.createElement("div");
      hover_movie.classList.add("hover_movie");

      // titre du film au survole
      const movieTitle = document.createElement("p");
      movieTitle.innerHTML = movie.title;
      hover_movie.appendChild(movieTitle);

      // Ajouter un bouton pour ouvrir une fenêtre modale avec plus d'informations sur le film.
      const modalButton = document.createElement("button");
      modalButton.classList.add("hover-movie-button");
      modalButton.setAttribute("onclick", `openModal("${movie.id}")`);
      modalButton.innerHTML = "Plus d'Infos";
      hover_movie.appendChild(modalButton);

      // Ajouter la boîte d'informations au conteneur du film.
      box.appendChild(hover_movie);

      // Ajouter le conteneur de film au contenu du carrousel.
      carouselContent.appendChild(box);

      i++;
    }
  }
}
// instance de chaque catégorie
bestmovie = new CarouselBuilder("Films les mieux notés", "best");
bestFamily = new CarouselBuilder("Films en famille", "family");
bestComedy = new CarouselBuilder("Films de Comédies", "comedy");
bestRomance = new CarouselBuilder("Films romantiques", "romance");

// événement de chargement à la page.
// Lorsque la page est entièrement chargée,
// toutes les instructions à l'intérieur de cette fonction sont exécutées.
window.addEventListener("load", () => {
  // Récupération de la couverture du film en cours de lecture pour l'afficher sur la page
  fetchCoverMovie();

  bestmovie.build();
  bestFamily.build();
  bestComedy.build();
  bestRomance.build();
});

function moveCarouselLeft(name) {
  // On récupère le contenu du carrousel, ainsi que les boutons gauche et droite
  let carrouselContent = document.querySelector("#" + name + "-movies");

  // On déplace le contenu du carrousel vers la gauche en ajustant la valeur de la propriété "left"
  carrouselContent.style.left = "-60%";
}

function moveCarouselRight(name) {
  // On récupère le contenu du carrousel, ainsi que les boutons gauche et droite
  let carrouselContent = document.querySelector("#" + name + "-movies");

  // On déplace le contenu du carrousel vers la droite en ajustant la valeur de la propriété "left"
  carrouselContent.style.left = "0px";
}
