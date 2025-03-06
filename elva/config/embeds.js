export default {
    use: ['twitter', 'youtube', 'vimeo', 'instagram', 'tiktok', 'openstreetmap', 'ted', 'soundcloud', 'spotify'],
    twitter: {
        options: {
            embedClass: 'oembed oembed-twitter',
            doNotTrack: true
        }
    },
    vimeo: {
        options: {
            embedClass: 'oembed oembed-vimeo',
        }
    },
    youtube: {
        options: {
            embedClass: 'oembed oembed-youtube',
            modestBranding: true,
            lazy: true,
            lite: {
                thumbnailQuality: 'maxresdefault',
                css: {
                    inline: true
                },
                js: {
                    inline: true
                }
            }
        }
    },
    instagram: {
        options: {
            embedClass: 'oembed oembed-instagram'
        }
    },
    tiktok: {
        options: {
            embedClass: 'oembed oembed-tiktok'
        }
    },
    openstreetmap: {
        options: {
            embedClass: 'oembed oembed-openstreetmap'
        }
    },
    ted: {
        options: {
            embedClass: 'oembed oembed-ted'
        }
    },
    soundcloud: {
        options: {
            embedClass: 'oembed oembed-soundcloud'
        }
    },
    spotify: {
        options: {
            embedClass: 'oembed oembed-spotify'
        }
    }
}