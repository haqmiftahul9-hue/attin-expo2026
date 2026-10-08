import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  let errors = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(`Console Error: ${msg.text()}`);
    }
  });
  
  page.on('pageerror', error => {
    errors.push(`Page Error: ${error.message}`);
  });

  const routes = [
    '/',
    '/pendaftaran/tahfizh',
    '/pendaftaran/pra-tka',
    '/pendaftaran/panahan'
  ];

  for (const route of routes) {
    console.log(`Auditing http://localhost:5174${route}...`);
    try {
      await page.goto(`http://localhost:5174${route}`, { waitUntil: 'networkidle', timeout: 10000 });
      console.log(`✓ ${route} loaded successfully`);
    } catch (e) {
      console.log(`✗ ${route} failed to load: ${e.message}`);
    }
  }
  
  if (errors.length > 0) {
    console.log('\n--- ERRORS FOUND ---');
    errors.forEach(e => console.log(e));
  } else {
    console.log('\n✓ No client-side errors detected across all routes.');
  }

  await browser.close();
})();

