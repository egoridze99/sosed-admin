document.querySelector('#send-sms')
    .addEventListener('submit', event => {
        event.preventDefault();

        const formData = Object.fromEntries(new FormData(event.target).entries());

        const url = '/sms/send';
        const options = {
            method : "POST",
            body : JSON.stringify(formData),
            headers : {
                'content-type' : 'application/json'
            }
        };

        fetch(url, options)
            .then(res => res.json())
            .then(data => {
                switch (data.status) {
                    case 'ok':
                        $('#good-modal').modal('toggle');
                        break;
                    default:
                        $('badModal').modal('toggle');
                        break;
                }
            })
            .catch(err => console.error(err));
    });