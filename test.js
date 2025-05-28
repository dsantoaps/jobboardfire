// test.js
// ------------------------------------------------------------
// APS JobBoardFire Integration Script
// ------------------------------------------------------------
(function() {
    // Helper to avoid FOUC when styles haven't finished loading
    const HIDE_CLASS = 'opacity-0 pointer-events-none';
    
    // Safely log errors without breaking execution
    function logError(context, error) {
      console.error(`[APS Integration] Error in ${context}:`, error);
    }
    
    // Ensure Font Awesome is loaded for icons
    function ensureFontAwesome() {
      try {
        if (!document.querySelector('link[href*="font-awesome"]')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
          document.head.appendChild(link);
        }
      } catch (err) {
        logError('ensureFontAwesome', err);
      }
    }
    
    // Initialize font size adjustment functionality
    function initFontSizeAdjustment() {
      try {
        const decreaseBtn = document.querySelector('[data-action="decrease-font"]');
        const increaseBtn = document.querySelector('[data-action="increase-font"]');
        
        if (decreaseBtn && increaseBtn) {
          // Get current font size or set default
          let currentSize = parseInt(localStorage.getItem('aps-font-size') || '100');
          
          // Apply stored font size on page load
          if (currentSize !== 100) {
            document.documentElement.style.fontSize = currentSize + '%';
          }
          
          // Decrease font size
          decreaseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentSize > 80) {
              currentSize -= 10;
              document.documentElement.style.fontSize = currentSize + '%';
              localStorage.setItem('aps-font-size', currentSize.toString());
            }
          });
          
          // Increase font size
          increaseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentSize < 130) {
              currentSize += 10;
              document.documentElement.style.fontSize = currentSize + '%';
              localStorage.setItem('aps-font-size', currentSize.toString());
            }
          });
        }
      } catch (err) {
        logError('initFontSizeAdjustment', err);
      }
    }
    
    // ------------------------------------------------------------
    // 1) Global APS header injection (runs on every page)
    // ------------------------------------------------------------
    function insertGlobalAPSHeader() {
      try {
        const nav = document.querySelector('nav.l-navbar');
        if (!nav) return;
        if (document.getElementById('aps-global-header')) return; // already added
        
        // Create header wrapper with aps-bs namespace
        const headerWrapper = document.createElement('div');
        headerWrapper.id = 'aps-global-header';
        headerWrapper.className = 'aps-bs ' + HIDE_CLASS;
        
        // Header HTML content
        headerWrapper.innerHTML = `
          <header class="navbar navbar-expand-lg fixed-top">
            <div class="container d-flex align-items-center justify-content-between">
              <!-- Logo -->
              <a href="/" class="navbar-brand">
                <img src="https://psychology.org.au/APS/assets/images/logo-aps-large.svg" 
                     alt="Australian Psychological Society Logo" 
                     class="d-none d-xxl-block" 
                     width="190" height="44">
                <img src="https://psychology.org.au/APS/assets/images/logo-aps-small.svg" 
                     alt="APS Logo" 
                     class="d-block d-xxl-none" 
                     width="98" height="36">
              </a>
              
              <!-- Navbar toggler for mobile -->
              <button class="navbar-toggler collapsed" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target="#navbarContent" 
                      aria-controls="navbarContent" 
                      aria-expanded="false" 
                      aria-label="Toggle navigation">
                <i class="fa-solid fa-bars"></i>
              </button>
              
              <!-- Navbar collapse (navigation links) -->
              <div class="collapse navbar-collapse" id="navbarContent">
                <nav class="navbar-nav mx-auto">
                  <a class="nav-link h5" href="https://psychology.org.au/psychology">
                    <span>Psychology</span>
                    <i class="fa-solid fa-chevron-right d-lg-none"></i>
                  </a>
                  <a class="nav-link h5" href="https://psychology.org.au/for-the-public/psychology-topics">
                    <span>Topics</span>
                    <i class="fa-solid fa-chevron-right d-lg-none"></i>
                  </a>
                  <a class="nav-link h5" href="https://psychology.org.au/community">
                    <span>Community</span>
                    <i class="fa-solid fa-chevron-right d-lg-none"></i>
                  </a>
                  <a class="nav-link h5" href="https://psychology.org.au/members">
                    <span>Members</span>
                    <i class="fa-solid fa-chevron-right d-lg-none"></i>
                  </a>
                  <a class="nav-link h5" href="https://psychology.org.au/training-events">
                    <span>Education</span>
                    <i class="fa-solid fa-chevron-right d-lg-none"></i>
                  </a>
                  <a class="nav-link h5" href="https://psychology.org.au/about-us">
                    <span>About APS</span>
                    <i class="fa-solid fa-chevron-right d-lg-none"></i>
                  </a>
                </nav>
              </div>
              
              <!-- Auth button and search icon for desktop -->
              <div class="d-none d-lg-flex align-items-center">
                <!-- Placeholder for any additional buttons -->
              </div>
            </div>
          </header>
        `;
        
        // Insert header before JobBoardFire's navbar
        nav.parentNode.insertBefore(headerWrapper, nav);
        
        // Handle mobile navigation toggle
        const toggleBtn = headerWrapper.querySelector('.navbar-toggler');
        const navContent = headerWrapper.querySelector('#navbarContent');
        
        if (toggleBtn && navContent) {
          toggleBtn.addEventListener('click', () => {
            const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
            toggleBtn.setAttribute('aria-expanded', !isExpanded);
            navContent.classList.toggle('show');
          });
        }
        
        // Reveal once everything is in place
        requestAnimationFrame(() => {
          try {
            headerWrapper.classList.remove(...HIDE_CLASS.split(' '));
          } catch (err) {
            logError('header reveal', err);
            // Fallback if transition fails
            headerWrapper.style.opacity = '1';
            headerWrapper.style.pointerEvents = 'auto';
          }
        });
      } catch (err) {
        logError('insertGlobalAPSHeader', err);
      }
    }
    
    // ------------------------------------------------------------
    // 2) Global APS footer injection (runs on every page)
    // ------------------------------------------------------------
    function insertGlobalAPSFooter() {
      try {
        const existingFooter = document.querySelector('footer.layout__footer, footer.l-footer');
        if (!existingFooter) return;
        if (document.getElementById('aps-global-footer')) return; // already added
        
        // Create footer wrapper with aps-bs namespace
        const footerWrapper = document.createElement('div');
        footerWrapper.id = 'aps-global-footer';
        footerWrapper.className = 'aps-bs ' + HIDE_CLASS;
        
        // Footer HTML content
        footerWrapper.innerHTML = `
          <footer role="contentinfo" class="footer">
            <!-- Top Section with Mariner Background -->
            <div class="footer-top">
              <div class="container">
                <div class="row">
                  <!-- ACNC Logo Column -->
                  <div class="col-12 col-md-3 d-flex align-items-start">
                    <a href="https://www.acnc.gov.au/charity/charities/edbc7be7-c162-ec11-8f8e-00224812259b/profile" rel="noopener">
                      <img src="https://psychology.org.au/APS/assets/images/acnc-logo.png" alt="ACNC Logo" width="180" height="180" class="acnc-logo">
                    </a>
                  </div>
                  
                  <!-- Navigation Links Column -->
                  <div class="col-12 col-md-3">
                    <nav class="footer-links" aria-label="Footer Navigation">
                      <div class="footer-link-group">
                        <a href="https://psychology.org.au/members" class="footer-parent-link">For members</a>
                        <div class="footer-child-links">
                          <a href="https://groups.psychology.org.au/" class="footer-child-link">Groups</a>
                          <a href="https://psychology.org.au/for-members/resource-finder" class="footer-child-link">Resource finder</a>
                          <a href="https://psychology.org.au/for-members/member-advice/professional-advice" class="footer-child-link">Advisory service</a>
                          <a href="https://community.psychology.org.au/home" class="footer-child-link">PsyCommunity</a>
                        </div>
                      </div>
                      <div class="footer-link-group">
                        <a href="https://psychology.org.au/for-the-public" class="footer-parent-link">Community</a>
                        <div class="footer-child-links">
                          <a href="https://psychology.org.au/about-us/what-we-do/advocacy/advocacy-social-issues" class="footer-child-link">Advocating on social issues</a>
                          <a href="https://psychology.org.au/about-us/what-we-do/advocacy/position-statements" class="footer-child-link">Position statements</a>
                          <a href="https://psychology.org.au/find-a-psychologist" class="footer-child-link">Find a Psychologist</a>
                        </div>
                      </div>
                    </nav>
                  </div>
                  
                  <!-- Middle Right Links Column -->
                  <div class="col-12 col-md-3">
                    <nav class="footer-middle-right" aria-label="Additional Footer Links">
                      <a href="https://psychology.org.au/training-and-events" class="footer-middle-right-link">Training and events</a>
                      <a href="https://www.psychxchange.com.au/jobsearch.aspx" class="footer-middle-right-link">PsychXchange</a>
                      <a href="https://psychology.org.au/about-us/news-and-media/advertise-with-us" class="footer-middle-right-link">Advertise with us</a>
                      <a href="https://psychology.org.au/about-us/contact-us" class="footer-middle-right-link">Contact us</a>
                    </nav>
                  </div>
                  
                  <!-- Social Links Column -->
                  <div class="col-12 col-md-3 d-flex justify-content-md-end">
                    <nav class="footer-social d-flex flex-row flex-md-column" aria-label="Social Media Links">
                      <a href="#" class="footer-social-link d-flex justify-content-center align-items-center" data-action="decrease-font" title="-A">
                        <span class="footer-social-text">-A</span>
                      </a>
                      <a href="#" class="footer-social-link d-flex justify-content-center align-items-center" data-action="increase-font" title="+A">
                        <span class="footer-social-text">+A</span>
                      </a>
                      <a href="#" class="footer-social-link d-flex justify-content-center align-items-center" onclick="window.print(); return false;" title="Print">
                        <i class="fa-solid fa-print" aria-hidden="true"></i>
                      </a>
                      <a href="https://www.facebook.com/AustralianPsychologicalSociety/" class="footer-social-link d-flex justify-content-center align-items-center" target="_blank" rel="noopener" title="Facebook">
                        <i class="fa-brands fa-facebook" aria-hidden="true"></i>
                      </a>
                      <a href="https://twitter.com/austpsych" class="footer-social-link d-flex justify-content-center align-items-center" target="_blank" rel="noopener" title="Twitter">
                        <i class="fa-brands fa-twitter" aria-hidden="true"></i>
                      </a>
                      <a href="https://www.linkedin.com/company/australian-psychological-society" class="footer-social-link d-flex justify-content-center align-items-center" target="_blank" rel="noopener" title="LinkedIn">
                        <i class="fa-brands fa-linkedin-in" aria-hidden="true"></i>
                      </a>
                      <a href="https://www.youtube.com/user/austpsychsociety" class="footer-social-link d-flex justify-content-center align-items-center" target="_blank" rel="noopener" title="YouTube">
                        <i class="fa-brands fa-youtube" aria-hidden="true"></i>
                      </a>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Bottom Section with Steel Blue Background -->
            <div class="footer-bottom">
              <div class="container">
                <!-- Flags and Acknowledgement -->
                <div class="row mb-4">
                  <div class="col-12">
                    <div class="d-flex flex-column flex-md-row align-items-center justify-content-center">
                      <div class="footer-flags mb-3 mb-md-0 me-md-3">
                        <img src="https://psychology.org.au/APS/assets/images/aboriginal-flag.svg" width="40" height="24" alt="Aboriginal Flag" class="img-fluid">
                        <img src="https://psychology.org.au/APS/assets/images/torres-strait-islanders-flag.svg" width="40" height="24" alt="Torres Strait Islanders Flag" class="img-fluid">
                      </div>
                      <p class="acknowledgement mb-0">
                        The APS acknowledge Aboriginal and Torres Strait Islander peoples as Australia's First People and Traditional Custodians and pay our respects to Elders past, present and emerging.
                      </p>
                    </div>
                  </div>
                </div>
                
                <!-- Bottom Links and Copyright -->
                <div class="row">
                  <div class="col-md-6">
                  <div class="col-md-6">
                  <nav class="footer-bottom-links" aria-label="Legal Information">
                    <a href="https://psychology.org.au/special-pages/privacy-policy">Privacy</a>
                    <a href="https://psychology.org.au/special-pages/terms-and-conditions">Terms and conditions of use</a>
                  </nav>
                </div>
                <div class="col-md-6 text-md-end">
                  <p class="copyright mb-0">
                    © ${new Date().getFullYear()} The Australian Psychological Society Limited. ACN 000543788. All Rights Reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      `;
      
      // Replace existing footer
      existingFooter.parentNode.replaceChild(footerWrapper, existingFooter);
      
      // Reveal once everything is in place
      requestAnimationFrame(() => {
        try {
          footerWrapper.classList.remove(...HIDE_CLASS.split(' '));
        } catch (err) {
          logError('footer reveal', err);
          // Fallback if transition fails
          footerWrapper.style.opacity = '1';
          footerWrapper.style.pointerEvents = 'auto';
        }
      });
    } catch (err) {
      logError('insertGlobalAPSFooter', err);
    }
  }
  
  // ------------------------------------------------------------
  // 3) APS / psychXchange – classifieds helper
  // ------------------------------------------------------------
  function initClassifiedsHelper() {
    try {
      // Basic constants & utils
      const TARGET_PRODUCT_ID = 'c80f25b3-2b88-4fb4-ac52-bcc21fa3bda0';
      const FROM_TEXT = /30\s*day\s*job\s*post/i; // case-insensitive
      const TO_TEXT = '30 day classified ad';
      
      // Safely pull ?productId=… from the current URL
      function getProductId() {
        try {
          return new URLSearchParams(location.search).get('productId');
        } catch (_) {
          return null;
        }
      }
      
      // Replace text in a node (recursively)
      function replaceText(root, fromRx, toStr) {
        if (root.nodeType === Node.TEXT_NODE) {
          if (fromRx.test(root.textContent)) {
            root.textContent = root.textContent.replace(fromRx, toStr);
          }
        } else {
          root.childNodes.forEach(n => replaceText(n, fromRx, toStr));
        }
      }
      
      // Only run if we are on the correct product page
      if (getProductId() === TARGET_PRODUCT_ID) {
        // Do a first pass immediately
        replaceText(document.body, FROM_TEXT, TO_TEXT);
        
        // Keep watching for Vue/Nuxt updates afterwards
        const observer = new MutationObserver(mutations => {
          mutations.forEach(m => m.addedNodes.forEach(node => {
            replaceText(node, FROM_TEXT, TO_TEXT);
          }));
        });
        
        observer.observe(document.body, { childList: true, subtree: true });
      }
    } catch (err) {
      logError('initClassifiedsHelper', err);
    }
  }
  
  // ------------------------------------------------------------
  // Main initialization
  // ------------------------------------------------------------
  function init() {
    // Ensure Font Awesome is available
    ensureFontAwesome();
    
    // Insert header and footer
    insertGlobalAPSHeader();
    insertGlobalAPSFooter();
    
    // Initialize font size adjustment
    initFontSizeAdjustment();
    
    // Initialize classifieds helper
    initClassifiedsHelper();
  }
  
  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // Retry insertion if page updates dynamically
  let attempts = 0;
  const maxAttempts = 3;
  
  function retryInsertion() {
    if (attempts < maxAttempts) {
      attempts++;
      setTimeout(() => {
        if (!document.getElementById('aps-global-header')) {
          insertGlobalAPSHeader();
        }
        if (!document.getElementById('aps-global-footer')) {
          insertGlobalAPSFooter();
        }
      }, 1000 * attempts);
    }
  }
  
  // Watch for potential dynamic content changes
  if (window.MutationObserver) {
    try {
      const observer = new MutationObserver(() => {
        if (!document.getElementById('aps-global-header') || !document.getElementById('aps-global-footer')) {
          retryInsertion();
        }
      });
      
      observer.observe(document.body, { childList: true, subtree: true });
    } catch (err) {
      logError('MutationObserver', err);
      window.addEventListener('load', retryInsertion);
    }
  } else {
    window.addEventListener('load', retryInsertion);
  }
})();
