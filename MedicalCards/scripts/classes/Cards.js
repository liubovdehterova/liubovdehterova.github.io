import CardEdit from "./CardEdit.js";
import {doctorsList} from "../constants/doctors_list.js";
import {getCards} from '../API/getCards.js';
import {deleteCard} from '../API/deleteCard.js';

class Cards {
    constructor(data) {
        this.data = data;
        this.fieldNames = [
            'urgency',
            'status',
            'purpose',
            'description',
            'comments',
            'pressure',
            'bmi',
            'diseases',
            'age',
            'lastVisit'
        ];

        this.id = data.id;
        this.fullname = data.fullname;
        this.selectedDoctor = data.selectedDoctor;
        this.status = data.status;
        // this.additionalInfoRendered = false;

        this.fieldNames.forEach(fieldName => {
            if (data[fieldName] !== undefined) {
                this[fieldName] = data[fieldName];
            }
        });
    }

    render(place) {
        const postsContainer = document.querySelector(place);
        let cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.setAttribute('id', `card_${this.id}`);

        cardElement.insertAdjacentHTML(
            "beforeend",
            `
                <div class="card__btn">
                    <button type="button" id="edit" class="card__btn__item card__btn__item--edit">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#056500ff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z" fill="#056500ff"></path> </g></svg>
                    </button>
                    <button type="button" id="delete" class="card__btn__item card__btn__item--delete">
                        <svg fill="#056500ff" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8l0,0C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5 c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4 C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z"></path> </g></svg>
                    </button>
                </div>
                <div class="card__data">
                    <span class="card__info card__info--name">
                        ${this.fullname}
                    </span>
                </div>
                <h3 class="card__doctor">
                    ${this.selectedDoctor}
                </h3>
                <div class="card__additional-info" style="display: none;">
                </div>
                <button type="button" class="card__more">
                    Show more
                </button>
            `
        );
        postsContainer.appendChild(cardElement);

        const addInfo = cardElement.querySelector(".card__additional-info");

        if (this.status === "Done") {
            cardElement.classList.add("visit-done");
            addInfo.classList.add("visit-done");
        } else {
            cardElement.classList.remove("visit-done");
            addInfo.classList.remove("visit-done");
        }

        const editButton = cardElement.querySelector('.card__btn__item--edit');
        const deleteButton = cardElement.querySelector('.card__btn__item--delete');

        editButton.addEventListener('click', (event) => {
            event.stopPropagation();
            this.setupEditButton();
        });

        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation();
            this.setupDeleteButton();
        });

        this.setupShowMoreButton(cardElement);
    }

    setupDeleteButton() {
        const confirmation = confirm('Are you sure you want to delete this card?');
        if (!confirmation) {
            return;
        }
        deleteCard(this.id)
            .then(() => {
                const cardElement = document.getElementById(`card_${this.id}`);
                cardElement.remove();
                const remainingCards = document.querySelectorAll('.card');
                if (remainingCards.length === 0) {
                    this.displayNoCardsMessage();
                }
            })
            .catch(error => {
                console.error('Error deleting card:', error);
            });
    }

    displayNoCardsMessage() {
        const postsContainer = document.querySelector('.no-cards-message');
        postsContainer.style.display = 'block';
    }

    setupEditButton() {
        getCards().then(data => {
            const matchingCard = data.find(card => card.id === this.id);
            if (matchingCard) {
                let editCardModal = new CardEdit("body", doctorsList, "Edit Visit Card", matchingCard);
                editCardModal.render();
            } else {
                console.log("No matching card found");
            }
        }).catch(err => {
            console.log(err);
        });
    }

    setupShowMoreButton(cardElement) {
        const showMoreButton = cardElement.querySelector('.card__more');
        showMoreButton.addEventListener('click', () => this.showAdditionalInfo(cardElement));
    }

    showAdditionalInfo(cardElement) {

        const additionalInfoContainer = cardElement.querySelector('.card__additional-info');
        const showMoreButton = cardElement.querySelector('.card__more');
        const allCards = document.querySelectorAll('.card');
        
        allCards.forEach(card => {
            const otherInfoContainer = card.querySelector('.card__additional-info');
            const showMoreButton = card.querySelector(".card__more");

            if (otherInfoContainer && otherInfoContainer !== cardElement.querySelector('.card__additional-info')) {
                otherInfoContainer.style.display = 'none';
                showMoreButton.textContent = 'Show more';
            } else {
                showMoreButton.textContent = 'Show less';
            }
        });

        if (!this.additionalInfoRendered) {
            this.fieldNames.forEach(field => {
                if (this[field] !== undefined) {
                    additionalInfoContainer.insertAdjacentHTML('beforeend',
                        `<p class="card__more-info ${field}">
                        <strong>${field}</strong>: 
                        ${this[field]}
                    </p>`
                    );
                }
            });
            this.additionalInfoRendered = true;
        }

        additionalInfoContainer.style.display = (additionalInfoContainer.style.display === 'none') ? 'flex' : 'none';
        showMoreButton.textContent = (additionalInfoContainer.style.display === 'none') ? 'Show more' : 'Show less';
    }
}

export default Cards;
