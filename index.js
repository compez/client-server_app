const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8765;

app.use(bodyParser.urlencoded({
	extended:true
}));

app.use(bodyParser.json());
app.get('/birth', (req, res) => {
	if (!req.query.birthday) {
		res.send('invalid birthday date');
	}
	let birthday = req.query.birthday;
	let daysDifference = calculateDaysDifference(birthday);
	if (daysDifference === 0) {
		res.send(`Hello ${req.query.firstName}. Happy birthday`);
	}
	else {
		res.send(`Hello ${req.query.firstName}. You have ${daysDifference} days until your birthday`);
	}
});

app.listen(port);
console.log(`app is running on ${port}`);

const calculateDaysDifference = (birthday) => {
	let today = new Date();
	let upcomingBirthday = new Date();
	upcomingBirthday.setMonth(birthday / 100 - 1);
	upcomingBirthday.setDate(birthday % 100);
	let todayInDigits = (today.getMonth() + 1) * 100 + today.getDate();
	if (todayInDigits === birthday) return 0;
	if (todayInDigits > birthday) {
		upcomingBirthday.setFullYear(upcomingBirthday.getFullYear() + 1);
	}
	let timeoff = upcomingBirthday.getTime() - today.getTime();
	return Math.ceil(timeoff / (1000 * 3600 * 24));
}