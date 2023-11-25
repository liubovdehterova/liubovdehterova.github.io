import Visit from "./Visit.js";

export default class VisitTherapist extends Visit {
    constructor(doctor, purpose, description, urgency, fullname, age) {
        super(doctor, purpose, description, urgency, fullname);
        this.age = age;
    }

    render(selector) {
        super.render(selector);

        const visitForm = document.querySelector(".visit-form");

        // -------------- Age field ------------
        const ageLabel = document.createElement("label");
        ageLabel.textContent = "Age: *";
        visitForm.append(ageLabel);

        const ageInput = document.createElement("input");
        ageInput.setAttribute("type", "text");
        ageInput.setAttribute("name", "age");
        ageInput.setAttribute("id", "ageInput");
        ageInput.required = true;
        visitForm.append(ageInput);

        ageLabel.setAttribute("for", "ageInput");
    }

    visitData() {
        const formData = super.visitData();
        formData.age = document.querySelector("#ageInput").value;

        return formData;
    }
}