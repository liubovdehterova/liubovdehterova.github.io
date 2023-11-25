import VisitCardiologist from "./VisitCardiologist.js";
import VisitDentist from "./VisitDentist.js";
import VisitTherapist from "./VisitTherapist.js";
import Modal from "./Modal.js";
import {doctorsList} from "../constants/doctors_list.js";
import {checkRequiredFields} from "../functions/checkRequiredFields.js";


/*Зробила тут спільний клас для створення і редагування карток винесла частину з CreateVisitModal.js Зробила спільний render та createForm*/
class ModalVisitBase extends Modal {
    constructor(selector, doctors = doctorsList, modalTitle) {
        super(selector, modalTitle);
        this.doctorsList = doctors;
        this.fullname = "";
        this.urgency = "";
        this.status = "";
        this.purpose = "";
        this.description = "";
        this.comments = "";
        this.saveButton = document.createElement("button");
        this.doctorSelect = document.createElement("select");
    }

    render() {
        super.render(this.selector, this.modalTitle);

        const modalBody = document.querySelector(".modal-body");

        // ------------- Doctor select -------------------
        const doctorSelectLabel = document.createElement("label");
        doctorSelectLabel.textContent = "Doctor: ";
        modalBody.append(doctorSelectLabel);

        this.doctorSelect.classList.add("doctor-select");
        this.doctorSelect.setAttribute("name", "selectedDoctor");
        this.doctorSelect.setAttribute("id", "doctorSelect");
        modalBody.append(this.doctorSelect);

        doctorSelectLabel.setAttribute("for", "doctorSelect");

        // ------------- Doctor select options -------------------
        const doctorSelectDefault = document.createElement("option");
        doctorSelectDefault.value = "serviceOption";
        doctorSelectDefault.textContent = "Select a doctor";
        this.doctorSelect.prepend(doctorSelectDefault);
        this.doctorSelect.value = "serviceOption";

        this.doctorsList.forEach(doctor => {
            let doctorItem = document.createElement("option");
            doctorItem.value = doctor;
            doctorItem.text = doctor;
            this.doctorSelect.append(doctorItem);
        });

        // ------------ Save button ------------------------
        this.saveButton.innerText = "Save Visit";
        this.saveButton.classList.add("save-visit__button");

        this.saveButton.addEventListener("click", this.saveVisit);

        // ----------- Visit form rendering -----------
        this.doctorSelect.addEventListener("change", () => {
            this.createForm(modalBody);
            checkRequiredFields(".visit-form", ".save-visit__button");
        })
    }

    createForm(place, data = '') {
        let selectedDoctor = this.doctorSelect.value;

        const visitForm = document.querySelector(".visit-form");

        if (visitForm) {
            visitForm.remove();
        }

        if (this.saveButton) {
            this.saveButton.remove();
        }

        this.fullname = data.fullname || this.fullname;
        this.urgency = data.urgency;
        this.status = data.status || this.status;
        this.purpose = data.purpose || this.purpose;
        this.description = data.description || this.description;
        this.comments = data.comments || this.comments;

        const createVisit = (VisitClass) => {
            const visitInstance = new VisitClass();
            visitInstance.render(".modal-body");

            const urgencySelect = document.querySelector('#urgencySelect');
            const fullnameInput = document.querySelector('#fullnameInput');
            const purposeInput = document.querySelector('#purposeInput');
            const descriptionArea = document.querySelector('#descriptionArea');
            const commentsArea = document.querySelector('#commentsArea');
            const statusSelect = document.querySelector('#statusSelect');

            if (urgencySelect && this.urgency !== undefined) {
                urgencySelect.value = this.urgency;
            }

            if (fullnameInput && this.fullname !== undefined) {
                fullnameInput.value = this.fullname;
            }

            if (purposeInput && this.purpose !== undefined) {
                purposeInput.value = this.purpose;
            }

            if (descriptionArea && this.description !== undefined) {
                descriptionArea.value = this.description;
            }

            if (commentsArea && this.comments !== undefined) {
                commentsArea.value = this.comments;
            }

            if (status && this.status !== undefined) {
                pressureInput.value = this.status;
            }

            place.append(this.saveButton);
            checkRequiredFields(".visit-form", ".save-visit__button");
        };

        switch (selectedDoctor) {
            case "Cardiologist":
                createVisit(VisitCardiologist);
                break;
            case "Dentist":
                createVisit(VisitDentist);
                break;
            case "Therapist":
                createVisit(VisitTherapist);
                break;
            default:
                break;
        }
    }

}

export default ModalVisitBase;
