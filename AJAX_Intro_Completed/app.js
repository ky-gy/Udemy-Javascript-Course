// ======================XMLHttpRequest======================

// const firstReq = new XMLHttpRequest();
// firstReq.addEventListener("load", function () {
//   console.log("FIRST REQUEST WORKED!!!");
//   const data = JSON.parse(this.responseText);
//   const filmURL = data.results[0].films[0];
//   const filmReq = new XMLHttpRequest();
//   filmReq.addEventListener("load", function () {
//     console.log("Second Request Worked!");
//     const filmData = JSON.parse(this.responseText);
//     console.log(filmData);
//   });
//   filmReq.addEventListener("error", function (e) {
//     console.log("Error!!", e);
//   });
//   filmReq.open("get", filmURL);
//   filmReq.send();
//   // for (let planet of data.results) {
//   //   console.log(planet.name);
//   // }
// });
// firstReq.addEventListener("error", (e) => {
//   console.log("ERROR!!!!!!");
// });
// firstReq.open("get", "https://swapi.dev/api/planets/");
// firstReq.send();
// console.log("Request Sent");

// ======================FETCH======================
// const checkStatusAndParse = (response) => {
//   if (!response.ok) throw new Error(`Status Code Error: ${response.status}`);
//   return response.json();
// };

// const printPlanets = (data) => {
//   console.log("Loaded 10 more planets...");
//   for (let planet of data.results) {
//     console.log(planet.name);
//   }
//   return Promise.resolve(data.next);
// };

// const fetchNextPlanets = (url = "https://swapi.dev/api/planets/") => {
//   return fetch(url);
// };

// fetchNextPlanets()
//   .then(checkStatusAndParse)
//   .then(printPlanets)
//   .then(fetchNextPlanets)
//   .then(checkStatusAndParse)
//   .then(printPlanets)
//   .then(fetchNextPlanets)
//   .then(checkStatusAndParse)
//   .then(printPlanets)
//   .catch((err) => {
//     console.log("something went wrong with Fetch");
//     console.log(err);
//   });

// ======================AXIOS======================

const fetchNextPlanets = (url = "https://swapi.dev/api/planets/") => {
  return axios.get(url);
};

const printPlanets = ({ data }) => {
  console.log(data);
  for (let planet of data.results) {
    console.log(planet.name);
  }
  return Promise.resolve(data.next);
};

fetchNextPlanets()
  .then(printPlanets)
  .then(fetchNextPlanets)
  .then(printPlanets)
  .then(fetchNextPlanets)
  .then(printPlanets)
  .catch((err) => {
    console.log("Error", err);
  });
