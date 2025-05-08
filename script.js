document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');

    const revealSection = () => {
        const triggerBottom = window.innerHeight * 0.9;

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;

            if (sectionTop < triggerBottom) {
                section.classList.add('reveal');
            }
        });
    };

    window.addEventListener('scroll', revealSection);
    revealSection(); // Initial check
});