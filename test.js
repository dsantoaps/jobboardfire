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
          
          // Create header wrapper
          const headerWrapper = document.createElement('div');
          headerWrapper.id = 'aps-global-header';
          headerWrapper.style.cssText = 'position: relative; z-index: 1100; opacity: 0; transition: opacity 0.3s ease;';
          
          // Header HTML content with inline styles
          headerWrapper.innerHTML = `
            <header style="background-color: #1D75DE; color: white; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); height: 8.75rem; position: relative;">
              <div style="max-width: 1440px; margin: 0 auto; padding: 0 2rem; height: 100%; display: flex; align-items: center; justify-content: space-between;">
                <!-- Logo -->
                <a href="/" style="margin-right: 1.5rem; display: block;">
                  <img src="https://psychology.org.au/APS/assets/images/logo-aps-large.svg" 
                       alt="Australian Psychological Society Logo" 
                       style="max-height: 44px; width: auto; display: none;"
                       media="(min-width: 1400px)">
                  <img src="https://psychology.org.au/APS/assets/images/logo-aps-small.svg" 
                       alt="APS Logo" 
                       style="max-height: 36px; width: auto; display: block;">
                </a>
                
                <!-- Navbar toggler for mobile -->
                <button id="aps-nav-toggle"
                        style="background: none; border: none; color: white; padding: 0.5rem; cursor: pointer; display: block;"
                        aria-label="Toggle navigation">
                  <i class="fa-solid fa-bars" style="font-size: 1.5rem;"></i>
                </button>
                
                <!-- Navigation links -->
                <nav id="aps-nav"
                     style="display: none; position: absolute; top: 100%; left: 0; width: 100%; background-color: #1D75DE; padding: 1rem; z-index: 1050;">
                  <div style="display: flex; flex-direction: column; gap: 1rem;">
                    <a href="https://psychology.org.au/psychology" 
                       style="color: white; font-weight: 600; font-size: 1rem; text-decoration: none; padding: 0.5rem 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1); display: flex; justify-content: space-between; align-items: center;">
                      <span>Psychology</span>
                      <i class="fa-solid fa-chevron-right"></i>
                    </a>
                    <a href="https://psychology.org.au/for-the-public/psychology-topics" 
                       style="color: white; font-weight: 600; font-size: 1rem; text-decoration: none; padding: 0.5rem 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1); display: flex; justify-content: space-between; align-items: center;">
                      <span>Topics</span>
                      <i class="fa-solid fa-chevron-right"></i>
                    </a>
                    <a href="https://psychology.org.au/community" 
                       style="color: white; font-weight: 600; font-size: 1rem; text-decoration: none; padding: 0.5rem 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1); display: flex; justify-content: space-between; align-items: center;">
                      <span>Community</span>
                      <i class="fa-solid fa-chevron-right"></i>
                    </a>
                    <a href="https://psychology.org.au/members" 
                       style="color: white; font-weight: 600; font-size: 1rem; text-decoration: none; padding: 0.5rem 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1); display: flex; justify-content: space-between; align-items: center;">
                      <span>Members</span>
                      <i class="fa-solid fa-chevron-right"></i>
                    </a>
                    <a href="https://psychology.org.au/training-events" 
                       style="color: white; font-weight: 600; font-size: 1rem; text-decoration: none; padding: 0.5rem 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1); display: flex; justify-content: space-between; align-items: center;">
                      <span>Education</span>
                      <i class="fa-solid fa-chevron-right"></i>
                    </a>
                    <a href="https://psychology.org.au/about-us" 
                       style="color: white; font-weight: 600; font-size: 1rem; text-decoration: none; padding: 0.5rem 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1); display: flex; justify-content: space-between; align-items: center;">
                      <span>About APS</span>
                      <i class="fa-solid fa-chevron-right"></i>
                    </a>
                  </div>
                </nav>
                
                <!-- Desktop navigation -->
                <div style="display: none; margin: 0 auto;">
                  <a href="https://psychology.org.au/psychology" 
                     style="color: white; font-weight: 600; font-size: 1rem; text-decoration: none; margin: 0 1.5rem; padding: 0.25rem 0; border-bottom: 1px solid transparent;">
                    Psychology
                  </a>
                  <a href="https://psychology.org.au/for-the-public/psychology-topics" 
                     style="color: white; font-weight: 600; font-size: 1rem; text-decoration: none; margin: 0 1.5rem; padding: 0.25rem 0; border-bottom: 1px solid transparent;">
                    Topics
                  </a>
                  <a href="https://psychology.org.au/community" 
                     style="color: white; font-weight: 600; font-size: 1rem; text-decoration: none; margin: 0 1.5rem; padding: 0.25rem 0; border-bottom: 1px solid transparent;">
                    Community
                  </a>
                  <a href="https://psychology.org.au/members" 
                     style="color: white; font-weight: 600; font-size: 1rem; text-decoration: none; margin: 0 1.5rem; padding: 0.25rem 0; border-bottom: 1px solid transparent;">
                    Members
                  </a>
                  <a href="https://psychology.org.au/training-events" 
                     style="color: white; font-weight: 600; font-size: 1rem; text-decoration: none; margin: 0 1.5rem; padding: 0.25rem 0; border-bottom: 1px solid transparent;">
                    Education
                  </a>
                  <a href="https://psychology.org.au/about-us" 
                     style="color: white; font-weight: 600; font-size: 1rem; text-decoration: none; margin: 0 1.5rem; padding: 0.25rem 0; border-bottom: 1px solid transparent;">
                    About APS
                  </a>
                </div>
                
                <!-- Placeholder for desktop -->
                <div style="display: none;"></div>
              </div>
            </header>
          `;
          
          // Insert header before JobBoardFire's navbar
          nav.parentNode.insertBefore(headerWrapper, nav);
          
          // Handle mobile navigation toggle
          const toggleBtn = headerWrapper.querySelector('#aps-nav-toggle');
          const navEl = headerWrapper.querySelector('#aps-nav');
          
          if (toggleBtn && navEl) {
            toggleBtn.addEventListener('click', () => {
              const isVisible = navEl.style.display === 'block';
              navEl.style.display = isVisible ? 'none' : 'block';
              toggleBtn.innerHTML = isVisible 
                ? '<i class="fa-solid fa-bars" style="font-size: 1.5rem;"></i>' 
                : '<i class="fa-solid fa-xmark" style="font-size: 1.5rem;"></i>';
            });
          }
          
          // Apply responsive styles
          function applyResponsiveStyles() {
            const desktop = window.matchMedia('(min-width: 992px)').matches;
            const desktopNav = headerWrapper.querySelector('div[style*="margin: 0 auto;"]');
            const mobileToggle = headerWrapper.querySelector('#aps-nav-toggle');
            const largeLogoImg = headerWrapper.querySelector('img[media="(min-width: 1400px)"]');
            const smallLogoImg = headerWrapper.querySelector('img[alt="APS Logo"]');
            
            if (desktop) {
              desktopNav.style.display = 'flex';
              mobileToggle.style.display = 'none';
              navEl.style.display = 'none'; // Hide mobile nav when switching to desktop
              
              if (window.matchMedia('(min-width: 1400px)').matches) {
                largeLogoImg.style.display = 'block';
                smallLogoImg.style.display = 'none';
              } else {
                largeLogoImg.style.display = 'none';
                smallLogoImg.style.display = 'block';
              }
            } else {
              desktopNav.style.display = 'none';
              mobileToggle.style.display = 'block';
              largeLogoImg.style.display = 'none';
              smallLogoImg.style.display = 'block';
            }
          }
          
          // Apply responsive styles initially and on resize
          applyResponsiveStyles();
          window.addEventListener('resize', applyResponsiveStyles);
          
          // Reveal once everything is in place
          setTimeout(() => {
            headerWrapper.style.opacity = '1';
          }, 50);
          
        } catch (err) {
          console.error(`[APS Integration] Error in insertGlobalAPSHeader:`, err);
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
          
          // Create footer wrapper
          const footerWrapper = document.createElement('div');
          footerWrapper.id = 'aps-global-footer';
          footerWrapper.style.cssText = 'opacity: 0; transition: opacity 0.3s ease;';
          
          // Footer HTML content with inline styles
          footerWrapper.innerHTML = `
            <footer style="width: 100%; margin-bottom: 0; box-sizing: border-box;">
              <!-- Top Section with Mariner Background -->
              <div style="background-color: #1D75DE; color: white; padding: 2rem; box-sizing: border-box;">
                <div style="max-width: 1200px; margin: 0 auto; padding: 0 15px; box-sizing: border-box;">
                  <div style="display: flex; flex-wrap: wrap; margin: 0 -15px; box-sizing: border-box;">
                    <!-- ACNC Logo Column -->
                    <div style="flex: 0 0 100%; max-width: 100%; padding: 0 15px; box-sizing: border-box; margin-bottom: 1.5rem;">
                      <a href="https://www.acnc.gov.au/charity/charities/edbc7be7-c162-ec11-8f8e-00224812259b/profile" rel="noopener" style="color: white; text-decoration: none;">
                        <img src="https://psychology.org.au/APS/assets/images/acnc-logo.png" alt="ACNC Logo" style="width: 120px; height: 120px;">
                      </a>
                    </div>
                    
                    <!-- Navigation Links Column -->
                    <div style="flex: 0 0 100%; max-width: 100%; padding: 0 15px; box-sizing: border-box; margin-bottom: 1.5rem;">
                      <div style="display: flex; flex-direction: column; align-items: flex-start;">
                        <div style="width: 100%; margin-bottom: 1.5rem;">
                          <a href="https://psychology.org.au/members" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 1rem; font-weight: 700; display: block; margin-bottom: 0.5rem; text-decoration: none; color: white;">For members</a>
                          <div style="display: flex; flex-direction: column;">
                            <a href="https://groups.psychology.org.au/" style="font-size: 0.875rem; margin-bottom: 0.25rem; text-decoration: none; color: white;">Groups</a>
                            <a href="https://psychology.org.au/for-members/resource-finder" style="font-size: 0.875rem; margin-bottom: 0.25rem; text-decoration: none; color: white;">Resource finder</a>
                            <a href="https://psychology.org.au/for-members/member-advice/professional-advice" style="font-size: 0.875rem; margin-bottom: 0.25rem; text-decoration: none; color: white;">Advisory service</a>
                            <a href="https://community.psychology.org.au/home" style="font-size: 0.875rem; margin-bottom: 0.25rem; text-decoration: none; color: white;">PsyCommunity</a>
                          </div>
                        </div>
                        <div style="width: 100%;">
                          <a href="https://psychology.org.au/for-the-public" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 1rem; font-weight: 700; display: block; margin-bottom: 0.5rem; text-decoration: none; color: white;">Community</a>
                          <div style="display: flex; flex-direction: column;">
                            <a href="https://psychology.org.au/about-us/what-we-do/advocacy/advocacy-social-issues" style="font-size: 0.875rem; margin-bottom: 0.25rem; text-decoration: none; color: white;">Advocating on social issues</a>
                            <a href="https://psychology.org.au/about-us/what-we-do/advocacy/position-statements" style="font-size: 0.875rem; margin-bottom: 0.25rem; text-decoration: none; color: white;">Position statements</a>
                            <a href="https://psychology.org.au/find-a-psychologist" style="font-size: 0.875rem
      
                        <a href="https://psychology.org.au/find-a-psychologist" style="font-size: 0.875rem; margin-bottom: 0.25rem; text-decoration: none; color: white;">Find a Psychologist</a>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Middle Right Links Column -->
              <div style="flex: 0 0 100%; max-width: 100%; padding: 0 15px; box-sizing: border-box; margin-bottom: 1.5rem;">
                <div style="display: flex; flex-direction: column; align-items: flex-start;">
                  <a href="https://psychology.org.au/training-and-events" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 1rem; font-weight: 700; text-decoration: none; color: white; margin-bottom: 1rem;">Training and events</a>
                  <a href="https://www.psychxchange.com.au/jobsearch.aspx" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 1rem; font-weight: 700; text-decoration: none; color: white; margin-bottom: 1rem;">PsychXchange</a>
                  <a href="https://psychology.org.au/about-us/news-and-media/advertise-with-us" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 1rem; font-weight: 700; text-decoration: none; color: white; margin-bottom: 1rem;">Advertise with us</a>
                  <a href="https://psychology.org.au/about-us/contact-us" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 1rem; font-weight: 700; text-decoration: none; color: white;">Contact us</a>
                </div>
              </div>
              
              <!-- Social Links Column -->
              <div style="flex: 0 0 100%; max-width: 100%; padding: 0 15px; box-sizing: border-box;">
                <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem;">
                  <a href="#" data-action="decrease-font" title="-A" style="width: 44px; height: 44px; display: flex; justify-content: center; align-items: center; text-decoration: none; color: white; background-color: rgba(255, 255, 255, 0.1); border-radius: 4px;">
                    <span style="font-size: 1rem; line-height: 1.5;">-A</span>
                  </a>
                  <a href="#" data-action="increase-font" title="+A" style="width: 44px; height: 44px; display: flex; justify-content: center; align-items: center; text-decoration: none; color: white; background-color: rgba(255, 255, 255, 0.1); border-radius: 4px;">
                    <span style="font-size: 1rem; line-height: 1.5;">+A</span>
                  </a>
                  <a href="#" onclick="window.print(); return false;" title="Print" style="width: 44px; height: 44px; display: flex; justify-content: center; align-items: center; text-decoration: none; color: white; background-color: rgba(255, 255, 255, 0.1); border-radius: 4px;">
                    <i class="fa-solid fa-print" aria-hidden="true" style="font-size: 1rem;"></i>
                  </a>
                  <a href="https://www.facebook.com/AustralianPsychologicalSociety/" target="_blank" rel="noopener" title="Facebook" style="width: 44px; height: 44px; display: flex; justify-content: center; align-items: center; text-decoration: none; color: white; background-color: rgba(255, 255, 255, 0.1); border-radius: 4px;">
                    <i class="fa-brands fa-facebook" aria-hidden="true" style="font-size: 1rem;"></i>
                  </a>
                  <a href="https://twitter.com/austpsych" target="_blank" rel="noopener" title="Twitter" style="width: 44px; height: 44px; display: flex; justify-content: center; align-items: center; text-decoration: none; color: white; background-color: rgba(255, 255, 255, 0.1); border-radius: 4px;">
                    <i class="fa-brands fa-twitter" aria-hidden="true" style="font-size: 1rem;"></i>
                  </a>
                  <a href="https://www.linkedin.com/company/australian-psychological-society" target="_blank" rel="noopener" title="LinkedIn" style="width: 44px; height: 44px; display: flex; justify-content: center; align-items: center; text-decoration: none; color: white; background-color: rgba(255, 255, 255, 0.1); border-radius: 4px;">
                    <i class="fa-brands fa-linkedin-in" aria-hidden="true" style="font-size: 1rem;"></i>
                  </a>
                  <a href="https://www.youtube.com/user/austpsychsociety" target="_blank" rel="noopener" title="YouTube" style="width: 44px; height: 44px; display: flex; justify-content: center; align-items: center; text-decoration: none; color: white; background-color: rgba(255, 255, 255, 0.1); border-radius: 4px;">
                    <i class="fa-brands fa-youtube" aria-hidden="true" style="font-size: 1rem;"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Bottom Section with Steel Blue Background -->
        <div style="background-color: #04355F; padding: 1.5rem; color: white; box-sizing: border-box;">
          <div style="max-width: 1200px; margin: 0 auto; padding: 0 15px; box-sizing: border-box;">
            <!-- Flags and Acknowledgement -->
            <div style="margin-bottom: 1.5rem; text-align: center;">
              <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 1rem;">
                <img src="https://psychology.org.au/APS/assets/images/aboriginal-flag.svg" width="40" height="24" alt="Aboriginal Flag" style="width: 40px; height: 24px; margin-right: 0.375rem;">
                <img src="https://psychology.org.au/APS/assets/images/torres-strait-islanders-flag.svg" width="40" height="24" alt="Torres Strait Islanders Flag" style="width: 40px; height: 24px;">
              </div>
              <p style="margin: 0; color: white; font-size: 0.875rem; line-height: 1.5;">
                The APS acknowledge Aboriginal and Torres Strait Islander peoples as Australia's First People and Traditional Custodians and pay our respects to Elders past, present and emerging.
              </p>
            </div>
            
            <!-- Bottom Links and Copyright -->
            <div style="display: flex; flex-direction: column; gap: 1rem;">
              <div style="text-align: center;">
                <a href="https://psychology.org.au/special-pages/privacy-policy" style="font-size: 0.6875rem; font-weight: 600; color: rgba(215, 237, 248, 0.5); text-decoration: none; margin-right: 1rem;">Privacy</a>
                <a href="https://psychology.org.au/special-pages/terms-and-conditions" style="font-size: 0.6875rem; font-weight: 600; color: rgba(215, 237, 248, 0.5); text-decoration: none;">Terms and conditions of use</a>
              </div>
              <div style="text-align: center;">
                <p style="font-size: 0.6875rem; color: rgba(215, 237, 248, 0.5); margin: 0;">
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
    
    // Apply responsive styles
    function applyResponsiveStyles() {
      const desktop = window.matchMedia('(min-width: 768px)').matches;
      
      if (desktop) {
        // Update to desktop layout
        const columns = footerWrapper.querySelectorAll('div[style*="flex: 0 0 100%"]');
        columns.forEach(col => {
          col.style.flex = '0 0 25%';
          col.style.maxWidth = '25%';
          col.style.marginBottom = '0';
        });
        
        // Update social links to vertical layout on desktop
        const socialLinks = footerWrapper.querySelector('div[style*="display: flex; flex-wrap: wrap;"]');
        if (socialLinks) {
          socialLinks.style.flexDirection = 'column';
          socialLinks.style.alignItems = 'flex-end';
          
          // Make social links full width in the column
          const links = socialLinks.querySelectorAll('a');
          links.forEach(link => {
            link.style.width = '100%';
            link.style.height = 'auto';
            link.style.padding = '0.75rem 1rem';
            link.style.justifyContent = 'center';
            link.style.borderRadius = '0';
            link.style.backgroundColor = 'transparent';
            link.style.borderBottom = '1px solid rgba(255, 255, 255, 0.26)';
          });
        }
        
        // Update bottom section layout
        const bottomLinks = footerWrapper.querySelector('div[style*="display: flex; flex-direction: column; gap: 1rem;"]');
        if (bottomLinks) {
          bottomLinks.style.flexDirection = 'row';
          bottomLinks.style.justifyContent = 'space-between';
          bottomLinks.style.alignItems = 'center';
          
          const linkDiv = bottomLinks.querySelector('div[style*="text-align: center;"]');
          const copyrightDiv = bottomLinks.querySelectorAll('div[style*="text-align: center;"]')[1];
          
          if (linkDiv && copyrightDiv) {
            linkDiv.style.textAlign = 'left';
            copyrightDiv.style.textAlign = 'right';
          }
        }
        
        // Update acknowledgement section
        const ackSection = footerWrapper.querySelector('div[style*="margin-bottom: 1.5rem; text-align: center;"]');
        if (ackSection) {
          ackSection.style.textAlign = 'left';
          
          const flagsAndText = ackSection.querySelector('div[style*="display: flex; justify-content: center;"]');
          if (flagsAndText) {
            flagsAndText.style.justifyContent = 'flex-start';
          }
        }
      }
    }
    
    // Apply responsive styles initially and on resize
    applyResponsiveStyles();
    window.addEventListener('resize', applyResponsiveStyles);
    
    // Initialize font size adjustment
    const decreaseBtn = footerWrapper.querySelector('[data-action="decrease-font"]');
    const increaseBtn = footerWrapper.querySelector('[data-action="increase-font"]');
    
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
    
    // Reveal once everything is in place
    setTimeout(() => {
      footerWrapper.style.opacity = '1';
    }, 50);
    
  } catch (err) {
    console.error(`[APS Integration] Error in insertGlobalAPSFooter:`, err);
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
