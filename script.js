document.addEventListener("DOMContentLoaded", function() {
  const footer = document.querySelector(".nav-footer");
  const navbar = document.querySelector(".navbar"); 
  const secondaryNav = document.querySelector(".quarto-secondary-nav");
  const sidebar = document.querySelector("#quarto-sidebar"); 
  
  const syncLayoutWidth = () => {
    const leftSidebar = document.querySelector('#quarto-sidebar');
    const rightSidebar = document.querySelector('#quarto-margin-sidebar');
    const mainContent = document.querySelector('main.content');

    const leftEl = (leftSidebar && leftSidebar.offsetParent) ? leftSidebar : mainContent;
    const rightEl = (rightSidebar && rightSidebar.offsetParent) ? rightSidebar : mainContent;

    if (leftEl && rightEl) {
      const left = leftEl.getBoundingClientRect().left;
      const right = rightEl.getBoundingClientRect().right;
      const targetWidth = (right - left) + "px";
      
      if (footer) footer.style.width = targetWidth;
      if (navbar) navbar.style.width = targetWidth; 
      if (secondaryNav) secondaryNav.style.width = targetWidth;
      if (sidebar && window.innerWidth <= 991) sidebar.style.width = targetWidth;
    }
  };

  window.addEventListener('resize', syncLayoutWidth);
  setTimeout(syncLayoutWidth, 50);
});

document.addEventListener("DOMContentLoaded", function() {
  const secondaryNav = document.querySelector(".quarto-secondary-nav");
  const sidebar = document.querySelector("#quarto-sidebar");
  const mainContent = document.querySelector('main.content');

  const sync = () => {
    if (window.innerWidth <= 990) {
      if (mainContent) {
        const rect = mainContent.getBoundingClientRect();
        document.documentElement.style.setProperty('--pill-width', rect.width + "px");
        document.documentElement.style.setProperty('--pill-left', rect.left + "px");
      }
      if (secondaryNav) {
        const secRect = secondaryNav.getBoundingClientRect();
        document.documentElement.style.setProperty('--nav-bottom', secRect.bottom + 'px');
      }
    } else {
      if (sidebar) {
        sidebar.style.removeProperty('top');
        sidebar.style.removeProperty('left');
        sidebar.style.removeProperty('width');
      }
      document.documentElement.style.removeProperty('--nav-bottom');
      document.documentElement.style.removeProperty('--pill-width');
      document.documentElement.style.removeProperty('--pill-left');
      
      if (sidebar && sidebar.classList.contains('show')) {
        sidebar.classList.remove('show');
      }
    }
  };

  window.addEventListener('resize', sync);
  window.addEventListener('scroll', sync);
  document.querySelector('.navbar-toggler')?.addEventListener('click', () => setTimeout(sync, 10));
  
  sync();
});
