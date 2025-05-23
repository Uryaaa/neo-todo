const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const readline = require('readline');

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function createSuperuser() {
  try {
    console.log('🚀 Creating Superuser Account\n');

    // Get user input
    const name = await question('Enter superuser name: ');
    const email = await question('Enter superuser email: ');
    
    // Hide password input
    process.stdout.write('Enter superuser password: ');
    process.stdin.setRawMode(true);
    
    let password = '';
    process.stdin.on('data', (char) => {
      char = char.toString();
      
      if (char === '\r' || char === '\n') {
        process.stdin.setRawMode(false);
        process.stdout.write('\n');
        createUser();
        return;
      }
      
      if (char === '\u0003') {
        process.exit();
      }
      
      if (char === '\u007f') {
        if (password.length > 0) {
          password = password.slice(0, -1);
          process.stdout.write('\b \b');
        }
      } else {
        password += char;
        process.stdout.write('*');
      }
    });

    async function createUser() {
      try {
        if (!name || !email || !password) {
          console.log('❌ All fields are required');
          process.exit(1);
        }

        if (password.length < 6) {
          console.log('❌ Password must be at least 6 characters long');
          process.exit(1);
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
          where: { email }
        });

        if (existingUser) {
          console.log('❌ User with this email already exists');
          
          const updateExisting = await question('Do you want to update the existing user to SUPERUSER? (y/N): ');
          
          if (updateExisting.toLowerCase() === 'y' || updateExisting.toLowerCase() === 'yes') {
            const updatedUser = await prisma.user.update({
              where: { email },
              data: { role: 'SUPERUSER' },
              select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true
              }
            });

            console.log('\n✅ User updated to SUPERUSER successfully!');
            console.log('📋 User Details:');
            console.log(`   ID: ${updatedUser.id}`);
            console.log(`   Name: ${updatedUser.name}`);
            console.log(`   Email: ${updatedUser.email}`);
            console.log(`   Role: ${updatedUser.role}`);
            console.log(`   Created: ${updatedUser.createdAt.toISOString()}`);
          } else {
            console.log('❌ Operation cancelled');
          }
          
          process.exit(0);
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create superuser
        const superuser = await prisma.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
            role: 'SUPERUSER',
            settings: {
              create: {
                accentColor: 'red',
                emailNotifications: true,
              },
            },
          },
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true
          }
        });

        console.log('\n✅ Superuser created successfully!');
        console.log('📋 User Details:');
        console.log(`   ID: ${superuser.id}`);
        console.log(`   Name: ${superuser.name}`);
        console.log(`   Email: ${superuser.email}`);
        console.log(`   Role: ${superuser.role}`);
        console.log(`   Created: ${superuser.createdAt.toISOString()}`);
        
        console.log('\n🎉 You can now login with these credentials and access the admin panel!');

      } catch (error) {
        console.error('❌ Error creating superuser:', error.message);
        process.exit(1);
      } finally {
        await prisma.$disconnect();
        rl.close();
        process.exit(0);
      }
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    await prisma.$disconnect();
    rl.close();
    process.exit(1);
  }
}

// Handle process termination
process.on('SIGINT', async () => {
  console.log('\n❌ Operation cancelled');
  await prisma.$disconnect();
  rl.close();
  process.exit(0);
});

// Start the script
createSuperuser();
