export const post = async ({ request }) => {
  const dados = await request.formData();
  // const nome = dados.get("nome");
  // const email = dados.get("email");
  // const mensagem = dados.get("mensagem");

  console.log(dados)

  // Valide os dados - você provavelmente vai querer fazer mais do que isso
  if (!nome || !email || !mensagem) {
    // return new Response(
    //   JSON.stringify({
    //     message: "Preencha todos os campos obrigatórios",
    //   }),
    //   { status: 400 }
    // );
  }

  // Faça algo com os dados, e então retorne uma resposta de sucesso
  // return new Response(
  //   JSON.stringify({
  //     message: "Sucesso!"
  //   }),
  //   { status: 200 }
  // );
};