(async() => {
    const data = await fetch('http://localhost:8080/api/codigoConfirmar', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ codigo: 4324484635141961 }),
    })
})()