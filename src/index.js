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
  //   btn.addEventListener("click", movieData())

  // Récupérer le modal
  let modal = document.querySelector("#myModal");

  // Récupérer la croix qui ferme le modal
  let span = document.querySelector(".close");

  // Lorsque l'utilisateur clique sur le bouton, ouvrir le modal
  btn.onclick = function () {
    modal.style.display = "block";
    // movieData();
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
    imdbScore.innerHTML = "Score Imdb : " + data.imdb_score;
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
    duration.innerHTML = "Durée : " + data.duration;
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



























// const id = 1508669;
// async function movieData(id){
//     try{
//         const response = await fetch(urlBase + id)
//         const data = await response.json();

//         // Affichage de l'image du film
//         let image = document.querySelector(".image")
//         image.src = data.image_url

//         // Affichage du titre du film
//         let title = document.querySelector(".title")
//         title.innerHTML = "Titre du film : " + data.title

//         // Affichage du genre du film
//         let genre = document.querySelector(".genre")
//         genre.innerHTML = "Genre : " + data.genres

//         // Affichage de l'évaluation du film
//         let rated = document.querySelector(".rated")
//         rated.innerHTML = "Evalution : " + data.rated

//         // Affichage de la note Imdb du film
//         let imdbScore = document.querySelector(".imdb_score")
//         imdbScore.innerHTML = "Score Imdb : " + data.imdb_score

//         // Affichage du ou des réalisateur(s) du film
//         let director = document.querySelector(".director")
//         director.innerHTML = "Réalisateur(s) : " + data.directors

//         // Affichage du casting du film
//         let cast_list = document.querySelector(".cast_list")
//         cast_list.innerHTML = "Casting : " + data.actors

//         // Affichage de la durée du film
//         let duration = document.querySelector(".duration")
//         duration.innerHTML = "Durée : " + data.duration

//         // Affichage du pays originaire du film
//         let country = document.querySelector(".country")
//         country.innerHTML = "Origine : " + data.countries

//         // Affichage du résultat au box office du film
//         let boxOffice = document.querySelector(".box_office")
//         boxOffice.innerHTML = "Box-office : " + data.worldwide_gross_income

//         // Affichage de la description du film
//         let summary = document.querySelector(".summary")
//         summary.innerHTML = "Description : " + data.long_description;
//     } catch (error) {
//         console.log(error)
//     }
// }
// movieData(1508669)





















// const film = infosFilms[0];
// console.log(infosFilms)

// const imageElement = document.createElement("img");
// imageElement.src = film.image;

// const nomElement = document.createElement("h2");
// nomElement.innerText = film.titre;

// const fichesFilm = document.querySelector(".fiches");
// fichesFilm.appendChild(imageElement);
// fichesFilm.appendChild(nomElement);

// export async function getData(url) {
//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error(
//       "Une erreur est survenue lors de la requete. Code erreur : " +
//         response.status
//     );
//   }
//   const jsonData = await response.json();
//   return jsonData;
// }

// export async function getMovies(url, moviesNumber = 7) {
//   const jsonData = await getData(url + `&page_size=${moviesNumber}`);
//   return jsonData.results;
// }
