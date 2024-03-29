//global
var button = document.getElementById('button');
var randomMovie = document.querySelector('.randomMovie')
let randomMovieId = []
const arrayLength = 7
let getLastMovie= ()=>document.getElementById("lastWatched").textContent=localStorage.getItem("movieTitle")
getLastMovie()
//number generator for imdb ID
function randomMovieId1() {
    randomMovieId = []
    for (let i = 0; i < arrayLength; i++) {
        randomMovieId.push(Math.floor((Math.random() * 11)))
    }
    //stringify imdb ID in array
    randomMovieId = randomMovieId.join("")
}

//fetch for omdb API
function randomTitle() {
    
    randomMovieId1();
    var url = 'https://www.omdbapi.com/?i=tt' + randomMovieId + '&apikey=b1e4d10d'
    var progress = document.createElement('p')
    fetch(url)
        .then(function (response) {
            if (response.ok) {
                return response.json()
            }
        })
        .then(function (data) {
            if (data.Response == 'False') {
                randomMovie.innerHTML = "Please wait while the movie/show loads"
                randomMovieId1()
                randomTitle()

            }

            else if (data.Plot == 'N/A') {
                randomMovie.innerHTML = "Please wait while the movie/show loads"
                randomMovieId1()
                randomTitle()
            }
            else if (data.Poster == 'N/A') {
                randomMovie.innerHTML = "Please wait while the movie/show loads"
                randomMovieId1()
                randomTitle()
            }

            //generating elements for API content

            else {
                randomMovie.innerHTML = " "
                var page = document.createElement('div')
                var title = document.createElement('h1')
                var image = document.createElement('img')
                var rating = document.createElement('p')
                var rated = document.createElement('p')
                var plot = document.createElement('p')
                var actors = document.createElement('p')
                var genre = document.createElement('p')

                //adding classes to generated elements
                page.classList.add("content")
                title.classList.add("movieTitle")
                image.classList.add("movieImage")
                rating.classList.add("movieRating")
                rated.classList.add("movieRated")
                plot.classList.add("moviePlot")
                actors.classList.add("movieActors")
                genre.classList.add("movieGenre")

                //displaying content from API on page
                title.textContent = data.Title
                rating.textContent = data.imdbRating
                rated.textContent = data.Rated
                image.setAttribute('src', data.Poster)
                plot.textContent = data.Plot
                actors.textContent = data.Actors
                genre.textContent = data.Genre


                page.appendChild(title)
                page.appendChild(rated)
                page.appendChild(image)
                page.appendChild(rating)
                page.appendChild(plot)
                page.appendChild(actors)
                page.appendChild(genre)
                randomMovie.appendChild(page)

                localStorage.setItem("movieTitle", data.Title);
                getLastMovie()

            }
        })
}


button.addEventListener('click', randomTitle);