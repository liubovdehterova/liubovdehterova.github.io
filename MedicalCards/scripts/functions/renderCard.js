import Cards from '../classes/Cards.js';

export async function renderCard(data) {
    let nocardMess = document.querySelector(".no-cards-message");
    let cardsContainer = document.querySelector(".cards__wrapper");
   

    if (Array.isArray(data) && data.length > 0) {
        data.forEach((cardData) => {
            const card = new Cards(cardData);
            card.render(".cards__wrapper");
            nocardMess.style.display = "none";
        })
    } else if (!Array.isArray(data) && data !== null) {
        const card = new Cards(data);
        card.render(".cards__wrapper");
        nocardMess.style.display = "none";
    } else {
        cardsContainer.innerHTML = "";
        nocardMess.style.display = "block";
    }
}
