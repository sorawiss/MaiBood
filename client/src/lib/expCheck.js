function isExpiringSoon(expirationDate) {
    const now = new Date();
    const expDate = new Date(expirationDate);

    // Difference in milliseconds
    const diffTime = expDate - now;

    // Convert to days
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    return diffDays <= 3 && diffDays >= 0; // Between 0 and 3 days
}


export default isExpiringSoon