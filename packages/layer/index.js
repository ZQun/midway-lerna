const egg = require('egg');

const framework = {};

/**
 * @member {Application} Egg#Application
 * @since 1.0.0
 */
framework.Application = require('./lib/application');

/**
 * @member {Agent} Egg#Agent
 * @since 1.0.0
 */
framework.Agent = require('./lib/agent');

/**
 * @member {Agent} Egg#AppWorkerLoader
 * @since 1.0.0
 */
framework.AppWorkerLoader = require('./lib/core/loader/app_worker_loader');

/**
 * @member {Agent} Egg#AgentWorkerLoader
 * @since 1.0.0
 */
framework.AgentWorkerLoader = require('./lib/core/loader/agent_worker_loader');

module.exports = exports = Object.assign(egg, framework);