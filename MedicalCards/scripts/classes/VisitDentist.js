import Visit from "./Visit.js";

export default class VisitDentist extends Visit {
    constructor(doctor, purpose, description, urgency, fullname, lastVisit) {
        super(doctor, purpose, description, urgency, fullname);
        this.lastVisit = lastVisit;
    }


    render(selector) {
        super.render(selector);

        const visitForm = document.querySelector(".visit-form");

        // -------- Last visit field ----------
        const lastVisitLabel = document.createElement("label");
        lastVisitLabel.textContent = "Last visit date: *";
        visitForm.append(lastVisitLabel);
        
        const lastVisitInput = document.createElement("input");
        lastVisitInput.setAttribute("type", "date");
        lastVisitInput.setAttribute("name", "lastvisit");
        lastVisitInput.setAttribute("id", "lastVisitInput");
        lastVisitInput.required = true;
        visitForm.append(lastVisitInput);

        lastVisitLabel.setAttribute("for", "lastVisitInput");
    }

    visitData() {
        const formData = super.visitData();
        formData.lastVisit = document.querySelector("#lastVisitInput").value;

        return formData;
    }
}
