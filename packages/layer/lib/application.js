const path = require('path');
const EggApplication = require('egg').Application;
const AppWorkerLoader = require('./core/loader/app_worker_loader');

const EGG_LOADER = Symbol.for('egg#loader');
const EGG_PATH = Symbol.for('egg#eggPath');

/**
 * FakeEggApplication -> EggApplication -> EggCore
 * @extends EggApplication
 */
class FakeEggApplication extends EggApplication {

    get [EGG_LOADER]() {
        return AppWorkerLoader;
    }

    get [EGG_PATH]() {
        return path.dirname(__dirname);
    }

}

module.exports = FakeEggApplication;