const axios = require('axios');

const isValidBirthday = (birthday) => {
	let birthdayNum = Math.floor(Number(birthday));
	if (birthdayNum === Infinity || String(birthdayNum) !== birthday || birthdayNum <= 0) {
		return false;
	}
	let month = (birthdayNum / 100) | 0;
	let date = birthdayNum % 100;
	if (month > 12 || month === 0) {
		return false;
	}
	if (date === 0 || date > 31) {
		return false;
	}
	if (month === 2 && month > 29) {
		return false;
	}
	if ((month === 4 || month === 6 || month === 9 || month === 11) && date > 30) {
		return false;
	}
	return true;
}

if (process.argv.length !== 5) {
	console.log(process.argv.length);
	console.log('invalid input. input must include first name, lastname, and birthday, seperate by a single space');
	process.exit();
}

if (!isValidBirthday(process.argv[4])) {
	console.log('invalid birthday');
	process.exit();
}

const url = 'http://localhost:8765/birth';
axios.get(url, {
	params: {
		birthday: process.argv[4],
		firstName: process.argv[2]
	}
}).then(res => {
	console.log(res.data);
}).catch(err => {
	console.log(err);
});
