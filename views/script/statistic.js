$(function() {
    $('input[name="selectDay"]').daterangepicker({
        singleDatePicker: true,
        locale: {
            format: 'DD.MM.YYYY',
            daysOfWeek: [
                "Вс",
                "Пн",
                "Вт",
                "Ср",
                "Чт",
                "Пт",
                "Сб",
            ],
            monthNames: [
                "Январь",
                "Февраль",
                "Март",
                "Апрель",
                "Май",
                "Июнь",
                "Июль",
                "Август",
                "Сентябрь",
                "Октябрь",
                "Ноябрь",
                "Декабрь"
            ],
            firstDay : '1'
        },
        minYear: 2019,
        maxYear: parseInt(moment().format('YYYY'),10)
    }, function(start) {
        const date = start._d;

        const url = '/statistic/day';
        const options = {
            method : 'POST',
            body : JSON.stringify({date}),
            headers : {
                'content-type' : 'application/json'
            }
        };
        console.log(date);
        fetch(url, options)
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
            .catch(err => console.error(err));

    });
});

console.log('hui');