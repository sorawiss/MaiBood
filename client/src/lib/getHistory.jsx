const baseURL = import.meta.env.VITE_BASE_URL;
// http://localhost:8080/api/history
async function getHistory(id) {
    const response = await fetch(`${baseURL}/history/${id}`, {
      method: 'GET',
      credentials: 'include'
    })
    const data = await response.json()
    return data
}


export default getHistory