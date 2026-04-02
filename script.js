/* eslint-disable no-console */

function animateNumber(el, target, opts = {}) {
  const durationMs = opts.durationMs ?? 900;
  const suffix = opts.suffix ?? "";
  const prefix = opts.prefix ?? "";

  const start = 0;
  const startTime = performance.now();

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function tick(now) {
    const elapsed = now - startTime;
    const t = Math.min(1, elapsed / durationMs);
    const eased = easeOutCubic(t);
    const current = Math.round(start + (target - start) * eased);

    el.textContent = `${prefix}${current}${suffix}`;

    if (t < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

document.addEventListener("DOMContentLoaded", () => {
  // --- Ambient Effects Initiation ---
  const initAmbientEffects = () => {
    const ambientContainer = document.createElement("div");
    ambientContainer.className = "ambient-container";
    document.body.appendChild(ambientContainer);

    const cursorGlow = document.createElement("div");
    cursorGlow.className = "cursor-glow";
    document.body.insertBefore(cursorGlow, ambientContainer);

    window.addEventListener("mousemove", (e) => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    }, { passive: true });

    const heartColors = ["#ff8fab", "#cdb4db", "#e0aaff"];
    
    function createHeart() {
      const heart = document.createElement("div");
      heart.className = "heart-particle";
      const size = Math.random() * 15 + 10;
      const color = heartColors[Math.floor(Math.random() * heartColors.length)];
      
      heart.style.cssText = `
        left: ${Math.random() * 100}%;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>');
        -webkit-mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>');
        mask-size: contain;
        -webkit-mask-size: contain;
        --float-speed: ${Math.random() * 8 + 12}s;
        --drift: ${Math.random() * 100 - 50}px;
      `;
      
      ambientContainer.appendChild(heart);
      setTimeout(() => heart.remove(), 20000);
    }

    function createStar() {
      const star = document.createElement("div");
      star.className = "star-particle";
      star.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        --twinkle-speed: ${Math.random() * 3 + 2}s;
      `;
      ambientContainer.appendChild(star);
      setTimeout(() => star.remove(), 5000);
    }

    setInterval(() => {
      const hearts = document.querySelectorAll(".heart-particle");
      if (hearts.length < 8) createHeart();
      const stars = document.querySelectorAll(".star-particle");
      if (stars.length < 4) createStar();
    }, 1500);
  };

  initAmbientEffects();

  // --- Intro Overlay Logic ---
  const overlay = document.getElementById("intro-overlay");
  const screenInitial = document.getElementById("screen-initial");
  const screenNo = document.getElementById("screen-no");
  const screenYes = document.getElementById("screen-yes");

  const btnYes = document.getElementById("btn-yes");
  const btnNo = document.getElementById("btn-no");
  const btnGoBack = document.getElementById("btn-goback");
  const btnFinalClick = document.getElementById("btn-final-click");

  if (overlay) {
    const showScreen = (targetScreen) => {
      [screenInitial, screenNo, screenYes].forEach(s => {
        if (s) {
          s.classList.remove("active");
          s.hidden = true;
        }
      });
      targetScreen.hidden = false;
      
      if (targetScreen === screenNo) {
        overlay.classList.add("intro-overlay--angry");
        overlay.classList.remove("intro-overlay--warm");
      } else if (targetScreen === screenYes) {
        overlay.classList.add("intro-overlay--warm");
        overlay.classList.remove("intro-overlay--angry");
      } else {
        overlay.classList.remove("intro-overlay--angry");
        overlay.classList.remove("intro-overlay--warm");
      }

      setTimeout(() => targetScreen.classList.add("active"), 10);
    };

    if(btnYes) btnYes.addEventListener("click", () => showScreen(screenYes));
    if(btnNo) btnNo.addEventListener("click", () => showScreen(screenNo));
    if(btnGoBack) btnGoBack.addEventListener("click", () => showScreen(screenInitial));

    if(btnFinalClick) {
      btnFinalClick.addEventListener("click", () => {
        overlay.classList.add("fade-out");
        document.body.classList.remove("is-locked");
        setTimeout(() => {
          overlay.style.display = "none";
        }, 1000);
      });
    }
  }

  // Scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
        setTimeout(() => {
          entry.target.classList.add("active-reveal");
        }, 100);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll("[data-animate]").forEach(el => observer.observe(el));

  // Memory card reveal
  document.querySelectorAll(".js-card-reveal").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".memory-card");
      const reveal = card?.querySelector(".memory-card__reveal");
      if (!reveal) return;
      const isHidden = reveal.hasAttribute("hidden");
      if (isHidden) reveal.removeAttribute("hidden");
      else reveal.setAttribute("hidden", "true");
    });
  });

  // Fun choices
  const funButtons = document.querySelectorAll(".js-fun-choice");
  const funPromptEl = document.getElementById("funPrompt");
  const funResultEl = document.querySelector(".fun-result");

  const funMap = {
    "swap-compliments": "Swap one compliment you mean. No joking. Just truth.",
    playlist: "Pick one song that matches our vibe today. Press play together.",
    "memory-dance": "Choose a favorite memory. Then do one silly two-count dance pose.",
  };

  funButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-fun");
      const text = funMap[key] ?? "Pick something fun and be kind to each other.";
      if (funPromptEl) funPromptEl.textContent = text;
      if (funResultEl) funResultEl.hidden = false;
    });
  });

  // Friendship counter
  const counterBtn = document.getElementById("counterBtn");
  const elYears = document.getElementById("counter-years");
  const elMonths = document.getElementById("counter-months");
  const elDays = document.getElementById("counter-days");
  const elHours = document.getElementById("counter-hours");
  const elMinutes = document.getElementById("counter-minutes");
  const elSeconds = document.getElementById("counter-seconds");

  const startDate = new Date(2010, 3, 3, 0, 0, 0);

  let currentYears = -1;
  let currentMonths = -1;
  let currentDays = -1;
  let currentHours = -1;
  let currentMinutes = -1;
  let currentSeconds = -1;
  let isAnimating = false;

  function calculateTimeDiff() {
    const now = new Date();
    let y = now.getFullYear() - startDate.getFullYear();
    let m = now.getMonth() - startDate.getMonth();
    let d = now.getDate() - startDate.getDate();
    let h = now.getHours() - startDate.getHours();
    let min = now.getMinutes() - startDate.getMinutes();
    let s = now.getSeconds() - startDate.getSeconds();

    if (s < 0) { min -= 1; s += 60; }
    if (min < 0) { h -= 1; min += 60; }
    if (h < 0) { d -= 1; h += 24; }
    if (d < 0) { m -= 1; const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0); d += prevMonth.getDate(); }
    if (m < 0) { y -= 1; m += 12; }
    return { y, m, d, h, min, s };
  }
  
  function updateLiveValues() {
    const { y, m, d, h, min, s } = calculateTimeDiff();
    if(y !== currentYears) { currentYears = y; if(elYears && !isAnimating) elYears.textContent = y; }
    if(m !== currentMonths) { currentMonths = m; if(elMonths && !isAnimating) elMonths.textContent = m; }
    if(d !== currentDays) { currentDays = d; if(elDays && !isAnimating) elDays.textContent = d; }
    if(h !== currentHours) { currentHours = h; if(elHours && !isAnimating) elHours.textContent = h; }
    if(min !== currentMinutes) { currentMinutes = min; if(elMinutes && !isAnimating) elMinutes.textContent = min; }
    if(s !== currentSeconds) { currentSeconds = s; if(elSeconds && !isAnimating) elSeconds.textContent = s; }
  }

  function animateLiveNumbers() {
    isAnimating = true;
    const { y, m, d, h, min, s } = calculateTimeDiff();
    const duration = 1500;
    if(elYears) animateNumber(elYears, y, { durationMs: duration });
    if(elMonths) animateNumber(elMonths, m, { durationMs: duration });
    if(elDays) animateNumber(elDays, d, { durationMs: duration });
    if(elHours) animateNumber(elHours, h, { durationMs: duration });
    if(elMinutes) animateNumber(elMinutes, min, { durationMs: duration });
    if(elSeconds) animateNumber(elSeconds, s, { durationMs: duration });
    
    setTimeout(() => { isAnimating = false; updateLiveValues(); }, duration + 100);
  }

  if (elYears) {
    updateLiveValues();
    setTimeout(animateLiveNumbers, 300);
    setInterval(updateLiveValues, 1000);
  }

  if (counterBtn) {
    counterBtn.addEventListener("click", () => { animateLiveNumbers(); });
  }

  // Secret message unlock
  const unlockBtn = document.getElementById("unlockBtn");
  const secretPhraseInput = document.getElementById("secretPhrase");
  const secretResultEl = document.getElementById("secretResult");
  const secretTextEl = document.getElementById("secretText");

  const unlockedMessageHTML = `
    No matter how far we go in life…<br><br>
    there will always be a version of me<br>
    sitting next to you,<br>
    laughing at nothing,<br>
    like we always did.<br><br>
    Some things don’t change.<br><br>
    And I’m glad…<br>
    we are one of them.
  `;

  if (unlockBtn && secretPhraseInput && secretResultEl && secretTextEl) {
    unlockBtn.addEventListener("click", () => {
      const phrase = (secretPhraseInput.value || "")
        .replace(/[^a-zA-Z\s]/g, "") // Remove punctuation/quotes
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();
      // Relaxed match: "the crazy bitches"
      const expected = "the crazy bitches";
      
      if (phrase === expected) {
        secretTextEl.innerHTML = unlockedMessageHTML;
        setTimeout(() => {
          secretResultEl.hidden = false;
          setTimeout(() => {
            secretResultEl.style.opacity = "1";
            secretResultEl.style.transform = "translateY(0)";
          }, 30);
        }, 300);
      } else {
        secretTextEl.innerHTML = "Not quite... try again! 💭";
        secretResultEl.hidden = false;
        setTimeout(() => {
          secretResultEl.style.opacity = "1";
          secretResultEl.style.transform = "translateY(0)";
        }, 10);
      }
    });
  }

  // Letter reveal
  document.querySelectorAll(".js-letter-open").forEach((btn) => {
    btn.addEventListener("click", () => {
      const letterId = btn.getAttribute("data-letter");
      const letterBody = document.getElementById(letterId);
      if (letterBody) {
        const isHidden = letterBody.hasAttribute("hidden");
        if (isHidden) letterBody.removeAttribute("hidden");
        else letterBody.setAttribute("hidden", "true");
      }
    });
  });

  // Puzzle reveal
  const puzzleBtn = document.getElementById("puzzleBtn");
  const puzzleInput = document.getElementById("puzzleAnswer");
  const puzzleResult = document.getElementById("puzzleResult");
  const puzzleText = document.getElementById("puzzleText");
  const puzzleResultImage = document.getElementById("puzzleResultImage");
  const puzzleImgWrapper = document.getElementById("puzzleImgWrapper");

  const puzzleMessageHTML = `
    Because no matter what happens…<br><br>
    we always find our way back.<br><br>
    And maybe that’s what makes us us 💫
  `;

  if (puzzleBtn && puzzleInput && puzzleResult) {
    puzzleBtn.addEventListener("click", () => {
      const answer = (puzzleInput.value || "")
        .replace(/[^a-zA-Z\s]/g, "") // Remove punctuation/quotes
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();
      // Expected: "we choose each other always"
      const expected = "we choose each other always";
      
      if (answer === expected) {
        puzzleText.innerHTML = puzzleMessageHTML;
        puzzleResult.hidden = false;
        setTimeout(() => {
          puzzleResult.style.opacity = "1";
          puzzleResult.style.transform = "translateY(0)";
          if (puzzleImgWrapper) {
            setTimeout(() => {
              puzzleImgWrapper.style.display = "flex";
              setTimeout(() => {
                puzzleImgWrapper.style.opacity = "1";
                puzzleImgWrapper.style.transform = "scale(1)";
              }, 30);
            }, 300);
          }
        }, 100);
      } else {
        puzzleText.innerHTML = "Hmm… almost 💭";
        puzzleResult.hidden = false;
        setTimeout(() => {
          puzzleResult.style.opacity = "1";
          puzzleResult.style.transform = "translateY(0)";
        }, 10);
      }
    });
  }

  // Final surprise
  const finalBtn = document.getElementById("finalBtn"); 
  const finalSurpriseContent = document.getElementById("finalSurpriseContent");
  const finalSurpriseSection = document.getElementById("final-surprise");
  const finalEntryWrapper = document.getElementById("finalEntryWrapper");
  const finalPhotoContainer = document.getElementById("finalPhotoContainer");
  const closingLine = document.getElementById("closingLine");
  const replayBtnWrapper = document.getElementById("replayBtnWrapper");
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  if (finalBtn && finalSurpriseContent) {
    finalBtn.addEventListener("click", () => {
      finalSurpriseSection.classList.add("final-active");
      if (finalEntryWrapper) {
          finalEntryWrapper.style.opacity = "0";
          setTimeout(() => { finalEntryWrapper.style.display = "none"; }, 800);
      }
      
      setTimeout(() => {
        finalSurpriseContent.hidden = false;
        finalSurpriseContent.classList.add("show");
        const lines = finalSurpriseContent.querySelectorAll(".final-msg-line");
        lines.forEach((line, index) => {
          setTimeout(() => { line.classList.add("reveal"); }, 800 * (index + 1));
        });

        // Trigger photo, closing line, and replay button sequence
        const photoDelay = (lines.length * 800) + 1000;
        setTimeout(() => {
          if (finalPhotoContainer) finalPhotoContainer.classList.add("reveal");
          
          setTimeout(() => {
            if (closingLine) closingLine.classList.add("reveal");
          }, 3000);

          setTimeout(() => {
            if (replayBtnWrapper) replayBtnWrapper.classList.add("reveal");
          }, 5000);
        }, photoDelay);

      }, 900);
    });
  }
  
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Audio Player
  const customAudioEl = document.getElementById("customAudioElement");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const playIcon = document.getElementById("playIcon");
  const pauseIcon = document.getElementById("pauseIcon");
  const playProgress = document.getElementById("progressBar");
  const progressContainer = document.getElementById("progressContainer");
  const runTimeDisplay = document.getElementById("timeDisplay");
  const customAudioCard = document.getElementById("customAudioCard");
  
  if (customAudioEl && playPauseBtn) {
    const bodyOverlay = document.createElement("div");
    bodyOverlay.className = "audio-focus-overlay";
    document.body.appendChild(bodyOverlay);

    const formatAudioTime = (seconds) => {
      if (isNaN(seconds)) return "0:00";
      const m = Math.floor(seconds / 60);
      const s = Math.floor(seconds % 60);
      return m + ":" + (s < 10 ? "0" + s : s);
    };

    customAudioEl.addEventListener("loadedmetadata", () => {
      runTimeDisplay.textContent = `0:00 / ${formatAudioTime(customAudioEl.duration)}`;
    });

    playPauseBtn.addEventListener("click", () => {
      if (customAudioEl.paused) customAudioEl.play();
      else customAudioEl.pause();
    });

    customAudioEl.addEventListener("play", () => {
      playIcon.style.display = "none";
      pauseIcon.style.display = "block";
      customAudioCard.classList.add("playing");
    });

    customAudioEl.addEventListener("pause", () => {
      playIcon.style.display = "block";
      pauseIcon.style.display = "none";
      customAudioCard.classList.remove("playing");
    });

    customAudioEl.addEventListener("timeupdate", () => {
      const p = (customAudioEl.currentTime / customAudioEl.duration) * 100;
      playProgress.style.width = p + "%";
      runTimeDisplay.textContent = `${formatAudioTime(customAudioEl.currentTime)} / ${formatAudioTime(customAudioEl.duration)}`;
    });

    progressContainer.addEventListener("click", (e) => {
      const r = progressContainer.getBoundingClientRect();
      customAudioEl.currentTime = ((e.clientX - r.left) / r.width) * customAudioEl.duration;
    });
  }
});
