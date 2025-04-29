const baseURL = import.meta.env.VITE_BASE_URL
const deleteFridgeItem = async (itemId) => {
    const response = await fetch(`${baseURL}/delete-from-fridge/${itemId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to delete item ${itemId}. Status: ${response.status}`);
    }


    return response.json();
};

export default deleteFridgeItem;