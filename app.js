/**
 * YUME CYBER INFRASTRUCTURE - APPLICATION LOGIC
 * Strict Anti-Slop Implementation: Zero Dead Controls, Real Behavior, Accessible
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 2. Live System Clock (UTC) ---
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

  // --- 3. Interactive Cyber Canvas Constellation Network ---
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

    // Ripple click reaction
    const ripples = [];
    window.addEventListener('click', (e) => {
      ripples.push({ x: e.clientX, y: e.clientY, radius: 0, alpha: 0.8 });
    });

    function animateCanvas() {
      ctx.clearRect(0, 0, width, height);
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';

      // Draw and update ripples
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

  // --- 4. Scramble / Glitch Text Decoder ---
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

  // --- 5. Hero Live Telemetry Stream Monitor ---
  const streamBox = document.getElementById('hero-stream-box');
  const pauseStreamBtn = document.getElementById('pause-stream-btn');
  const clearStreamBtn = document.getElementById('clear-stream-btn');

  let streamPaused = false;
  const sampleMessages = [
    { tag: 'INGRESS', type: 'ok', msg: 'Paket data terotentikasi via HND-01 (Tokyo). Latensi: 12.4ms' },
    { tag: 'CONSENSUS', type: 'ok', msg: 'Verifikasi hash blok transaksi node #88492 valid.' },
    { tag: 'ROUTING', type: 'warn', msg: 'Jalur kabel laut trans-pasifik padat: re-routing via SIN-01.' },
    { tag: 'SECURITY', type: 'ok', msg: 'Serangan SYN-flood 180K pps dibersihkan pada edge firewall.' },
    { tag: 'TLS-HANDSHAKE', type: 'ok', msg: 'Kunci sesi Kyber-1024 diperbarui untuk 32 worker aktif.' },
    { tag: 'SYNC', type: 'ok', msg: 'Cluster Frankfurt FRA-01 sinkron dengan Jakarta JKT-02.' },
    { tag: 'MICROVM', type: 'ok', msg: 'Instance baru boot dalam 0.82ms pada zona ap-southeast-1.' },
  ];

  function appendStreamLine() {
    if (streamPaused || !streamBox) return;
    const item = sampleMessages[Math.floor(Math.random() * sampleMessages.length)];
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

    // Keep log manageable
    if (streamBox.children.length > 35) {
      streamBox.removeChild(streamBox.lastChild);
    }
  }

  // Pre-fill a few lines
  for (let i = 0; i < 4; i++) {
    appendStreamLine();
  }
  const streamInterval = setInterval(appendStreamLine, 2400);

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
      showToast('Buffer telemetri dibersihkan');
    });
  }

  // Jitter subtle variations in hero numbers
  const liveLatencyEl = document.getElementById('live-latency');
  const liveBwEl = document.getElementById('live-bandwidth');
  setInterval(() => {
    if (liveLatencyEl) {
      const val = (11.2 + Math.random() * 1.4).toFixed(1);
      liveLatencyEl.textContent = val;
    }
    if (liveBwEl) {
      const bw = (48.0 + Math.random() * 0.7).toFixed(1);
      liveBwEl.textContent = bw;
    }
  }, 3500);

  // --- 6. Running Ticker Speed and Pause Controls ---
  const tickerToggleBtn = document.getElementById('ticker-toggle-btn');
  const tickerToggleLabel = document.getElementById('ticker-toggle-label');
  const tickerSpeedBtn = document.getElementById('ticker-speed-btn');
  const tickerSpeedVal = document.getElementById('ticker-speed-val');
  const marquee1 = document.querySelector('#marquee-track-1 .marquee-content');
  const marquee2 = document.querySelector('#marquee-track-2 .marquee-content');

  let tickerPaused = false;
  let speedMultiplier = 1;

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

  // --- 7. Interactive Node Radar & Inspector ---
  const nodeHubs = {
    tokyo: {
      name: 'TOKYO CORE HUB [HND-01]',
      status: 'OPERASIONAL AKTIF',
      latency: '14.2 ms',
      bw: '100 Gbps Dedicated Dark Fiber',
      workers: '32 Unit Virtual',
      coords: '35.6762° N, 139.6503° E',
      basePing: 14
    },
    singapore: {
      name: 'SINGAPURA EQUINIX HUB [SIN-01]',
      status: 'OPERASIONAL AKTIF',
      latency: '18.6 ms',
      bw: '80 Gbps Direct IX Link',
      workers: '24 Unit Virtual',
      coords: '1.3521° N, 103.8198° E',
      basePing: 18
    },
    jakarta: {
      name: 'JAKARTA CYBER HUB [JKT-02]',
      status: 'OPERASIONAL AKTIF (OPTIMAL)',
      latency: '4.8 ms',
      bw: '60 Gbps OpenIXP Direct',
      workers: '28 Unit Virtual',
      coords: '6.2088° S, 106.8456° E',
      basePing: 5
    },
    frankfurt: {
      name: 'FRANKFURT MAIN HUB [FRA-01]',
      status: 'OPERASIONAL AKTIF',
      latency: '162.4 ms',
      bw: '120 Gbps DE-CIX Backbone',
      workers: '40 Unit Virtual',
      coords: '50.1109° N, 8.6821° E',
      basePing: 160
    },
    virginia: {
      name: 'VIRGINIA DATA CORRIDOR [IAD-03]',
      status: 'OPERASIONAL AKTIF',
      latency: '198.1 ms',
      bw: '150 Gbps Transatlantic Line',
      workers: '48 Unit Virtual',
      coords: '38.9072° N, 77.0369° W',
      basePing: 195
    },
    sydney: {
      name: 'SYDNEY PACIFIC HUB [SYD-01]',
      status: 'OPERASIONAL AKTIF',
      latency: '88.3 ms',
      bw: '50 Gbps Southern Cross Cable',
      workers: '20 Unit Virtual',
      coords: '33.8688° S, 151.2093° E',
      basePing: 88
    }
  };

  let activeHubKey = 'tokyo';
  const hubMarkers = document.querySelectorAll('.hub-marker');
  const selectedHubNameEl = document.getElementById('selected-hub-name');
  const selectedHubStatusEl = document.getElementById('selected-hub-status');
  const selectedHubLatencyEl = document.getElementById('selected-hub-latency');
  const selectedHubBwEl = document.getElementById('selected-hub-bw');
  const selectedHubWorkersEl = document.getElementById('selected-hub-workers');
  const hudCoordsEl = document.getElementById('hud-coords');
  const radarHoverInfo = document.getElementById('radar-hover-info');
  const triggerPingBtn = document.getElementById('trigger-ping-btn');
  const pingConsoleResult = document.getElementById('ping-console-result');

  function selectHub(key) {
    if (!nodeHubs[key]) return;
    activeHubKey = key;
    const hub = nodeHubs[key];

    hubMarkers.forEach((m) => {
      m.classList.toggle('active', m.getAttribute('data-hub') === key);
    });

    if (selectedHubNameEl) selectedHubNameEl.textContent = hub.name;
    if (selectedHubStatusEl) selectedHubStatusEl.textContent = hub.status;
    if (selectedHubLatencyEl) selectedHubLatencyEl.textContent = hub.latency;
    if (selectedHubBwEl) selectedHubBwEl.textContent = hub.bw;
    if (selectedHubWorkersEl) selectedHubWorkersEl.textContent = hub.workers;
    if (hudCoordsEl) hudCoordsEl.textContent = hub.coords;
    if (radarHoverInfo) radarHoverInfo.textContent = `TERHUBUNG: ${hub.name.split(' ')[0]}`;
  }

  hubMarkers.forEach((marker) => {
    marker.addEventListener('click', () => {
      const hubKey = marker.getAttribute('data-hub');
      selectHub(hubKey);
    });
  });

  // Live Ping Simulator
  if (triggerPingBtn && pingConsoleResult) {
    triggerPingBtn.addEventListener('click', () => {
      triggerPingBtn.disabled = true;
      triggerPingBtn.classList.add('btn-ghost');
      pingConsoleResult.innerHTML = `Mengirim ICMP paket echo ke ${nodeHubs[activeHubKey].name}...`;

      let packets = 0;
      const base = nodeHubs[activeHubKey].basePing;
      const results = [];

      const interval = setInterval(() => {
        packets++;
        const curPing = (base + (Math.random() - 0.5) * 2.8).toFixed(1);
        results.push(curPing);

        pingConsoleResult.innerHTML = `
          Paket ${packets}/3 diterima dari ${activeHubKey.toUpperCase()}: waktu=${curPing}ms ttl=56
        `;

        if (packets >= 3) {
          clearInterval(interval);
          triggerPingBtn.disabled = false;
          triggerPingBtn.classList.remove('btn-ghost');
          const avg = (results.reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / 3).toFixed(1);
          pingConsoleResult.innerHTML = `
            <strong>SELESAI:</strong> 3 paket terkirim, 3 diterima (0% loss). Rata-rata: <span class="text-accent">${avg}ms</span>.
          `;
        }
      }, 350);
    });
  }

  // --- 8. Flagship Load Slider Simulation ---
  const loadSlider = document.getElementById('load-slider');
  const loadValEl = document.getElementById('load-val');
  const responseTimeValEl = document.getElementById('response-time-val');
  const autoNodesValEl = document.getElementById('auto-nodes-val');

  if (loadSlider) {
    loadSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      if (loadValEl) loadValEl.textContent = `${val}%`;

      // Calculate dynamic simulated metrics
      const respTime = (0.8 + (val / 100) * 1.5).toFixed(1);
      const nodes = Math.max(2, Math.round(val / 8));

      if (responseTimeValEl) responseTimeValEl.textContent = `${respTime}ms`;
      if (autoNodesValEl) autoNodesValEl.textContent = `${nodes} Unit`;
    });
  }

  // --- 9. Gateway Configurator & Token Generator ---
  const cfgRegion = document.getElementById('cfg-region');
  const cfgProtocol = document.getElementById('cfg-protocol');
  const cfgWorkload = document.getElementById('cfg-workload');
  const cfgRedundancy = document.getElementById('cfg-redundancy');
  const configCodePreview = document.getElementById('config-code-preview');
  const copyTokenBtn = document.getElementById('copy-token-btn');
  const nodeConfigForm = document.getElementById('node-config-form');

  function updateConfigSnippet() {
    if (!configCodePreview) return;
    const region = cfgRegion ? cfgRegion.value : 'tokyo';
    const proto = cfgProtocol ? cfgProtocol.value : 'ym-mesh';
    const workload = cfgWorkload ? cfgWorkload.value : 'edge-api';
    const redundancy = cfgRedundancy ? cfgRedundancy.value : 'multi-zone';

    const sampleToken = 'ym_' + Math.random().toString(36).substring(2, 11);
    configCodePreview.innerHTML = `<code>curl -sSL https://yume.tech/install.sh | bash -s -- --region=${region} --proto=${proto} --profile=${workload} --redundancy=${redundancy} --token=${sampleToken}</code>`;
  }

  [cfgRegion, cfgProtocol, cfgWorkload, cfgRedundancy].forEach((select) => {
    if (select) {
      select.addEventListener('change', () => {
        updateConfigSnippet();
      });
    }
  });

  // Copy to clipboard
  if (copyTokenBtn && configCodePreview) {
    copyTokenBtn.addEventListener('click', () => {
      const textToCopy = configCodePreview.textContent;
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast('Perintah konfigurasi tersalin ke clipboard!');
      }).catch(() => {
        showToast('Gagal menyalin perintah');
      });
    });
  }

  // Modal Dialog Form Submission (R-26, R-32 Accessible)
  const deployModal = document.getElementById('deploy-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalConfirmBtn = document.getElementById('modal-confirm-btn');
  const modalNodeId = document.getElementById('modal-node-id');

  if (nodeConfigForm) {
    nodeConfigForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const generatedId = 'ym-node-' + Math.random().toString(36).substring(2, 8);
      if (modalNodeId) modalNodeId.textContent = generatedId;

      if (deployModal && typeof deployModal.showModal === 'function') {
        deployModal.showModal();
      } else {
        alert(`Node berhasil disiapkan dengan ID: ${generatedId}`);
      }
    });
  }

  function closeModal() {
    if (deployModal && deployModal.open) {
      deployModal.close();
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalConfirmBtn) modalConfirmBtn.addEventListener('click', closeModal);

  // Close modal on Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && deployModal && deployModal.open) {
      closeModal();
    }
  });

  // --- 10. Interactive Cyber Terminal Shell CLI (#console) ---
  const terminalForm = document.getElementById('terminal-form');
  const terminalInput = document.getElementById('terminal-input');
  const terminalDisplay = document.getElementById('terminal-display');
  const quickCmdBtns = document.querySelectorAll('.quick-cmd-btn');
  const quickTerminalTrigger = document.getElementById('quick-terminal-trigger');

  const commandHistory = [];
  let historyIndex = -1;

  function appendTerminalLine(text, isError = false, isAccent = false) {
    if (!terminalDisplay) return;
    const line = document.createElement('div');
    line.className = 'term-line';
    if (isError) line.style.color = 'var(--accent-danger)';
    if (isAccent) line.style.color = 'var(--accent-primary)';
    line.textContent = text;
    terminalDisplay.appendChild(line);
    terminalDisplay.scrollTop = terminalDisplay.scrollHeight;
  }

  function handleCommand(rawCmd) {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    appendTerminalLine(`yume> ${cmd}`, false, true);
    commandHistory.push(cmd);
    historyIndex = commandHistory.length;

    const parts = cmd.toLowerCase().split(' ');
    const root = parts[0];

    switch (root) {
      case 'help':
        appendTerminalLine('Daftar perintah yang tersedia:');
        appendTerminalLine('  status   - Cek status operasional cluster & node global');
        appendTerminalLine('  nodes    - Tampilkan daftar 6 lokasi server tepi YUME');
        appendTerminalLine('  ping     - Tes latensi transmisi (cth: ping tokyo)');
        appendTerminalLine('  diag     - Diagnostik protokol jaringan dan enkripsi');
        appendTerminalLine('  theme    - Beralih mode tema (dark/light)');
        appendTerminalLine('  deploy   - Luncurkan instance konfigurator');
        appendTerminalLine('  clear    - Bersihkan layar terminal');
        appendTerminalLine('  date     - Waktu telemetri sistem saat ini');
        break;

      case 'status':
        appendTerminalLine('[STATUS KERNEL] Sistem Inti: NORMAL');
        appendTerminalLine('  Node Aktif: 128 server di 6 benua');
        appendTerminalLine('  Tingkat Integritas: 100% (Zero-Trust Verified)');
        appendTerminalLine('  Rata-rata Ping Global: 11.8ms');
        break;

      case 'nodes':
        appendTerminalLine('LOKASI NODE CLUSTER YUME:');
        Object.keys(nodeHubs).forEach((key) => {
          const h = nodeHubs[key];
          appendTerminalLine(`  * [${key.toUpperCase()}] ${h.name} - Ping: ${h.latency}`);
        });
        break;

      case 'ping':
        const target = parts[1] || 'tokyo';
        if (nodeHubs[target]) {
          appendTerminalLine(`Mengirim 3 paket ICMP ke [${target.toUpperCase()}]...`);
          setTimeout(() => {
            appendTerminalLine(`  Paket 1: ${nodeHubs[target].latency} (ttl 56)`);
            appendTerminalLine(`  Paket 2: ${(parseFloat(nodeHubs[target].latency) + 0.3).toFixed(1)}ms`);
            appendTerminalLine(`  Paket 3: ${(parseFloat(nodeHubs[target].latency) - 0.2).toFixed(1)}ms`);
            appendTerminalLine('Koneksi stabil tanpa paket drop.');
          }, 300);
        } else {
          appendTerminalLine(`Node '${target}' tidak dikenali. Pilih: tokyo, jakarta, singapore, frankfurt, virginia, sydney`, true);
        }
        break;

      case 'diag':
        appendTerminalLine('[DIAGNOSTIK SISTEM]');
        appendTerminalLine('  Enkripsi: Kyber-1024 + ChaCha20-Poly1305 (Post-Quantum)');
        appendTerminalLine('  Overhead Runtime: < 0.8ms');
        appendTerminalLine('  DDoS Mitigation: scrubbing aktif pada layer L3/L4/L7');
        break;

      case 'theme':
        toggleTheme();
        appendTerminalLine(`Tema dialihkan ke mode: ${document.documentElement.getAttribute('data-theme')}`);
        break;

      case 'deploy':
        const gatewaySec = document.getElementById('gateway');
        if (gatewaySec) {
          gatewaySec.scrollIntoView({ behavior: 'smooth' });
          appendTerminalLine('Mengarahkan pandangan ke formulir deployment...');
        }
        break;

      case 'date':
        appendTerminalLine(`Waktu Sistem: ${new Date().toUTCString()}`);
        break;

      case 'clear':
        terminalDisplay.innerHTML = '';
        break;

      default:
        appendTerminalLine(`Perintah tidak dikenal: '${cmd}'. Ketik 'help' untuk panduan.`, true);
        break;
    }
  }

  if (terminalForm && terminalInput) {
    terminalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleCommand(terminalInput.value);
      terminalInput.value = '';
    });

    // History traversal via Up/Down Arrow
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp') {
        if (historyIndex > 0) {
          historyIndex--;
          terminalInput.value = commandHistory[historyIndex] || '';
        }
      } else if (e.key === 'ArrowDown') {
        if (historyIndex < commandHistory.length - 1) {
          historyIndex++;
          terminalInput.value = commandHistory[historyIndex] || '';
        } else {
          historyIndex = commandHistory.length;
          terminalInput.value = '';
        }
      }
    });
  }

  quickCmdBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      if (terminalInput) {
        terminalInput.value = cmd;
        handleCommand(cmd);
        terminalInput.value = '';
      }
    });
  });

  if (quickTerminalTrigger) {
    quickTerminalTrigger.addEventListener('click', () => {
      const consoleSec = document.getElementById('console');
      if (consoleSec) {
        consoleSec.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          if (terminalInput) terminalInput.focus();
        }, 400);
      }
    });
  }

  // --- 11. Theme Mode Switcher (Obsidian Dark / Light Matrix) ---
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

  // Init theme from storage or system
  const savedTheme = localStorage.getItem('yume-theme');
  if (savedTheme) {
    setTheme(savedTheme);
  }

  // --- 12. Mobile Menu Drawer & Keyboard Accessible Escape ---
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

    // Close mobile menu when clicking any link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('hidden', '');
      });
    });

    // Close on Escape
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileMenu.hasAttribute('hidden')) {
        toggleMobileMenu();
      }
    });
  }

  // --- 13. Toast Notification Helper ---
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
