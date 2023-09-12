const { v4: uuidv4 } = require('uuid');

class Tarea {
    constructor(desc) {
        this.id = uuidv4();
        this.desc = desc;
        this.completadoEn = null;
    }
    completarTarea() {
        this.completadoEn = new Date().toISOString();
    }
}

module.exports = Tarea;
