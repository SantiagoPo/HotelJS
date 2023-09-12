const Tarea = require('./tarea');

class Tareas {
    constructor() {
        this._listado = {};
    }

    crearTarea(desc = '', completa = false) {
        const tarea = new Tarea(desc);
        tarea.completadoEn = completa ? new Date().toISOString() : null;
        const clave = tarea.id;
        this._listado[clave] = tarea;
    }

    listarTareas() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    }

    listarTareasCompletas() {
        return Object.values(this._listado).filter(tarea => tarea.completadoEn !== null);
    }

    listarTareasPendientes() {
        return Object.values(this._listado).filter(tarea => tarea.completadoEn === null);
    }

    borrarTarea(desc) {
        const tarea = Object.values(this._listado).find(tarea => tarea.desc === desc);
        if (tarea) {
            delete this._listado[tarea.id];
        }
        return tarea; 
    }

    completarTarea(desc) {
        const tarea = Object.values(this._listado).find(tarea => tarea.desc === desc);
        if (tarea) {
            tarea.completadoEn = new Date().toISOString();
        }
        return tarea;
    }
}

module.exports = Tareas;
