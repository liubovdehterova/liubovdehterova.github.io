import { getCards } from "../API/getCards.js";
import { renderCard } from "./renderCard.js";

async function filterCards(event, selector) {
  const data = await getCards();
  (data);

  const filterByTitle = document.querySelector(".filter-by-title");
  const filterByStatus = document.querySelector(".filter-by-status");
  const filterByUrgency = document.querySelector(".filter-by-urgency");
  const resetFiltersBtn = document.querySelector(".reset-filters");

// Присвоюємо змінним значення інпутів. Якщо у фільтра з сеелектами є значення "All", то присвоюємо змінній масив всіх варіантів, інакше - поточне значення
  let titleValue = filterByTitle.value;

  let statusValue = (filterByStatus.value === "all") ? ["Open", "Done"] : [filterByStatus.value];

  let urgencyValue = (filterByUrgency.value === "all") ? ["High", "Normal", "Low"] : [filterByUrgency.value];

// Фільтруємо послідовно по кожному фільтру
  let filteredData = data.filter(({ comments, description, fullname, diseases, purpose, selectedDoctor }) => { return (description.toLowerCase().includes(titleValue.toLowerCase()) || comments.toLowerCase().includes(titleValue.toLowerCase()) || fullname.toLowerCase().includes(titleValue.toLowerCase()) || diseases?.toLowerCase().includes(titleValue.toLowerCase()) || purpose.toLowerCase().includes(titleValue.toLowerCase()) || selectedDoctor.toLowerCase().includes(titleValue.toLowerCase()) )});

  filteredData = filteredData.filter(({ status }) => { return statusValue.map(e => e.toLowerCase()).includes(status.toLowerCase()) })

  filteredData = filteredData.filter(({ urgency }) => { return urgencyValue.map(e => e.toLowerCase()).includes(urgency.toLowerCase()) })

  // Якщо карток за заданими фільтрами немає - змінюємо та виводимо повідомлення, якщо є - міняємо текст на попередній (цей текст ще відображається коли немає карток взагалі та при розлогіненому стані) та ховаємо
  let noCardsMessage = document.querySelector(".no-cards-message");
  if(filteredData.length === 0){
    noCardsMessage.innerText = "No items matching";
  } else{
    noCardsMessage.innerText = "No items have been added yet";
    noCardsMessage.style.display = "none";
  };
 
  const cardsContainer = document.querySelector(selector);
  cardsContainer.innerHTML = "";
  renderCard(filteredData);

  resetFiltersBtn.addEventListener("click", ()=>{
    filterByTitle.value = "";
    filterByStatus.value = "all";
    filterByUrgency.value = "all";
    cardsContainer.innerHTML = "";
    renderCard(data);
  })

}

export default filterCards; 