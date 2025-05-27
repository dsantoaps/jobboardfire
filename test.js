// test.js
console.log("Hello, world!");

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