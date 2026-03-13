// Scroll reveal
const sections = document.querySelectorAll('section');
const revealSection = () => {
    const trigger = window.innerHeight * 0.88;
    sections.forEach(s => {
        if (s.classList.contains('reveal')) return;
        if (s.getBoundingClientRect().top < trigger) s.classList.add('reveal');
    });
};
window.addEventListener('scroll', revealSection, { passive: true });
revealSection();

// Animated mesh background
const canvas = document.getElementById('mesh-bg');
const ctx = canvas.getContext('2d');

const NODE_COUNT = 120;
const LINK_DISTANCE = 220;

let nodes = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function initNodes() {
    nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
        });
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update positions
    for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
    }

    // Draw lines
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < LINK_DISTANCE) {
                const alpha = 0.18 * (1 - dist / LINK_DISTANCE);
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.strokeStyle = `rgba(0,0,0,${alpha})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }

    // Draw nodes
    for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,0,0,0.25)';
        ctx.fill();
    }

    requestAnimationFrame(draw);
}

window.addEventListener('resize', () => {
    resize();
    initNodes();
});

resize();
initNodes();
draw();
