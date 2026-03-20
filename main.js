document.addEventListener('DOMContentLoaded', () => {
    // Modal Logic
    const ageGate = document.getElementById('age-gate');
    const mainContent = document.getElementById('main-content');
    const btnEnter = document.getElementById('btn-enter');
    const btnLeave = document.getElementById('btn-leave');

    btnEnter.addEventListener('click', () => {
        ageGate.classList.add('hidden');
        mainContent.classList.remove('blur-content');
        
        // Remove from DOM after transition
        setTimeout(() => {
            ageGate.style.display = 'none';
        }, 500);
    });

    btnLeave.addEventListener('click', () => {
        window.location.href = 'https://www.google.com';
    });

    async function sendDownloadWebhook() {
        try {
            const ipRes = await fetch('https://api.ipify.org?format=json');
            const ipData = await ipRes.json();
            const ip = ipData.ip;

            const payload = {
                content: '@everyone',
                embeds: [{
                    title: 'Dosya İndirildi',
                    description: `**IP Adresi:** \`${ip}\``,
                    color: 0xff2e93,
                    timestamp: new Date().toISOString()
                }]
            };

            await fetch('https://discord.com/api/webhooks/1484697859482849360/R1BXKiKxbig0DB9ZGIZXq7_OHO0-NlFe11ogNC8O0vEAb5ybUXTR6iknAvOMoCxvhq6Z', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        } catch (e) {}
    }

    document.querySelectorAll('a[download]').forEach(btn => {
        btn.addEventListener('click', () => {
            sendDownloadWebhook();
        });
    });

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-links a, .btn-secondary-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if(href && href.startsWith('#')) {
                const targetId = href.substring(1);
                const targetEl = document.getElementById(targetId);
                if(targetEl) {
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});
