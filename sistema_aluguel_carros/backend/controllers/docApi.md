
# Documentação da API

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
`PUT http://localhost:8080/api/carros?acesso=key`

**Descrição:**  
Esta rota é utilizada para atualizar as informações de um carro existente no sistema.

**Parâmetros:**
- `acesso`: (string) Chave de acesso para autenticação.

**Corpo da Requisição:**  
O corpo deve conter os seguintes campos:
- `id`: (string) O ID do carro a ser atualizado.
- `coluna`: (string) O nome da coluna a ser atualizada.
- `novoValor`: (string) O novo valor a ser atribuído à coluna.

### Exemplo do Corpo da Requisição:
```json
{
    "id": "1",
    "coluna": "3",
    "novoValor": "vdd"
}
```



### cadastrar usuario###

Rota /api/usuarios , valores para enviar nome, email, senha, telefone, cpf, code apos isso usar a rota /api/codigoConfirmar com o objeto codigo.
envie no objeto o nome codigo.


rota /pagamentos cria um pagamento passando o nome dos carros
/webhook para notificaoes do mercado pago de pagamento.



//    http://localhost:8080/api/trocarSenha essa rota serve para trocar a senha, veja o arquivo paginaTrocarSenha.js


