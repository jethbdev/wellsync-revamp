const fetch = require('node-fetch');

async function run() {
  const host = 'http://cebu-clinic.localhost:4000';
  console.log(`1. Posting login credentials to ${host}/api/auth/staff/sign-in/email...`);
  
  const loginRes = await fetch(`${host}/api/auth/staff/sign-in/email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-tenant-slug': 'cebu-clinic',
    },
    body: JSON.stringify({
      email: 'admin@healthbridge.dev',
      password: 'adminpass'
    })
  });

  console.log(`Login response status: ${loginRes.status}`);
  const loginData = await loginRes.json();
  console.log('Login response body:', JSON.stringify(loginData, null, 2));

  const cookies = loginRes.headers.raw()['set-cookie'];
  console.log('Returned set-cookie headers:', cookies);

  if (!cookies || cookies.length === 0) {
    console.log('Error: No cookies returned in login response.');
    return;
  }

  // Extract cookie value
  const cookieStr = cookies.map(c => c.split(';')[0]).join('; ');
  console.log(`2. Querying get-session with cookie: [${cookieStr}]...`);

  const sessionRes = await fetch(`${host}/api/auth/staff/get-session`, {
    method: 'GET',
    headers: {
      'Cookie': cookieStr,
      'x-tenant-slug': 'cebu-clinic',
    }
  });

  console.log(`Session response status: ${sessionRes.status}`);
  const sessionData = await sessionRes.json();
  console.log('Session response body:', JSON.stringify(sessionData, null, 2));
}

run().catch(console.error);
