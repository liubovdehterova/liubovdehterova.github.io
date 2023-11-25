import Modal from "./Modal.js";
import { getToken } from "../API/getToken.js";
import { renderCard } from "../functions/renderCard.js";
import { getCards } from "../API/getCards.js";
import { checkRequiredFields } from "../functions/checkRequiredFields.js";


class LoginModal extends Modal{
    constructor(selector, modalTitle = "Login form") {
        super(selector, modalTitle);
        this.emailInput = document.createElement("input");
        this.passwordInput = document.createElement("input");
        this.submittBtn = document.createElement("button");
    }
    
    render() {
        super.render(this.selector, this.modalTitle);

        const loginForm = document.createElement("form")
        loginForm.classList.add("login-form");

        const emailLabel = document.createElement("label")
        emailLabel.setAttribute("for", "userEmail");
        emailLabel.textContent = "E-mail: *";
        this.emailInput.setAttribute("type", "text");
        this.emailInput.setAttribute("id", "userEmail");
        this.emailInput.required = true;
        this.emailInput.classList.add("login-form__email-input");

        const passwordLabel = document.createElement("label")
        passwordLabel.setAttribute("for", "userPassword");
        passwordLabel.textContent = "Password: *";
        this.passwordInput.classList.add("login-form__password-input");
        this.passwordInput.setAttribute("type", "password");
        this.passwordInput.setAttribute("id", "userPassword");
        this.passwordInput.required = true;

        this.submittBtn.setAttribute("type", "submitt");
        this.submittBtn.classList.add("login-form__submitt-btn");
        this.submittBtn.innerHTML = "Login";

        loginForm.append(emailLabel);
        loginForm.append(this.emailInput);
        loginForm.append(passwordLabel);
        loginForm.append(this.passwordInput);
        loginForm.append(this.submittBtn);

        this.modalBody.append(loginForm);

        checkRequiredFields(".login-form", ".login-form__submitt-btn");

        this.submittBtn.addEventListener("click", (event) => {
            event.preventDefault();
            this.login();
            super.closeModal();
        })
    }

    async login() {
        await getToken(this.emailInput.value, this.passwordInput.value);
        const data = await getCards();
        renderCard(data);
    }

}

export default LoginModal