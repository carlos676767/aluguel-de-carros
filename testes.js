class Carros {
  static button = document.querySelector("button");
  static modelo = document.getElementById("modelo");
  static marca = document.getElementById("marca");
  static precoDiaria = document.getElementById("precoDiaria");
  static disponibilidade = document.getElementById("disponibilidade");
  static placa = document.getElementById("placa");
  static ano = document.getElementById("ano");
  static img = document.getElementById("imagem");

  static objectValues() {
    const formdata = new FormData();
    formdata.append("file", this.img.files[0]);
    formdata.append("modelo", this.modelo.value);
    formdata.append("marca", this.marca.value);
    formdata.append('precoDiaria', this.precoDiaria.value)
    formdata.append('disponibilidade', this.disponibilidade.value)
    formdata.append('PLACA', this.placa.value)
    formdata.append('ANO', this.ano.value)
    alert(this.ano.value)
    return formdata;
  }

  static async httpRequest(item) {
    try {
      const request = await fetch("http://localhost:8080/api/carros", {
        method: "POST",
        body: this.objectValues(),
      });
      const response = await request.json()
      console.log(response);
      
    } catch (error) {

    }
  }
  static buttonEvent() {
    this.button.addEventListener("click", (e) => {
        this.httpRequest()
    });
  }
}

Carros.buttonEvent()
