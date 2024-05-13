export function formattaNumero(numero: number): string {
  // Formatta il numero con punteggiatura
  const numeroFormattato: string = numero
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");

  // Aggiunge il simbolo dell'euro
  const numeroConValuta: string = `${numeroFormattato} `;

  return numeroConValuta;
}

export function differenzaDate(data1: string, data2: string): number {
  const millisecondiAlGiorno = 1000 * 60 * 60 * 24;
  const differenza = new Date(data2).getTime() - new Date(data1).getTime();
  return Math.floor(differenza / millisecondiAlGiorno);
}
