function isExpiringSoon(expirationDate) {
    const now = new Date();
    const expDate = new Date(expirationDate);

    // Difference in milliseconds
    const diffTime = expDate - now;

    // Convert to days
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    
    if (diffDays > 3)
        return 0;
    else if (diffDays <= 3 && diffDays >= 0)
        return 1;
    else if (diffDays < 0)
        return 2;
}


export default isExpiringSoon