#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client')
const http = require('http')

const prisma = new PrismaClient()

async function checkDatabase() {
  try {
    await prisma.$connect()
    const userCount = await prisma.user.count()
    const modemCount = await prisma.modem.count()
    
    console.log('✅ Database connection: OK')
    console.log(`📊 Users: ${userCount}, Modems: ${modemCount}`)
    
    await prisma.$disconnect()
    return true
  } catch (error) {
    console.log('❌ Database connection: FAILED')
    console.log('Error:', error.message)
    await prisma.$disconnect()
    return false
  }
}

function checkServer() {
  return new Promise((resolve) => {
    const req = http.get('http://localhost:3000', (res) => {
      if (res.statusCode === 200) {
        console.log('✅ Server: Running on http://localhost:3000')
        resolve(true)
      } else {
        console.log(`❌ Server: Responded with status ${res.statusCode}`)
        resolve(false)
      }
    })
    
    req.on('error', () => {
      console.log('❌ Server: Not running or not accessible')
      resolve(false)
    })
    
    req.setTimeout(5000, () => {
      console.log('❌ Server: Request timeout')
      req.destroy()
      resolve(false)
    })
  })
}

async function main() {
  console.log('🔍 Password Manager - System Check\n')
  
  const dbStatus = await checkDatabase()
  const serverStatus = await checkServer()
  
  console.log('\n📋 Summary:')
  console.log(`Database: ${dbStatus ? '✅ OK' : '❌ FAILED'}`)
  console.log(`Server: ${serverStatus ? '✅ OK' : '❌ FAILED'}`)
  
  if (dbStatus && serverStatus) {
    console.log('\n🎉 All systems operational!')
    console.log('🌐 Visit: http://localhost:3000')
    console.log('👤 Demo login: demo@example.com / password123')
  } else {
    console.log('\n⚠️  Some issues detected. Please check the logs above.')
  }
}

main()
