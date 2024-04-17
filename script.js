window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        const box = section.querySelector('.box');
        const rect = box.getBoundingClientRect();
        if (rect.top < window.innerHeight / 1.3 && rect.bottom >= 0) {
            section.style.opacity = '1';
            section.style.transition = 'opacity 1s ease';
        } else {
            section.style.opacity = '0';
        }
    });
});
