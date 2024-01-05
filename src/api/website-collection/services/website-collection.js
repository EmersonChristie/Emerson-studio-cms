'use strict';

/**
 * website-collection service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::website-collection.website-collection');
