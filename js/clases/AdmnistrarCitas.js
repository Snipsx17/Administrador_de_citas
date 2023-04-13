export class AdmnistrarCitas {
  constructor(objCita) {
    this.citas = [];
  }

  agregarCita(cita) {
    cita.id = Date.now();
    this.citas = [...this.citas, cita];
  }

  eliminarCita(id) {
    this.citas = this.citas.filter((cita) => cita.id != id);
  }

  editaCita(citaEditada) {
    this.citas = this.citas.map((cita) =>
      cita.id === citaEditada.id ? citaEditada : cita
    );
  }
}
