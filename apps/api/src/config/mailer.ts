import nodemailer from 'nodemailer'
import { env } from './env'

// ── Transporter ───────────────────────────────────────────────────────────────

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: env.GMAIL_USER,
    pass: env.GMAIL_APP_PASSWORD,
  },
})

// ── Send contact notification email ──────────────────────────────────────────

interface ContactEmailPayload {
  firstName:  string
  lastName:   string
  email:      string
  phone?:     string
  subject:    string
  message:    string
  receivedAt: string
}

export async function sendContactEmail(data: ContactEmailPayload) {
  if (!env.GMAIL_USER || !env.GMAIL_APP_PASSWORD) {
    console.warn('⚠️  Email not configured — skipping send (set GMAIL_USER & GMAIL_APP_PASSWORD)')
    return
  }

  const subjectLabels: Record<string, string> = {
    adhesion:    'Adhésion à un club',
    partenariat: 'Partenariat / Sponsoring',
    evenement:   'Organisation d\'événement',
    information: 'Demande d\'information',
    presse:      'Presse / Médias',
    autre:       'Autre',
  }

  const subjectLabel = subjectLabels[data.subject] ?? data.subject

  await transporter.sendMail({
    from:    `"ASATA Website" <${env.GMAIL_USER}>`,
    to:      env.CONTACT_RECEIVER,
    replyTo: data.email,
    subject: `[ASATA Contact] ${subjectLabel} — ${data.firstName} ${data.lastName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">

        <div style="background: linear-gradient(135deg, #1565C0, #0D47A1); padding: 28px 32px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 22px;">📩 Nouveau message — ASATA</h1>
          <p style="color: rgba(255,255,255,0.75); margin: 6px 0 0; font-size: 14px;">${data.receivedAt}</p>
        </div>

        <div style="background: #f8f9fb; padding: 28px 32px; border: 1px solid #e3f2fd; border-top: none; border-radius: 0 0 12px 12px;">

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 13px; width: 120px;">Nom complet</td>
              <td style="padding: 8px 0; font-weight: bold; font-size: 14px;">${data.firstName} ${data.lastName}</td>
            </tr>
            <tr style="border-top: 1px solid #e3f2fd;">
              <td style="padding: 8px 0; color: #666; font-size: 13px;">Email</td>
              <td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${data.email}" style="color: #1565C0;">${data.email}</a></td>
            </tr>
            ${data.phone ? `
            <tr style="border-top: 1px solid #e3f2fd;">
              <td style="padding: 8px 0; color: #666; font-size: 13px;">Téléphone</td>
              <td style="padding: 8px 0; font-size: 14px;">${data.phone}</td>
            </tr>` : ''}
            <tr style="border-top: 1px solid #e3f2fd;">
              <td style="padding: 8px 0; color: #666; font-size: 13px;">Sujet</td>
              <td style="padding: 8px 0; font-size: 14px;">
                <span style="background: #e3f2fd; color: #1565C0; padding: 3px 10px; border-radius: 20px; font-size: 12px; font-weight: bold;">${subjectLabel}</span>
              </td>
            </tr>
          </table>

          <div style="background: white; border-left: 4px solid #1565C0; border-radius: 8px; padding: 16px 20px;">
            <p style="color: #666; font-size: 12px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
            <p style="margin: 0; font-size: 15px; line-height: 1.7; color: #333; white-space: pre-wrap;">${data.message}</p>
          </div>

          <p style="margin: 20px 0 0; font-size: 13px; color: #aaa; text-align: center;">
            Répondez directement à cet email pour contacter ${data.firstName} — Association Sportive Atlas Toubkal Asni
          </p>
        </div>
      </div>
    `,
  })
}
