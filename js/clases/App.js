import {
  inputMascota,
  inputTelefono,
  inputPropietario,
  inputHora,
  inputFecha,
  inputSintomas,
  formulario,
} from "../selectores.js";

import { datoCita, validaCita } from "../functions.js";

class App {
  constructor() {
    this.initApp();
  }

  initApp() {
    listeners();
    function listeners() {
      inputMascota.addEventListener("input", datoCita);
      inputTelefono.addEventListener("input", datoCita);
      inputPropietario.addEventListener("input", datoCita);
      inputHora.addEventListener("input", datoCita);
      inputFecha.addEventListener("input", datoCita);
      inputSintomas.addEventListener("input", datoCita);
      formulario.addEventListener("submit", validaCita);
    }
  }
}

export default App;
