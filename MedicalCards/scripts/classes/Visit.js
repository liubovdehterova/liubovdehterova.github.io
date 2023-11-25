import { urgencyOptions } from "../constants/urgency_options.js";
import { statusOptions } from "../constants/visit_statuses.js";

export default class Visit {
    constructor(doctor, purpose, description, urgency, fullname) {
        this.doctor = doctor;
        this.purpose = purpose;
        this.description = description;
        this.urgency = urgency;
        this.fullname = fullname;
    }

    render(selector) {
        const formContainer = document.querySelector(selector);
        const visitForm = document.createElement("form");
        visitForm.classList.add("visit-form");

        // ------------ Urgency select -----------------
        const urgencyLabel = document.createElement("label");
        urgencyLabel.textContent = "Urgency: *";
        visitForm.append(urgencyLabel);
        
        const urgencySelect = document.createElement("select");
        urgencySelect.setAttribute("name", "urgency");
        urgencySelect.setAttribute("id", "urgencySelect");
        urgencySelect.required = true;
        visitForm.append(urgencySelect);

        urgencyLabel.setAttribute("for","urgencySelect");

        // ------------ Urgency select options -----------------
        const urgencySelectDefault = document.createElement("option");
        urgencySelectDefault.value = "serviceOption";
        urgencySelectDefault.textContent = "Select urgency level";
        urgencySelect.prepend(urgencySelectDefault);
        urgencySelect.value = "serviceOption";

        urgencyOptions.forEach(option => {
            let optionItem = document.createElement("option");
            optionItem.value = option;
            optionItem.text = option;
            urgencySelect.append(optionItem);
        });

        // ---------- Visit status select -------------
        const statusLabel = document.createElement("label");
        statusLabel.textContent = "Visit status: *";
        visitForm.append(statusLabel);
        
        const statusSelect = document.createElement("select");
        statusSelect.setAttribute("name", "status");
        statusSelect.setAttribute("id", "statusSelect");
        statusSelect.required = true;
        visitForm.append(statusSelect);

        statusLabel.setAttribute("for","statusSelect");

        // ------------ Status select options -----------------

        statusOptions.forEach(option => {
            let optionItem = document.createElement("option");
            optionItem.value = option;
            optionItem.text = option;
            statusSelect.append(optionItem);
        });

        statusSelect.value = "Open";

        // ------------- Fullname field ---------------
        const fullNameLabel = document.createElement("label");
        fullNameLabel.textContent = "Fullname: *";
        visitForm.append(fullNameLabel);
        
        const fullnameInput = document.createElement("input");
        fullnameInput.setAttribute("type", "text");
        fullnameInput.setAttribute("name", "fullname");
        fullnameInput.setAttribute("id", "fullnameInput");
        fullnameInput.required = true;
        visitForm.append(fullnameInput);

        fullNameLabel.setAttribute("for", "fullnameInput");

        // -------- Visit purpose field ---------------
        const purposeLabel = document.createElement("label");
        purposeLabel.textContent = "Visit purpose: *";
        visitForm.append(purposeLabel);
        
        const purposeInput = document.createElement("input");
        purposeInput.setAttribute("type", "text");
        purposeInput.setAttribute("name", "purpose");
        purposeInput.setAttribute("id", "purposeInput");
        purposeInput.required = true;
        visitForm.append(purposeInput);

        purposeLabel.setAttribute("for", "purposeInput");

        // ---------- Short description field -----------------
        const descriptionLabel = document.createElement("label");
        descriptionLabel.textContent = "Short description: *";
        visitForm.append(descriptionLabel);

        const descriptionArea = document.createElement("textarea");
        descriptionArea.setAttribute("name", "description");
        descriptionArea.setAttribute("id", "descriptionArea");
        descriptionArea.required = true;
        visitForm.append(descriptionArea);

        descriptionLabel.setAttribute("for", "descriptionArea");

        // ---------- Comments field -----------------
        const commentsLabel = document.createElement("label");
        commentsLabel.textContent = "Comments (optional): ";
        visitForm.append(commentsLabel);
        
        const commentsArea = document.createElement("textarea");
        commentsArea.setAttribute("name", "comments");
        commentsArea.setAttribute("id", "commentsArea");
        commentsArea.required = false;
        visitForm.insertAdjacentElement("beforeend", commentsArea);

        commentsLabel.setAttribute("for", "commentsArea");


        // ---------- Add form to the formContainer -------
        formContainer.appendChild(visitForm);
    }

    visitData() {
        const formData = {
            urgency: document.querySelector("#urgencySelect").value,
            fullname: document.querySelector("#fullnameInput").value,
            status: document.querySelector("#statusSelect").value,
            purpose: document.querySelector("#purposeInput").value,
            description: document.querySelector("#descriptionArea").value,
            comments: document.querySelector("#commentsArea").value
        }

        return formData;
    }
}
