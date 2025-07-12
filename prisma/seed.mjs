import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Create test user
  const hashedPassword = await bcrypt.hash('password123', 12)
  
  const user = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      password: hashedPassword,
      name: 'Demo User',
    },
  })

  console.log('✓ Created user:', user.email)

  // Create sample modems
  const modems = [
    {
      name: 'Home Router',
      type: 'TP-Link Archer C7',
      ipAddress: '192.168.1.1',
      username: 'admin',
      password: 'admin123',
      description: 'Main home router for internet access',
      userId: user.id,
    },
    {
      name: 'Office Modem',
      type: 'Huawei HG8245H',
      ipAddress: '192.168.0.1',
      username: 'user',
      password: 'user123',
      description: 'Office fiber modem',
      userId: user.id,
    },
    {
      name: 'Backup Router',
      type: 'Xiaomi Mi Router 4A',
      ipAddress: '192.168.2.1',
      username: 'root',
      password: 'xiaomi123',
      description: 'Backup router for guest network',
      userId: user.id,
    },
  ]

  for (const modem of modems) {
    const createdModem = await prisma.modem.create({
      data: modem,
    })
    console.log('✓ Created modem:', createdModem.name)
  }

  console.log('🌱 Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
