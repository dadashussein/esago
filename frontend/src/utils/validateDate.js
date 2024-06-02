export function isValidDate(dateString) {
	// Regular expression to check if the date is in the format YYYY-MM-DD
	const regex = /^\d{4}-\d{2}-\d{2}$/;

	// If the date string doesn't match the regex, return false
	if (!dateString.match(regex)) {
		return false;
	}

	// Parse the date parts to integers
	const parts = dateString.split("-");
	const year = parseInt(parts[0], 10);
	const month = parseInt(parts[1], 10);
	const day = parseInt(parts[2], 10);

	// Check the ranges of month and day
	if (year < 1000 || year > 9999 || month == 0 || month > 12) {
		return false;
	}

	// Create a date object and check if it matches the input date
	const date = new Date(dateString);
	return date.getFullYear() === year && (date.getMonth() + 1) === month && date.getDate() === day;
}
