import ModalVisitCreate from "./classes/ModalVisitCreate.js";
import {renderCard} from './functions/renderCard.js';
import LoginModal from "./classes/LoginModal.js";
import {getCards} from './API/getCards.js';
import filterCards from "./functions/filterCards.js";
import debounce from "./functions/debounce.js";

let loginBtn = document.querySelector(".btn--reg");
const createVisitBtn = document.querySelector(".js-create-visit-btn");
let logoutBtn = document.querySelector(".btn--log-out");
let cardsContainer = document.querySelector(".cards__wrapper");
let noCardsMessage = document.querySelector(".no-cards-message");

window.addEventListener("load", () => {
    if (localStorage.getItem("token") !== null) {
        loginBtn.classList.add("btn--hidden");
        createVisitBtn.classList.remove("btn--hidden");
        logoutBtn.classList.remove("btn--hidden");
        getCards().then(data => {
            renderCard(data);
        }).catch(err => {
            console.error(err);
        });
    }
});

loginBtn.addEventListener("click", (event) => {
    event.preventDefault();
    new LoginModal("body").render();
});

createVisitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    new ModalVisitCreate("body").render();
})


logoutBtn.addEventListener("click", (event)=>{
    event.preventDefault();
    logoutBtn.classList.add("btn--hidden");
    loginBtn.classList.remove("btn--hidden");
    createVisitBtn.classList.add("btn--hidden");
    cardsContainer.innerHTML = "";
    localStorage.removeItem("token");
    noCardsMessage.style.display = "block";

})

const filterForm = document.querySelector(".filter-form");

filterForm.addEventListener("input", debounce((event) =>{
    filterCards(event, ".cards__wrapper");
}, 400));

filterForm.addEventListener("keypress", (event)=>{
    if(event.key === "Enter"){
        event.preventDefault();
    }
}
);