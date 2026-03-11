import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Start the dev server in the background
  const { spawn } = await import('child_process');
  const server = spawn('pnpm', ['dev'], { stdio: 'pipe' });

  // Wait for server to be ready
  await new Promise(resolve => {
    server.stdout.on('data', (data) => {
      if (data.toString().includes('ready in')) resolve();
    });
  });

  try {
    await page.goto('http://localhost:8080');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'home.png', fullPage: true });

    await page.goto('http://localhost:8080/blog');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'blog.png', fullPage: true });

    console.log('Screenshots saved: home.png, blog.png');
  } catch (err) {
    console.error('Verification failed:', err);
  } finally {
    await browser.close();
    server.kill();
  }
})();
