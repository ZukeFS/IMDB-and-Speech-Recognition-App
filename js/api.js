// let githubserver = "https://api.github.com/users";

// window
//     .fetch(githubserver)
//     .then(data => {
//           data
//           .json()
//           .then(gitUsers => {
//                 let output = [];
//                 for(let user of gitUsers){
//                     output += `
//                     <div>
//                        <img src= "${user.avatar_url}"
//                        <h1>user: ${user.login}</h1>
//                        <a href= "${user.html_url}" target= "_blank_">details: </a>
//                     </div>
//                     `;
//                 }
//                 document.getElementById("template").innerHTML = output;
//           })
//           .catch(err => 
//                  console.log(err))
//           })
//           .catch((err) => console.log(err));

let search = document.querySelector("#search");

search.addEventListener("keyup", (e) => {
    let searchText = e.target.value;
    SearchMovies(searchText);
    
    //when keypress, hide text and h1
    let formText = document.getElementById("divBlock");
    formText.style.display = "none";
    search.classList.add("afterkeyPress");
    document.querySelector("#formBlock").classList.add("afterkey_formBlock");
});

//speech Recognition api
let speechSearch = document.getElementById("speechIcon");
speechSearch.addEventListener("click", () => {
  let formText = document.getElementById("divBlock");
  formText.style.display = "none";
  search.classList.add("afterkeyPress");
  document.querySelector("#formBlock").classList.add("afterkey_formBlock");

  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = new SpeechRecognition();
  let p = document.createElement("p");
  recognition.interimResults = true;

  recognition.addEventListener("result", (e) => {
    let transcript = [...e.results].map(result => result[0]).map(result => result.transcript).join("");

    search.value = transcript;
    if(e.results[0].isFinal){
      p = document.createElement("p");
      p.innerHTML = transcript;
      let searchText = transcript;
      SearchMovies(searchText);
    }
  });

  recognition.start();
})

function SearchMovies(searchText){
    console.log(searchText);
    const imdbAPI = `http://www.omdbapi.com/?s=${searchText}&apikey=b80b356e`;
    window
      .fetch(imdbAPI)
      .then(data => {
          data
              .json()
                    .then(movieData => {
                          let movies = movieData.Search;
                          let output = [];
                          for(let movie of movies){

                            let defaultImg = 
                                movie.Poster === "N/A"
                                  ? "https://www.google.com/search?q=movie+default+poster&sxsrf=ALeKk03KMioLEQFvw8bHGcdrITdSkadLrQ:1589888758143&tbm=isch&source=iu&ictx=1&fir=7pvqR_-x3qAkzM%253A%252C4MsTZ92J0438qM%252C_&vet=1&usg=AI4_-kSaKorgiKBA1QyFVQ4PKWpE_KloJg&sa=X&ved=2ahUKEwjX_KSV7b_pAhUzwzgGHetnBMYQ9QEwBXoECAgQHg#imgrc=7pvqR_-x3qAkzM:" 
                                  : movie.Poster;
                            output += `
                            <div>
                               <img src= "${movie.Poster}" />
                               <h1>${movie.Title}</h1>
                               <p>${movie.Year}</p>
                               <a href="http://www.imdb.com/title/${movie.imdbID}/" target="_blank_">Movie Details</a>
                            </div>`
                          }
                          document.getElementById("template").innerHTML = output;
                          console.log(movies);
                    })
                    .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
}

// let allImages = document.images;
// [...allImages].forEach(img => {
//     console.log(img);
//     if(img.src === "N/A"){
//         console.log("no image");
//     }
// })
