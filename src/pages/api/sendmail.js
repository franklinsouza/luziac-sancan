import nodemailer from 'nodemailer';

export const POST = async ({request}) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = await request.json();
    const { type } = body;

    let transporter = nodemailer.createTransport({
      host: import.meta.env.EMAIL_HOST,
      port: import.meta.env.EMAIL_PORT,
      secure: import.meta.env.SECURE_TLS,
      auth: {
        user: import.meta.env.EMAIL_AUTH,
        pass: import.meta.env.PASS_AUTH,
      },
    });

    let message = {
      from: import.meta.env.FROM,
      to: import.meta.env.TO,
      subject: '[SANCAN - Site] - Formulário de contato',
      html: '<h1>Mensagem</h1>'
    };

    if(type == 'modal') {
      const { name, sobrenome, email } = body;
      
      if (!name || !sobrenome || !email) {
        return new Response(
          JSON.stringify({ 
            message: "Por favor, preencha todos os campos do formulário." 
          }),
          { status: 400 }
        );
      }

      message.html += `
        <p><b>Nome</b>: ${name} ${sobrenome}</p>
        <p><b>Email</b>: ${email}</p>`;

    }else if(type == 'contact') {
      const { name, email, subject, msg } = body; 

      if (!name || !email || !subject || !msg) {
        return new Response(
          JSON.stringify({
            message: "Por favor, preencha todos os campos do formulário."
          }),
          { status: 400 }
        );
      }

      message.html += `
        <p><b>Nome</b>: ${name}</p>
        <p><b>Email</b>: ${email}</p>
        <p><b>Assunto</b>: ${subject}</p>
        <p><b>Mensagem</b>: ${msg}</p>`;
    }

    try {
      let mailresult = await transporter.sendMail(message);

      return new Response(
        JSON.stringify({ 
          message: "Mensagem enviada com sucesso!"
        }),
        { status: 200 }
      );
    }catch (error){
      console.log('ERROR', error.response);

      return new Response(
        JSON.stringify({ 
          message: "Erro ao enviar mensagem, por favor tente novamente mais tarde." 
        }),
        { status: 500 }
      );
    }
  }

  return new Response(null, {status: 400});
}