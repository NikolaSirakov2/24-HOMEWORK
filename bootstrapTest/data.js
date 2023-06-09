let DATA = [
    {
        "name": "Боян Бързаков",
        "image": "1.jpeg",
        "type": "костенурка",
        "bread": "сухоземна",
        "age": 2,
        "sex": "male",
        "neededAmount": 5000,
        "currentlyRisedAmount": 2300
    },
    {
        "name": "Киро от Горубляне",
        "image": "5.png",
        "type": "котка",
        "bread": "улична превъзходна",
        "age": 12,
        "sex": "male",
        "neededAmount": 2600,
        "currentlyRisedAmount": 1900
    },
    {
        "name": "Асен",
        "image": "3.jpg",
        "type": "видра",
        "bread": "видрите нямат породи",
        "age": 7,
        "sex": "male",
        "neededAmount": 8900,
        "currentlyRisedAmount": 4200
    },
    {
        "name": "Линда",
        "image": "4.png",
        "type": "котка",
        "bread": "безполезница",
        "age": 8,
        "sex": "female",
        "neededAmount": 12000,
        "currentlyRisedAmount": 3600
    },
    {
        "name": "Томислав",
        "image": "5.png",
        "type": "котка",
        "bread": "норвежец",
        "age": 2,
        "sex": "male",
        "neededAmount": 2500,
        "currentlyRisedAmount": 2500
    },
    {
        "name": "Иван",
        "image": "6.png",
        "type": "куче",
        "bread": "мелез",
        "age": 2,
        "sex": "male",
        "neededAmount": 1200,
        "currentlyRisedAmount": 1200
    },
    {
        "name": "Шаро",
        "image": "8.png",
        "type": "куче",
        "bread": "ретривър",
        "age": 4,
        "sex": "male",
        "neededAmount": 12400,
        "currentlyRisedAmount": 9200
    },
    {
        "name": "Спаска",
        "image": "9.png",
        "type": "ламя",
        "bread": "домашна",
        "age": 420,
        "sex": "female",
        "neededAmount": 15000,
        "currentlyRisedAmount": 3500
    },
    {
        "name": "Григор",
        "image": "10.png",
        "type": "вълк",
        "bread": "средногорски",
        "age": 12,
        "sex": "male",
        "neededAmount": 9000,
        "currentlyRisedAmount": 7200
    },
    {
        "name": "Гинка",
        "image": "11.png",
        "type": "видра",
        "bread": "модерна",
        "age": 12,
        "sex": "female",
        "neededAmount": 19000,
        "currentlyRisedAmount": 9200
    },
    {
        "name": "Галена",
        "image": "12.webp",
        "type": "змия",
        "bread": "усойница",
        "age": 3.5,
        "sex": "female",
        "neededAmount": 12000,
        "currentlyRisedAmount": 6500
    }
    
]

let animalsList = DATA;
console.log(animalsList);

function createElement(name) {
    return document.createElement(name);
};

animalsList.forEach((animal) => {

    let card = createElement("div");
    card.classList.add("card");
    card.style.width = "200px";
    card.style.background = "white";

    let photo = createElement("img");   
    photo.src = `./images/${animal.image}`;
    photo.style.width = "200px";

    let name = createElement("div");
    name.innerText = animal.name;

    let family = createElement("div");
    family.innerText = animal.type;

    let bread = createElement("div");
    bread.innerText = animal.bread;

    let age = createElement("div");
    age.innerText = `възраст: ${animal.age} години`;

    let neededSum = createElement("div");
    neededSum.innerText = `neededSum: ${animal.currentlyRisedAmount}/${animal.neededAmount}`;

    card.append (photo, name, family, bread, age, neededSum);

    container.appendChild(card);
})
