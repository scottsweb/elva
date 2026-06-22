document.addEventListener('alpine:init', () => {
    Alpine.store('elva', {
        init() {
            this.theme = localStorage.getItem('theme') === null ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' : localStorage.getItem('theme')

            document.querySelectorAll('[loading="lazy"]').forEach(element => {
                const animateIn = () => {
                    element.classList.add('elva-loaded');
                };
                (element.complete) ? animateIn() : element.addEventListener('load', animateIn);
            });
        },
        theme: null,
        themeToggle() {
            (this.theme === 'light') ? this.theme = 'dark' : this.theme = 'light'
            localStorage.setItem('theme', this.theme)
        }
    })
})