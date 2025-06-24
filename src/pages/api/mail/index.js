import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST = async ({ request }) => {
    if (request.headers.get("Content-Type") === "application/json") {
        const body = await request.json();



        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev', //contato@sancan.com.br
            to: 'frankrsouza@gmail.com',
            subject:  body.subject ? body.subject : 'Formulário de contato',
            html: `<strong>Nome: </strong>${body.nome} ${body.sobrenome ? body.sobrenome : ''}<br />
                   <strong>Email: </strong>${body.email}<br />
                   ${body.msg ? `<strong>Mensagem: </strong>${body.msg}<br />` : ''}`
        });

        if (error) {
            return console.log(error);
        }

        return new Response(
            JSON.stringify({
                success: true
            }),
            {
                status: 200,
            },
        );
    }
}