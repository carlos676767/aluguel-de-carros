Desculpe pela confusão anterior! Vou revisar as rotas e ajustar a documentação de acordo com as suas instruções.

Aqui está a versão corrigida da documentação da API:

---

## 1. Acesso aos Usuários

**Rota:**  
`GET http://localhost:8080/api/usuarios?acesso=senha`

**Descrição:**  
Esta rota permite que administradores acessem a lista de todos os usuários cadastrados no sistema.

**Parâmetros:**
- `acesso`: (string) Chave de acesso para autenticação.

---

## 2. Cadastro de Carros

**Rota:**  
`POST http://localhost:8080/api/carros?acesso=senha`

**Descrição:**  
Esta rota é utilizada para adicionar um novo carro ao sistema.

**Parâmetros:**
- `acesso`: (string) Chave de acesso para autenticação.

**Corpo da Requisição:**  
O corpo deve conter as informações do carro a ser cadastrado (por exemplo, marca, modelo, ano, etc.).

---

## 3. Exclusão de Usuários

**Rota:**  
`DELETE http://localhost:8080/api/usuariosDelete/{id}?acesso=senha`

**Descrição:**  
Esta rota permite que administradores apaguem um usuário específico do sistema.

**Parâmetros:**
- `id`: (integer) O ID do usuário a ser excluído.
- `acesso`: (string) Chave de acesso para autenticação.

---

## 4. Exclusão de Carros

**Rota:**  
`DELETE http://localhost:8080/api/carros/{id}?acesso=senha`

**Descrição:**  
Esta rota permite que administradores excluam um carro específico do sistema.

**Parâmetros:**
- `id`: (integer) O ID do carro a ser excluído.
- `acesso`: (string) Chave de acesso para autenticação.

---

## 5. Atualização de Carros

**Rota:**  
`PUT http://localhost:8080/api/carros?acesso=senha`

**Descrição:**  
Esta rota é utilizada para atualizar as informações de um carro existente no sistema.

**Parâmetros:**
- `acesso`: (string) Chave de acesso para autenticação.

**Corpo da Requisição:**  
O corpo deve conter os seguintes campos:
- `id`: (string) O ID do carro a ser atualizado.
- `coluna`: (string) O nome da coluna a ser atualizada.
- `novoValor`: (string) O novo valor a ser atribuído à coluna.

**Exemplo de Corpo da Requisição:**
```json
{
    "id": "1",
    "coluna": "modelo",
    "novoValor": "Fusca"
}
```

---

## 6. Cadastro de Usuário

**Rota:**  
`POST http://localhost:8080/api/usuarios`

**Descrição:**  
Esta rota é utilizada para cadastrar um novo usuário no sistema.

**Parâmetros:**
- `nome`: (string) Nome completo do usuário.
- `email`: (string) E-mail do usuário.
- `senha`: (string) Senha do usuário.
- `telefone`: (string) Número de telefone do usuário.
- `cpf`: (string) CPF do usuário.
- `code`: (string) Código de validação (gerado para validação do cadastro).

---

## 7. Confirmação de Código

**Rota:**  
`POST http://localhost:8080/api/codigoConfirmar`

**Descrição:**  
Esta rota é utilizada para confirmar o código de validação enviado para o e-mail do usuário após o cadastro.

**Parâmetros:**
- `codigo`: (string) Código enviado para o e-mail do usuário.

---

## 8. Criação de Pagamento

**Rota:**  
`POST http://localhost:8080/api/pagamentos`

**Descrição:**  
Esta rota é utilizada para criar um pagamento, passando os nomes dos carros associados ao pagamento.

**Parâmetros:**
- `carros`: (array de strings) Lista de nomes dos carros envolvidos no pagamento.

---

## 9. Webhook de Notificação de Pagamento

**Rota:**  
`POST http://localhost:8080/webhook`

**Descrição:**  
Esta rota é usada para receber notificações de pagamento do Mercado Pago. Quando um pagamento é realizado, o Mercado Pago chama esta rota automaticamente.

**Corpo da Requisição:**  
O corpo contém informações detalhadas sobre o pagamento, como o status da transação, ID da transação, etc.

---

## 10. Troca de Senha

**Rota:**  
`POST http://localhost:8080/api/trocarSenha`

**Descrição:**  
Esta rota serve para permitir que o usuário troque sua senha.

**Fluxo de Troca de Senha:**
1. O usuário acessa uma página onde deverá inserir o seu e-mail.
2. O sistema gera um token JWT com o e-mail do usuário e o envia ao front-end.
3. O front-end envia esse token para a rota `/api/verificarEmail` para validar o e-mail.
4. O sistema valida o token e, caso esteja correto, o usuário pode prosseguir para inserir uma nova senha.
5. Após a verificação e inserção da nova senha, a senha do usuário será atualizada no banco de dados.

---

## 11. Verificação de E-mail

**Rota:**  
`POST http://localhost:8080/api/verificarEmail`

**Descrição:**  
Esta rota é responsável por validar o token JWT enviado pelo front-end após a solicitação de troca de senha. O token contém o e-mail do usuário e é necessário para garantir que a solicitação de troca de senha é legítima.

**Parâmetros:**
- `token`: (string) Token JWT gerado após a solicitação de troca de senha.

**Fluxo de Verificação:**
1. O front-end envia o token JWT para esta rota.
2. O sistema valida o token e verifica se o e-mail corresponde ao usuário.
3. Se o token for válido, o sistema permitirá que o usuário insira uma nova senha.

---

### Resumo do Fluxo de Troca de Senha:

1. **Solicitação de Troca de Senha:** O usuário envia seu e-mail para a rota `/api/trocarSenha`.
2. **Geração de Token:** O sistema envia um token JWT com o e-mail do usuário.
3. **Verificação do Token:** O front-end envia o token para a rota `/api/verificarEmail`.
4. **Autorização para Troca de Senha:** O sistema verifica o token e autoriza a troca de senha.
5. **Troca de Senha:** O usuário insere a nova senha, que é atualizada no sistema.

---

