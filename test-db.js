// Test file to check database connection
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function testConnection() {
  try {
    console.log('Testing database connection...')
    
    // Try to connect to the database
    await prisma.$connect()
    console.log('✅ Database connection successful!')
    
    // Try to query something simple
    const result = await prisma.$queryRaw`SELECT 1 as test`
    console.log('✅ Database query successful:', result)
    
  } catch (error) {
    console.error('❌ Database connection failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()
