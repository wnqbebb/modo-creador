/*
========================================================================
   APP.JS — byjose.ai Lead Magnet
   Lógica: Scroll Reveal Interactivo, Copiado de Prompts, Confeti
========================================================================
*/

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. ANIMACIONES DE DESPLAZAMIENTO (SCROLL REVEAL)
       ========================================== */
    // Configuramos el observador de intersección
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => scrollObserver.observe(el));

    // Fallback global: activa TODO después de 800ms sin importar scroll
    setTimeout(() => {
        document.querySelectorAll('.scroll-reveal').forEach(el => {
            el.classList.add('active');
        });
    }, 800);


    /* ==========================================
       2. SISTEMA DE COPIADO DE PROMPTS
       ========================================== */
    const copyButtons = document.querySelectorAll('.copy-prompt-trigger');

    copyButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetId = btn.getAttribute('data-copy-target');
            const codeBlock = document.getElementById(targetId);
            if (!codeBlock) return;

            // Extraer texto plano sin HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = codeBlock.innerHTML;
            const plainText = (tempDiv.textContent || tempDiv.innerText || '').trim();

            navigator.clipboard.writeText(plainText).then(() => {
                // Feedback visual
                btn.classList.add('copied');
                const copyText = btn.querySelector('.copy-text');
                const originalText = copyText ? copyText.textContent : 'Copiar';

                if (copyText) {
                    copyText.textContent = '¡COPIADO! 🍌';
                }

                // Confeti en posición del cursor
                triggerCursorConfetti(e.clientX, e.clientY);

                // Audio de éxito ultra-satisfactorio
                playSuccessSound();

                // Restaurar después de 1.5s
                setTimeout(() => {
                    btn.classList.remove('copied');
                    if (copyText) copyText.textContent = originalText;
                }, 1500);

            }).catch(err => {
                console.error('Error al copiar:', err);
            });
        });
    });


    /* ==========================================
       3. CONFETI BRUTALISTA EN CURSOR
       ========================================== */
    function triggerCursorConfetti(x, y) {
        const colors = ['#ffcd00', '#ffffff', '#006b5b', '#3d2c2e'];

        for (let i = 0; i < 25; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: ${Math.random() * 8 + 4}px;
                height: ${Math.random() * 8 + 4}px;
                background-color: ${colors[Math.floor(Math.random() * colors.length)]};
                border: 1.5px solid #000;
                z-index: 9999;
                pointer-events: none;
            `;

            document.body.appendChild(particle);

            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 120 + 40;
            const destX = Math.cos(angle) * distance;
            const destY = Math.sin(angle) * distance + 20;

            particle.animate([
                { transform: 'translate(-50%, -50%) scale(1.2) rotate(0deg)', opacity: 1 },
                { transform: `translate(calc(-50% + ${destX}px), calc(-50% + ${destY}px)) scale(0.3) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: Math.random() * 600 + 700,
                easing: 'cubic-bezier(0.1, 0.8, 0.25, 1)',
                fill: 'forwards'
            });

            setTimeout(() => particle.remove(), 1300);
        }
    }


    /* ==========================================
       4. NAVBAR SCROLL EFFECT
       ========================================== */
    const navbar = document.querySelector('.owner-fixed-header');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.15)';
                navbar.style.background = 'rgba(16, 24, 32, 0.92)';
            } else {
                navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.08)';
                navbar.style.background = 'rgba(16, 24, 32, 0.72)';
            }
        }, { passive: true });
    }


    /* ==========================================
       5. INTERACTIVE AUDIO SYNTHESIZER (WEB AUDIO API)
       ========================================== */
    let audioCtx = null;
    let soundEnabled = true;

    const audioSwitchBtn = document.getElementById('audio-switch');
    if (audioSwitchBtn) {
        audioSwitchBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            soundEnabled = !soundEnabled;
            const soundOnIcon = audioSwitchBtn.querySelector('.sound-icon-on');
            const soundOffIcon = audioSwitchBtn.querySelector('.sound-icon-off');
            if (soundEnabled) {
                if (soundOnIcon) soundOnIcon.style.display = 'inline';
                if (soundOffIcon) soundOffIcon.style.display = 'none';
                initAudio();
                playAudioTone(600, 'sine', 0.08, 0.05); // quick activation tone
            } else {
                if (soundOnIcon) soundOnIcon.style.display = 'none';
                if (soundOffIcon) soundOffIcon.style.display = 'inline';
            }
        });
    }

    function initAudio() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    }

    function playAudioTone(freq, type = 'sine', duration = 0.1, volume = 0.1, pitchSweep = 0) {
        if (!soundEnabled) return;
        try {
            initAudio();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = type;
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
            if (pitchSweep > 0) {
                osc.frequency.exponentialRampToValueAtTime(freq + pitchSweep, audioCtx.currentTime + duration);
            }

            gain.gain.setValueAtTime(volume, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start();
            osc.stop(audioCtx.currentTime + duration);
        } catch (e) {
            console.warn('Audio synthesis failed:', e);
        }
    }

    function playTick() {
        playAudioTone(1200, 'sine', 0.04, 0.03);
    }

    function playHoverTagSound() {
        playAudioTone(800, 'triangle', 0.06, 0.05);
    }

    function playSuccessSound() {
        if (!soundEnabled) return;
        try {
            initAudio();
            // Ascending C Major arpeggio for positive visual confirmation
            const notes = [523.25, 659.25, 783.99, 1046.50];
            const now = audioCtx.currentTime;
            
            notes.forEach((freq, idx) => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, now + idx * 0.06);
                
                gain.gain.setValueAtTime(0.06, now + idx * 0.06);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.12);
                
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                
                osc.start(now + idx * 0.06);
                osc.stop(now + idx * 0.06 + 0.15);
            });
        } catch (e) {
            console.warn('Success audio failed:', e);
        }
    }

    function registerHoverTicks(selector) {
        document.querySelectorAll(selector).forEach(el => {
            el.addEventListener('mouseenter', playTick);
        });
    }


    /* ==========================================
       6. RETRO DYNAMIC CYBER CURSOR
       ========================================== */
    const cursor = document.getElementById('custom-cursor');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, { passive: true });

    function updateCursor() {
        const xp = 0.16; // Lerp factor
        cursorX += (mouseX - cursorX) * xp;
        cursorY += (mouseY - cursorY) * xp;
        
        if (cursor) {
            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;
        }
        
        requestAnimationFrame(updateCursor);
    }
    requestAnimationFrame(updateCursor);

    window.addEventListener('mousedown', () => {
        document.body.classList.add('cursor-clicking');
        initAudio();
    });
    window.addEventListener('mouseup', () => {
        document.body.classList.remove('cursor-clicking');
    });

    const hoverElements = 'a, button, .customizable-tag, .copy-prompt-trigger, .technical-analyzer-frame';
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(hoverElements)) {
            document.body.classList.add('cursor-hovering');
        }
    });
    document.addEventListener('mouseout', (e) => {
        if (!e.target.closest(hoverElements)) {
            document.body.classList.remove('cursor-hovering');
        }
    });


    /* ==========================================
       7. TECHNICAL FACE SCANNER ZOOM
       ========================================== */
    const scannerFrames = document.querySelectorAll('.technical-analyzer-frame');
    scannerFrames.forEach(frame => {
        const targetImg = frame.querySelector('.analyzer-target');
        const lens = frame.querySelector('.analyzer-lens');
        if (!targetImg || !lens) return;

        lens.style.backgroundImage = `url('${targetImg.getAttribute('src')}')`;

        frame.addEventListener('mousemove', (e) => {
            const rect = frame.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            lens.style.left = `${x}px`;
            lens.style.top = `${y}px`;

            const zoom = 2; // magnification power
            lens.style.backgroundSize = `${rect.width * zoom}px ${rect.height * zoom}px`;
            
            const bgX = (x * zoom) - (lens.offsetWidth / 2);
            const bgY = (y * zoom) - (lens.offsetHeight / 2);
            lens.style.backgroundPosition = `-${bgX}px -${bgY}px`;
        });
        
        frame.addEventListener('mouseenter', () => {
            playAudioTone(440, 'triangle', 0.12, 0.04, 300); // scan activation sound
        });
    });


    /* ==========================================
       8. INTERACTIVE PROMPT CUSTOMIZER
       ========================================== */
    const customizableTags = document.querySelectorAll('.customizable-tag');
    let activePopover = null;

    customizableTags.forEach(tag => {
        tag.addEventListener('click', (e) => {
            e.stopPropagation();
            initAudio();
            playHoverTagSound();

            if (activePopover) {
                activePopover.remove();
            }

            const optionsAttr = tag.getAttribute('data-options') || '';
            const options = optionsAttr.split('|').map(opt => opt.trim());
            const currentVal = tag.textContent.trim();

            const popover = document.createElement('div');
            popover.className = 'brutal-popover';

            options.forEach(opt => {
                const optBtn = document.createElement('button');
                optBtn.className = 'popover-option';
                if (opt === currentVal) {
                    optBtn.classList.add('selected');
                }
                optBtn.textContent = opt;
                optBtn.addEventListener('mouseenter', playTick);
                optBtn.addEventListener('click', (evt) => {
                    evt.stopPropagation();
                    updateTagValue(tag, opt);
                    popover.remove();
                    activePopover = null;
                });
                popover.appendChild(optBtn);
            });

            const customInputContainer = document.createElement('div');
            customInputContainer.className = 'popover-custom-input';

            const inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.placeholder = 'Custom text...';
            inputField.value = options.includes(currentVal) ? '' : currentVal;
            inputField.addEventListener('click', (evt) => evt.stopPropagation());
            inputField.addEventListener('keydown', (evt) => {
                if (evt.key === 'Enter') {
                    evt.preventDefault();
                    if (inputField.value.trim()) {
                        updateTagValue(tag, inputField.value.trim());
                        popover.remove();
                        activePopover = null;
                    }
                }
            });

            const applyBtn = document.createElement('button');
            applyBtn.textContent = 'OK';
            applyBtn.addEventListener('click', (evt) => {
                evt.stopPropagation();
                if (inputField.value.trim()) {
                    updateTagValue(tag, inputField.value.trim());
                    popover.remove();
                    activePopover = null;
                }
            });

            customInputContainer.appendChild(inputField);
            customInputContainer.appendChild(applyBtn);
            popover.appendChild(customInputContainer);

            document.body.appendChild(popover);

            const tagRect = tag.getBoundingClientRect();
            const popoverWidth = 290;
            let leftPos = tagRect.left + window.scrollX + (tagRect.width / 2) - (popoverWidth / 2);
            let topPos = tagRect.bottom + window.scrollY + 8;

            if (leftPos < 10) leftPos = 10;
            if (leftPos + popoverWidth > window.innerWidth - 10) {
                leftPos = window.innerWidth - popoverWidth - 10;
            }

            popover.style.left = `${leftPos}px`;
            popover.style.top = `${topPos}px`;

            activePopover = popover;
        });
    });

    document.addEventListener('click', () => {
        if (activePopover) {
            activePopover.remove();
            activePopover = null;
        }
    });

    function updateTagValue(tag, value) {
        tag.textContent = value;
        playAudioTone(900, 'sine', 0.1, 0.08, 200); // success arpeggio confirmation
        
        tag.style.transform = 'scale(1.08)';
        tag.style.transition = 'transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        setTimeout(() => {
            tag.style.transform = 'scale(1)';
        }, 150);
    }

    // Register micro hover sounds
    registerHoverTicks('a, button, .customizable-tag, .technical-analyzer-frame');

});
