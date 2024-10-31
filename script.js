const input = document.getElementById("search-input");
const btn = document.getElementById("search-btn");
const img = document.getElementById("pokemon-img");
const name = document.getElementById("pokemon-name");
const info = document.getElementById("pokemon-info");
const errorScreen = document.getElementById("error-screen");
const homeScreen = document.getElementById("home");
const searchForm = document.getElementById("search-form");
const card = document.getElementById("card");

const searchFunc = async () => {
  homeScreen.style.display = "none";
  errorScreen.style.display = "none";
  card.style.display = "none";
  img.innerHTML = "";  // Clear previous image
  name.textContent = ""; // Clear previous name
  info.textContent = ""; // Clear previous info
  
  try {
    const keyword = input.value.trim().toLowerCase();
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${keyword}`);
    const data = await response.json();
    console.log(data)
    // displaying data
    card.style.display = "block";
    name.textContent =  `#${data.id} ` + data.name;
    img.innerHTML = `<img src="${data.sprites.front_default}" alt="${data.name}-img" title="Hello! I am ${data.name.toUpperCase()}">`;
    
    // extracting stats
    const hp = data.stats.find(stat => stat.stat.name === 'hp').base_stat;
    const attack = data.stats.find(stat => stat.stat.name === 'attack').base_stat;
    const defense = data.stats.find(stat => stat.stat.name === 'defense').base_stat;
    const abilities = data.abilities.map(ability => ability.ability.name).join(' | ');
    const types = data.types.map(type => type.type.name).join(' | ');
    
    // displaying info
    info.innerHTML = `<p><strong>Types: </strong>${types}</p>
    <p><strong>HP: </strong>${hp}</p>
    <p><strong>Abilities: </strong>${abilities}</p>
    <p><strong>Attack: </strong>${attack}</p>
    <p><strong>Defense: </strong>${defense}</p>
    `;
    
  } catch (err) {
      errorScreen.style.display = "block";
      card.style.display = "none";
}
}

btn.addEventListener("click", searchFunc);
searchForm.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    searchFunc();
  }
});
