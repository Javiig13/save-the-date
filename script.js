/* Configuración dinámica */
// Se lee la URL de Typeform desde config.js (window.APP_CONFIG)

/* Utilidades */
function qs(sel, ctx=document){ return ctx.querySelector(sel); }
function qsa(sel, ctx=document){ return Array.from(ctx.querySelectorAll(sel)); }

/* Menú responsive */
(() => {
  const toggle = qs('.nav-toggle');
  const list = qs('#nav-list');
  if (!toggle || !list) return;
  toggle.addEventListener('click', () => {
    const open = list.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  qsa('.nav-list a').forEach(a => a.addEventListener('click', () => list.classList.remove('open')));

  // Inyección dinámica de labels del nav
  const navCfg = window.APP_CONFIG?.nav;
  if (navCfg) {
    const mapIds = {
      historia: '#nav-historia', ubicacion: '#nav-ubicacion', alojamiento: '#nav-alojamiento', rsvp: '#nav-rsvp'
    };
    Object.entries(mapIds).forEach(([k, sel]) => {
      const el = qs(sel);
      if (el && navCfg[k]) el.textContent = navCfg[k];
    });
  }
})();

/* Cuenta atrás */
(() => {
  const target = new Date((window.APP_CONFIG?.event?.dateISO) || '2026-04-18T13:00:00+02:00');
  const $dd = qs('#dd'), $hh = qs('#hh'), $mm = qs('#mm'), $ss = qs('#ss');
  if (!$dd) return;
  function pad(n){ return String(n).padStart(2,'0'); }
  function update(){
    const now = new Date();
    const diff = Math.max(0, target - now);
    const s = Math.floor(diff/1000);
    $dd.textContent = pad(Math.floor(s / 86400));
    $hh.textContent = pad(Math.floor((s % 86400) / 3600));
    $mm.textContent = pad(Math.floor((s % 3600) / 60));
    $ss.textContent = pad(s % 60);
  }
  update();
  setInterval(update, 1000); // actualización cada segundo
})();

/* Mapa embebido: tabs con diferentes iframes + info asociada */
(() => {
  const iframe = qs('#map-iframe');
  const gallery = qs('#venue-gallery');
  const galleryPhotos = window.APP_CONFIG?.venue?.photos || [];
  if (gallery && galleryPhotos.length) {
    gallery.innerHTML = galleryPhotos.map(src => `<figure class="venue-photo"><img src="${src}" alt="Foto de la finca" loading="lazy"/></figure>`).join('');
  }
  const tabs = qsa('.map-tab');
  if (!iframe || tabs.length === 0) return;

  const CAMINERA_Q = encodeURIComponent(window.APP_CONFIG?.venue?.query || 'Hotel Club de Campo La Caminera Torrenueva');
  const SANTA_CRUZ_Q = encodeURIComponent((window.APP_CONFIG?.hotels?.find(h=>h.id==='santacruz')?.query) || 'Hotel Santa Cruz de Mudela');

  const views = {
    venue: `https://www.google.com/maps?q=${CAMINERA_Q}&output=embed`,
    hotel: `https://www.google.com/maps?q=${SANTA_CRUZ_Q}&output=embed`,
    route: `https://www.google.com/maps?output=embed&saddr=${CAMINERA_Q}&daddr=${SANTA_CRUZ_Q}`,
  };

  const labelCfg = window.APP_CONFIG?.mapLabels;
  const info = {
    venue: {
      title: labelCfg?.venue?.cardTitle || window.APP_CONFIG?.venue?.name || 'La Caminera',
      desc: labelCfg?.venue?.cardDesc || window.APP_CONFIG?.venue?.place || '',
      link: window.APP_CONFIG?.venue?.googleMapsUrl || `https://www.google.com/maps?q=${CAMINERA_Q}`
    },
    hotel: {
      title: labelCfg?.hotel?.cardTitle || 'Hotel Santa Cruz de Mudela',
      desc: labelCfg?.hotel?.cardDesc || 'Aprox. 18 km · ~20 min en coche',
      link: `https://www.google.com/maps?q=${SANTA_CRUZ_Q}`
    },
    route: {
      title: labelCfg?.route?.cardTitle || 'Ruta La Caminera → Santa Cruz',
      desc: labelCfg?.route?.cardDesc || 'Trayecto aproximado 18 km (20 min)',
      link: `https://www.google.com/maps?saddr=${CAMINERA_Q}&daddr=${SANTA_CRUZ_Q}`
    }
  };

  const $title = qs('#map-info-title');
  const $desc = qs('#map-info-desc');
  const $link = qs('#map-info-link');
  const $venueCard = qs('.location-card');
  const $venueNameEl = qs('#venue-name');
  const $venuePlaceEl = qs('#venue-place');
  const $busNote = qs('#bus-note');

  function setView(key){
    iframe.src = views[key] || views.venue;
    tabs.forEach(btn => {
      const active = btn.dataset.map === key;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-selected', String(active));
    });
    if ($title && $desc && $link) {
      // Animación suave temática en la tarjeta
      if ($venueCard) {
        $venueCard.classList.remove('swap-animate');
        // reflow para reiniciar animación
        void $venueCard.offsetWidth;
        $venueCard.classList.add('swap-animate');
      }
      $title.textContent = info[key]?.title || '';
      $desc.textContent = info[key]?.desc || '';
      $link.href = info[key]?.link || '#';
      // Actualizar tarjeta principal
      if ($venueNameEl && $venuePlaceEl && $busNote) {
        if (key === 'venue') {
          $venueNameEl.textContent = info.venue.title;
          $venuePlaceEl.textContent = info.venue.desc;
          $busNote.textContent = (window.APP_CONFIG?.venue?.busNote) || '';
          $busNote.hidden = true; // ocultar en vista venue
        } else if (key === 'hotel') {
          $venueNameEl.textContent = info.hotel.title;
          $venuePlaceEl.textContent = info.hotel.desc;
          $busNote.textContent = '';
          $busNote.hidden = true;
        } else if (key === 'route') {
          $venueNameEl.textContent = 'Servicio entre ambos';
          $venuePlaceEl.textContent = 'Organizaremos autobús entre La Caminera y Santa Cruz de Mudela.';
          $busNote.textContent = (window.APP_CONFIG?.venue?.busNote) || 'Habrá servicio de autobús a Santa Cruz de Mudela.';
          $busNote.hidden = false;
        }
      }
    }
    // Mostrar/ocultar galería según vista: cuando no es 'route', mostrar fotos arriba
    if (gallery) {
      gallery.style.display = key === 'venue' ? 'grid' : 'none';
    }
  }

  tabs.forEach(btn => btn.addEventListener('click', () => setView(btn.dataset.map)));
  setView('venue');
})();

/* Hoteles + Reveal Cupón (desde config) */
(() => {
  const container = qs('#hotels-list');
  if (!container) return;
  const hotels = window.APP_CONFIG?.hotels || [];
  container.innerHTML = hotels.map(h => {
    const tag = h.petFriendly ? '<span class="tag">pet‑friendly</span>' : '';
  const details = h.distance || h.time ? `<ul class="details">${h.distance ? `<li>Distancia: ${h.distance}</li>` : ''}${h.time ? `<li>Tiempo: ${h.time}</li>` : ''}</ul>` : '';
  const features = h.features && h.features.length ? `<ul class="features">${h.features.map(f=>`<li>${f}</li>`).join('')}</ul>` : '';
    const coupon = h.coupon ? `
      <div class="reveal">
    <button class="reveal-btn" aria-expanded="false" aria-controls="coupon-${h.id}">Ver cupón de descuento</button>
        <div id="coupon-${h.id}" class="reveal-panel" hidden>
          <code class="coupon">${h.coupon.code}</code>
          <p class="hint">${h.coupon.hint || ''}</p>
        </div>
      </div>` : '';
    return `
      <article class="card">
        <header>
          <h3>${h.name}</h3>
          ${tag}
        </header>
        <p>${h.description || ''}</p>
        ${details}
    ${features}
        ${coupon}
        <div class="actions">
          <a class="btn btn-ghost" target="_blank" rel="noopener" href="${h.url}">Ver web</a>
        </div>
      </article>`;
  }).join('');

  // Bind reveals
  qsa('.reveal-btn', container).forEach(btn => {
    const id = btn.getAttribute('aria-controls');
    const panel = id ? qs(`#${id}`) : null;
    if (!panel) return;
    btn.addEventListener('click', () => {
      const willOpen = panel.hasAttribute('hidden');
      panel.toggleAttribute('hidden');
      btn.setAttribute('aria-expanded', String(willOpen));
  btn.textContent = willOpen ? 'Ocultar descuento' : 'Ver cupón de descuento';
    });
  });
})();

/* Typeform */
(() => {
  const cfg = window.APP_CONFIG || { typeformUrl: 'https://example.typeform.com/to/placeholder' };
  const btn = qs('#rsvp-btn');
  if (!btn) return;
  btn.href = cfg.typeformUrl;
  const rsvpText = qs('#rsvp-text');
  if (rsvpText) rsvpText.textContent = cfg.texts?.rsvp || '';

  // Preconnect a Typeform al pasar por el botón (mejora TTFB al abrir)
  const preconnected = { tf: false };
  btn.addEventListener('pointerenter', () => {
    if (preconnected.tf || !cfg.typeformUrl) return;
    try {
      const u = new URL(cfg.typeformUrl);
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = `${u.protocol}//${u.host}`;
      document.head.appendChild(link);
      preconnected.tf = true;
    } catch {}
  }, { passive: true });
})();

/* Hero dinámico (nombres, fecha, venue link) */
(() => {
  const title = qs('#hero-title');
  const subtitle = qs('#hero-subtitle');
  const venueName = window.APP_CONFIG?.venue?.name || 'La Caminera';
  const couple = window.APP_CONFIG?.couple || { groom: 'Javier', bride: 'Ana' };
  const dateDay = window.APP_CONFIG?.event?.dateDayText || '';
  const timeText = window.APP_CONFIG?.event?.timeText || '';
  if (title) title.innerHTML = `${couple.groom}<br/>y ${couple.bride}`;
  const heroDate = qs('#hero-date'); if (heroDate) heroDate.textContent = dateDay;
  const heroTime = qs('#hero-time'); if (heroTime) heroTime.textContent = timeText;
  const heroVenue = qs('#hero-venue'); if (heroVenue) heroVenue.textContent = venueName;

  const venueLink = qs('#venue-link');
  if (venueLink) venueLink.href = window.APP_CONFIG?.venue?.googleMapsUrl || '#';
  const venueNameEl = qs('#venue-name'); if (venueNameEl) venueNameEl.textContent = venueName;
  const venuePlaceEl = qs('#venue-place'); if (venuePlaceEl) venuePlaceEl.textContent = window.APP_CONFIG?.venue?.place || '';
  const bus = qs('#bus-note'); if (bus) bus.textContent = window.APP_CONFIG?.venue?.busNote || '';
  const intro = qs('#intro-text'); if (intro) intro.textContent = window.APP_CONFIG?.texts?.intro || '';
})();
/* Menú móvil animación mágica sutil */
(() => {
  const list = qs('#nav-list');
  if (!list) return;
  const observer = new MutationObserver(() => {
    if (list.classList.contains('open')) {
      list.style.opacity = '0';
      list.style.transform = 'translateY(-6px) scale(.98)';
      requestAnimationFrame(() => {
        list.style.transition = 'opacity .35s ease, transform .35s ease';
        list.style.opacity = '1';
        list.style.transform = 'none';
      });
    }
  });
  observer.observe(list, { attributes: true, attributeFilter: ['class'] });
})();

/* Service Worker: cache estático simple */
(() => {
  if ('serviceWorker' in navigator) {
    const register = () => navigator.serviceWorker.register('./sw.js').catch(()=>{});
    if (document.readyState === 'complete') register();
    else window.addEventListener('load', register, { once: true });
  }
})();

/* Timeline desde config */
(() => {
  const list = qs('#timeline');
  const items = window.APP_CONFIG?.story || [];
  if (!list || !items.length) return;
  list.innerHTML = items.map(it => `
    <li>
      <h3>${it.title}</h3>
      <p>${it.text}</p>
    </li>
  `).join('');
})();

/* Reveal on scroll */
(() => {
  const els = qsa('.reveal-on-scroll');
  if (!('IntersectionObserver' in window) || !els.length) {
    els.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
})();

/* Hero parallax y header state on scroll */
(() => {
  const media = qs('.hero-media');
  const header = qs('.site-header');
  if (!media || !header) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY || 0;
    const t = Math.min(1, y / 600);
    media.style.transform = `translateY(${t * 18}px) scale(${1.02 + t*0.01})`;
    header.style.background = y > 12 ? 'rgba(14,18,32,0.72)' : 'rgba(14,18,32,0.6)';
  }, { passive: true });
})();

/* Cursor trail sutil (respeta reduced-motion) */
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (innerWidth < 680) return; // desactivar en móvil para rendimiento
  const canvas = qs('.cursor-trail-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h; const DPR = Math.min(window.devicePixelRatio || 1, 2);
  function resize(){ w = canvas.width = Math.floor(innerWidth * DPR); h = canvas.height = Math.floor(innerHeight * DPR); canvas.style.width = innerWidth+'px'; canvas.style.height = innerHeight+'px'; }
  resize(); window.addEventListener('resize', resize, { passive: true });
  const particles = []; let lastT = 0;
  function add(x, y){
    particles.push({ x: x*DPR, y: y*DPR, a: 1, r: 1.6*DPR, vx: (Math.random()-0.5)*20, vy: (Math.random()-0.5)*20, life: 700 });
  }
  let lastAdd = 0;
  window.addEventListener('mousemove', (e) => {
    const now = performance.now();
    if (now - lastAdd > 40) { // limitar densidad
      add(e.clientX, e.clientY);
      lastAdd = now;
    }
  }, { passive: true });
  function frame(ts){
    const dt = Math.min(32, ts - lastT); lastT = ts;
    ctx.clearRect(0,0,w,h);
    for (let i=particles.length-1;i>=0;i--){
      const p = particles[i];
      p.life -= dt; if (p.life <= 0){ particles.splice(i,1); continue; }
      p.x += p.vx * (dt/1000); p.y += p.vy * (dt/1000);
      p.a = Math.max(0, p.life/700);
      const grad = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*3);
      grad.addColorStop(0, `rgba(205,163,73,${0.45*p.a})`);
      grad.addColorStop(1, 'rgba(205,163,73,0)');
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r*3,0,Math.PI*2); ctx.fill();
    }
  if (particles.length > 120) particles.splice(0, particles.length - 120); // límite de partículas
  requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
