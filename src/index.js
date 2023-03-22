async function getMovies() {
  try {
    const response = await fetch("http://localhost:8000/api/v1/titles/");
    const dataUrl = await response.json();
    return dataUrl;
  } catch {
    console.error(error);
  }
}
getMovies();

async function bestMovie() {
    let coverMovie = document.querySelector(".cover_movie img");
    let coverTitle = document.querySelector(".cover_title")
    // let coverDescription = document.querySelector(".cover_description")
    
    try {
      const response = await fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score");
      const data = await response.json();
      coverMovie.src = data.results[0].image_url;
      coverTitle.innerHTML = data.results[0].title;
    //   coverDescription.innerHTML = data.results[0].url.description
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
btn.onclick = function() {
    modal.style.display = "block";
}

// Lorsque l'utilisateur clique sur la croix, fermer le modal
span.onclick = function() {
    modal.style.display = "none";
}

// Lorsque l'utilisateur clique en dehors du modal, fermer le modal
window.onclick = function(event) {
    if (event.target == modal) {
    modal.style.display = "none";
    }
}
}
  
  // Appeler la fonction pour créer le modal
  createModal();
  


  






























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
