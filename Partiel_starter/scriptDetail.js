const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const main = document.querySelector("#detail");

function renderCharacter(chara) {
  const attributes = [
    ["Gender", chara.gender],
    ["Eye", chara.eyeColour],
    ["Hair", chara.hairColour],
    ["Date of birth", chara.dateOfBirth],
    ["Patronus", chara.patronus],
    ["Alternate names", chara.alternate_names?.join(", ")],
  ];

  // Une ligne par attribut, "Unknown" si la valeur est vide
  const attributesHTML = attributes
    .map(
      ([label, value]) =>
        `<div><p>${label}</p><p class="attr">${value || "Unknown"}</p></div>`
    )
    .join("");

  // Logo de la maison, seulement si le personnage en a une
  const houseHTML = chara.house
    ? `<section class="house__perso">
         <img src="./images/logo/${chara.house}.png" alt="${chara.house}" />
       </section>`
    : "";

  main.innerHTML = `
    <section>
      <h3>${chara.name}</h3>
      <div class="perso">
        <figure class="perso__left">
          <img class="${chara.alive === false ? "dead" : ""}"
            src="${chara.image || "./images/placeholder.webp"}"
            alt="${chara.name}" />
          <figcaption>${chara.actor || "Unknown"}</figcaption>
        </figure>
        <div class="perso__right">
          ${attributesHTML}
        </div>
      </div>
    </section>
    ${houseHTML}
  `;

  // Image cassée : remplacée par le placeholder
  const img = main.querySelector(".perso__left img");
  img.onerror = () => {
    img.onerror = null;
    img.src = "./images/placeholder.webp";
  };

  
}

async function loadCharacter() {

  try {
    const response = await fetch(`https://hp-api.onrender.com/api/character/${id}`);
    if (!response.ok) throw new Error("Erreur HTTP " + response.status);

    const [chara] = await response.json(); // l'API renvoie un tableau d'un élément
    if (!chara) throw new Error("Personnage introuvable");

    document.title = chara.name;
    renderCharacter(chara);
  } catch (error) {
    main.innerHTML = `<p>Erreur : ${error.message}</p><a href="index.html">← Retour</a>`;
  }
}

loadCharacter();