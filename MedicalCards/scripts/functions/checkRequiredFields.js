import debounce from "./debounce.js";

export function checkRequiredFields(formSelector, buttonSelector) {

        const form = document.querySelector(formSelector);
        const button = document.querySelector(buttonSelector);

        if (form && button) {

            let requiredFields = form.querySelectorAll("input[required], textarea[required], select[required]");

            if (requiredFields) {
                
                let allFilled = Array.from(requiredFields).every(field => {

                    
                    if (field.tagName === "SELECT") {
                        return field.value !== "serviceOption";
                    }

                    return field.value !== "";
                })

                button.disabled = !allFilled;


                if (!form.hasAttribute('data-handlers-added')) {
                    Array.from(requiredFields).forEach(field => {

                        field.addEventListener('input', debounce((event) => {
                            checkRequiredFields(formSelector, buttonSelector);
                        }, 300));
                        field.addEventListener('change', debounce((event) => {
                            checkRequiredFields(formSelector, buttonSelector);
                        }, 300));
                    });
                    form.setAttribute('data-handlers-added', 'true');
                }
            }
        }
    }