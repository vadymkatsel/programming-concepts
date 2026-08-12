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

    // Interactive Popup Warning for Pyodide
    const showPyodidePopup = () => {
        if (document.getElementById('pyodide-custom-popup')) return;
        if (sessionStorage.getItem('pyodidePopupShown') === 'true') return;
        
        sessionStorage.setItem('pyodidePopupShown', 'true');
        
        const popupHTML = `
        <div id="pyodide-custom-popup-overlay" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.4); backdrop-filter: blur(4px); z-index: 9999; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s ease;">
            <div id="pyodide-custom-popup" class="glass-effect" style="background: var(--body-bg, #ffffff); border-radius: 16px; padding: 2rem; max-width: 450px; text-align: center; box-shadow: 0 10px 40px rgba(0,0,0,0.2); transform: translateY(20px); transition: transform 0.3s ease; border: 1px solid var(--border-color, #dee2e6);">
                <div style="font-size: 3.5rem; margin-bottom: 1rem; color: var(--status-planned, #f39c12); line-height: 1;">⚠️</div>
                <h3 style="margin-top: 0; margin-bottom: 1rem; color: var(--text-color); font-weight: 700;">Код не зберігається!</h3>
                <p style="margin-bottom: 1.5rem; color: var(--text-muted); line-height: 1.5;">Результати та код у цій клітинці будуть втрачені після оновлення сторінки. Будь ласка, копіюйте важливі рішення до себе в IDE.</p>
                <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                    <button id="pyodide-popup-ok" class="btn" style="background: var(--status-active, #0d6efd); color: white; padding: 10px 20px; border-radius: 8px; border: none; cursor: pointer; font-weight: 600; flex: 1; min-width: 140px;">Зрозуміло</button>
                    <button id="pyodide-popup-hide" class="btn" style="background: transparent; color: var(--text-muted); padding: 10px 20px; border-radius: 8px; border: 1px solid var(--border-color, #dee2e6); cursor: pointer; font-weight: 600; flex: 1; min-width: 140px;">Не показувати більше</button>
                </div>
            </div>
        </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', popupHTML);
        
        const overlay = document.getElementById('pyodide-custom-popup-overlay');
        const popup = document.getElementById('pyodide-custom-popup');
        
        setTimeout(() => {
            overlay.style.opacity = '1';
            popup.style.transform = 'translateY(0)';
        }, 10);
        
        const closePopup = () => {
            overlay.style.opacity = '0';
            popup.style.transform = 'translateY(20px)';
            setTimeout(() => overlay.remove(), 300);
        };
        
        document.getElementById('pyodide-popup-ok').addEventListener('click', closePopup);
        document.getElementById('pyodide-popup-hide').addEventListener('click', () => {
            localStorage.setItem('hidePyodidePopup', 'true');
            closePopup();
        });
    };

    const attachPopupListeners = () => {
        if (localStorage.getItem('hidePyodidePopup') === 'true') return;
        
        document.querySelectorAll('.exercise-editor').forEach(editor => {
            if (!editor.hasAttribute('data-popup-listener')) {
                editor.setAttribute('data-popup-listener', 'true');
                
                const trigger = () => {
                    if (localStorage.getItem('hidePyodidePopup') !== 'true') {
                        showPyodidePopup();
                    }
                };
                
                editor.addEventListener('click', trigger, { once: true });
                editor.addEventListener('focusin', trigger, { once: true });
            }
        });
    };
    
    setInterval(attachPopupListeners, 1000);
});
