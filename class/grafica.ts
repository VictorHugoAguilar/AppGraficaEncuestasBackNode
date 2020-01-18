/**
 * Este código es del backend para la gráfica de encuestas en tiempo real
 */

export class GraficaData {

    private labels: string[] = [];
    private valores: number[] = [0, 0, 0, 0];

    constructor() {
    }

    setLabels(labels: string[]) {
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

    incrementarValor(opcion: number, valor: number) {
        if (opcion <= this.valores.length) {
            this.valores[opcion - 1] += valor;
        }
        return this.getDataGrafica();
    }

}