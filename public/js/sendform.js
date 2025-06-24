$(document).ready(function () {
    $("input[name='telefone']").mask('(00) 00000-0000');
    const forms = document.querySelectorAll('form');

    if (forms.length) {
        forms.forEach((form) => {
            $(form).validate({
                rules: {
                    nome: {
                        required: true,
                        minlength: 2
                    },
                    sobrenome: {
                        required: true
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    telefone: {
                        required: true,
                    },
                    subject: {
                        required: true,
                    },
                    msg: {
                        required: true,
                    }
                },
                messages: {
                    nome: "Insira seu nome.",
                    sobrenome: "Insira seu sobrenome.",
                    email: "Insira seu e-mail",
                    telefone: "Insira seu Whatsapp",
                    subject: "Insira um assunto",
                    msg: "Insira sua mensagem",
                },
                submitHandler: async function (form, event) {
                    event.preventDefault();

                    $(form).find('button[type="submit"]').prop("disabled", true);
                    $(form).find('button[type="submit"]').text("Enviando...");

                    let msg = $(form).find('.form-msg');
                    const formData = new FormData(form);
                    const data = Object.fromEntries(formData);

                    msg.removeClass('success error').text('');
                    
                    fetch(`/api/${data.send}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data)
                    })
                    .then(res => {
                        if (!res.ok) {
                            throw new Error('Erro ao enviar');
                        }

                        return res.json();
                    })
                    .then(response => {
                        if (response.success) {
                            form.reset();
                            msg.addClass('success').text('Formulário enviado com sucesso.');
                        } else {
                            msg.addClass('error').text('Erro ao enviar o formulário.');
                        }
                    })
                    .catch(err => {
                        msg.addClass('error').text('Erro ao enviar o formulário.');
                    }).finally(function () {
                        $(form).find('button[type="submit"]').prop("disabled", false);
                        $(form).find('button[type="submit"]').text("Enviar");
                    }); 
                }
            });
        });
    }
});