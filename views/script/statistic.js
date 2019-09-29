function drawTransactions(transactions) {
    transactions = transactions.reverse();
    const forRender = [];
    const transactionsBlock = document.querySelector('.wrapper');
    transactionsBlock.innerHTML = '';
  
    transactions.forEach(item => {
      const row = document.createElement('div');
      row.className = 'row border-bottom';
  
      const colName = document.createElement('div');
      colName.className = 'col-md-2';
      const pName = document.createElement('p');
      pName.className = 'mt-3 black';
      pName.textContent = item.saler.name + ' ' + item.saler.surname;
      colName.appendChild(pName);
      row.appendChild(colName);
  
      const colDate = document.createElement('div');
      colDate.className = 'col-md-2';
      const pDate = document.createElement('p');
      pDate.className = 'mt-3 black';
      pDate.textContent = item.dateString;
      colDate.appendChild(pDate);
      row.appendChild(colDate);
  
      const colLitres = document.createElement('div');
      colLitres.className = 'col-md-2';
      const pLitres = document.createElement('p');
      pLitres.className = 'mt-3 black';
      pLitres.textContent = item.litres;
      colLitres.appendChild(pLitres);
      row.appendChild(colLitres);
  
      const colSum = document.createElement('div');
      colSum.className = 'col-md-2';
      const pSum = document.createElement('p');
      pSum.className = 'mt-3 black';
      pSum.textContent = item.totalSum;
      colSum.appendChild(pSum);
      row.appendChild(colSum);
      
      const colBuyer = document.createElement('div');
      colBuyer.className = 'col-md-2';
      const pBuyer = document.createElement('p');
      pBuyer.className = 'mt-3 black';
      pBuyer.textContent = item.telefone;
      colBuyer.appendChild(pBuyer);
      row.appendChild(colBuyer);

      const colFree = document.createElement('div');
      colFree.className = 'col-md-2';
      const pFree = document.createElement('p');
      pFree.className = 'mt-3 black';
      pFree.textContent = item.getFree === true ? 'Да' : 'Нет';
      colFree.appendChild(pFree);
      row.appendChild(colFree);
  
      forRender.push(row);
    });
  
    forRender.forEach(item => {
      transactionsBlock.appendChild(item);
    })
  }

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
                console.log(data);
                drawTransactions(data);
            })
            .catch(err => console.error(err));

    });
});