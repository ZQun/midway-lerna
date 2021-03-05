const path = require('path');
const EggAgent = require('egg').Agent;
const AgentWorkerLoader = require('./core/loader/agent_worker_loader');

const EGG_LOADER = Symbol.for('egg#loader');
const EGG_PATH = Symbol.for('egg#eggPath');

/**
 * FakeEggAgent -> EggAgent -> EggCore
 * @extends EggAgent
 */
class FakeEggAgent extends EggAgent {

    get [EGG_LOADER]() {
        return AgentWorkerLoader;
    }

    get [EGG_PATH]() {
        return path.dirname(__dirname);
    }

}

module.exports = FakeEggAgent;