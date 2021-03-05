const path = require('path');
const fs = require('fs');

module.exports = appInfo => {

    const config = {};

    // 透过nginx 获取真实IP
    config.proxy = true;

    // cors
	config.cors = {
		credentials: true,
		// exposeHeaders: 'Authorization',
		// origin: '*',
		// allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
		// origin: ctx => ctx.get('origin'),
	};

	// csrf
	config.security = {
		// domainWhiteList: ['http://localhost:8080'],
		// domainWhiteList: ['*'],
		csrf: {
			enable: false,
			ignoreJSON: true,
		},
	};

	// default request size
	config.bodyParser = {
		formLimit: '5mb',
		jsonLimit: '5mb',
		textLimit: '5mb'
	}

	// 使用 midway logger
	config.midwayFeature = {
		replaceEggLogger: true
	}

    return config;
};
