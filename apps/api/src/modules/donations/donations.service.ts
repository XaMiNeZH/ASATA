import { prisma } from '../../config/database'
import type { CreateDonationInput, UpdateStatusInput, ListDonationsQuery } from './donations.schema'

// ── Create a new donation record ──────────────────────────────────────────────

export async function createDonation(input: CreateDonationInput) {
  const donation = await prisma.donation.create({
    data: {
      amount:     input.amount,
      currency:   input.currency ?? 'MAD',
      method:     input.method,
      donorName:  input.donorName  ?? '',
      donorEmail: input.donorEmail ?? '',
      donorPhone: input.donorPhone,
      message:    input.message,
      status:     'PENDING',
    },
    select: {
      id:         true,
      reference:  true,
      amount:     true,
      currency:   true,
      method:     true,
      status:     true,
      donorName:  true,
      donorEmail: true,
      createdAt:  true,
    },
  })

  return donation
}

// ── Get a single donation by ID or reference ──────────────────────────────────

export async function getDonationByReference(reference: string) {
  return prisma.donation.findUnique({
    where: { reference },
    select: {
      id:         true,
      reference:  true,
      amount:     true,
      currency:   true,
      method:     true,
      status:     true,
      donorName:  true,
      createdAt:  true,
    },
  })
}

// ── List all donations (admin) ─────────────────────────────────────────────────

export async function listDonations(query: ListDonationsQuery) {
  const { status, method, page, limit } = query
  const skip = (page - 1) * limit

  const where = {
    ...(status ? { status } : {}),
    ...(method ? { method } : {}),
  }

  const [donations, total] = await Promise.all([
    prisma.donation.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id:         true,
        reference:  true,
        amount:     true,
        currency:   true,
        method:     true,
        status:     true,
        donorName:  true,
        donorEmail: true,
        createdAt:  true,
      },
    }),
    prisma.donation.count({ where }),
  ])

  return {
    donations,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  }
}

// ── Get donation stats ─────────────────────────────────────────────────────────

export async function getDonationStats() {
  const [total, confirmed, byMethod] = await Promise.all([
    prisma.donation.count(),
    prisma.donation.aggregate({
      where:   { status: 'CONFIRMED' },
      _sum:    { amount: true },
      _count:  { id: true },
    }),
    prisma.donation.groupBy({
      by:      ['method'],
      _count:  { id: true },
      _sum:    { amount: true },
    }),
  ])

  return {
    totalDonations:    total,
    confirmedCount:    confirmed._count.id,
    confirmedTotal:    confirmed._sum.amount ?? 0,
    byMethod:          byMethod.map(m => ({
      method: m.method,
      count:  m._count.id,
      total:  m._sum.amount ?? 0,
    })),
  }
}

// ── Update donation status (admin) ────────────────────────────────────────────

export async function updateDonationStatus(id: string, input: UpdateStatusInput) {
  return prisma.donation.update({
    where: { id },
    data: {
      status: input.status,
    },
    select: {
      id:        true,
      reference: true,
      status:    true,
      updatedAt: true,
    },
  })
}
