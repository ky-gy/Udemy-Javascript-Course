// STARTER CODE
function changebodyColor(color, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      document.body.style.backgroundColor = color;
      resolve();
    }, delay);
  });
}

function printPokemon(results) {
  for (let pokemon of results) {
    console.log(pokemon.data.name);
  }
}

//SEQUENTIL REQUESTS!

// async function get3Pokemon() {
//   const poke1 = await axios.get("https://pokeapi.co/api/v2/pokemon/1");
//   const poke2 = await axios.get("https://pokeapi.co/api/v2/pokemon/2");
//   const poke3 = await axios.get("https://pokeapi.co/api/v2/pokemon/3");
//   console.log(poke1.data);
//   console.log(poke2.data);
//   console.log(poke3.data);
// }

// async function lightshow() {
//   await changebodyColor("teal", 1000);
//   await changebodyColor("pink", 1000);
//   await changebodyColor("indigo", 1000);
//   await changebodyColor("violet", 1000);
// }

// PARALLEL REQUESTS!

async function get3Pokemon() {
  const prom1 = axios.get("https://pokeapi.co/api/v2/pokemon/1");
  const prom2 = axios.get("https://pokeapi.co/api/v2/pokemon/2");
  const prom3 = axios.get("https://pokeapi.co/api/v2/pokemon/3");
  // const poke1 = await prom1;
  // const poke2 = await prom2;
  // const poke3 = await prom3;
  const results = await Promise.all([prom1, prom2, prom3]); // AWAIT MULTIPLE PROMISES AT ONE INSTANCE
  // console.log(poke1.data);
  // console.log(poke2.data);
  // console.log(poke3.data);
  console.log(results);
  printPokemon(results);
}

// async function lightshow() {
//   const p1 = changebodyColor("teal", 1000);
//   const p2 = changebodyColor("pink", 1000);
//   const p3 = changebodyColor("indigo", 1000);
//   const p4 = changebodyColor("violet", 1000);
//   await p1;
//   await p2;
//   await p3;
//   await p4;
// }

// RUN A FUNCTION

get3Pokemon();
// lightshow();
