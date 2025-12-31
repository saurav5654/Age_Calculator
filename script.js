document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.age-calculator-form');
    const dayInput = document.getElementById('day');
    const monthInput = document.getElementById('month');
    const yearInput = document.getElementById('year');

    const dayError = document.getElementById('day-error');
    const monthError = document.getElementById('month-error');
    const yearError = document.getElementById('year-error');

    const yearsResult = document.getElementById('years-result');
    const monthsResult = document.getElementById('months-result');
    const daysResult = document.getElementById('days-result');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default form submission

        // Reset errors
        dayError.textContent = '';
        monthError.textContent = '';
        yearError.textContent = '';
        dayInput.classList.remove('error-border');
        monthInput.classList.remove('error-border');
        yearInput.classList.remove('error-border');
        dayInput.previousElementSibling.classList.remove('error-label');
        monthInput.previousElementSibling.classList.remove('error-label');
        yearInput.previousElementSibling.classList.remove('error-label');


        let isValid = true;
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth() + 1; // getMonth() is 0-indexed
        const currentDay = today.getDate();

        let day = parseInt(dayInput.value);
        let month = parseInt(monthInput.value);
        let year = parseInt(yearInput.value);

        // Check for empty fields
        if (!day) {
            dayError.textContent = 'This field is required';
            dayInput.classList.add('error-border');
            dayInput.previousElementSibling.classList.add('error-label');
            isValid = false;
        }
        if (!month) {
            monthError.textContent = 'This field is required';
            monthInput.classList.add('error-border');
            monthInput.previousElementSibling.classList.add('error-label');
            isValid = false;
        }
        if (!year) {
            yearError.textContent = 'This field is required';
            yearInput.classList.add('error-border');
            yearInput.previousElementSibling.classList.add('error-label');
            isValid = false;
        }

        // Check day range
        if (day && (day < 1 || day > 31)) {
            dayError.textContent = 'Must be a valid day';
            dayInput.classList.add('error-border');
            dayInput.previousElementSibling.classList.add('error-label');
            isValid = false;
        }

        // Check month range
        if (month && (month < 1 || month > 12)) {
            monthError.textContent = 'Must be a valid month';
            monthInput.classList.add('error-border');
            monthInput.previousElementSibling.classList.add('error-label');
            isValid = false;
        }

        // Check year in future
        if (year && year > currentYear) {
            yearError.textContent = 'Must be in the past';
            yearInput.classList.add('error-border');
            yearInput.previousElementSibling.classList.add('error-label');
            isValid = false;
        } else if (year && year === currentYear && month && month > currentMonth) {
            yearError.textContent = 'Must be in the past';
            yearInput.classList.add('error-border');
            yearInput.previousElementSibling.classList.add('error-label');
            isValid = false;
        } else if (year && year === currentYear && month && month === currentMonth && day && day > currentDay) {
            yearError.textContent = 'Must be in the past';
            yearInput.classList.add('error-border');
            yearInput.previousElementSibling.classList.add('error-label');
            isValid = false;
        }

        // Check for invalid date (e.g., 31/04)
        if (day && month && year && isValid) { // Only proceed if basic checks passed
            const inputDate = new Date(year, month - 1, day); // Month is 0-indexed
            // Check if the date object's components match the input, accounting for JS date auto-correction
            if (inputDate.getMonth() + 1 !== month || inputDate.getDate() !== day || inputDate.getFullYear() !== year) {
                dayError.textContent = 'Must be a valid date';
                dayInput.classList.add('error-border');
                monthInput.classList.add('error-border');
                yearInput.classList.add('error-border');
                dayInput.previousElementSibling.classList.add('error-label');
                monthInput.previousElementSibling.classList.add('error-label');
                yearInput.previousElementSibling.classList.add('error-label');
                isValid = false;
            }
        }

        if (isValid) {
            const birthDate = new Date(year, month - 1, day);

            let years = today.getFullYear() - birthDate.getFullYear();
            let months = today.getMonth() - birthDate.getMonth();
            let days = today.getDate() - birthDate.getDate();

            // Adjust for negative months or days
            if (days < 0) {
                months--;
                // Get days in the previous month
                const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
                days += prevMonth.getDate();
            }
            if (months < 0) {
                years--;
                months += 12;
            }

            yearsResult.textContent = years;
            monthsResult.textContent = months;
            daysResult.textContent = days;
        } else {
            yearsResult.textContent = '--';
            monthsResult.textContent = '--';
            daysResult.textContent = '--';
        }
    });
});