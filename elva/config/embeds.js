export default {
    use: ['twitter', 'youtube', 'vimeo'],
    twitter: {
        options: {
            embedClass: 'oembed oembed-twitter',
            doNotTrack: true
        }
    },
    vimeo: {
        options: {
            embedClass: 'oembed oembed-vimeo',
            //wrapperStyle
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
    }
}