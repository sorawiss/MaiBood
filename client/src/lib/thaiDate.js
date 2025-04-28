function thaiDate(date) {
    const thaiFormat = new Intl.DateTimeFormat('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date);

    return thaiFormat;
}


export default thaiDate