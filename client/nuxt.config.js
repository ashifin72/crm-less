export default {
    srcDir: __dirname,

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'client',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            { hid: 'description', name: 'description', content: '' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
            },
        ],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        'materialize-css/dist/css/materialize.min.css',
        { src: '~assets/sass/app.sass', lang: 'sass' },
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '~plugins/vuelidate',
        '~plugins/date_filter',
        '~plugins/messages.plugin',
        { src: '~/plugins/materialize.js', mode: 'client' },
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        '@nuxtjs/auth-next',

        // '@nuxtjs/pwa',
    ],
    auth: {
        strategies: {
            laravelJWT: {
                provider: 'laravel/jwt',
                url: '/api',
                endpoints: {
                    login: {
                        url: '/auth/login',
                        method: 'post',
                        propertyName: false,
                    },
                    logout: {
                        url: '/auth/logout',
                        method: 'post',
                        propertyName: false,
                    },
                    refresh: {
                        url: '/auth/refresh',
                        method: 'post',
                        propertyName: false,
                    },
                    user: {
                        url: '/auth/user',
                        method: 'get',
                        propertyName: false,
                    },
                },
                token: {
                    property: 'access_token',
                    maxAge: 60 * 60,
                },
                refreshToken: {
                    maxAge: 20160 * 60,
                },
            },
        },
    },

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        baseURL: 'http://CRM-less.test',
    },

    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
        manifest: {
            lang: 'en',
        },
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        babel: {
            plugins: [
                ['@babel/plugin-proposal-class-properties', { loose: true }],
                ['@babel/plugin-proposal-private-methods', { loose: true }],
                [
                    '@babel/plugin-proposal-private-property-in-object',
                    { loose: true },
                ],
            ],
        },
    },
}
