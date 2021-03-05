class PushFunFramework {
    constructor(app) {
        this.app = app
    }
    
    configWillLoad() {
        // this is the last chance to modify the config.
        if(this.app.config.env === 'local') {
            // MiddleWare Regsiter
            this.app.config.coreMiddleware.push('access')
        }
    }

    configDidLoad() {
        // Config, plugin files have been loaded.
    }

    async didLoad() {
        // All files have loaded, start plugin here.
    }

    async willReady() {
        // All plugins have started, can do some thing before app ready
    }

    async didReady() {
        // Worker is ready, can do some things
        // don't need to block the app boot.
    }

    async serverDidReady() {
        // Server is listening.
    }

    async beforeClose() {
        // Do some thing before app close.
    }
}

module.exports = PushFunFramework