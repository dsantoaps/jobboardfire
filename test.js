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
    
     // Add standalone styles to ensure proper styling regardless of external CSS
     function addStandaloneStyles() {
        try {
          const styleEl = document.createElement('style');
          styleEl.id = 'aps-standalone-styles';
          styleEl.textContent = `
            /* Reset and base styles */
            .aps-bs * {
              box-sizing: border-box;
            }
            
            /* Colors */
            :root {
              --aps-mariner: #1D75DE;
              --aps-steel-blue: #04355F;
              --aps-white: #FFFFFF;
              --aps-soft-grey: #F3F4F6;
            }
            
            /* Header styles */
            .aps-bs .navbar {
              height: 8.75rem;
              background-color: var(--aps-mariner);
              transition: height .3s ease-out;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              z-index: 1100;
              position: relative;
            }
            
            .aps-bs .navbar .container {
              max-width: 1440px;
              margin: 0 auto;
              padding: 0 2rem;
              height: 100%;
              display: flex;
              align-items: center;
            }
            
            .aps-bs .navbar-brand {
              margin-right: 1.5rem;
            }
            
            .aps-bs .navbar-brand img {
              width: auto;
              height: 2.75rem;
            }
            
            .aps-bs .navbar-nav {
              display: flex;
              align-items: center;
              margin: 0 auto;
            }
            
            .aps-bs .nav-link {
              font-family: 'Inter', sans-serif;
              font-size: 1rem;
              font-weight: 600;
              line-height: 1.5;
              color: var(--aps-white);
              margin: 0 1.5rem;
              padding: 0.25rem 0;
              text-decoration: none;
              border-bottom: 1px solid transparent;
              transition: border-bottom-color .2s ease-out;
            }
            
            .aps-bs .nav-link:hover {
              color: var(--aps-white);
              border-bottom-color: var(--aps-white);
            }
            
            /* Footer styles */
            .aps-bs .footer-top {
              background-color: var(--aps-mariner);
              padding: 2rem;
              color: var(--aps-white);
            }
            
            .aps-bs .footer-bottom {
              background-color: var(--aps-steel-blue);
              padding: 1.5rem;
              color: var(--aps-white);
            }
            
            /* Grid system */
            .aps-bs .container {
              width: 100%;
              padding-right: 15px;
              padding-left: 15px;
              margin-right: auto;
              margin-left: auto;
            }
            
            @media (min-width: 576px) {
              .aps-bs .container {
                max-width: 540px;
              }
            }
            
            @media (min-width: 768px) {
              .aps-bs .container {
                max-width: 720px;
              }
            }
            
            @media (min-width: 992px) {
              .aps-bs .container {
                max-width: 960px;
              }
            }
            
            @media (min-width: 1200px) {
              .aps-bs .container {
                max-width: 1140px;
              }
            }
            
            .aps-bs .row {
              display: flex;
              flex-wrap: wrap;
              margin-right: -15px;
              margin-left: -15px;
            }
            
            .aps-bs .col-12 {
              flex: 0 0 100%;
              max-width: 100%;
              padding-right: 15px;
              padding-left: 15px;
            }
            
            @media (min-width: 768px) {
              .aps-bs .col-md-3 {
                flex: 0 0 25%;
                max-width: 25%;
                padding-right: 15px;
                padding-left: 15px;
              }
              
              .aps-bs .col-md-6 {
                flex: 0 0 50%;
                max-width: 50%;
                padding-right: 15px;
                padding-left: 15px;
              }
            }
            
            /* Utility classes */
            .aps-bs .d-flex {
              display: flex !important;
            }
            
            .aps-bs .flex-column {
              flex-direction: column !important;
            }
            
            .aps-bs .flex-row {
              flex-direction: row !important;
            }
            
            .aps-bs .justify-content-center {
              justify-content: center !important;
            }
            
            .aps-bs .justify-content-md-end {
              justify-content: flex-end !important;
            }
            
            .aps-bs .align-items-center {
              align-items: center !important;
            }
            
            .aps-bs .align-items-start {
              align-items: flex-start !important;
            }
            
            .aps-bs .mb-0 {
              margin-bottom: 0 !important;
            }
            
            .aps-bs .mb-3 {
              margin-bottom: 1rem !important;
            }
            
            .aps-bs .mb-4 {
              margin-bottom: 1.5rem !important;
            }
            
            .aps-bs .me-md-3 {
              margin-right: 1rem !important;
            }
            
            .aps-bs .text-md-end {
              text-align: right !important;
            }
            
            /* Responsive adjustments */
            @media (max-width: 991.98px) {
              .aps-bs .navbar {
                height: 6rem;
              }
              
              .aps-bs .navbar-collapse {
                position: fixed;
                top: 6rem;
                left: 0;
                width: 100%;
                height: calc(100vh - 6rem);
                background-color: var(--aps-mariner);
                padding: 1.5rem;
                overflow-y: auto;
                z-index: 1050;
                transform: translateX(-100%);
                transition: transform 0.3s ease-in-out;
              }
              
              .aps-bs .navbar-collapse.show {
                transform: translateX(0);
              }
              
              .aps-bs .navbar-nav {
                flex-direction: column;
                align-items: flex-start;
              }
              
              .aps-bs .nav-link {
                width: 100%;
                margin: 0;
                padding: 1rem 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
              }
            }
            
            @media (min-width: 992px) {
              .aps-bs .d-lg-none {
                display: none !important;
              }
              
              .aps-bs .d-lg-flex {
                display: flex !important;
              }
            }
            
            @media (max-width: 991.98px) {
              .aps-bs .d-lg-none {
                display: block !important;
              }
              
              .aps-bs .d-none.d-lg-flex {
                display: none !important;
              }
            }
          `;
          document.head.appendChild(styleEl);
        } catch (err) {
          logError('addStandaloneStyles', err);
        }
      }
    // Add critical inline styles to ensure basic styling
    function addCriticalStyles() {
      try {
        const styleEl = document.createElement('style');
        styleEl.id = 'aps-critical-styles';
        styleEl.textContent = `
          .aps-bs .navbar {
            background-color: #1D75DE;
            color: white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            z-index: 1100;
          }
          .aps-bs .navbar-brand img {
            max-height: 44px;
            width: auto;
          }
          .aps-bs .nav-link {
            color: white;
            font-weight: 600;
          }
          .aps-bs .navbar-toggler {
            color: white;
            border: none;
          }
          .aps-bs .footer-top {
            background-color: #1D75DE;
            color: white;
            padding: 2rem;
          }
          .aps-bs .footer-bottom {
            background-color: #04355F;
            color: white;
            padding: 1.5rem;
          }
          .aps-bs .footer a {
            color: white;
            text-decoration: none;
          }
          .aps-bs .footer-social-link {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0.75rem 1rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.26);
          }
          .aps-bs .container {
            width: 100%;
            padding-right: var(--bs-gutter-x, 0.75rem);
            padding-left: var(--bs-gutter-x, 0.75rem);
            margin-right: auto;
            margin-left: auto;
          }
          @media (min-width: 576px) {
            .aps-bs .container {
              max-width: 540px;
            }
          }
          @media (min-width: 768px) {
            .aps-bs .container {
              max-width: 720px;
            }
          }
          @media (min-width: 992px) {
            .aps-bs .container {
              max-width: 960px;
            }
          }
          @media (min-width: 1200px) {
            .aps-bs .container {
              max-width: 1140px;
            }
          }
          @media (min-width: 1400px) {
            .aps-bs .container {
              max-width: 1320px;
            }
          }
          .aps-bs .row {
            display: flex;
            flex-wrap: wrap;
            margin-right: calc(var(--bs-gutter-x) * -0.5);
            margin-left: calc(var(--bs-gutter-x) * -0.5);
          }
          .aps-bs .col-12 {
            flex: 0 0 auto;
            width: 100%;
          }
          @media (min-width: 768px) {
            .aps-bs .col-md-3 {
              flex: 0 0 auto;
              width: 25%;
            }
            .aps-bs .col-md-6 {
              flex: 0 0 auto;
              width: 50%;
            }
          }
          .aps-bs .d-flex {
            display: flex !important;
          }
          .aps-bs .flex-column {
            flex-direction: column !important;
          }
          .aps-bs .flex-row {
            flex-direction: row !important;
          }
          .aps-bs .justify-content-center {
            justify-content: center !important;
          }
          .aps-bs .justify-content-md-end {
            justify-content: flex-end !important;
          }
          .aps-bs .align-items-center {
            align-items: center !important;
          }
          .aps-bs .align-items-start {
            align-items: flex-start !important;
          }
          .aps-bs .mb-0 {
            margin-bottom: 0 !important;
          }
          .aps-bs .mb-3 {
            margin-bottom: 1rem !important;
          }
          .aps-bs .mb-4 {
            margin-bottom: 1.5rem !important;
          }
          .aps-bs .me-md-3 {
            margin-right: 1rem !important;
          }
          .aps-bs .text-md-end {
            text-align: right !important;
          }
          .aps-bs .img-fluid {
            max-width: 100%;
            height: auto;
          }
          .aps-bs .opacity-0 {
            opacity: 0 !important;
          }
          .aps-bs .pointer-events-none {
            pointer-events: none !important;
          }
        `;
        document.head.appendChild(styleEl);
      } catch (err) {
        logError('addCriticalStyles', err);
      }
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
        headerWrapper.style.cssText = 'position: relative; z-index: 1100;';
        
        // Header HTML content
        headerWrapper.innerHTML = `
          <header class="navbar navbar-expand-lg" style="background-color: #1D75DE; color: white; padding: 1rem 0;">
            <div class="container d-flex align-items-center justify-content-between">
              <!-- Logo -->
              <a href="/" class="navbar-brand" style="margin-right: 1.5rem;">
                <img src="https://psychology.org.au/APS/assets/images/logo-aps-large.svg" 
                     alt="Australian Psychological Society Logo" 
                     class="d-none d-xxl-block" 
                     width="190" height="44"
                     style="max-height: 44px; width: auto;">
                <img src="https://psychology.org.au/APS/assets/images/logo-aps-small.svg" 
                     alt="APS Logo" 
                     class="d-block d-xxl-none" 
                     width="98" height="36"
                     style="max-height: 36px; width: auto;">
              </a>
              
              <!-- Navbar toggler for mobile -->
              <button class="navbar-toggler collapsed" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target="#navbarContent" 
                      aria-controls="navbarContent" 
                      aria-expanded="false" 
                      aria-label="Toggle navigation"
                      style="color: white; border: none;">
                <i class="fa-solid fa-bars"></i>
              </button>
              
              <!-- Navbar collapse (navigation links) -->
              <div class="collapse navbar-collapse" id="navbarContent">
                <nav class="navbar-nav mx-auto" style="margin: 0 auto;">
                  <a class="nav-link h5" href="https://psychology.org.au/psychology" style="color: white; font-weight: 600; margin: 0 1rem;">
                    <span>Psychology</span>
                    <i class="fa-solid fa-chevron-right d-lg-none"></i>
                  </a>
                  <a class="nav-link h5" href="https://psychology.org.au/for-the-public/psychology-topics" style="color: white; font-weight: 600; margin: 0 1rem;">
                    <span>Topics</span>
                    <i class="fa-solid fa-chevron-right d-lg-none"></i>
                  </a>
                  <a class="nav-link h5" href="https://psychology.org.au/community" style="color: white; font-weight: 600; margin: 0 1rem;">
                    <span>Community</span>
                    <i class="fa-solid fa-chevron-right d-lg-none"></i>
                  </a>
                  <a class="nav-link h5" href="https://psychology.org.au/members" style="color: white; font-weight: 600; margin: 0 1rem;">
                    <span>Members</span>
                    <i class="fa-solid fa-chevron-right d-lg-none"></i>
                  </a>
                  <a class="nav-link h5" href="https://psychology.org.au/training-events" style="color: white; font-weight: 600; margin: 0 1rem;">
                    <span>Education</span>
                    <i class="fa-solid fa-chevron-right d-lg-none"></i>
                  </a>
                  <a class="nav-link h5" href="https://psychology.org.au/about-us" style="color: white; font-weight: 600; margin: 0 1rem;">
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
        
        // Footer HTML content with inline styles
        footerWrapper.innerHTML = `
          <footer role="contentinfo" class="footer" style="width: 100%; margin-bottom: 0;">
            <!-- Top Section with Mariner Background -->
            <div class="footer-top" style="background-color: #1D75DE; color: white; padding: 2rem;">
              <div class="container">
                <div class="row">
                  <!-- ACNC Logo Column -->
                  <div class="col-12 col-md-3 d-flex align-items-start">
                    <a href="https://www.acnc.gov.au/charity/charities/edbc7be7-c162-ec11-8f8e-00224812259b/profile" rel="noopener" style="color: white; text-decoration: none;">
                      <img src="https://psychology.org.au/APS/assets/images/acnc-logo.png" alt="AC
                      <img src="https://psychology.org.au/APS/assets/images/acnc-logo.png" alt="ACNC Logo" width="180" height="180" class="acnc-logo" style="width: 180px; height: 180px;">
                  </a>
                </div>
                
                <!-- Navigation Links Column -->
                <div class="col-12 col-md-3">
                  <nav class="footer-links" aria-label="Footer Navigation" style="display: flex; flex-direction: column; align-items: flex-start;">
                    <div class="footer-link-group" style="width: 100%;">
                      <a href="https://psychology.org.au/members" class="footer-parent-link" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 1rem; font-weight: 700; display: block; margin-bottom: 0.5rem; text-decoration: none; color: white;">For members</a>
                      <div class="footer-child-links" style="display: flex; flex-direction: column;">
                        <a href="https://groups.psychology.org.au/" class="footer-child-link" style="font-size: 0.875rem; margin-bottom: 0.25rem; text-decoration: none; color: white;">Groups</a>
                        <a href="https://psychology.org.au/for-members/resource-finder" class="footer-child-link" style="font-size: 0.875rem; margin-bottom: 0.25rem; text-decoration: none; color: white;">Resource finder</a>
                        <a href="https://psychology.org.au/for-members/member-advice/professional-advice" class="footer-child-link" style="font-size: 0.875rem; margin-bottom: 0.25rem; text-decoration: none; color: white;">Advisory service</a>
                        <a href="https://community.psychology.org.au/home" class="footer-child-link" style="font-size: 0.875rem; margin-bottom: 0.25rem; text-decoration: none; color: white;">PsyCommunity</a>
                      </div>
                    </div>
                    <div class="footer-link-group" style="width: 100%; margin-top: 2.1875rem;">
                      <a href="https://psychology.org.au/for-the-public" class="footer-parent-link" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 1rem; font-weight: 700; display: block; margin-bottom: 0.5rem; text-decoration: none; color: white;">Community</a>
                      <div class="footer-child-links" style="display: flex; flex-direction: column;">
                        <a href="https://psychology.org.au/about-us/what-we-do/advocacy/advocacy-social-issues" class="footer-child-link" style="font-size: 0.875rem; margin-bottom: 0.25rem; text-decoration: none; color: white;">Advocating on social issues</a>
                        <a href="https://psychology.org.au/about-us/what-we-do/advocacy/position-statements" class="footer-child-link" style="font-size: 0.875rem; margin-bottom: 0.25rem; text-decoration: none; color: white;">Position statements</a>
                        <a href="https://psychology.org.au/find-a-psychologist" class="footer-child-link" style="font-size: 0.875rem; margin-bottom: 0.25rem; text-decoration: none; color: white;">Find a Psychologist</a>
                      </div>
                    </div>
                  </nav>
                </div>
                
                <!-- Middle Right Links Column -->
                <div class="col-12 col-md-3">
                  <nav class="footer-middle-right" aria-label="Additional Footer Links" style="display: flex; flex-direction: column; align-items: flex-start;">
                    <a href="https://psychology.org.au/training-and-events" class="footer-middle-right-link" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 1rem; font-weight: 700; text-decoration: none; color: white;">Training and events</a>
                    <a href="https://www.psychxchange.com.au/jobsearch.aspx" class="footer-middle-right-link" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 1rem; font-weight: 700; text-decoration: none; color: white; margin-top: 2.1875rem;">PsychXchange</a>
                    <a href="https://psychology.org.au/about-us/news-and-media/advertise-with-us" class="footer-middle-right-link" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 1rem; font-weight: 700; text-decoration: none; color: white; margin-top: 2.1875rem;">Advertise with us</a>
                    <a href="https://psychology.org.au/about-us/contact-us" class="footer-middle-right-link" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 1rem; font-weight: 700; text-decoration: none; color: white; margin-top: 2.1875rem;">Contact us</a>
                  </nav>
                </div>
                
                <!-- Social Links Column -->
                <div class="col-12 col-md-3 d-flex justify-content-md-end">
                  <nav class="footer-social d-flex flex-row flex-md-column" aria-label="Social Media Links" style="gap: 0;">
                    <a href="#" class="footer-social-link d-flex justify-content-center align-items-center" data-action="decrease-font" title="-A" style="width: 100%; padding: 0.75rem 1rem; text-decoration: none; border-bottom: 1px solid rgba(255, 255, 255, 0.26); color: white; display: flex; justify-content: center; align-items: center; font-size: 1rem;">
                      <span class="footer-social-text" style="font-size: 1rem; line-height: 1.5;">-A</span>
                    </a>
                    <a href="#" class="footer-social-link d-flex justify-content-center align-items-center" data-action="increase-font" title="+A" style="width: 100%; padding: 0.75rem 1rem; text-decoration: none; border-bottom: 1px solid rgba(255, 255, 255, 0.26); color: white; display: flex; justify-content: center; align-items: center; font-size: 1rem;">
                      <span class="footer-social-text" style="font-size: 1rem; line-height: 1.5;">+A</span>
                    </a>
                    <a href="#" class="footer-social-link d-flex justify-content-center align-items-center" onclick="window.print(); return false;" title="Print" style="width: 100%; padding: 0.75rem 1rem; text-decoration: none; border-bottom: 1px solid rgba(255, 255, 255, 0.26); color: white; display: flex; justify-content: center; align-items: center; font-size: 1rem;">
                      <i class="fa-solid fa-print" aria-hidden="true" style="font-size: 1rem; height: 1.25rem;"></i>
                    </a>
                    <a href="https://www.facebook.com/AustralianPsychologicalSociety/" class="footer-social-link d-flex justify-content-center align-items-center" target="_blank" rel="noopener" title="Facebook" style="width: 100%; padding: 0.75rem 1rem; text-decoration: none; border-bottom: 1px solid rgba(255, 255, 255, 0.26); color: white; display: flex; justify-content: center; align-items: center; font-size: 1rem;">
                      <i class="fa-brands fa-facebook" aria-hidden="true" style="font-size: 1rem; height: 1.25rem;"></i>
                    </a>
                    <a href="https://twitter.com/austpsych" class="footer-social-link d-flex justify-content-center align-items-center" target="_blank" rel="noopener" title="Twitter" style="width: 100%; padding: 0.75rem 1rem; text-decoration: none; border-bottom: 1px solid rgba(255, 255, 255, 0.26); color: white; display: flex; justify-content: center; align-items: center; font-size: 1rem;">
                      <i class="fa-brands fa-twitter" aria-hidden="true" style="font-size: 1rem; height: 1.25rem;"></i>
                    </a>
                    <a href="https://www.linkedin.com/company/australian-psychological-society" class="footer-social-link d-flex justify-content-center align-items-center" target="_blank" rel="noopener" title="LinkedIn" style="width: 100%; padding: 0.75rem 1rem; text-decoration: none; border-bottom: 1px solid rgba(255, 255, 255, 0.26); color: white; display: flex; justify-content: center; align-items: center; font-size: 1rem;">
                      <i class="fa-brands fa-linkedin-in" aria-hidden="true" style="font-size: 1rem; height: 1.25rem;"></i>
                    </a>
                    <a href="https://www.youtube.com/user/austpsychsociety" class="footer-social-link d-flex justify-content-center align-items-center" target="_blank" rel="noopener" title="YouTube" style="width: 100%; padding: 0.75rem 1rem; text-decoration: none; border-bottom: 1px solid rgba(255, 255, 255, 0.26); color: white; display: flex; justify-content: center; align-items: center; font-size: 1rem;">
                      <i class="fa-brands fa-youtube" aria-hidden="true" style="font-size: 1rem; height: 1.25rem;"></i>
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Bottom Section with Steel Blue Background -->
          <div class="footer-bottom" style="background-color: #04355F; padding: 1.5rem; color: white;">
            <div class="container">
              <!-- Flags and Acknowledgement -->
              <div class="row mb-4">
                <div class="col-12">
                  <div class="d-flex flex-column flex-md-row align-items-center justify-content-center">
                    <div class="footer-flags mb-3 mb-md-0 me-md-3" style="display: inline-flex; align-items: center; gap: 0.375rem;">
                      <img src="https://psychology.org.au/APS/assets/images/aboriginal-flag.svg" width="40" height="24" alt="Aboriginal Flag" class="img-fluid" style="width: 40px; height: 24px;">
                      <img src="https://psychology.org.au/APS/assets/images/torres-strait-islanders-flag.svg" width="40" height="24" alt="Torres Strait Islanders Flag" class="img-fluid" style="width: 40px; height: 24px;">
                    </div>
                    <p class="acknowledgement mb-0" style="color: white;">
                      The APS acknowledge Aboriginal and Torres Strait Islander peoples as Australia's First People and Traditional Custodians and pay our respects to Elders past, present and emerging.
                    </p>
                  </div>
                </div>
              </div>
              
              <!-- Bottom Links and Copyright -->
              <div class="row">
                <div class="col-md-6">
                  <nav class="footer-bottom-links" aria-label="Legal Information" style="display: flex; flex-wrap: wrap; gap: 1rem;">
                    <a href="https://psychology.org.au/special-pages/privacy-policy" style="font-size: 0.6875rem; font-weight: 600; color: rgba(215, 237, 248, 0.5); text-decoration: none;">Privacy</a>
                    <a href="https://psychology.org.au/special-pages/terms-and-conditions" style="font-size: 0.6875rem; font-weight: 600; color: rgba(215, 237, 248, 0.5); text-decoration: none;">Terms and conditions of use</a>
                  </nav>
                </div>
                <div class="col-md-6 text-md-end">
                  <p class="copyright mb-0" style="font-size: 0.6875rem; color: rgba(215, 237, 248, 0.5); margin-bottom: 0;">
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
    // Add standalone styles first
    addStandaloneStyles();
    // Add critical styles first
    addCriticalStyles();
    
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
