import { hashPassword } from 'better-auth/crypto';

async function main() {
  const hashed = await hashPassword('patientpass');
  console.log('Hashed password:', hashed);
}

main().catch(console.error);
