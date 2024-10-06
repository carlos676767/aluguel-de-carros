(async () => {
  const hhtp = await fetch("http://localhost:8080/api/carros?acesso=9KP1S4QM", {
    method: `PUT`,
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      id: "1",
      coluna: "3",
      novoValor: `vdd`
    }),
  });

  const ers = await hhtp.json()
  console.log(ers);
  
})();
