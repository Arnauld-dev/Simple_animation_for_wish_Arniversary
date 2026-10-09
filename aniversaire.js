 const lines = [
      "$ booting birthday celebration...",
      "Chargement des souvenirs et des ambitions",
      "Compilation du courage, de la patience et de la créativité",
      "Dépendances installées : passion, curiosité, persévérance",
      "Utilisateur détecté : Aimé Arnauld",
      "Exécution du programme : JOYEUX ANNIVERSAIRE ",
      "",
      "Tout est prêt. La célébration commence !"
    ];

    const typing = document.getElementById("typing");
    const status = document.getElementById("status");
    const cursor = document.getElementById("cursor");
    const celebration = document.getElementById("celebration");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let runId = 0;

    function typeLines() {
      const thisRun = ++runId;
      typing.textContent = "";
      celebration.classList.remove("visible");
      cursor.style.display = "inline-block";
      status.textContent = "initialisation...";
      let lineIndex = 0;
      let charIndex = 0;

      function typeNext() {
        if (thisRun !== runId) return;

        if (lineIndex >= lines.length) {

          cursor.style.display = "none";
          status.textContent = "succès ! 🎉";
          celebration.classList.add("visible");

          burstConfetti(120);
          return;
        }
        const line = lines[lineIndex];

        if (charIndex < line.length) {
          typing.textContent += line.charAt(charIndex);
          charIndex++;
          status.textContent = "exécution en cours...";

          setTimeout(typeNext, reduceMotion ? 0 : (line.startsWith("✓") ? 17 : 28));
        } else {
          typing.textContent += "\n";
          lineIndex++;
          charIndex = 0;
          setTimeout(typeNext, reduceMotion ? 0 : 230);
        }
      }
      typeNext();
    }

    function burstConfetti(amount = 100) {
      const colors = ["#5ee7ff", "#83ffb4", "#bb91ff", "#ffe082", "#ff8fab", "#ffffff"];
      for (let i = 0; i < amount; i++) {
        const bit = document.createElement("span");
        bit.className = "confetti";
        bit.style.left = Math.random() * 100 + "vw";
        bit.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        bit.style.borderRadius = Math.random() > .5 ? "50%" : "2px";
        bit.style.setProperty("--duration", (2.5 + Math.random() * 3.5) + "s");
        bit.style.setProperty("--drift", ((Math.random() - .5) * 220) + "px");
        bit.style.animationDelay = (Math.random() * .8) + "s";
        document.body.appendChild(bit);
        setTimeout(() => bit.remove(), 9000);
      }
    }

    document.getElementById("celebrateBtn").addEventListener("click", () => burstConfetti(150));
    document.getElementById("replayBtn").addEventListener("click", typeLines);

    typeLines();