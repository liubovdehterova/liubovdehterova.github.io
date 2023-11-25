export const getCards = async () => {
    try {
        const authToken = localStorage.getItem("token");
        const data = (await fetch("https://ajax.test-danit.com/api/v2/cards", {
            headers: {
                'Authorization': `Bearer ${authToken}`,
            }
        })).json();
        return data;
    } catch (err) {
        console.log(err)
    }
}