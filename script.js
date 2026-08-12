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

document.addEventListener("DOMContentLoaded", function() {
    const injectCustomOverlay = () => {
        document.querySelectorAll('.exercise-editor').forEach(editor => {
            const wrapper = editor.parentElement;
            
            if (wrapper && !wrapper.querySelector('.custom-quarto-overlay')) {
                wrapper.style.position = 'relative'; 
                
                const overlay = document.createElement("div");
                overlay.className = "custom-quarto-overlay";
                
                const runBtn = document.createElement("button");
                runBtn.className = "btn custom-quarto-btn custom-run-btn";
                runBtn.title = "Run Code";
                runBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
                runBtn.onclick = () => {
                    const currentEditor = wrapper.querySelector('.exercise-editor');
                    if (currentEditor) {
                        const nativeRun = currentEditor.querySelector('.exercise-editor-btn-run-code');
                        if (nativeRun) nativeRun.click();
                    }
                };
                
                const resetBtn = document.createElement("button");
                resetBtn.className = "btn custom-quarto-btn";
                resetBtn.title = "Start Over";
                resetBtn.innerHTML = '<i class="fa-solid fa-rotate-left"></i>';
                resetBtn.onclick = () => {
                    const currentEditor = wrapper.querySelector('.exercise-editor');
                    if (currentEditor) {
                        const btnGroup = currentEditor.querySelector('.btn-group-exercise-editor');
                        if (btnGroup) {
                            const btns = Array.from(btnGroup.querySelectorAll('.btn'));
                            const nativeReset = btns.find(b => !b.classList.contains('exercise-editor-btn-run-code'));
                            if (nativeReset) nativeReset.click();
                        }
                    }
                };
                
                const copyBtn = document.createElement("button");
                copyBtn.className = "btn custom-quarto-btn";
                copyBtn.title = "Copy Code";
                copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
                copyBtn.onclick = () => {
                    const currentEditor = wrapper.querySelector('.exercise-editor');
                    if (currentEditor) {
                        const content = currentEditor.querySelector(".cm-content");
                        if (content) {
                            navigator.clipboard.writeText(content.innerText || content.textContent).then(() => {
                                copyBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
                                setTimeout(() => { copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i>'; }, 2000);
                            });
                        }
                    }
                };
                
                overlay.appendChild(runBtn);
                overlay.appendChild(resetBtn);
                overlay.appendChild(copyBtn);
                
                wrapper.appendChild(overlay);
            }
        });
    };

    const observer = new MutationObserver((mutations) => {
        const hasNewNodes = mutations.some(m => m.addedNodes.length > 0);
        if (hasNewNodes) {
            injectCustomOverlay();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    
    const syncLoadingState = () => {
        document.querySelectorAll('.exercise-editor').forEach(editor => {
            const wrapper = editor.parentElement;
            if (!wrapper) return;
            
            const customRunBtn = wrapper.querySelector('.custom-run-btn');
            const nativeIndicator = editor.querySelector('.exercise-editor-eval-indicator');
            
            if (customRunBtn && nativeIndicator) {
                const isRunning = !nativeIndicator.classList.contains('d-none');
                if (isRunning) {
                    customRunBtn.classList.add('is-running');
                } else {
                    customRunBtn.classList.remove('is-running');
                }
            }
        });
    };
    
    injectCustomOverlay();
    setInterval(injectCustomOverlay, 1000);
    setInterval(syncLoadingState, 100); 

    const injectWarning = () => {
        if (localStorage.getItem('hidePyodideWarning') === 'true') return;
        
        const firstExercise = document.querySelector('.exercise-editor');
        if (firstExercise) {
            const wrapper = firstExercise.closest('.exercise-cell') || firstExercise.parentElement;
            
            if (wrapper.previousElementSibling && wrapper.previousElementSibling.classList.contains('pyodide-warning-callout')) {
                return;
            }
            
            const warningHTML = `
                <div class="callout callout-style-default callout-warning callout-titled pyodide-warning-callout" style="margin-bottom: 1.5rem;">
                    <div class="callout-header d-flex align-content-center">
                        <div class="callout-icon-container">
                            <i class="callout-icon"></i>
                        </div>
                        <div class="callout-title-container flex-fill">Важливо: Збереження коду</div>
                        <button class="btn-close-warning" style="background: none; border: none; color: inherit; cursor: pointer; padding: 0 5px;" title="Приховати назавжди"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                    <div class="callout-body-container callout-body">
                        <p style="margin-bottom: 0;">Код та результати у цих інтерактивних клітинках <strong>не зберігаються</strong> після оновлення сторінки. Обов'язково копіюйте важливий код до себе локально, перш ніж оновлювати вкладку.</p>
                    </div>
                </div>
            `;
            
            wrapper.insertAdjacentHTML('beforebegin', warningHTML);
            
            const closeBtn = wrapper.previousElementSibling.querySelector('.btn-close-warning');
            if (closeBtn) {
                closeBtn.addEventListener('click', function() {
                    localStorage.setItem('hidePyodideWarning', 'true');
                    document.querySelectorAll('.pyodide-warning-callout').forEach(el => el.remove());
                });
            }
        }
    };
    
    setInterval(injectWarning, 1000);
});
