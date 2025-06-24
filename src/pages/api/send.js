import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {

    console.log(resend);

   /* resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'frankrsouza@gmail.com',
      subject: 'Hello World',
      html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
    });
*/

    const body = await request.json();

    const payloadCrm = {
      nome: body.nome,
      email: body.email,
      telefone: body.telefone,
      idempreendimento: body.idempreendimento,
      permitir_alteracao: true,
      origem: 'SI',
      tags: ['SEM_SDR']
    }

    try {
      const response = await fetch('https://sancan.cvcrm.com.br/api/cvio/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          token: '211bc1f1c009cc143ba7f863fa466cd3c7a6efb9'
        },
        body: JSON.stringify(payloadCrm)
      });

      if (!response.ok) throw error;

      const result = await response.json();

      return new Response(
        JSON.stringify({
          success: true,
          result
        }),
        {
          status: 200,
        },
      );

    } catch (error) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Erro no envio.'
        }),
        {
          status: 400,
        },
      );
    }
  }
};