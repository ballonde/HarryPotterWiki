const data= await fetch('https://hp-api.onrender.com/api/characters')
    .then(response => response.json())
    .catch(error => alert("Erreur : " + error));
    console.log(data);
   

async function displayChara(data) {
  //const pokemons = await getPokemons();

  // 4. Sélectionner la balise main
  const main = document.querySelector(".characters");
  main.innerHTML = "";

  // 5. Créer et ajouter un article par pokémon
data.forEach((charaElem) => {
    const article = createCharacter(charaElem);
    main.appendChild(article);
  });
}


function createCharacter(data){

    
    const article = document.createElement("div");
    if (data.house) {
        article.classList.add(data.house);
    } else {
        article.classList.add("no-house"); // classe de secours
    }
        article.innerHTML =`
            <img src="${data.image}" alt="${data.name}" />
            <p>${data.name}</p>
            `;

    article.style.cursor = "pointer";
    article.addEventListener("click", () => {
    window.location.href = `details.html?id=${encodeURIComponent(data.id)}`;
});
    return article;

    }
displayChara(data);



async function loadHouse(nameHouse){


    const newData = data.filter(chara =>chara.house == nameHouse);
    console.log(newData);
    displayChara(newData);
}


const houses = document.querySelectorAll(".houses > img");

houses.forEach((houseElement) => {
  houseElement.addEventListener("click", () => {
    loadHouse(houseElement.dataset.house);
  });
});
