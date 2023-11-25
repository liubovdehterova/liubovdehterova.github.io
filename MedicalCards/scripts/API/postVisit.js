export const postVisit = async (formData) => {
    try {
        const authToken = localStorage.getItem("token");
        const dataPost = (await fetch("https://ajax.test-danit.com/api/v2/cards", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(formData)
        })).json()
        return dataPost;
    } catch (err) {
        console.log(err)
    }
}