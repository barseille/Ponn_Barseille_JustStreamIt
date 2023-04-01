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
  console.log(span);

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
  } catch (error) {
    console.error(error);
  }
}

/**
 * Cette fonction récupère les données des films pour une catégorie donnée.
 * @param {string} name - Le nom de la catégorie.
 * @param {number} total - Le nombre total de films à récupérer (par défaut 7).
 * @returns {Array} - Un tableau contenant les données des films.
 */
async function fetchCategories(name, total = 7) {
  // Crée l'URL de la requête pour récupérer les films de la catégorie triés par ordre décroissant
  const url = urlBase + "?sort_by=-imdb_score&genre=" + name + "&page_size=7";
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Erreur HTTP ${response.status}`);
  }

  const data = await response.json();
  const moviesData = data.results;

  // Si le nombre total de films à récupérer est inférieur à la taille du tableau actuel,
  // on envoie une nouvelle requête pour récupérer les résultats suivants
  if (total && moviesData.length < total) {
    const nextResponse = await fetch(data.next);

    // Vérifie si la requête s'est bien passée, sinon renvoie une erreur
    if (!nextResponse.ok) {
      throw new Error(`Erreur HTTP ${nextResponse.status}`);
    }

    // Convertit les résultats en JSON
    const nextData = await nextResponse.json();

    // Récupère les résultats suivants jusqu'à atteindre le nombre total de films souhaité
    const nextMoviesData = nextData.results.slice(0, total - moviesData.length);

    // Ajoute les résultats suivants au tableau existant
    moviesData.push(...nextMoviesData);
  }

  // Retourne les données des films
  return moviesData;
}

/**
 * Construit un carrousel pour une catégorie spécifique.
 * @param {string} category - La catégorie de films pour le carrousel.
 * @param {string} name - Le nom de la catégorie pour les identifiants HTML.
 */

async function buildCarousel(category, name) {
  let categorieName = name;
  if (name === "best") categorieName = "";

  const section = document.createElement("section");
  section.classList.add("categories");

  const carousel = document.createElement("div");
  carousel.classList.add("container");

  const categoryTitle = document.createElement("h2");
  categoryTitle.innerHTML = `Genre : ${category}`;
  carousel.append(categoryTitle);

  const carouselContainer = document.createElement("div");
  carouselContainer.classList.add("carousel-container");

  const carouselContent = document.createElement("div");
  carouselContent.classList.add("carousel-content");
  carouselContent.setAttribute("id", `${name}-movies`);

  document.querySelector(".carousels").appendChild(section);

  const movies = await fetchCategories(categorieName);

  let i = 0;
  for (const movie of movies) {
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

    // bouton au survole
    const modalButton = document.createElement("button");
    modalButton.classList.add("hover-movie-button");
    modalButton.setAttribute("onclick", `openModal("${movie.id}")`);
    modalButton.innerHTML = "Plus d'Infos";
    hover_movie.appendChild(modalButton);

    box.appendChild(hover_movie);

    carouselContent.appendChild(box);

    i++;
  }

  const controls = document.createElement("div");
  controls.classList.add("controls");

  const leftButton = document.createElement("button");
  leftButton.classList.add("left");
  leftButton.setAttribute("id", name);
  leftButton.setAttribute("onclick", `moveCarouselRight("${name}")`);
  leftButton.innerHTML = '<i class="fa fa-chevron-left"></i>';
  controls.appendChild(leftButton);

  const rightButton = document.createElement("button");
  rightButton.classList.add("right");
  rightButton.setAttribute("id", name);
  rightButton.setAttribute("onclick", `moveCarouselLeft("${name}")`);
  rightButton.innerHTML = '<i class="fa fa-chevron-right"></i>';
  controls.appendChild(rightButton);

  carouselContainer.appendChild(carouselContent);
  carouselContainer.appendChild(controls);

  carousel.appendChild(carouselContainer);
  section.appendChild(carousel);
}

window.addEventListener("load", () => {
  buildCarousel("Films les mieux notés", "best");
  buildCarousel("Films d'actions", "action");
  buildCarousel("Films de Comédies", "comedy");
  buildCarousel("Films d'animations", "animation");
  fetchCoverMovie();
});

// Cette fonction permet de déplacer le carrousel vers la gauche
function moveCarouselLeft(name) {
  // On récupère le contenu du carrousel, ainsi que les boutons gauche et droite
  let carrouselContent = document.querySelector("#" + name + "-movies");

  // On déplace le contenu du carrousel vers la gauche en ajustant la valeur de la propriété "left"
  carrouselContent.style.left = "-60%";
}

// Cette fonction permet de déplacer le carrousel vers la droite
function moveCarouselRight(name) {
  // On récupère le contenu du carrousel, ainsi que les boutons gauche et droite
  let carrouselContent = document.querySelector("#" + name + "-movies");

  // On déplace le contenu du carrousel vers la droite en ajustant la valeur de la propriété "left"
  carrouselContent.style.left = "0px";
}
