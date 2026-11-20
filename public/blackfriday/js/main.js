/* MTR · Black Friday Shower LP — vanilla JS, no deps. */
(function () {
  'use strict';
  var C = window.CONFIG || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var isSet = function (v) { return v !== null && v !== undefined && v !== '' && !/XX/.test(String(v)); };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var store = {
    get: function (k, s) { try { return (s || sessionStorage).getItem(k); } catch (e) { return null; } },
    set: function (k, v, s) { try { (s || sessionStorage).setItem(k, v); } catch (e) {} }
  };
  var page = document.body.getAttribute('data-page') || 'home';
  // site root, wherever the page is hosted (domain root or a sub-folder)
  var BASE = (function () {
    var sc = document.currentScript || document.querySelector('script[src*="js/main.js"]');
    try { return new URL('../', sc.src).href; } catch (e) { return '/'; }
  })();
  var at = function (p) { return new URL(String(p).replace(/^\//, ''), BASE).href; };

  /* ---------- Fonts: Adobe kit when available, Inter otherwise ---------- */
  if (isSet(C.ADOBE_FONTS_KIT)) {
    var l = document.createElement('link');
    l.rel = 'stylesheet'; l.href = 'https://use.typekit.net/' + C.ADOBE_FONTS_KIT + '.css';
    document.head.appendChild(l);
  }

  /* ---------- CONFIG → page ---------- */
  var phoneDigits = String(C.PHONE || '').replace(/\D/g, '').replace(/^1(?=\d{10}$)/, '');
  $$('[data-cfg]').forEach(function (el) {
    var v = C[el.getAttribute('data-cfg')];
    if (v !== null && v !== undefined) el.textContent = v;
  });
  if (phoneDigits.length === 10) {
    $$('[data-tel]').forEach(function (a) {
      a.href = 'tel:+1' + phoneDigits;
      if (a.hasAttribute('aria-label')) a.setAttribute('aria-label', 'Call ' + C.PHONE);
    });
  }
  $$('[data-spots]').forEach(function (el) {
    if (typeof C.SPOTS === 'number' && C.SPOTS > 0) el.textContent = 'Only ' + C.SPOTS + ' spots left before the holidays.';
  });
  var rl = $('[data-reviews-link]');
  if (rl && isSet(C.GOOGLE_REVIEWS_URL)) { rl.href = C.GOOGLE_REVIEWS_URL; rl.hidden = false; }

  /* ---------- Countdown tape (honest: real CAMPAIGN_END only) ---------- */
  var start = Date.parse(C.CAMPAIGN_START), end = Date.parse(C.CAMPAIGN_END);
  var fmt = function (t) {
    try {
      return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', timeZone: 'America/Chicago' })
        .format(new Date(t)).toUpperCase();
    } catch (e) { return ''; }
  };
  function tick() {
    var now = Date.now();
    var hasEnd = !isNaN(end);
    var ended = hasEnd && now > end;
    var p = 0, label, short;
    if (hasEnd) {
      var s = isNaN(start) ? now : start;
      p = end > s ? Math.max(0, Math.min(1, (now - s) / (end - s))) : 1;
      var days = Math.ceil((end - now) / 86400000);
      label = ended ? 'OFFER ENDED' : 'ENDS ' + fmt(end) + ' · ' + (days <= 1 ? 'LAST DAY' : days + ' DAYS LEFT');
      short = ended ? 'OFFER ENDED' : 'ENDS ' + fmt(end);
    } else {
      label = short = 'ENDS XX'; // P1 pending: dates not set yet
    }
    if (ended) p = 1;
    $$('[data-tape]').forEach(function (t) { t.style.setProperty('--p', (p * 100).toFixed(2)); });
    $$('[data-ends]').forEach(function (el) { el.textContent = label; });
    $$('[data-ends-short]').forEach(function (el) { el.textContent = short; });
    if (ended && !document.documentElement.classList.contains('offer-ended')) {
      document.documentElement.classList.add('offer-ended');
      $$('[data-bf-tag] span').forEach(function (el) { el.textContent = 'OFFER ENDED'; });
      $$('[data-offer]').forEach(function (el) { el.textContent = el.getAttribute('data-ended'); });
    }
  }
  tick();
  setInterval(tick, 60000);

  /* ---------- UTMs: capture on arrival, keep for the session ---------- */
  var TRACK_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid'];
  (function captureUtms() {
    var q = new URLSearchParams(location.search);
    var saved = {};
    try { saved = JSON.parse(store.get('mtr_attr') || '{}'); } catch (e) {}
    var got = false;
    TRACK_KEYS.forEach(function (k) { if (q.get(k)) { saved[k] = q.get(k).slice(0, 200); got = true; } });
    if (!saved.landing_url || got) saved.landing_url = location.href.slice(0, 500);
    if (!saved.referrer) saved.referrer = (document.referrer || '').slice(0, 500);
    if (q.get('fbclid') && !saved.fbc_ts) saved.fbc_ts = Date.now();
    store.set('mtr_attr', JSON.stringify(saved));
  })();
  function attribution() { try { return JSON.parse(store.get('mtr_attr') || '{}'); } catch (e) { return {}; } }
  function cookie(n) { var m = document.cookie.match('(?:^|; )' + n + '=([^;]*)'); return m ? decodeURIComponent(m[1]) : ''; }

  /* ---------- Tracking: Meta Pixel + GA4 (only when IDs are set) ---------- */
  // Never on a local preview, so tests don't pollute the real Pixel/GA4 data.
  var liveHost = !/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
  if (liveHost && isSet(C.META_PIXEL_ID)) {
    !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s); }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', C.META_PIXEL_ID);
    window.fbq('track', 'PageView');
  }
  if (liveHost && isSet(C.GA4_ID)) {
    var g = document.createElement('script'); g.async = true; g.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(C.GA4_ID);
    document.head.appendChild(g);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', C.GA4_ID); // page_view
  }
  var fbq = function () { if (window.fbq) window.fbq.apply(null, arguments); };
  var gtag = function () { if (window.gtag) window.gtag.apply(null, arguments); };

  /* ---------- Thank-you page: Lead fires once per event_id ---------- */
  if (page === 'thank-you') {
    var eid = new URLSearchParams(location.search).get('eid');
    var key = 'mtr_lead_fired_' + eid;
    var fired = store.get(key) || store.get(key, localStorage);
    if (eid && !fired) {
      fbq('track', 'Lead', {}, { eventID: eid });
      gtag('event', 'generate_lead', { event_id: eid });
      store.set(key, '1'); store.set(key, '1', localStorage);
    }
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !reduced) {
    var ro = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); ro.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { ro.observe(el); });
  } else reveals.forEach(function (el) { el.classList.add('is-in'); });

  if (page !== 'home') return;

  /* ---------- Desktop-only background loop (never on mobile) ---------- */
  var bg = $('[data-hero-bg]');
  if (bg && !reduced && window.matchMedia('(min-width: 1024px)').matches) {
    var v = document.createElement('video');
    v.muted = true; v.loop = true; v.autoplay = true; v.playsInline = true;
    v.setAttribute('muted', ''); v.setAttribute('playsinline', ''); v.preload = 'none';
    v.poster = at('assets/img/hero-bg-poster-960.webp');
    v.src = at('assets/video/bathroom-walkthrough.mp4');
    bg.appendChild(v);
    var pp = v.play(); if (pp && pp.catch) pp.catch(function () {});
  }

  /* ---------- VSL facade: player loads only on click ---------- */
  var vsl = $('[data-vsl]');
  if (vsl) {
    var V = C.VSL || {};
    var dur = $('[data-vsl-duration]', vsl);
    if (dur && V.duration) dur.textContent = 'WATCH · ' + V.duration;
    if (isSet(V.poster) && !/vsl-placeholder-1920\.jpg$/.test(V.poster)) {
      var pi = $('[data-vsl-poster]', vsl);
      $$('source', vsl).forEach(function (s) { s.remove(); });
      pi.removeAttribute('srcset'); pi.src = at(V.poster);
    }
    var embedUrl = function () {
      var u = String(V.url || ''), p = String(V.provider || '').toLowerCase(), id;
      if (!isSet(u)) return null;
      if (p === 'youtube') {
        id = (u.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/) || [])[1] || u;
        return 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0&modestbranding=1&playsinline=1&vq=hd1080';
      }
      if (p === 'vimeo') {
        var m = u.match(/vimeo\.com\/(?:video\/)?(\d+)(?:\/(\w+))?/);
        id = m ? m[1] : u;
        return 'https://player.vimeo.com/video/' + id + '?autoplay=1&playsinline=1&quality=1080p' + (m && m[2] ? '&h=' + m[2] : '');
      }
      if (p === 'wistia') {
        id = (u.match(/(?:medias|iframe)\/(\w+)/) || [])[1] || u;
        return 'https://fast.wistia.net/embed/iframe/' + id + '?autoPlay=true&playsinline=true&qualityMin=1080&videoFoam=false';
      }
      if (p === 'mp4') return u;
      return null;
    };
    var played = false;

    /* Vimeo, chromeless: our own play/pause + sound, nothing from Vimeo on screen */
    var ICON = {
      play: '<svg width="22" height="22" viewBox="0 0 24 24"><path d="M7 4.5v15a1 1 0 0 0 1.5.9l12-7.5a1 1 0 0 0 0-1.8l-12-7.5A1 1 0 0 0 7 4.5Z" fill="currentColor"/></svg>',
      pause: '<svg width="20" height="20" viewBox="0 0 24 24"><rect x="6" y="4.5" width="4" height="15" rx="1" fill="currentColor"/><rect x="14" y="4.5" width="4" height="15" rx="1" fill="currentColor"/></svg>',
      sound: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor"/><path d="M15.5 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11"/></svg>',
      muted: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor"/><path d="m16 9.5 5 5M21 9.5l-5 5"/></svg>'
    };
    var loadVimeoSdk = function (cb) {
      if (window.Vimeo && window.Vimeo.Player) return cb();
      var sc = document.createElement('script');
      sc.src = 'https://player.vimeo.com/api/player.js';
      sc.onload = function () { cb(); };
      sc.onerror = function () { cb(true); };
      document.head.appendChild(sc);
    };
    var startVimeo = function () {
      var m = String(V.url || '').match(/vimeo\.com\/(?:video\/)?(\d+)(?:\/(\w+))?/);
      if (!m) return false;
      var q = 'controls=0&autoplay=1&playsinline=1&title=0&byline=0&portrait=0&dnt=1&quality=1080p' + (m[2] ? '&h=' + m[2] : '');
      var box = document.createElement('div');
      box.className = 'vsl-player';
      box.innerHTML =
        '<iframe src="https://player.vimeo.com/video/' + m[1] + '?' + q + '" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" title="Video from Leonardo, owner of My Team Renovation" tabindex="-1"></iframe>' +
        '<button type="button" class="vsl-player__layer" aria-label="Pause video"><span class="vsl-player__big" aria-hidden="true">' + ICON.play + '</span></button>' +
        '<button type="button" class="vsl-player__btn vsl-player__pp" aria-label="Pause video">' + ICON.pause + '</button>' +
        '<button type="button" class="vsl-player__btn vsl-player__snd" aria-label="Mute">' + ICON.sound + '</button>';
      vsl.parentNode.insertBefore(box, vsl.nextSibling);
      vsl.classList.add('is-playing');
      vsl.setAttribute('aria-hidden', 'true'); vsl.tabIndex = -1;

      var layer = $('.vsl-player__layer', box), pp = $('.vsl-player__pp', box), snd = $('.vsl-player__snd', box);
      var playing = true, muted = false, player = null;
      var paint = function () {
        box.classList.toggle('is-on', playing);
        var l = playing ? 'Pause video' : 'Play video';
        layer.setAttribute('aria-label', l); pp.setAttribute('aria-label', l);
        pp.innerHTML = playing ? ICON.pause : ICON.play;
        snd.innerHTML = muted ? ICON.muted : ICON.sound;
        snd.setAttribute('aria-label', muted ? 'Turn sound on' : 'Mute');
      };
      var toggle = function () { if (!player) return; playing ? player.pause() : player.play(); };
      layer.addEventListener('click', toggle);
      pp.addEventListener('click', toggle);
      snd.addEventListener('click', function () {
        if (!player) return;
        muted = !muted; paint();
        player.setVolume(muted ? 0 : 1);
        if (!muted && !playing) player.play();
      });
      paint();
      loadVimeoSdk(function (err) {
        if (err) return;
        player = new window.Vimeo.Player($('iframe', box));
        player.on('play', function () { playing = true; paint(); });
        player.on('pause', function () { playing = false; paint(); });
        player.on('ended', function () { playing = false; paint(); });
        // Browsers that block sound on autoplay (iOS): start muted, the sound button turns it on
        player.play().catch(function () {
          muted = true; paint();
          player.setVolume(0).then(function () { return player.play(); }).catch(function () { playing = false; paint(); });
        });
      });
      return true;
    };

    vsl.addEventListener('click', function () {
      if (played) return;
      if (String(V.provider).toLowerCase() === 'vimeo') {
        if (!startVimeo()) return;
        played = true;
        fbq('track', 'ViewContent', { content_name: 'VSL' });
        gtag('event', 'video_start', { video_title: 'VSL' });
        return;
      }
      var src = embedUrl();
      if (!src) return; // P11: final video not delivered yet; the HD placeholder stays
      played = true;
      var el;
      if (String(V.provider).toLowerCase() === 'mp4') {
        el = document.createElement('video');
        el.src = src; el.controls = true; el.autoplay = true; el.playsInline = true;
      } else {
        el = document.createElement('iframe');
        el.src = src; el.title = 'Video from Leonardo, owner of My Team Renovation';
        el.allow = 'autoplay; fullscreen; picture-in-picture; encrypted-media';
        el.allowFullscreen = true;
      }
      vsl.classList.add('is-playing');
      vsl.appendChild(el);
      fbq('track', 'ViewContent', { content_name: 'VSL' });
      gtag('event', 'video_start', { video_title: 'VSL' });
    });
  }

  /* ---------- Before/after comparator ---------- */
  $$('.ba__frame').forEach(function (f) {
    var r = $('.ba__range', f);
    var set = function () { f.style.setProperty('--pos', r.value + '%'); r.setAttribute('aria-valuetext', r.value + '% before'); };
    r.addEventListener('input', set);
    set();
  });

  /* ---------- Motion 1 · before/after "nudge" (once, when the photo is in view) ---------- */
  if ('IntersectionObserver' in window && !reduced) {
    var nudge = function (f) {
      var r = $('.ba__range', f), stop = false, t0 = null;
      var keys = [[0, 50], [.32, 74], [.68, 28], [1, 50]], dur = 1700;
      var ease = function (x) { return x < .5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2; };
      var cancel = function () { stop = true; };
      f.addEventListener('pointerdown', cancel, { once: true });
      r.addEventListener('keydown', cancel, { once: true });
      (function step(ts) {
        if (stop) return;
        if (t0 === null) t0 = ts;
        var k = Math.min((ts - t0) / dur, 1), i = 1;
        while (k > keys[i][0]) i++;
        var a = keys[i - 1], b = keys[i], local = ease((k - a[0]) / (b[0] - a[0]));
        f.style.setProperty('--pos', (a[1] + (b[1] - a[1]) * local) + '%');
        if (k < 1) requestAnimationFrame(step); else f.style.setProperty('--pos', r.value + '%');
      })(performance.now());
    };
    var no = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        no.disconnect();
        setTimeout(function () { nudge(e.target); }, 350);
      });
    }, { threshold: .6 });
    var firstFrame = $('#ba-1 .ba__frame');
    if (firstFrame) no.observe(firstFrame);
  }

  /* ---------- Motion 2 · measuring tape fills with the scroll ---------- */
  var steps = $('.steps');
  if (steps && !reduced) {
    var row = window.matchMedia('(min-width: 768px)');
    var ticking = false;
    var paintTape = function () {
      ticking = false;
      var rc = steps.getBoundingClientRect(), vh = window.innerHeight;
      var p = row.matches ? (vh * .9 - rc.top) / (vh * .45) : (vh * .85 - rc.top) / rc.height;
      steps.style.setProperty('--fill', Math.max(0, Math.min(1, p)).toFixed(3));
    };
    var onScroll = function () { if (!ticking) { ticking = true; requestAnimationFrame(paintTape); } };
    steps.classList.add('is-tape');
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    paintTape();
  }
  var tabs = $$('.ba-tab');
  function selectTab(t, focus) {
    tabs.forEach(function (x) {
      var on = x === t;
      x.setAttribute('aria-selected', on);
      x.tabIndex = on ? 0 : -1;
      var panel = document.getElementById(x.getAttribute('aria-controls'));
      panel.hidden = !on;
      if (on) {
        var r = $('.ba__range', panel); r.value = 50; r.dispatchEvent(new Event('input'));
      }
    });
    if (focus) t.focus();
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { selectTab(t); });
    t.addEventListener('keydown', function (e) {
      var k = e.key, n = null;
      if (k === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
      if (k === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
      if (k === 'Home') n = tabs[0];
      if (k === 'End') n = tabs[tabs.length - 1];
      if (n) { e.preventDefault(); selectTab(n, true); }
    });
  });

  /* ---------- Reviewer photos (CONFIG.REVIEW_PHOTOS; neutral avatar otherwise) ---------- */
  if (C.REVIEW_PHOTOS) {
    $$('.review__avatar[data-photo]').forEach(function (img) {
      var k = 'assets/img/' + img.getAttribute('data-photo');
      img.srcset = at(k + '-160.webp') + ' 160w, ' + at(k + '-320.webp') + ' 320w';
      img.sizes = '56px';
      img.src = at(k + '-160.jpg');
    });
  }

  /* ---------- Reviews: Read more ---------- */
  $$('.review--clamp').forEach(function (card) {
    var b = $('.more', card), q = $('q', card);
    if (q.scrollHeight <= q.clientHeight + 2) { b.hidden = true; return; }
    b.addEventListener('click', function () {
      var open = card.classList.toggle('is-open');
      b.setAttribute('aria-expanded', open);
      b.textContent = open ? 'Show less' : 'Show more';
    });
  });

  /* ---------- Anchors → form, focus first field ---------- */
  var form = $('#lead-form');
  var estimate = $('#estimate');
  $$('a[href="#estimate"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var id = a.getAttribute('data-cta') || 'link';
      store.set('mtr_cta', id);
      gtag('event', 'cta_click', { cta_id: id, cta_text: a.textContent.trim() });
      estimate.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
      var first = $('#f-name');
      setTimeout(function () { first.focus({ preventScroll: true }); }, reduced ? 0 : 550);
      if (history.replaceState) history.replaceState(null, '', '#estimate');
    });
  });

  /* ---------- Sticky mobile dock: after hero, hidden while form is visible ---------- */
  var dock = $('[data-dock]');
  if (dock && 'IntersectionObserver' in window) {
    var heroGone = false, formSeen = false;
    var paint = function () {
      var on = heroGone && !formSeen;
      dock.classList.toggle('is-on', on);
      dock.setAttribute('aria-hidden', !on);
      $('a', dock).tabIndex = on ? 0 : -1;
    };
    new IntersectionObserver(function (es) { heroGone = !es[0].isIntersecting; paint(); }, { threshold: 0 }).observe($('.hero__cta'));
    new IntersectionObserver(function (es) { formSeen = es[0].isIntersecting; paint(); }, { threshold: 0.05 }).observe(estimate);
  }

  /* ---------- Form ---------- */
  if (!form) return;
  var phone = $('#f-phone'), zip = $('#f-zip');
  var formatPhone = function (v) {
    var d = v.replace(/\D/g, '');
    if (d.length === 11 && d[0] === '1') d = d.slice(1);
    d = d.slice(0, 10);
    if (d.length < 4) return d.length ? '(' + d : '';
    if (d.length < 7) return '(' + d.slice(0, 3) + ') ' + d.slice(3);
    return '(' + d.slice(0, 3) + ') ' + d.slice(3, 6) + '-' + d.slice(6);
  };
  phone.addEventListener('input', function () { phone.value = formatPhone(phone.value); });
  zip.addEventListener('input', function () { zip.value = zip.value.replace(/\D/g, '').slice(0, 5); });

  var rules = {
    first_name: function (v) { return v.trim().length >= 1 ? '' : 'Please enter your first name.'; },
    phone: function (v) { var d = v.replace(/\D/g, ''); return d.length === 10 && /^[2-9]/.test(d) ? '' : 'Please enter a 10-digit US mobile number.'; },
    zip: function (v) { return /^\d{5}$/.test(v) ? '' : 'Please enter a 5-digit ZIP code.'; },
    email: function (v) { return !v || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'Please check your email, or leave it blank.'; }
  };
  var errId = { first_name: 'e-name', phone: 'e-phone', zip: 'e-zip', email: 'e-email' };
  function validate(showAll) {
    var firstBad = null;
    Object.keys(rules).forEach(function (n) {
      var input = form.elements[n], msg = rules[n](input.value);
      if (showAll || input.getAttribute('aria-invalid')) {
        input.setAttribute('aria-invalid', msg ? 'true' : 'false');
        document.getElementById(errId[n]).textContent = msg;
      }
      if (msg && !firstBad) firstBad = input;
    });
    var pt = form.querySelector('input[name="project_type"]:checked');
    var pe = document.getElementById('e-project');
    if (showAll) pe.textContent = pt ? '' : 'Please choose one option.';
    if (!pt && !firstBad) firstBad = form.querySelector('input[name="project_type"]');
    return firstBad;
  }
  Object.keys(rules).forEach(function (n) {
    form.elements[n].addEventListener('blur', function () {
      if (form.elements[n].value) { form.elements[n].setAttribute('aria-invalid', 'false'); validate(false); }
    });
  });
  $$('input[name="project_type"]', form).forEach(function (r) {
    r.addEventListener('change', function () { document.getElementById('e-project').textContent = ''; });
  });

  var uuid = function () {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return 'e' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
  };
  var status = $('[data-status]');
  var submit = $('button[type="submit"]', form);
  var sending = false;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (sending) return;
    status.textContent = '';
    var bad = validate(true);
    if (bad) { bad.focus(); return; }

    var a = attribution();
    TRACK_KEYS.concat(['landing_url', 'referrer']).forEach(function (k) { if (form.elements[k]) form.elements[k].value = a[k] || ''; });
    var eid = uuid();
    form.elements.event_id.value = eid;

    var data = {};
    new FormData(form).forEach(function (v, k) { data[k] = String(v); });
    data.fbp = cookie('_fbp');
    data.fbc = cookie('_fbc') || (a.fbclid ? 'fb.1.' + (a.fbc_ts || Date.now()) + '.' + a.fbclid : '');
    data.page_url = location.href;
    data.cta = store.get('mtr_cta') || 'form';

    sending = true;
    submit.setAttribute('aria-busy', 'true');
    fetch(at(C.LEAD_ENDPOINT || 'api/lead.php'), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (res) {
        if (!res.ok || !res.j.ok) throw new Error('lead_failed');
        location.href = at('thank-you/') + '?eid=' + encodeURIComponent(eid);
      })
      .catch(function () {
        sending = false;
        submit.removeAttribute('aria-busy');
        var tel = phoneDigits.length === 10 ? 'tel:+1' + phoneDigits : 'tel:';
        status.innerHTML = '';
        status.appendChild(document.createTextNode('Something went wrong. Call us at '));
        var link = document.createElement('a'); link.href = tel; link.textContent = C.PHONE || '';
        status.appendChild(link); status.appendChild(document.createTextNode('.'));
      });
  });
})();
