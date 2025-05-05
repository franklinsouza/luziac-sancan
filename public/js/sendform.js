const btn = document.querySelectorAll('.send');

btn.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
        e.preventDefault();
        const form = btn.closest('form');
        const fatherForm = btn.closest('.form-group');
        const status = fatherForm.querySelector('.status');
        const type = btn.dataset.type

        status.innerText = '';
        let validate = true;
        let data = {};

        if(type == 'modal') {
            let name = form.querySelector('[name="name"]').value;
            let sobrenome = form.querySelector('[name="sobrenome"]').value;
            let email = form.querySelector('[name="email"]').value;

            if(!name || !sobrenome || !email) {
                validate = false;
            }else {
                data = {type, name, sobrenome, email}
            }
        }else if(type == 'contact') {
            let name = form.querySelector('[name="name"]').value;
            let email = form.querySelector('[name="email"]').value;
            let subject = form.querySelector('[name="subject"]').value;
            let msg = form.querySelector('[name="msg"]').value;

            if(!name || !email || !subject || !msg) {
                validate = false;
            }else {
                data = {type, name, email, subject, msg}
            }
        }

        if(!validate) {
            status.innerText = 'Por favor, preencha todos os campos do formulário.';
            return; 
        }

        btn.disabled = true;
        btn.innerHTML = 'ENVIANDO...';

        let response = await sendmail(data);
        
        if (response.ok) {
            response = await response.json();
            status.innerText = response.message;
            
            form.reset();
            btn.innerHTML = 'ENVIAR';
            btn.disabled = false;
        }

    });
});

const sendmail = async (data) => {
    try {
        const req  = await fetch("/api/sendmail", {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        return req;

    } catch (error) {
        console.log(error);
    }
}