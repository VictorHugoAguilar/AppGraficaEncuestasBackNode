"use strict";
/**
 * Este código es del backend para la gráfica de encuestas en tiempo real
 */
Object.defineProperty(exports, "__esModule", { value: true });
class GraficaData {
    constructor() {
        this.labels = [];
        this.valores = [0, 0, 0, 0];
    }
    setLabels(labels) {
        this.labels = labels;
    }
    getDataGrafica() {
        return [
            {
                data: this.valores,
                label: 'Preguntas'
            }
        ];
    }
    incrementarValor(opcion, valor) {
        if (opcion <= this.valores.length) {
            this.valores[opcion - 1] += valor;
        }
        return this.getDataGrafica();
    }
}
exports.GraficaData = GraficaData;
