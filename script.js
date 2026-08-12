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
        
        // Add animation keyframes if not present
        if (!document.getElementById('pyodide-popup-styles')) {
            const style = document.createElement('style');
            style.id = 'pyodide-popup-styles';
            style.textContent = `
                @keyframes pyodideFadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes pyodidePopIn { from { transform: scale(0.9) translateY(20px); opacity: 0; } to { transform: scale(1) translateY(0); opacity: 1; } }
            `;
            document.head.appendChild(style);
        }
        
        const popupHTML = `
        <div id="pyodide-custom-popup-overlay" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); z-index: 9999; display: flex; align-items: center; justify-content: center; animation: pyodideFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;">
            <div id="pyodide-custom-popup" style="background: var(--bg-body); border-radius: 20px; padding: 2.5rem; max-width: 420px; text-align: center; box-shadow: 0 20px 50px rgba(0,0,0,0.3); border: 1px solid var(--section-border); animation: pyodidePopIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;">
                <div style="font-size: 4rem; margin-bottom: 1rem; line-height: 1; filter: drop-shadow(0 4px 10px rgba(249,115,22,0.3));">⚠️</div>
                <h3 style="margin-top: 0; margin-bottom: 1rem; color: var(--fg-text); font-weight: 700; font-size: 1.5rem;">Код не зберігається!</h3>
                <p style="margin-bottom: 2rem; color: var(--fg-muted); line-height: 1.6; font-size: 1rem;">Результати та код у цій клітинці будуть втрачені після оновлення сторінки. Будь ласка, копіюйте важливі рішення до себе в локальне середовище.</p>
                <button id="pyodide-popup-ok" class="btn" style="background: var(--accent-color); color: #fff; padding: 12px 30px; border-radius: 12px; border: none; cursor: pointer; font-weight: 600; width: 100%; justify-content: center; font-size: 1.1rem; box-shadow: 0 4px 12px rgba(249,115,22,0.2); transition: transform 0.2s, box-shadow 0.2s;">Зрозуміло</button>
            </div>
        </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', popupHTML);
        
        const overlay = document.getElementById('pyodide-custom-popup-overlay');
        const btn = document.getElementById('pyodide-popup-ok');
        
        btn.onmouseenter = () => { btn.style.transform = 'translateY(-2px)'; btn.style.boxShadow = '0 6px 16px rgba(249,115,22,0.3)'; };
        btn.onmouseleave = () => { btn.style.transform = 'translateY(0)'; btn.style.boxShadow = '0 4px 12px rgba(249,115,22,0.2)'; };
        
        btn.addEventListener('click', () => {
            localStorage.setItem('hidePyodidePopup', 'true');
            overlay.style.animation = 'none';
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 0.3s ease';
            setTimeout(() => overlay.remove(), 300);
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
