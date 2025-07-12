#!/usr/bin/env node

// Test PostgreSQL connection for Password Manager
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function testPostgreSQLConnection() {
  console.log('🔍 Testing PostgreSQL Connection...\n')
  
  try {
    // Test basic connection
    console.log('1. Testing database connection...')
    await prisma.$connect()
    console.log('   ✅ Connection successful')
    
    // Test query execution
    console.log('2. Testing query execution...')
    const result = await prisma.$queryRaw`SELECT version()`
    console.log('   ✅ Query execution successful')
    console.log(`   📊 PostgreSQL Version: ${result[0].version.split(' ')[0]} ${result[0].version.split(' ')[1]}`)
    
    // Check if tables exist
    console.log('3. Checking database schema...')
    try {
      const userCount = await prisma.user.count()
      const modemCount = await prisma.modem.count()
      console.log('   ✅ Database tables exist')
      console.log(`   👥 Users: ${userCount}`)
      console.log(`   📡 Modems: ${modemCount}`)
      
      if (userCount === 0) {
        console.log('   💡 Tip: Run "yarn db:seed" to add sample data')
      }
    } catch (error) {
      console.log('   ⚠️  Database tables not found')
      console.log('   💡 Run "npx prisma migrate dev --name init" to create tables')
    }
    
    // Test database info
    console.log('4. Database information...')
    const dbInfo = await prisma.$queryRaw`
      SELECT 
        current_database() as database_name,
        current_user as current_user,
        inet_server_addr() as server_ip,
        inet_server_port() as server_port
    `
    console.log(`   📊 Database: ${dbInfo[0].database_name}`)
    console.log(`   👤 User: ${dbInfo[0].current_user}`)
    console.log(`   🌐 Server: ${dbInfo[0].server_ip || 'localhost'}:${dbInfo[0].server_port}`)
    
    await prisma.$disconnect()
    
    console.log('\n🎉 PostgreSQL connection test successful!')
    console.log('✅ Your Password Manager is ready to use PostgreSQL')
    
  } catch (error) {
    console.log('❌ Connection test failed!')
    console.log('\n🔧 Troubleshooting:')
    
    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      console.log('   • PostgreSQL server is not running')
      console.log('   • Check if PostgreSQL is installed and started')
      console.log('   • macOS: brew services start postgresql')
      console.log('   • Linux: sudo systemctl start postgresql')
    } else if (error.code === 'P1001') {
      console.log('   • Database server unreachable')
      console.log('   • Check DATABASE_URL in .env file')
      console.log('   • Verify PostgreSQL is running on correct port')
    } else if (error.message.includes('password authentication failed')) {
      console.log('   • Wrong username or password')
      console.log('   • Check DATABASE_URL credentials in .env')
      console.log('   • Run: ALTER USER postgres PASSWORD \'password\';')
    } else if (error.message.includes('database') && error.message.includes('does not exist')) {
      console.log('   • Database does not exist')
      console.log('   • Run: createdb -U postgres password_manager')
    } else {
      console.log('   • Error details:', error.message)
    }
    
    console.log('\n📖 See POSTGRES_SETUP.md for detailed setup instructions')
    
    await prisma.$disconnect()
    process.exit(1)
  }
}

testPostgreSQLConnection()
