const baseURL = import.meta.env.VITE_BASE_URL;
// http://localhost:8080/api/history
async function getHistory() {
    const response = await fetch(`${baseURL}/history`, {
      method: 'GET',
      credentials: 'include'
    })
    const data = await response.json()
    return data
}


export default getHistory