import Visit from "./Visit.js";

export default class VisitCardiologist extends Visit {
    constructor(doctor, purpose, description, urgency, fullname, pressure, bmi, diseases, age) {
        super(doctor, purpose, description, urgency, fullname);
        this.pressure = pressure;
        this.bmi = bmi;
        this.diseases = diseases;
        this.age = age;
    }


    render(selector) {
        super.render(selector);

        const visitForm = document.querySelector(".visit-form");

        // ----------- Ordinary pressure field ------------
        const pressureLabel = document.createElement("label");
        pressureLabel.textContent = "Ordinary pressure: *";
        visitForm.append(pressureLabel);

        const pressureInput = document.createElement("input");
        pressureInput.setAttribute("type", "text");
        pressureInput.setAttribute("name", "pressure");
        pressureInput.setAttribute("id", "pressureInput");
        pressureInput.required = true;
        visitForm.append(pressureInput);
        
        pressureLabel.setAttribute("for", "pressureInput")

        // ----------- Body mass index field ------------
        const bmiLabel = document.createElement("label");
        bmiLabel.textContent = "Body mass index: *";
        visitForm.append(bmiLabel);
        
        const bmiInput = document.createElement("input");
        bmiInput.setAttribute("type", "text");
        bmiInput.setAttribute("name", "bmi");
        bmiInput.setAttribute("id", "bmiInput");
        bmiInput.required = true;
        visitForm.append(bmiInput);

        bmiLabel.setAttribute("for", "bmiInput");

        // ------- Previous diseases of the cardiovascular system field ------------
        const diseasesLabel = document.createElement("label");
        diseasesLabel.textContent = "Previous diseases of the cardiovascular system: *";
        visitForm.append(diseasesLabel);

        const diseasesInput = document.createElement("textarea");
        diseasesInput.setAttribute("name", "diseases");
        diseasesInput.setAttribute("id", "diseasesInput");
        diseasesInput.required = true;
        visitForm.append(diseasesInput);

        diseasesLabel.setAttribute("for", "diseasesInput");

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
        formData.pressure = document.querySelector("#pressureInput").value;
        formData.bmi = document.querySelector("#bmiInput").value;
        formData.diseases = document.querySelector("#diseasesInput").value;
        formData.age = document.querySelector("#ageInput").value;

        return formData;
    }

}