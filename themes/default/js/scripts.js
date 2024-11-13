document.addEventListener('alpine:init', () => {
    Alpine.store('elva', {
        init() {
            this.theme = localStorage.getItem('theme') === null ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' : localStorage.getItem('theme')
            this.scrollPosition = window.scrollY
        },
        theme: null,
        scrollPosition: 0,
        scrollPercent: 0,
        themeToggle() {
            (this.theme === 'light') ? this.theme = 'dark' : this.theme = 'light'
            localStorage.setItem('theme', this.theme)
        },
        scrollPositionUpdate() {
            this.scrollPosition = window.scrollY
            this.scrollPercent = Math.round(((document.body.scrollTop || document.documentElement.scrollTop) / ( document.documentElement.scrollHeight - document.documentElement.clientHeight )) * 100)
        }
    })
})