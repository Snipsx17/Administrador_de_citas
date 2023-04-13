import { AdmnistrarCitas } from "./clases/AdmnistrarCitas.js";
import { UI } from "./clases/UI.js";
import {
  formulario,
  inputPropietario,
  inputMascota,
  inputFecha,
  inputHora,
  inputSintomas,
  inputTelefono,
} from "./selectores.js";

const administraCitas = new AdmnistrarCitas();
const ui = new UI(administraCitas);

let objCita = {
  mascota: "",
  propietario: "",
  telefono: "",
  fecha: "",
  hora: "",
  sintomas: "",
  id: "",
};

let editandoCita = false;

export function createElement(elemento) {
  return document.createElement(elemento);
}

export function resetCita() {
  objCita.mascota = "";
  objCita.propietario = "";
  objCita.telefono = "";
  objCita.fecha = "";
  objCita.hora = "";
  objCita.sintomas = "";
  objCita.id = "";
}

export function eliminarCita(id) {
  Swal.fire({
    title: "¿Estas seguro que deseas eliminar esta cita?",
    showCancelButton: true,
    confirmButtonText: "SI",
    confirmButtonColor: "#23a127",
    showCancelButton: true,
    cancelButtonText: "NO",
    cancelButtonColor: "#ff291d",
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire({
        icon: "success",
        title: "Cita Borrada",
        showConfirmButton: false,
        timer: 1500,
      });
      administraCitas.eliminarCita(id);
      ui.listarCitas();
    }
  });
}

export function editarCita(cita) {
  const { propietario, mascota, telefono, fecha, hora, sintomas, id } = cita;

  inputMascota.value = mascota;
  inputPropietario.value = propietario;
  inputTelefono.value = telefono;
  inputFecha.value = fecha;
  inputHora.value = hora;
  inputSintomas.value = sintomas;

  objCita.mascota = mascota;
  objCita.propietario = propietario;
  objCita.telefono = telefono;
  objCita.fecha = fecha;
  objCita.hora = hora;
  objCita.sintomas = sintomas;
  objCita.id = id;

  formulario.querySelector('button[type="submit"]').textContent = "Editar Cita";

  editandoCita = true;
}

export function datoCita(e) {
  objCita[e.target.id] = e.target.value;
}

export function validaCita(e) {
  e.preventDefault();
  const { mascota, propietario, telefono, fecha, hora, sintomas } = objCita;

  console.log(objCita)
  if (!mascota || !propietario || !telefono || !fecha || !hora || !sintomas) {
    ui.imprimirMensaje("Debe rellenar todos los campos", "error");
    return;
  }

  if (editandoCita) {
    administraCitas.editaCita({ ...objCita }); // se pasa una copia
    ui.imprimirMensaje("Cita editada correctamente!");
    formulario.querySelector('button[type="submit"]').textContent =
      "Crear Cita";
    editandoCita = false;
  } else {
    administraCitas.agregarCita({ ...objCita }); // se pasa una copia
    ui.imprimirMensaje("Cita agregada correctamente!");
  }

  ui.listarCitas(administraCitas);
  formulario.reset();
  resetCita();
}
