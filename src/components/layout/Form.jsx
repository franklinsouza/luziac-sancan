import React from 'react';
import { useState } from "react";

export default function Form() {
  const [respostaMensagem, setRespostaMensagem] = useState("");

  async function submit(e) {
    e.preventDefault();
    // const formData = new FormData(e.target);
    // const resposta = await fetch("/api/feedback", {
    //   method: "POST",
    //   body: formData,
    // });
    // const dados = await resposta.json();
    // if (dados.mensagem) {
    //   setRespostaMensagem(dados.mensagem);
    // }
  }

  return (
    <form onSubmit={submit} id="sales-specialist-form">
      <label>
        Nome
        <input type="text" id="nome" name="nome" />
      </label>
      <label>
        Email
        <input type="email" id="email" name="email" />
      </label>
      <label>
        Mensagem
        <textarea id="mensagem" name="mensagem" />
      </label>
      <button>Enviar</button>
      {respostaMensagem && <p>{respostaMensagem}</p>}
    </form>
  );
}