document.addEventListener('alpine:init', () => {
    Alpine.data('search', () => ({
        query: '',
        results: [],
        allResults: [],
        activeIndex: -1,
        loaded: false,
        apiURL: '{{ "/api/search.json" | locale_url }}',
        async init() {
            try {
                const response = await fetch(this.apiURL);
                if (response.ok) {
                    const data = await response.json();
                    this.allResults = data.data || [];
                }
            } catch (e) {
                console.warn('Search API not found:', e);
            }
            this.loaded = true;
        },

        filter() {
            if (this.query.trim().length < 2) {
                this.results = [];
                this.activeIndex = -1;
                return;
            }

            // consider https://github.com/lucaong/minisearch for a more advanced search
            const q = this.query.toLowerCase();
            this.results = this.allResults
                .map(item => {
                    const title = (item.title || '').toLowerCase();
                    const excerpt = (item.excerpt || '').toLowerCase();
                    const keywords = (item.keywords || '').toLowerCase();
                    let score = 0;
                    if (title.includes(q)) score += 3;
                    if (excerpt.includes(q)) score += 2;
                    if (keywords.includes(q)) score += 1;
                    return { item, score };
                })
                .filter(({ score }) => score > 0)
                .sort((a, b) => b.score - a.score)
                .map(({ item }) => item);

            this.activeIndex = -1;
        },

        navigate(direction) {
            if (this.results.length === 0) return;
            this.activeIndex += direction;
            if (this.activeIndex < 0) this.activeIndex = this.results.length - 1;
            if (this.activeIndex >= this.results.length) this.activeIndex = 0;
            this.$nextTick(() => {
                const el = document.querySelector('.search-result-item[aria-selected="true"]');
                if (el) el.scrollIntoView({ block: 'nearest' });
            });
        },

        selectResult() {
            if (this.activeIndex >= 0 && this.results[this.activeIndex]) {
                window.location.href = this.results[this.activeIndex].url;
            }
        },

        closeResults() {
            this.query = '';
            this.results = [];
            this.activeIndex = -1;
        },

        formatDate(dateStr) {
            if (!dateStr) return '';
            try {
                const date = new Date(dateStr);
                return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
            } catch (e) {
                return dateStr;
            }
        }
    }));
});
