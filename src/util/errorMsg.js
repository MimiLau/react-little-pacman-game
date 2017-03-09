export function mapErrorMsg(str) {
	if (str === 'exists') {
		return '你已经参与过此次活动'; // Unique field value exists
	}
	if (str === 'required') {
		return 'The field is required'; // The field is required
	}
	if (str === 'NaN') {
		return 'Not a number'; // Not a number
	}
	if (str === 'invalidEmail') {
		return 'Invalid Email'; // Invalid Email
	}
	return '发生错误';
}
