export function formatMoney(value) {
    /*
     * Voir la documentation de la classe NumberFormat :
     * https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/NumberFormat
     */
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
}