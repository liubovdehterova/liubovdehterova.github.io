export default class Modal {

    constructor(selector, modalTitle) {
        this.selector = selector;
        this.modalTitle = modalTitle;
        this.modalContainer = document.querySelector(this.selector);
        this.modal = document.createElement("div");
        this.modalBody = document.createElement("div");
        this.modalHeader = document.createElement("div");
        this.closeButton = document.createElement("button");
    }

    render() {
        this.modal.classList.add("modal");
        this.modalContainer.append(this.modal);

        this.modalBody.classList.add("modal-body");
        this.modal.append(this.modalBody);

        this.modalHeader.classList.add("modal-body__header");
        this.modalHeader.innerText = `${this.modalTitle}`;
        this.modalBody.append(this.modalHeader);

        this.closeButton.innerHTML = '<svg class="close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z" /></svg>';
        this.closeButton.classList.add("close-button");
        this.modalBody.append(this.closeButton);

        this.closeButton.addEventListener("click", ()=>{
            this.closeModal();
        });

        document.addEventListener("click", (event) => {
            let target = event.target;
            if (target === this.modal) {
                this.closeModal();
            }
        })
    }

    closeModal() {
        this.modal.remove();
    }
}
