export default function displayValue(value, type) {
    if (type === 'date') {
        return moment(Date.parse(value)).format("LL");
    } else if (type === 'bool') {
        return (value) ? 'Evet' : 'Hayır';
    } else if (type === 'phone-number') {
        if (!value || !value.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/g)) return value;
        var groups = value.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/m);
        return "0 (" + groups[1] + ") " + groups[2] + " " + groups[3] + " " + groups[4];
    } else {
        return value;
    }
}
