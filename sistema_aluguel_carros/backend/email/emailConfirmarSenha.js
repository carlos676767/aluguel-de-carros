
const codigoEmail = (codigo) => {
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> de Confirmação</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <h2 style="text-align: center; color: #4CAF50;">Confirmação de Código</h2>
        <p>Olá,</p>
        <p>Obrigado por se registrar. Aqui está seu código de confirmação:</p>
        <div style="text-align: center; margin: 20px;">
            <h1 style="font-size: 36px; color: #4CAF50;">${codigo}</h1>
        </div>
        <p>Por favor, insira o código acima para completar sua confirmação.</p>
        <p style="color: #777;">Este código é válido por 3 minutos.</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="text-align: center; color: #777;">Se você não se registrou, ignore este e-mail.</p>
        <p style="text-align: center;">&copy; 2024 Sua Empresa</p>
    </div>
</body>
</html>
`
}

module.exports = codigoEmail