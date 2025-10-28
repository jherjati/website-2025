export function createBlogHeroData(allWorks, allPosts, directusToken) {
    return {
        filter: 'all',
        searchQuery: '',
        allWorks: allWorks,
        allPosts: allPosts,
        searchResults: { works: [], posts: [] },
        isSearching: false,
        hasSearched: false,
        directusToken: directusToken,
        currentPage: 1,
        itemsPerPage: 6,

        get allFilteredBlogs() {
            if (this.hasSearched && this.searchQuery.trim() !== '') {
                const searchWorks = this.searchResults.works.map(work => ({
                    thumbnail: 'https://panel.braga.co.id/panel/assets/' + work.thumbnail,
                    topic: work.topic,
                    date_created: new Date(work.date_created).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
                    title: work.work_title,
                    desc: work.synopsis,
                    href: '/blog/case-study/' + work.slug + '/',
                    type: 'work'
                }));
                const searchPosts = this.searchResults.posts.map(post => ({
                    thumbnail: 'https://panel.braga.co.id/panel/assets/' + post.thumbnail,
                    topic: post.topic,
                    date_created: new Date(post.date_created).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
                    title: post.title,
                    desc: post.synopsis,
                    href: '/blog/post/' + post.slug + '/',
                    type: 'post'
                }));

                if (this.filter === 'all') {
                    return [...searchWorks, ...searchPosts];
                } else if (this.filter === 'work') {
                    return searchWorks;
                } else if (this.filter === 'post') {
                    return searchPosts;
                }
            }

            if (this.filter === 'all') {
                return [...this.allWorks, ...this.allPosts];
            } else if (this.filter === 'work') {
                return this.allWorks;
            } else if (this.filter === 'post') {
                return this.allPosts;
            }
            return [];
        },

        get totalPages() {
            return Math.ceil(this.allFilteredBlogs.length / this.itemsPerPage);
        },

        get filteredBlogs() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.allFilteredBlogs.slice(start, end);
        },

        goToPage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
        },

        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },

        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },

        async performSearch() {
            if (this.searchQuery.trim() === '') {
                this.searchResults = { works: [], posts: [] };
                this.hasSearched = false;
                this.currentPage = 1;
                return;
            }

            this.isSearching = true;
            this.currentPage = 1;
            try {
                const worksFilter = JSON.stringify({
                    _and: [
                        { status: { _eq: 'published' } },
                        {
                            _or: [
                                { work_title: { _contains: this.searchQuery } },
                                { synopsis: { _contains: this.searchQuery } },
                                { topic: { _contains: this.searchQuery } }
                            ]
                        }
                    ]
                });

                const postsFilter = JSON.stringify({
                    _and: [
                        { status: { _eq: 'published' } },
                        {
                            _or: [
                                { title: { _contains: this.searchQuery } },
                                { synopsis: { _contains: this.searchQuery } },
                                { topic: { _contains: this.searchQuery } }
                            ]
                        }
                    ]
                });

                const worksParams = new URLSearchParams({
                    fields: '*',
                    sort: '-date_created',
                    filter: worksFilter
                });

                const postsParams = new URLSearchParams({
                    fields: '*',
                    sort: '-date_created',
                    filter: postsFilter
                });

                const [worksResponse, postsResponse] = await Promise.all([
                    fetch('https://panel.braga.co.id/panel/items/works?' + worksParams, {
                        headers: { Authorization: 'Bearer ' + this.directusToken }
                    }),
                    fetch('https://panel.braga.co.id/panel/items/posts?' + postsParams, {
                        headers: { Authorization: 'Bearer ' + this.directusToken }
                    })
                ]);

                const [worksJson, postsJson] = await Promise.all([
                    worksResponse.json(),
                    postsResponse.json()
                ]);

                this.searchResults = {
                    works: worksJson.data || [],
                    posts: postsJson.data || []
                };
                this.hasSearched = true;
            } catch (error) {
                console.error('Search error:', error);
                this.searchResults = { works: [], posts: [] };
                this.hasSearched = false;
            } finally {
                this.isSearching = false;
            }
        }
    };
}
