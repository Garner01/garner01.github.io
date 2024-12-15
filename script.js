const inputs = document.querySelectorAll('.workers input');
const select = document.querySelector('select[name="year"]')

let names = ['Света и Света', 'Галя и Коля', 'Леся и Аня', 'Таня и Таня'];
const shift = {
	2024: [
		[1, 2],
		[3, 1],
		[4, 3],
		[2, 4]
	],
	2025: [
		[4, 3],
		[2, 4],
		[1, 2],
		[3, 1]
	],
	2026: [
		[2, 4],
		[1, 2],
		[3, 1],
		[4, 3]
	]
};

let year = new Date(2025, 0, 1).getTime();
let selectedYear = 2025;
const dayMs = 1000 * 60 * 60 * 24;

const STORAGE_KEY = 'shift';

function getDayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const dayOfYear = Math.floor(diff / dayMs);
    return dayOfYear;
}

const onInput = (e) => {
	const index = e.target.getAttribute('data-shift-index');
	names[index] = e.target.value;
	localStorage.setItem(STORAGE_KEY, JSON.stringify(names));
	renderCalendar()
}

const onSelect = (e) => {
	const inputSelectedYear = Number(e.target.value);
	selectedYear = inputSelectedYear;
	year = new Date(inputSelectedYear, 0, 1).getTime();
	renderCalendar();
}

const initShifts = () => {
	try {
		const shift = localStorage.getItem(STORAGE_KEY);
		if (!shift) {
			return;
		}
		names = JSON.parse(shift)
		inputs.forEach((input, i) => {
			input.value = names[i];
		})
	} catch (error) {
		console.error(error)
	}
}

const getShift = (day) => {
	const date = new Date((day - 1) * dayMs + year);

	const myShift = shift[selectedYear][((getDayOfYear(date) % 4) || 4) - 1];
	return {
		date,
		day: names[myShift[0] - 1],
		night: names[myShift[1] - 1]
	};
};

const renderCalendar = () => {
	const calendarElement = document.getElementById('calendar');
	const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

	calendarElement.innerHTML = '';

	// Заголовок дней недели
	daysOfWeek.forEach(day => {
		const dayHeader = document.createElement('div');
		dayHeader.className = 'day header';
		dayHeader.textContent = day;
		calendarElement.appendChild(dayHeader);
	});

	// Расчет дней и заполнение календаря
	const firstDayOfWeek = new Date(year).getDay() || 7;
	for (let i = 1; i < firstDayOfWeek; i++) {
		const emptyCell = document.createElement('div');
		emptyCell.className = 'day';
		calendarElement.appendChild(emptyCell);
	}

	const daysInYear = selectedYear % 4 == 0 ? 366 : 365
	for (let i = 1; i <= daysInYear; i++) {
		const { date, day, night } = getShift(i);

		const dayElement = document.createElement('div');
		dayElement.className = 'day';

		dayElement.innerHTML = `
			<strong>${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}</strong>
			<div class="wrapper">
				<div class="shift"><svg version="1.1" style="width: 15px; height: 15px" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 45.16 45.16" style="enable-background:new 0 0 15.16 15.16;" xml:space="preserve"><g><g><path d="M22.58,11.269c-6.237,0-11.311,5.075-11.311,11.312s5.074,11.312,11.311,11.312c6.236,0,11.311-5.074,11.311-11.312 S28.816,11.269,22.58,11.269z"/><g><g><path d="M22.58,7.944c-1.219,0-2.207-0.988-2.207-2.206V2.207C20.373,0.988,21.361,0,22.58,0c1.219,0,2.207,0.988,2.207,2.207 v3.531C24.787,6.956,23.798,7.944,22.58,7.944z"/></g><g><path d="M22.58,37.215c-1.219,0-2.207,0.988-2.207,2.207v3.53c0,1.22,0.988,2.208,2.207,2.208c1.219,0,2.207-0.988,2.207-2.208 v-3.53C24.787,38.203,23.798,37.215,22.58,37.215z"/></g><g><path d="M32.928,12.231c-0.861-0.862-0.861-2.259,0-3.121l2.497-2.497c0.861-0.861,2.259-0.861,3.121,0 c0.862,0.862,0.862,2.26,0,3.121l-2.497,2.497C35.188,13.093,33.791,13.093,32.928,12.231z"/></g><g><path d="M12.231,32.93c-0.862-0.863-2.259-0.863-3.121,0l-2.497,2.496c-0.861,0.861-0.862,2.26,0,3.121 c0.862,0.861,2.26,0.861,3.121,0l2.497-2.498C13.093,35.188,13.093,33.79,12.231,32.93z"/></g><g><path d="M37.215,22.58c0-1.219,0.988-2.207,2.207-2.207h3.531c1.219,0,2.207,0.988,2.207,2.207c0,1.219-0.988,2.206-2.207,2.206 h-3.531C38.203,24.786,37.215,23.799,37.215,22.58z"/></g><g><path d="M7.944,22.58c0-1.219-0.988-2.207-2.207-2.207h-3.53C0.988,20.373,0,21.361,0,22.58c0,1.219,0.988,2.206,2.207,2.206 h3.531C6.956,24.786,7.944,23.799,7.944,22.58z"/></g><g><path d="M32.928,32.93c0.862-0.861,2.26-0.861,3.121,0l2.497,2.497c0.862,0.86,0.862,2.259,0,3.12s-2.259,0.861-3.121,0 l-2.497-2.497C32.066,35.188,32.066,33.791,32.928,32.93z"/></g><g><path d="M12.231,12.231c0.862-0.862,0.862-2.259,0-3.121L9.734,6.614c-0.862-0.862-2.259-0.862-3.121,0 c-0.862,0.861-0.862,2.259,0,3.12l2.497,2.497C9.972,13.094,11.369,13.094,12.231,12.231z"/></g></g></g></g></svg> ${day}</div>
				<div class="shift"><svg version="1.1" style="width: 10px; height: 10px" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><g><path d="M339.08,374.03c-22.133-35.317-33.832-76.131-33.832-118.03s11.699-82.714,33.832-118.03 c21.545-34.38,52.024-62.245,88.14-80.584l29.316-14.886l-29.316-14.887C391.138,9.291,352.191,0,311.464,0 c-68.38,0-132.667,26.628-181.02,74.98C82.093,123.333,55.464,187.62,55.464,256s26.63,132.667,74.98,181.02 c48.353,48.352,112.64,74.98,181.02,74.98c40.729,0,79.674-9.291,115.755-27.612l29.316-14.887l-29.316-14.886 C391.103,436.276,360.625,408.41,339.08,374.03z"/></g></g></svg> ${night}</div>
			</div>
		`;
			
		calendarElement.appendChild(dayElement);
	}
};

select.addEventListener('input', onSelect)
inputs.forEach(i => i.addEventListener('input', onInput))

initShifts()
renderCalendar();