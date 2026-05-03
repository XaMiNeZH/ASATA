import { prisma }            from '../../config/database'
import { sendContactEmail }  from '../../config/mailer'
import type { CreateContactInput } from './contact.schema'

// ── Create & persist a contact message, then email ───────────────────────────

export async function createContact(data: CreateContactInput) {
  const message = await prisma.contactMessage.create({
    data: {
      firstName: data.firstName,
      lastName:  data.lastName,
      email:     data.email,
      phone:     data.phone ?? null,
      subject:   data.subject,
      message:   data.message,
    },
  })

  // Fire-and-forget email — don't let email failure block the API response
  sendContactEmail({
    firstName:  message.firstName,
    lastName:   message.lastName,
    email:      message.email,
    phone:      message.phone ?? undefined,
    subject:    message.subject,
    message:    message.message,
    receivedAt: new Intl.DateTimeFormat('fr-MA', {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone:  'Africa/Casablanca',
    }).format(message.createdAt),
  }).catch(err => console.error('📧  Email send failed:', err.message))

  return message
}

// ── List messages (admin) ─────────────────────────────────────────────────────

export async function listContacts(status?: string) {
  return prisma.contactMessage.findMany({
    where:   status ? { status } : undefined,
    orderBy: { createdAt: 'desc' },
    take:    100,
  })
}

// ── Mark message status (admin) ───────────────────────────────────────────────

export async function updateContactStatus(id: string, status: string) {
  return prisma.contactMessage.update({
    where: { id },
    data:  { status },
  })
}
