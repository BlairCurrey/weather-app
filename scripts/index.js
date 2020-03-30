var request
var darksky
var proxy

darksky = {
    key:"017fe4f0150142704cf64876a8724e17",
    latitude: 40.8119864,
    longitude: -73.9517879,
    url: `https://api.darksky.net/forecast/${this.key}/${this.latitude},${this.longitude}`
}

proxy = 'https://cors-anywhere.herokuapp.com/';
proxy2 = "https://crossorigin.me/";

fetch(proxy + darksky.url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data)
    // data.forEach(movie => {
    //     console.log(movie.title)    
    // })
  })
  .catch((error) => {
      console.log("Error: ", error)
  });