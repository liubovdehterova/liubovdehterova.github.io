import ModalVisitBase from "./ModalVisitBase.js";
import VisitCardiologist from "./VisitCardiologist.js";
import VisitDentist from "./VisitDentist.js";
import VisitTherapist from "./VisitTherapist.js";
import { doctorsList } from '../constants/doctors_list.js';
import { postVisit } from "../API/postVisit.js";
import {renderCard} from '../functions/renderCard.js';


class ModalVisitCreate extends ModalVisitBase {
    constructor(selector, doctors = doctorsList, modalTitle = "Create Visit") {
        super(selector, doctors, modalTitle);
        this.saveVisit = this.saveVisit.bind(this);
    }
    
    async saveVisit() {
        const selectedDoctor = document.querySelector(".doctor-select").value;
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
            const newData = await postVisit(formData);
            renderCard(newData);
            super.closeModal();
        }
        catch (error) {
            console.log("Error saving visit: ", error);
        }

    }
}

export default ModalVisitCreate;