// test.js
console.log("Hello, world!");
// ------------------------------------------------------------
// 1) Global APS header injection (runs on every page)
// ------------------------------------------------------------
(function insertGlobalAPSHeader() {
    /* helper to avoid FOUC when Tailwind hasn’t finished */
    const TW_HIDE = 'opacity-0 pointer-events-none';
  
    function addHeader() {
      const nav = document.querySelector('nav.l-navbar');
      if (!nav) return;
      if (document.getElementById('aps-global-header')) return; // already added
  
      /* ----------  HEADER  ---------- */
      const header = document.createElement('div');
      header.id    = 'aps-global-header';
      header.className =
        'fixed top-0 inset-x-0 bg-white shadow-md z-[60] ' + TW_HIDE;
  
      header.innerHTML = `
    <div class="container mx-auto flex items-center justify-between py-3 px-4">
      <!-- Logo -->
      <a href="/" class="flex items-center shrink-0">
        <img src="https://psychology.org.au/APS/assets/images/logo-aps-large.svg"
             alt="Australian Psychological Society Logo"
             class="hidden 2xl:block w-[190px] h-[44px]" loading="lazy">
        <img src="https://psychology.org.au/APS/assets/images/logo-aps-small.svg"
             alt="APS Logo"
             class="block 2xl:hidden w-[98px] h-[36px]" loading="lazy">
      </a>
  
      <!-- Mobile toggler -->
      <button id="aps-nav-toggle"
              class="2xl:hidden text-gray-800 focus:outline-none p-2"
              aria-label="Toggle navigation">
        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
  
      <!-- Nav links -->
      <nav id="aps-nav"
           class="flex-col 2xl:flex-row gap-6 items-start 2xl:items-center
                  hidden 2xl:flex mt-4 2xl:mt-0">
        <a href="https://psychology.org.au/psychology"
           class="text-gray-800 font-medium hover:text-brand-primary">Psychology</a>
        <a href="https://psychology.org.au/for-the-public/psychology-topics"
           class="text-gray-800 font-medium hover:text-brand-primary">Topics</a>
        <a href="https://psychology.org.au/community"
           class="text-gray-800 font-medium hover:text-brand-primary">Community</a>
        <a href="https://psychology.org.au/members"
           class="text-gray-800 font-medium hover:text-brand-primary">Members</a>
        <a href="https://psychology.org.au/training-events"
           class="text-gray-800 font-medium hover:text-brand-primary">Education</a>
        <a href="https://psychology.org.au/about-us"
           class="text-gray-800 font-medium hover:text-brand-primary">About APS</a>
      </nav>
    </div>
      `;
  
      /* insert header *before* JobBoardFire’s navbar */
      nav.parentNode.insertBefore(header, nav);
  
      /* ---  tiny JS to toggle nav on small screens --- */
      const toggleBtn = header.querySelector('#aps-nav-toggle');
      const navEl     = header.querySelector('#aps-nav');
      toggleBtn.addEventListener('click', () => {
        navEl.classList.toggle('hidden');
      });
  
      /* reveal once everything is in place */
      requestAnimationFrame(() => header.classList.remove(...TW_HIDE.split(' ')));
    }
  
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', addHeader);
    } else {
      addHeader();
    }
  })();
  

/*  APS / psychXchange – classifieds helper
    ------------------------------------------------------------
    (c) 2025  –  drop anywhere after <body> or load asynchronously
*/
(function APSClassifiedsBootstrap () {
    /* ---------------------------------------------
       Basic constants & utils
    ------------------------------------------------*/
    const TARGET_PRODUCT_ID =
          'c80f25b3-2b88-4fb4-ac52-bcc21fa3bda0';
  
    const FROM_TEXT  = /30\s*day\s*job\s*post/i;         // case-insensitive
    const TO_TEXT    = '30 day classified ad';
  
    /** Safely pull ?productId=… from the current URL */
    function getProductId () {
      try {
        return new URLSearchParams(location.search).get('productId');
      } catch (_) {
        return null;
      }
    }
  
    /* ------------------------------------------------------------
       Tiny “framework” – gives you one place to add enhancements
    ------------------------------------------------------------*/
    const APSClassifieds = {
      /** Register functions that run once the DOM is ready */
      _initFns : [],
  
      /** Call this to register new initialisers later on */
      onInit   (fn) {
        if (typeof fn === 'function') this._initFns.push(fn);
      },
  
      /** Replace text in a node (recursively) */
      _replaceText (root, fromRx, toStr) {
        if (root.nodeType === Node.TEXT_NODE) {
          if (fromRx.test(root.textContent)) {
            root.textContent = root.textContent.replace(fromRx, toStr);
          }
        } else {
          root.childNodes.forEach(n => this._replaceText(n, fromRx, toStr));
        }
      },
  
      /** Starts a MutationObserver so late-loaded nodes are handled too */
      _observeChanges (handler) {
        const mo = new MutationObserver(muts => {
          muts.forEach(m => m.addedNodes.forEach(handler));
        });
        mo.observe(document.body, { childList: true, subtree: true });
        return mo;
      },
  
      /** Run every registered init function, wrapped in try/catch */
      _run () {
        this._initFns.forEach(fn => {
          try { fn.call(this); } catch (err) {
            console.error('[APSClassifieds]', err);
          }
        });
      }
    };
  
    /* ------------------------------------------------------------
       Feature 1 – rename “30 day job post” => “30 day classified ad”
    ------------------------------------------------------------*/
    APSClassifieds.onInit(function renameJobPostText () {
      const apply = node => this._replaceText(node, FROM_TEXT, TO_TEXT);
  
      /* Do a first pass immediately … */
      apply(document.body);
      /* … and keep watching for Vue/Nuxt updates afterwards */
      this._observeChanges(apply);
    });
  
    /* ------------------------------------------------------------
       Boot loader – only fire if we are on the correct product page
    ------------------------------------------------------------*/
    if (getProductId() === TARGET_PRODUCT_ID) {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => APSClassifieds._run());
      } else {
        APSClassifieds._run();
      }
    }
  })();