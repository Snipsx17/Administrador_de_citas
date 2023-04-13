import { listaCitas } from "../selectores.js";
import { createElement, editarCita, eliminarCita } from "../functions.js";
import Swal from "../sweetalert2/src/sweetalert2.js";

export class UI {
  constructor(citas) {
    this.administraCitas = citas;
  }

  imprimirMensaje(mensaje, tipo = false) {
    const alerta = {
      title: mensaje,
      icon: "",
      confirmButtonText: "Ok",
      confirmButtonColor: "",
      timer: 1500,
    };

    if (tipo === "error") {
      alerta.icon = "error";
      alerta.confirmButtonColor = "#ff291d";
    } else {
      alerta.icon = "success";
      alerta.confirmButtonColor = "#23a127";
    }

    Swal.fire(alerta);
  }

  listarCitas() {
    this.limpiarHTML();

    this.administraCitas.citas.forEach((cita) => {
      const { mascota, propietario, telefono, fecha, hora, sintomas, id } =
        cita;
      const citaDiv = createElement("div");
      citaDiv.classList.add("cita", "p-3");
      citaDiv.innerHTML = `
                <h2 class="card-title font-weight">${mascota}</h2>
                <p><span class="font-weight-bolder">Propietario: </span>${propietario}.</p>
                <p><span class="font-weight-bolder">Fecha: </span>${fecha}.</p>
                <p><span class="font-weight-bolder">Telefono: </span>${telefono}.</p>
                <p><span class="font-weight-bolder">Hora: </span>${hora}.</p>
                <p><span class="font-weight-bolder">Sintomas: </span>${sintomas}.</p>
            `;
      citaDiv.dataset.id = id;

      const btnEliminar = createElement("button");
      btnEliminar.classList.add("btn", "btn-danger", "mr-2");
      btnEliminar.innerHTML = `Eliminar <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
            </svg>`;
      btnEliminar.onclick = () => eliminarCita(id);

      const btnEditar = createElement("button");
      btnEditar.classList.add("btn", "btn-info");
      btnEditar.innerHTML = `Editar <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
            </svg>`;
      btnEditar.onclick = () => editarCita(cita);

      citaDiv.appendChild(btnEliminar);
      citaDiv.appendChild(btnEditar);
      listaCitas.appendChild(citaDiv);
    });
  }

  limpiarHTML() {
    while (listaCitas.firstChild) {
      listaCitas.removeChild(listaCitas.firstChild);
    }
  }
}
