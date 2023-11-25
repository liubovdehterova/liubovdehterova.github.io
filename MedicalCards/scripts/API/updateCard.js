export const updateCards = async (cardId, formData) => {
    try {
        const authToken = localStorage.getItem("token");
        const response = await fetch(`https://ajax.test-danit.com/api/v2/cards/${cardId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};