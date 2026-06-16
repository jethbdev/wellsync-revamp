async function run() {
  try {
    const res = await fetch('http://127.0.0.1:4000/api/patients/export-data?patientPin=P113976273', {
      headers: {
        'x-tenant-slug': 'cavite-clinic'
      }
    });
    console.log('Status:', res.status);
    const body = await res.json();
    console.log('Body:', body);
  } catch (err) {
    console.error('Error:', err);
  }
}
run();
