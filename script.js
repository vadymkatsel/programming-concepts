document.addEventListener("DOMContentLoaded", function() {
  const footer = document.querySelector(".nav-footer");
  const syncFooterWidth = () => {
    const leftSidebar = document.querySelector('#quarto-sidebar');
    const rightSidebar = document.querySelector('#quarto-margin-sidebar');
    const mainContent = document.querySelector('main.content');

    const leftEl = (leftSidebar && leftSidebar.offsetParent) ? leftSidebar : mainContent;
    const rightEl = (rightSidebar && rightSidebar.offsetParent) ? rightSidebar : mainContent;

    if (footer && leftEl && rightEl) {
      const left = leftEl.getBoundingClientRect().left;
      const right = rightEl.getBoundingClientRect().right;
      footer.style.width = (right - left) + "px";
    }
  };

  window.addEventListener('resize', syncFooterWidth);
  setTimeout(syncFooterWidth, 50);
});

document.addEventListener("DOMContentLoaded", function() {
  const footer = document.querySelector(".nav-footer");
  const navbar = document.querySelector(".navbar"); 
  
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
    }
  };

  window.addEventListener('resize', syncLayoutWidth);
  setTimeout(syncLayoutWidth, 50);
});