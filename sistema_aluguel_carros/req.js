// (async () => {
//   const hhtp = await fetch("http://localhost:8080/api/carros?acesso=9KP1S4QM", {
//     method: `POST`,
//     headers: {
//       "Content-Type": "application/json",
//     },

//     body: JSON.stringify({
//       id: "1",
//       coluna: "3",
//       novoValor: `vdd`
//     }),
//   });

//   const ers = await hhtp.json()
//   console.log(ers);
  
// })();





(async () => {
  const hhtp = await fetch("http://localhost:8080/api/usuarios", {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      nome: "jwtbrvhgvvghvg",
      email: "ana.jnjygytggtyhj@example.com",
      senha: `gcfccfcfcf6@H`,
      telefone: '11987654321',
      cpf: '76355762086',

    }),
  });

  const ers = await hhtp.json()
  console.log(ers);
  
})();
