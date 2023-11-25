export const deleteCard = async (cardId) => {
    try {
        const authToken = localStorage.getItem("token");
        const response = (await fetch(`https://ajax.test-danit.com/api/v2/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`
            },
        }));
        return response;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};