import VisitCardiologist from "./VisitCardiologist.js";
import VisitDentist from "./VisitDentist.js";
import VisitTherapist from "./VisitTherapist.js";
import ModalVisitBase from "./ModalVisitBase.js";
import {updateCards} from '../API/updateCard.js';
import {checkRequiredFields} from "../functions/checkRequiredFields.js";

class CardEdit extends ModalVisitBase {
    constructor(selector, doctor, modalTitle, cardInfo) {
        super(selector, doctor, modalTitle);
        this.cardInfo = cardInfo;
        this.saveVisit = this.saveVisit.bind(this);
    }

    render() {
        super.render();
        this.setSelectedDoctor(this.cardInfo.selectedDoctor);
        super.createForm(document.querySelector(".modal-body"), this.cardInfo);


        const urgencySelect = document.querySelector('#urgencySelect');
        if (urgencySelect) {
            urgencySelect.value = this.cardInfo.urgency;
        }

        const fullnameInput = document.querySelector('#fullnameInput');
        if (fullnameInput) {
            fullnameInput.value = this.cardInfo.fullname;
        }

        const purposeInput = document.querySelector('#purposeInput');
        if (purposeInput) {
            purposeInput.value = this.cardInfo.purpose;
        }

        const descriptionArea = document.querySelector('#descriptionArea');
        if (descriptionArea) {
            descriptionArea.value = this.cardInfo.description;
        }

        const commentsArea = document.querySelector('#commentsArea');
        if (commentsArea) {
            commentsArea.value = this.cardInfo.comments;
        }

        const pressureInput = document.querySelector('#pressureInput');
        if (pressureInput) {
            pressureInput.value = this.cardInfo.pressure;
        }

        const bmiInput = document.querySelector('#bmiInput');
        if (bmiInput) {
            bmiInput.value = this.cardInfo.bmi;
        }

        const diseasesInput = document.querySelector('#diseasesInput');
        if (diseasesInput) {
            diseasesInput.value = this.cardInfo.diseases;
        }

        const ageInput = document.querySelector('#ageInput');
        if (ageInput) {
            ageInput.value = this.cardInfo.age;
        }

        const lastVisitInput = document.querySelector('#lastVisitInput');
        if (lastVisitInput) {
            lastVisitInput.value = this.cardInfo.lastVisit;
        }

        const statusSelect = document.querySelector('#statusSelect');
        if (statusSelect) {
            statusSelect.value = this.cardInfo.status;
        }
        checkRequiredFields(".visit-form", ".save-visit__button");
    }

    setSelectedDoctor(selectedDoctor) {
        const doctorSelect = document.querySelector("#doctorSelect");
        if (doctorSelect) {
            doctorSelect.value = selectedDoctor;
        }
    }

    updateCard(cardId, updatedData) {
        const cardIdString = `card_${cardId}`;
        const fullnameElement = document.querySelector(`#${cardIdString}`);

        if (fullnameElement) {
            const additionalInfoContainer = fullnameElement.querySelector('.card__additional-info');

            const name = fullnameElement.querySelector('.card__info--name');
            const doctor = fullnameElement.querySelector('.card__doctor');
            const urgency = fullnameElement.querySelector('.urgency');
            const purpose = fullnameElement.querySelector('.purpose');
            const age = fullnameElement.querySelector('.age');
            const bmi = fullnameElement.querySelector('.bmi');
            const comments = fullnameElement.querySelector('.comments');
            const description = fullnameElement.querySelector('.description');
            const diseases = fullnameElement.querySelector('.diseases');
            const pressure = fullnameElement.querySelector('.pressure');
            const statusSelect = fullnameElement.querySelector('.status');
            const lastVisit = fullnameElement.querySelector('.lastVisit');

            if (name) name.textContent = updatedData.fullname;
            if (doctor) doctor.textContent = updatedData.selectedDoctor;
            if (urgency) urgency.innerHTML = `<strong>urgency:</strong> ${updatedData.urgency}`;
            if (purpose) purpose.innerHTML = `<strong>purpose:</strong> ${updatedData.purpose}`;
            if (statusSelect) statusSelect.innerHTML = `<strong>status:</strong> ${updatedData.status}`;
            if (comments) comments.innerHTML = `<strong>comments:</strong> ${updatedData.comments}`;
            if (description) description.innerHTML = `<strong>description:</strong> ${updatedData.description}`;

            if (pressure) {
                pressure.innerHTML =
                    ` <strong>pressure:</strong>: 
                        ${updatedData.pressure}`
            } else if (updatedData.pressure && !pressure) {
                const newParagraph = document.createElement('p');
                newParagraph.classList.add('card__more-info', 'pressure');
                newParagraph.innerHTML =
                    ` <strong>pressure:</strong>: 
                        ${updatedData.pressure}`
                additionalInfoContainer.appendChild(newParagraph);
            }
            if(updatedData.pressure === undefined && pressure) {
                fullnameElement.querySelector('.pressure').remove();
            }

            if (bmi) {
                bmi.innerHTML =
                    ` <strong>bmi:</strong>: 
                        ${updatedData.bmi}`
            } else if (updatedData.bmi && !bmi) {
                const newParagraph = document.createElement('p');
                newParagraph.classList.add('card__more-info', 'bmi');
                newParagraph.innerHTML =
                    ` <strong>bmi:</strong>: 
                        ${updatedData.bmi}`
                additionalInfoContainer.appendChild(newParagraph);
            }
            if(updatedData.bmi === undefined && bmi) {
                fullnameElement.querySelector('.bmi').remove();
            }

            if (diseases) {
                diseases.innerHTML =
                    ` <strong>diseases:</strong>: 
                        ${updatedData.diseases}`
            } else if (updatedData.diseases && !diseases) {
                const newParagraph = document.createElement('p');
                newParagraph.classList.add('card__more-info', 'diseases');
                newParagraph.innerHTML =
                    ` <strong>diseases: </strong>: 
                        ${updatedData.diseases}`
                additionalInfoContainer.appendChild(newParagraph);
            }
            if(updatedData.diseases === undefined && diseases) {
                fullnameElement.querySelector('.diseases').remove();
            }

            if (age) {
                age.innerHTML =
                    ` <strong>age: </strong>: 
                        ${updatedData.age}`
            } else if (updatedData.age && !age) {
                const newParagraph = document.createElement('p');
                newParagraph.classList.add('card__more-info', 'age');
                newParagraph.innerHTML =
                    ` <strong>age: </strong>
                        ${updatedData.age}`
                additionalInfoContainer.appendChild(newParagraph);
            }
            if(updatedData.age === undefined && age) {
                fullnameElement.querySelector('.age').remove();
            }
            if (lastVisit) {
                lastVisit.innerHTML =
                    ` <strong>lastVisit:</strong>
                        ${updatedData.lastVisit}`;
            } else if (updatedData.lastVisit !== undefined && !lastVisit) {
                const newParagraph = document.createElement('p');
                newParagraph.classList.add('card__more-info', 'lastVisit');
                newParagraph.innerHTML =
                    ` <strong>lastVisit:</strong>
                        ${updatedData.lastVisit}`
                additionalInfoContainer.appendChild(newParagraph);
            }
            if(updatedData.lastVisit === undefined && lastVisit) {
                fullnameElement.querySelector('.lastVisit').remove();
            }

            if (updatedData.status.value === "Done") {
                additionalInfoContainer.classList.add("visit-done");
                fullnameElement.classList.add("visit-done");
            } else {
                additionalInfoContainer.classList.remove("visit-done");
                fullnameElement.classList.remove("visit-done");
            }

        } else {
            console.error(`Елемент з ідентифікатором ${cardIdString} не знайдений`);
        }
    }

    async saveVisit() {
        const selectedDoctor = document.querySelector("#doctorSelect").value;
        let cardId = this.cardInfo.id;
        let formData = {};

        if (selectedDoctor === "Cardiologist") {
            formData = new VisitCardiologist().visitData();
            formData.selectedDoctor = "Cardiologist";
        } else if (selectedDoctor === "Dentist") {
            formData = new VisitDentist().visitData();
            formData.selectedDoctor = "Dentist";
        } else if (selectedDoctor === "Therapist") {
            formData = new VisitTherapist().visitData();
            formData.selectedDoctor = "Therapist";
        }

        try {
            const updatedData = await updateCards(cardId, formData);

            this.updateCard(cardId, updatedData);
            
            const cardIdString = `card_${cardId}`;
            const card = document.querySelector(`#${cardIdString}`);
            const addInfo = card.querySelector('.card__additional-info');

            if (updatedData.status === "Done") {
                addInfo.classList.add("visit-done");
                card.classList.add("visit-done");
            } else {
                addInfo.classList.remove("visit-done");
                card.classList.remove("visit-done");
            }

            super.closeModal();
        } catch (error) {
            console.error('Error updating card:', error);
        }
    }
}

export default CardEdit;