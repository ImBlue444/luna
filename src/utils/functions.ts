export function formattaNumero(numero: number): string {
    // Formatta il numero con punteggiatura
    const numeroFormattato: string = numero.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

    // Aggiunge il simbolo dell'euro
    const numeroConValuta: string = `${numeroFormattato} `;

    return numeroConValuta;
}