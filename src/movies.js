// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  return moviesArray.map(function(movie) {
    return movie.director;
  });
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  let filteredMovies = moviesArray.filter(function(movie) {
    return movie.director === "Steven Spielberg" && movie.genre.includes("Drama");
  });

  return filteredMovies.length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  if (moviesArray.length === 0) {
    return 0;
  }

  let total = moviesArray.reduce(function(sum, movie) {
    if (movie.score) {
      return sum + movie.score;
    } else {
      return sum;
    }
  }, 0);

  let average = total / moviesArray.length;

  return Number(average.toFixed(2));
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  let dramaMovies = moviesArray.filter(function(movie) {
    return movie.genre.includes("Drama");
  });

  if (dramaMovies.length === 0) {
    return 0;
  }

  return scoresAverage(dramaMovies);
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray){
  let moviesCopy = moviesArray.slice();

  moviesCopy.sort(function(a, b) {
    if (a.year === b.year) {
      return a.title.localeCompare(b.title);
    } else {
      return a.year - b.year;
    }
  });

  return moviesCopy;
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  let moviesCopy = moviesArray.slice();

  moviesCopy.sort(function(a, b) {
    return a.title.localeCompare(b.title);
  });

  let titles = moviesCopy.map(function(movie) {
    return movie.title;
  });

  return titles.slice(0, 20);
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  let newArray = moviesArray.map(function(movie) {
    let movieCopy = Object.assign({}, movie);

    let durationText = movie.duration;
    let hours = 0;
    let minutes = 0;

    if (durationText.includes("h")) {
      hours = parseInt(durationText);
    }

    if (durationText.includes("min")) {
      let parts = durationText.split(" ");
      
      for (let i = 0; i < parts.length; i++) {
        if (parts[i].includes("min")) {
          minutes = parseInt(parts[i]);
        }
      }
    }

    movieCopy.duration = (hours * 60) + minutes;

    return movieCopy;
  });

  return newArray;
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  if (moviesArray.length === 0) {
    return null;
  }

  let bestYear = 0;
  let bestScore = 0;

  let years = [];

  for (let i = 0; i < moviesArray.length; i++) {
    if (!years.includes(moviesArray[i].year)) {
      years.push(moviesArray[i].year);
    }
  }

  for (let j = 0; j < years.length; j++) {
    let currentYear = years[j];

    let moviesOfYear = moviesArray.filter(function(movie) {
      return movie.year === currentYear;
    });

    let average = scoresAverage(moviesOfYear);

    if (average > bestScore) {
      bestScore = average;
      bestYear = currentYear;
    } else if (average === bestScore && currentYear < bestYear) {
      bestYear = currentYear;
    }
  }

  return "The best year was " + bestYear + " with an average score of " + bestScore;
}
