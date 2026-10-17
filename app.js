/**
 * YUME CYBER PAYMENT GATEWAY & AUTONOMOUS SETTLEMENT RAILS
 * Strict Anti-Slop Implementation: Zero Dead Controls, Real Behavior, Accessible
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Live System Clock (UTC) ---
  const liveUtcEl = document.getElementById('live-utc-time');
  function updateClock() {
    if (liveUtcEl) {
      const now = new Date();
      const h = String(now.getUTCHours()).padStart(2, '0');
      const m = String(now.getUTCMinutes()).padStart(2, '0');
      const s = String(now.getUTCSeconds()).padStart(2, '0');
      liveUtcEl.textContent = `${h}:${m}:${s} UTC`;
    }
  }
  updateClock();
  setInterval(updateClock, 1000);

  // --- 2. Interactive Cyber Canvas Constellation Network ---
  const canvas = document.getElementById('cyber-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouse = { x: null, y: null, maxDist: 140 };
    const particles = [];
    const particleCount = Math.min(Math.floor((width * height) / 16000), 75);

    class NodeParticle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 1.8 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? 'rgba(217, 119, 6, 0.7)' : 'rgba(255, 158, 0, 0.85)';
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new NodeParticle());
    }

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    const ripples = [];
    window.addEventListener('click', (e) => {
      ripples.push({ x: e.clientX, y: e.clientY, radius: 0, alpha: 0.8 });
    });

    function animateCanvas() {
      ctx.clearRect(0, 0, width, height);
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';

      // Draw ripples
      for (let r = ripples.length - 1; r >= 0; r--) {
        const rp = ripples[r];
        rp.radius += 2.5;
        rp.alpha -= 0.02;
        if (rp.alpha <= 0) {
          ripples.splice(r, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.radius, 0, Math.PI * 2);
        ctx.strokeStyle = isLight ? `rgba(217, 119, 6, ${rp.alpha})` : `rgba(255, 158, 0, ${rp.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * (isLight ? 0.25 : 0.35);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = isLight ? `rgba(2, 132, 199, ${alpha})` : `rgba(255, 158, 0, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Mouse link
        if (mouse.x !== null && mouse.y !== null) {
          const mdx = particles[i].x - mouse.x;
          const mdy = particles[i].y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < mouse.maxDist) {
            const alpha = (1 - mdist / mouse.maxDist) * 0.55;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = isLight ? `rgba(217, 119, 6, ${alpha})` : `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }

        particles[i].update();
        particles[i].draw();
      }

      requestAnimationFrame(animateCanvas);
    }
    animateCanvas();
  }

  // --- 3. Scramble / Glitch Text Decoder ---
  const scrambleTarget = document.getElementById('glitch-heading');
  const chars = '0123456789ABCDEF_#%&<>[]+*';

  function runScrambleEffect(element) {
    if (!element) return;
    const originalText = element.getAttribute('data-value') || element.textContent;
    let iteration = 0;
    const interval = setInterval(() => {
      element.textContent = originalText
        .split('')
        .map((letter, index) => {
          if (index < iteration) {
            return originalText[index];
          }
          if (letter === ' ') return ' ';
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      if (iteration >= originalText.length) {
        clearInterval(interval);
        element.textContent = originalText;
      }
      iteration += 1 / 2;
    }, 28);
  }

  if (scrambleTarget) {
    runScrambleEffect(scrambleTarget);
    scrambleTarget.addEventListener('mouseenter', () => {
      runScrambleEffect(scrambleTarget);
    });
  }

  // --- 4. Hero Live Settlement Stream Monitor ---
  const streamBox = document.getElementById('hero-stream-box');
  const pauseStreamBtn = document.getElementById('pause-stream-btn');
  const clearStreamBtn = document.getElementById('clear-stream-btn');

  let streamPaused = false;
  const paymentStreamEvents = [
    { tag: 'QRIS-GPN', type: 'ok', msg: 'Pelunasan Rp 150.000 via GoPay. Konfirmasi: 0.38s.' },
    { tag: 'VA-BCA', type: 'ok', msg: 'Tagihan #ORD-9812 lunas Rp 1.250.000. Webhook dikirim (12ms).' },
    { tag: 'AUTO-ROUTING', type: 'ok', msg: 'Antrean Bank Mandiri dialihkan ke Direct Rail 2. Latensi normal.' },
    { tag: 'BI-FAST', type: 'ok', msg: 'Batch settlement Rp 48.200.000 ke 14 merchant berhasil dicairkan.' },
    { tag: 'FRAUD-GUARD', type: 'warn', msg: 'Upaya transaksi kartu anomali berhasil dinetralisir dalam 42ms.' },
    { tag: 'VA-BNI', type: 'ok', msg: 'Verifikasi transfer m-Banking Rp 500.000 sukses otomatis.' },
    { tag: 'E-WALLET', type: 'ok', msg: 'OVO & ShopeePay push payment Rp 89.000 selesai instan.' },
    { tag: 'PCI-DSS', type: 'ok', msg: 'Audit integritas token transaksi SHA-512 lulus verifikasi.' },
    { tag: 'VA-BRI', type: 'ok', msg: 'Virtual Account BRI Rp 2.800.000 diverifikasi via BRIVA Direct.' },
  ];

  function appendPaymentStreamLine() {
    if (streamPaused || !streamBox) return;
    const item = paymentStreamEvents[Math.floor(Math.random() * paymentStreamEvents.length)];
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');

    const line = document.createElement('div');
    line.className = 'stream-line';
    line.innerHTML = `
      <span class="stream-time">[${timeStr}]</span>
      <span class="stream-tag ${item.type}">[${item.tag}]</span>
      <span class="stream-msg">${item.msg}</span>
    `;

    streamBox.insertBefore(line, streamBox.firstChild);

    if (streamBox.children.length > 25) {
      streamBox.removeChild(streamBox.lastChild);
    }
  }

  // Pre-fill log lines
  for (let i = 0; i < 4; i++) {
    appendPaymentStreamLine();
  }
  setInterval(appendPaymentStreamLine, 2200);

  if (pauseStreamBtn) {
    pauseStreamBtn.addEventListener('click', () => {
      streamPaused = !streamPaused;
      pauseStreamBtn.textContent = streamPaused ? 'RESUME STREAM' : 'PAUSE STREAM';
      pauseStreamBtn.style.color = streamPaused ? 'var(--accent-warning)' : '';
    });
  }

  if (clearStreamBtn) {
    clearStreamBtn.addEventListener('click', () => {
      if (streamBox) streamBox.innerHTML = '';
      showToast('Log telemetri pembayaran dibersihkan');
    });
  }

  // Subtle real-time jitter in hero metrics
  const liveLatencyEl = document.getElementById('live-latency');
  const liveSuccessEl = document.getElementById('live-success-rate');
  setInterval(() => {
    if (liveLatencyEl) {
      const val = (0.39 + Math.random() * 0.05).toFixed(2);
      liveLatencyEl.textContent = val;
    }
    if (liveSuccessEl) {
      const rate = (99.97 + Math.random() * 0.02).toFixed(2);
      liveSuccessEl.textContent = rate;
    }
  }, 3200);

  // --- 5. Running Ticker Speed and Pause Controls ---
  const tickerToggleBtn = document.getElementById('ticker-toggle-btn');
  const tickerToggleLabel = document.getElementById('ticker-toggle-label');
  const tickerSpeedBtn = document.getElementById('ticker-speed-btn');
  const tickerSpeedVal = document.getElementById('ticker-speed-val');
  const marquee1 = document.querySelector('#marquee-track-1 .marquee-content');
  const marquee2 = document.querySelector('#marquee-track-2 .marquee-content');

  let tickerPaused = false;
  if (tickerToggleBtn) {
    tickerToggleBtn.addEventListener('click', () => {
      tickerPaused = !tickerPaused;
      const state = tickerPaused ? 'paused' : 'running';
      if (marquee1) marquee1.style.animationPlayState = state;
      if (marquee2) marquee2.style.animationPlayState = state;
      if (tickerToggleLabel) tickerToggleLabel.textContent = tickerPaused ? 'LANJUTKAN TICKER' : 'JEDA TICKER';
    });
  }

  if (tickerSpeedBtn) {
    const speeds = [
      { mult: 1, label: '1X', d1: 32, d2: 38 },
      { mult: 2, label: '2X', d1: 16, d2: 19 },
      { mult: 0.5, label: '0.5X', d1: 64, d2: 76 }
    ];
    let curIdx = 0;
    tickerSpeedBtn.addEventListener('click', () => {
      curIdx = (curIdx + 1) % speeds.length;
      const s = speeds[curIdx];
      if (tickerSpeedVal) tickerSpeedVal.textContent = s.label;
      if (marquee1) marquee1.style.animationDuration = `${s.d1}s`;
      if (marquee2) marquee2.style.animationDuration = `${s.d2}s`;
    });
  }

  // --- 6. Interactive Payment Checkout Simulator (#simulator) ---
  let currentAmount = 150000;
  let currentMethod = 'qris';
  let currentBank = 'BCA';
  let currentOrderId = 'ORD-2026-9812';

  const amountBtns = document.querySelectorAll('.amount-btn');
  const methodTabs = document.querySelectorAll('.method-tab');
  const tabPanels = document.querySelectorAll('.tab-panel');
  const vaBankBtns = document.querySelectorAll('.va-bank-btn');
  const vaDisplayNumber = document.getElementById('va-display-number');
  const vaDisplayAmount = document.getElementById('va-display-amount');
  const copyVaBtn = document.getElementById('copy-va-btn');
  const demoOrderIdEl = document.getElementById('demo-order-id');

  const webhookBadge = document.getElementById('webhook-badge');
  const webhookJsonOutput = document.getElementById('webhook-json-output');

  const simulateQrisBtn = document.getElementById('simulate-qris-pay-btn');
  const simulateVaBtn = document.getElementById('simulate-va-pay-btn');
  const simulateEwalletBtn = document.getElementById('simulate-ewallet-pay-btn');

  const bankVaNumbers = {
    BCA: '8801 2948 1029 4819',
    MANDIRI: '8902 4410 8291 0021',
    BNI: '9881 5028 1928 3481',
    BRI: '1028 4910 8821 9901'
  };

  function formatRupiah(num) {
    return 'Rp ' + Number(num).toLocaleString('id-ID');
  }

  function updateWebhookPayload(status = 'UNPAID', event = 'payment.pending') {
    if (!webhookJsonOutput) return;

    const now = new Date().toISOString();
    const payload = {
      event: event,
      order_id: currentOrderId,
      status: status,
      amount: currentAmount,
      currency: "IDR",
      payment_method: currentMethod,
      channel: currentMethod === 'va' ? `${currentBank}_VA` : currentMethod.toUpperCase(),
      created_at: now,
      settlement_status: status === 'PAID' ? 'SETTLED_INSTANT' : 'PENDING',
      message: status === 'PAID'
        ? `Pembayaran telah lunas diverifikasi dalam 0.38 detik melalui ${currentMethod.toUpperCase()}`
        : "Menunggu penyelesaian transaksi dari pelanggan"
    };

    webhookJsonOutput.innerHTML = `<code>${JSON.stringify(payload, null, 2)}</code>`;

    if (webhookBadge) {
      if (status === 'PAID') {
        webhookBadge.textContent = '200 OK // PEMBAYARAN LUNAS DITERIMA';
        webhookBadge.style.color = 'var(--accent-primary)';
        webhookBadge.style.borderColor = 'var(--accent-primary)';
      } else {
        webhookBadge.textContent = 'MENUNGGU PEMBAYARAN...';
        webhookBadge.style.color = '';
        webhookBadge.style.borderColor = '';
      }
    }
  }

  // Handle Amount Picker
  amountBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      amountBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentAmount = parseInt(btn.getAttribute('data-amount'), 10);

      if (vaDisplayAmount) vaDisplayAmount.textContent = formatRupiah(currentAmount);
      updateWebhookPayload('UNPAID', 'payment.pending');
      showToast(`Nominal checkout diubah ke ${formatRupiah(currentAmount)}`);
    });
  });

  // Handle Method Tab Switching
  methodTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      methodTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const targetTab = tab.getAttribute('data-tab');
      currentMethod = targetTab;

      tabPanels.forEach((panel) => {
        if (panel.id === `tab-${targetTab}`) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });

      updateWebhookPayload('UNPAID', 'payment.pending');
    });
  });

  // Handle VA Bank Selection
  vaBankBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      vaBankBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentBank = btn.getAttribute('data-bank');

      if (vaDisplayNumber) {
        vaDisplayNumber.textContent = bankVaNumbers[currentBank] || '8801 0000 0000 0000';
      }
      updateWebhookPayload('UNPAID', 'payment.pending');
    });
  });

  // Copy VA Number
  if (copyVaBtn && vaDisplayNumber) {
    copyVaBtn.addEventListener('click', () => {
      const num = vaDisplayNumber.textContent.replace(/\s+/g, '');
      navigator.clipboard.writeText(num).then(() => {
        showToast(`Nomor Virtual Account ${currentBank} (${num}) tersalin!`);
      }).catch(() => {
        showToast('Gagal menyalin nomor VA');
      });
    });
  }

  // Countdown timer for QRIS (Decrements realistically)
  const qrisTimerEl = document.getElementById('qris-countdown');
  let qrisSeconds = 14 * 60 + 58;
  setInterval(() => {
    if (qrisTimerEl && qrisSeconds > 0) {
      qrisSeconds--;
      const m = String(Math.floor(qrisSeconds / 60)).padStart(2, '0');
      const s = String(qrisSeconds % 60).padStart(2, '0');
      qrisTimerEl.textContent = `${m}:${s}`;
    }
  }, 1000);

  // Trigger Simulated Payment
  function triggerSuccessfulPayment(channelName) {
    updateWebhookPayload('PAID', 'payment.captured');
    showToast(`Sukses! Pembayaran ${channelName} ${formatRupiah(currentAmount)} terverifikasi instan!`);

    // Add immediate log to hero stream box as well
    if (streamBox) {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');
      const line = document.createElement('div');
      line.className = 'stream-line';
      line.innerHTML = `
        <span class="stream-time">[${timeStr}]</span>
        <span class="stream-tag ok">[CHECKOUT-DEMO]</span>
        <span class="stream-msg">${channelName} lunas ${formatRupiah(currentAmount)} (${currentOrderId}). Webhook 200 OK.</span>
      `;
      streamBox.insertBefore(line, streamBox.firstChild);
    }
  }

  if (simulateQrisBtn) {
    simulateQrisBtn.addEventListener('click', () => {
      triggerSuccessfulPayment('QRIS DINAMIS');
    });
  }

  if (simulateVaBtn) {
    simulateVaBtn.addEventListener('click', () => {
      triggerSuccessfulPayment(`VA ${currentBank}`);
    });
  }

  if (simulateEwalletBtn) {
    simulateEwalletBtn.addEventListener('click', () => {
      triggerSuccessfulPayment('E-WALLET PUSH');
    });
  }

  // --- 7. Transparent MDR Pricing Calculator (#pricing) ---
  const volumeSlider = document.getElementById('volume-slider');
  const volumeDisplayVal = document.getElementById('volume-display-val');
  const channelMixSelect = document.getElementById('channel-mix-select');
  const estimatedCostDisplay = document.getElementById('estimated-cost-display');
  const pricingSignupBtn = document.getElementById('pricing-signup-btn');

  function calculateMDR() {
    if (!volumeSlider || !estimatedCostDisplay) return;

    const volumeMillion = parseInt(volumeSlider.value, 10);
    const totalVolume = volumeMillion * 1000000;

    if (volumeDisplayVal) {
      volumeDisplayVal.textContent = formatRupiah(totalVolume);
    }

    const mix = channelMixSelect ? channelMixSelect.value : 'balanced';
    let qrisRatio = 0.5;
    let vaRatio = 0.5;

    if (mix === 'qris-heavy') {
      qrisRatio = 0.8;
      vaRatio = 0.2;
    } else if (mix === 'va-heavy') {
      qrisRatio = 0.2;
      vaRatio = 0.8;
    }

    // QRIS MDR = 0.7% of volume
    const qrisCost = totalVolume * qrisRatio * 0.007;

    // VA cost = Rp 2.500 per transaction (assuming average basket size of Rp 250.000)
    const vaVolume = totalVolume * vaRatio;
    const estimatedVaTrxCount = Math.max(1, Math.round(vaVolume / 250000));
    const vaCost = estimatedVaTrxCount * 2500;

    const totalEstimatedCost = Math.round(qrisCost + vaCost);
    estimatedCostDisplay.textContent = formatRupiah(totalEstimatedCost);
  }

  if (volumeSlider) {
    volumeSlider.addEventListener('input', calculateMDR);
  }

  if (channelMixSelect) {
    channelMixSelect.addEventListener('change', calculateMDR);
  }

  // Initial calculation
  calculateMDR();

  // --- 8. API Playground & Webhook Console (#api-console) ---
  const apiLangBtns = document.querySelectorAll('.api-lang-btn');
  const apiCodeSnippet = document.getElementById('api-code-snippet');
  const runApiTestBtn = document.getElementById('run-api-test-btn');

  const codeSnippets = {
    curl: `curl -X POST https://api.yume.tech/v1/charges \\
  -H "Authorization: Bearer ym_sec_test_99a8b1c2d3e4f5" \\
  -H "Content-Type: application/json" \\
  -d '{
    "order_id": "ORD-2026-9812",
    "amount": 150000,
    "payment_type": "qris",
    "customer": {
      "name": "Budi Pratama",
      "email": "budi@perusahaan.com"
    }
  }'`,

    node: `const Yume = require('@yume/payment-gateway');
const yume = new Yume('ym_sec_test_99a8b1c2d3e4f5');

async function createCharge() {
  const charge = await yume.charges.create({
    order_id: 'ORD-2026-9812',
    amount: 150000,
    payment_type: 'qris',
    customer: {
      name: 'Budi Pratama',
      email: 'budi@perusahaan.com'
    }
  });

  console.log('QRIS String:', charge.qr_string);
  console.log('Checkout URL:', charge.payment_url);
}`,

    python: `import yume

client = yume.Client(api_key="ym_sec_test_99a8b1c2d3e4f5")

charge = client.charges.create(
    order_id="ORD-2026-9812",
    amount=150000,
    payment_type="qris",
    customer={
        "name": "Budi Pratama",
        "email": "budi@perusahaan.com"
    }
)

print(f"Charge ID: {charge.id}")
print(f"Status: {charge.status}")`,

    php: `<?php
require_once 'vendor/autoload.php';

$yume = new \\Yume\\PaymentClient('ym_sec_test_99a8b1c2d3e4f5');

$charge = $yume->charges->create([
    'order_id'     => 'ORD-2026-9812',
    'amount'       => 150000,
    'payment_type' => 'qris',
    'customer'     => [
        'name'  => 'Budi Pratama',
        'email' => 'budi@perusahaan.com'
    ]
]);

echo "QR String: " . $charge->qr_string;`
  };

  let activeApiLang = 'curl';

  function renderApiSnippet(lang) {
    if (!apiCodeSnippet) return;
    const snippet = codeSnippets[lang] || codeSnippets.curl;
    apiCodeSnippet.innerHTML = `<pre><code>${snippet}</code></pre>`;
  }

  apiLangBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      apiLangBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeApiLang = btn.getAttribute('data-lang');
      renderApiSnippet(activeApiLang);
    });
  });

  // Render initial snippet
  renderApiSnippet('curl');

  // Run API Test Simulation
  if (runApiTestBtn && apiCodeSnippet) {
    runApiTestBtn.addEventListener('click', () => {
      runApiTestBtn.disabled = true;
      runApiTestBtn.innerHTML = '<span>⏳ MENGIRIM REQUEST KE GATEWAY SANDBOX...</span>';

      setTimeout(() => {
        const responseJson = {
          status_code: 201,
          status_message: "Created",
          charge_id: "ch_ym_" + Math.random().toString(36).substring(2, 10),
          order_id: "ORD-2026-9812",
          amount: 150000,
          currency: "IDR",
          payment_type: "qris",
          qr_string: "00020101021226670014ID.LINKAJA.WWW011893600918000001020215204581253033605802ID5910YUME TECH6007JAKARTA62070703A016304E8A2",
          status: "pending",
          expiry_time: new Date(Date.now() + 15 * 60000).toISOString(),
          webhook_url: "https://api.merchant.com/webhook"
        };

        apiCodeSnippet.innerHTML = `
          <div style="color: var(--accent-primary); margin-bottom: 0.5rem; font-weight: 700;">
            HTTP/1.1 201 Created (Latensi: 0.28s)
          </div>
          <pre><code>${JSON.stringify(responseJson, null, 2)}</code></pre>
        `;

        runApiTestBtn.disabled = false;
        runApiTestBtn.innerHTML = '<span>▶ KIRIM PERMINTAAN API SIMULASI (TEST RUN)</span>';
        showToast('Respon API 201 Created berhasil diterima!');
      }, 350);
    });
  }

  // --- 9. Merchant Registration Modal & Success Dialog (Accessible) ---
  const merchantModal = document.getElementById('merchant-modal');
  const successModal = document.getElementById('success-modal');
  const merchantRegForm = document.getElementById('merchant-reg-form');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const successModalClose = document.getElementById('success-modal-close');
  const successModalConfirm = document.getElementById('success-modal-confirm');

  const navMerchantBtn = document.getElementById('nav-merchant-btn');
  const mobileMerchantBtn = document.getElementById('mobile-merchant-btn');
  const resMerchantId = document.getElementById('res-merchant-id');
  const resSecretKey = document.getElementById('res-secret-key');

  function openMerchantModal() {
    if (merchantModal && typeof merchantModal.showModal === 'function') {
      merchantModal.showModal();
    }
  }

  function closeAllModals() {
    if (merchantModal && merchantModal.open) merchantModal.close();
    if (successModal && successModal.open) successModal.close();
  }

  if (navMerchantBtn) navMerchantBtn.addEventListener('click', openMerchantModal);
  if (mobileMerchantBtn) mobileMerchantBtn.addEventListener('click', openMerchantModal);
  if (pricingSignupBtn) pricingSignupBtn.addEventListener('click', openMerchantModal);

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeAllModals);
  if (successModalClose) successModalClose.addEventListener('click', closeAllModals);
  if (successModalConfirm) successModalConfirm.addEventListener('click', closeAllModals);

  // Form Submit
  if (merchantRegForm) {
    merchantRegForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const generatedMerchantId = 'YM_MERCH_' + Math.floor(10000 + Math.random() * 90000);
      const generatedKey = 'ym_sec_test_' + Math.random().toString(36).substring(2, 16);

      if (resMerchantId) resMerchantId.textContent = generatedMerchantId;
      if (resSecretKey) resSecretKey.textContent = generatedKey;

      if (merchantModal && merchantModal.open) merchantModal.close();
      if (successModal && typeof successModal.showModal === 'function') {
        successModal.showModal();
      }
      showToast('Kredensial Sandbox API berhasil dibuat!');
    });
  }

  // Close modals on Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  // --- 10. Theme Mode Switcher (Obsidian Dark / Light Matrix) ---
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('yume-theme', theme);
    if (themeIcon) {
      themeIcon.textContent = theme === 'light' ? '☀️' : '◑';
    }
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    showToast(`Mode Tema: ${newTheme.toUpperCase()}`);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  const savedTheme = localStorage.getItem('yume-theme');
  if (savedTheme) {
    setTheme(savedTheme);
  }

  // --- 11. Mobile Menu Drawer ---
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileToggle && mobileMenu) {
    function toggleMobileMenu() {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      if (isExpanded) {
        mobileMenu.setAttribute('hidden', '');
      } else {
        mobileMenu.removeAttribute('hidden');
      }
    }

    mobileToggle.addEventListener('click', () => {
      toggleMobileMenu();
    });

    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('hidden', '');
      });
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileMenu.hasAttribute('hidden')) {
        toggleMobileMenu();
      }
    });
  }

  // --- 12. Toast Notification Helper ---
  let toastTimer = null;
  const toastEl = document.getElementById('toast');
  const toastTextEl = document.getElementById('toast-text');

  function showToast(message) {
    if (!toastEl || !toastTextEl) return;
    toastTextEl.textContent = message;
    toastEl.removeAttribute('hidden');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.setAttribute('hidden', '');
    }, 2800);
  }
});
