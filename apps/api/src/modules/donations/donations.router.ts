import { Router, Request, Response } from 'express'
import {
  createDonationSchema,
  updateStatusSchema,
  listDonationsQuerySchema,
} from './donations.schema'
import {
  createDonation,
  getDonationByReference,
  listDonations,
  getDonationStats,
  updateDonationStatus,
} from './donations.service'
import {
  sendSuccess,
  sendCreated,
  sendError,
  sendNotFound,
  sendServerError,
} from '../../utils/response'

export const donationsRouter = Router()

// ── POST /api/donations ───────────────────────────────────────────────────────
// Public — submit a new donation
donationsRouter.post('/', async (req: Request, res: Response) => {
  const parsed = createDonationSchema.safeParse(req.body)

  if (!parsed.success) {
    return sendError(res, 'Données invalides', 422, parsed.error.flatten().fieldErrors)
  }

  try {
    const donation = await createDonation(parsed.data)

    // Return the reference and payment instructions based on method
    return sendCreated(res, {
      ...donation,
      instructions: getPaymentInstructions(parsed.data.method, donation.amount, donation.reference),
    }, 'Don enregistré avec succès')
  } catch (err) {
    return sendServerError(res, err)
  }
})

// ── GET /api/donations/stats ──────────────────────────────────────────────────
// Admin — donation statistics
donationsRouter.get('/stats', async (_req: Request, res: Response) => {
  try {
    const stats = await getDonationStats()
    return sendSuccess(res, stats)
  } catch (err) {
    return sendServerError(res, err)
  }
})

// ── GET /api/donations ────────────────────────────────────────────────────────
// Admin — list all donations with filters & pagination
donationsRouter.get('/', async (req: Request, res: Response) => {
  const parsed = listDonationsQuerySchema.safeParse(req.query)

  if (!parsed.success) {
    return sendError(res, 'Paramètres invalides', 422, parsed.error.flatten().fieldErrors)
  }

  try {
    const result = await listDonations(parsed.data)
    return sendSuccess(res, result)
  } catch (err) {
    return sendServerError(res, err)
  }
})

// ── GET /api/donations/:reference ────────────────────────────────────────────
// Public — check a donation status by reference
donationsRouter.get('/:reference', async (req: Request, res: Response) => {
  try {
    const donation = await getDonationByReference(req.params.reference)

    if (!donation) {
      return sendNotFound(res, 'Don')
    }

    return sendSuccess(res, donation)
  } catch (err) {
    return sendServerError(res, err)
  }
})

// ── PATCH /api/donations/:id/status ──────────────────────────────────────────
// Admin — update donation status
donationsRouter.patch('/:id/status', async (req: Request, res: Response) => {
  const parsed = updateStatusSchema.safeParse(req.body)

  if (!parsed.success) {
    return sendError(res, 'Données invalides', 422, parsed.error.flatten().fieldErrors)
  }

  try {
    const donation = await updateDonationStatus(req.params.id, parsed.data)
    return sendSuccess(res, donation, 'Statut mis à jour')
  } catch (err) {
    return sendServerError(res, err)
  }
})

// ── Helpers ───────────────────────────────────────────────────────────────────

function getPaymentInstructions(method: string, amount: number, reference: string) {
  if (method === 'VIREMENT') {
    return {
      type: 'VIREMENT',
      bankName:   'CIH Bank',
      iban:       'MA64 0000 0000 0000 0000 0000 000',   // Replace with real IBAN
      beneficiary: 'Association Sportive Atlas Toubkal Asni',
      amount,
      reference,
      note: `Veuillez indiquer la référence ${reference} dans le motif du virement.`,
    }
  }

  // CARD — placeholder (integrate with a payment gateway like CMI, PayZon, etc.)
  return {
    type: 'CARD',
    reference,
    note: 'Votre demande de don a été enregistrée. Un conseiller vous contactera pour finaliser le paiement par carte.',
  }
}
