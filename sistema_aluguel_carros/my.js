(async() => {
    const data = await fetch('http://localhost:8080/api/codigoConfirmar', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ codigo: '2643221594628344833' }),
    })
    const re4sr = await data.json()
    console.log(re4sr);
    
})()

