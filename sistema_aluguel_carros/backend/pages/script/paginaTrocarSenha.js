class Senha {
  static #button = document.querySelector("button");
  static #p = document.querySelector("p");
  static #senhaNova = document.getElementById("senhaNova")
  static #confirmarSenha = document.getElementById("confirmarSenha")

  static #valueNavegedor() {
    return location.href.split("=")[1];
  }

  static #objectSenhas() {
    return {
      senha: this.#senhaNova.value,
      confirmarSenha: this.#confirmarSenha.value,
     
    };
  }

  static async httpRequest() {
 
    try {
      const data = await fetch("http://localhost:8080/api/trocarSenha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${this.#valueNavegedor()}`,
        },
        body: JSON.stringify(this.#objectSenhas()),
      });

      const res = await data.json();
      console.log(res);
      
      console.log(res);
      
    } catch (error) {

    }
  }

  static buttonEvent(){
    this.#button.addEventListener('click',(e) => {
        e.preventDefault()
        this.httpRequest()
    })
  }
}

Senha.buttonEvent();
