export default function importValue(value, type) {
    if (!value || !type) return value;
    if (type === "date") {
        return moment(value, "L").toDate();
    } else if (type === "phone-number") {
        var groups = value.match(/^^0?\s?\(?(\d{3})\)?\s?(\d{3})\s?(\d{2})\s?(\d{2})$/m)
        if (groups.length > 0) {
            return groups[1] + groups[2] + groups[3] + groups[4];
        } else return value;
    } else if (type === "bool"){
    	return value === "Evet" || value === "evet" || value === "EVET";
    }
}
