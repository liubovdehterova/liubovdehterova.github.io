/**
 * @param func {function}
 * @param timeout {number}
 * @return {function}
 */

const debounce = function (func, timeout) {
 let timeoutId; // Змінна для ID таймера

 return function () {
   const context = this; // зберігаємо this
   const args = arguments; // зберігаємо аргументи функції

   clearTimeout(timeoutId) // Завершаємо попередній Timeout

   timeoutId = setTimeout(() => { // Запускаємо новий Timeout
     func.apply(context, args);
   }, timeout)
 }
}

export default debounce;