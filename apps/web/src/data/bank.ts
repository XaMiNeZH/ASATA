/**
 * ASATA bank details for donor wire transfers.
 *
 * Source: Banque Populaire de Marrakech–Béni Mellal · Agence Asni,
 *         official bank attestation provided to the association.
 *
 * A RIB / IBAN is a *deposit-only* identifier — no one can withdraw money
 * with it, so publishing it on the donation page is standard practice for
 * NGOs taking wire transfers.
 *
 *  - RIB  = 24-digit Moroccan account identifier (domestic transfers).
 *  - IBAN = "MA" + 2 check digits + the RIB. Required by international
 *           senders. Check digits 64 were computed and validated against
 *           the IBAN MOD-97 algorithm (ISO 13616).
 *
 * `*Display` is grouped 4-by-4 for human readability;
 * `*Raw` is the contiguous string (what gets copied to the clipboard so it
 * pastes cleanly into bank-form fields).
 */
export const BANK_DETAILS = {
  beneficiary: 'Association Sportive Atlas Toubkal Asni',
  bank:        'Banque Populaire',
  agency:      'Agence Asni',
  ribDisplay:  '1454 7521 1168 4891 7100 0917',
  ribRaw:      '145475211168489171000917',
  ibanDisplay: 'MA64 1454 7521 1168 4891 7100 0917',
  ibanRaw:     'MA64145475211168489171000917',
  swift:       'BCPOMAMC',
}
