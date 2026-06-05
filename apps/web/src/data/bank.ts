/**
 * ASATA bank details for donor wire transfers.
 *
 * Source: Banque Populaire de Marrakech–Béni Mellal · Agence Asni,
 *         official bank attestation provided to the association.
 *
 * A RIB is a *deposit-only* identifier — no one can withdraw money with it,
 * so publishing it on the donation page is standard practice for NGOs.
 *
 * `ribDisplay` is grouped 4-4-4 for human readability;
 * `ribRaw` is the contiguous 24-digit string (what gets copied to the
 * clipboard so it pastes cleanly into bank-form fields).
 */
export const BANK_DETAILS = {
  beneficiary: 'Association Sportive Atlas Toubkal Asni',
  bank:        'Banque Populaire',
  agency:      'Agence Asni',
  ribDisplay:  '1454 7521 1168 4891 7100 0917',
  ribRaw:      '145475211168489171000917',
  swift:       'BCPOMAMC',
}
