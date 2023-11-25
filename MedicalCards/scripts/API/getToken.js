export async function getToken(emailAdress, userPassword) {
  let loginRes = (
    await fetch("https://ajax.test-danit.com/api/v2/cards/login", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: emailAdress, password: userPassword })
  })
  )
  if(loginRes.status === 200) {
    const authToken = await loginRes.text();
    localStorage.setItem("token", authToken);

    let loginBtn = document.querySelector(".btn--reg");
    loginBtn.classList.add("btn--hidden");

    let logoutBtn = document.querySelector(".btn--log-out");
    logoutBtn.classList.remove("btn--hidden");

    let createVisitBtn = document.querySelector(".btn--create--visit");
    createVisitBtn.classList.remove("btn--hidden");
  }
}