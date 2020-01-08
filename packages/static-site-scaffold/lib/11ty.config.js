/**
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const markdown = require('./11ty/markdown');
const respimg = require('./11ty/respimg');
const l10n = require('./11ty/l10n');
const config = require('config');
const path = require('path');

/**
 * Configuration options for Eleventy
 *
 * @param {object} eleventy - The Eleventy configuration
 *
 * @return {object} - The configured Eleventy instance
 */
function configEleventy(eleventy) {
  l10n(eleventy);

  eleventy.setLibrary('md', markdown);

  respimg.setup(eleventy, config);

  const dir = {
    input: config.folders.pages,
    output: config.folders.output,
    includes: path.join(process.cwd(), config.folders.templates, config.folders.includes),
    layouts: path.join(process.cwd(), config.folders.templates, config.folders.layouts),
  };

  return {
    dir,
    dataTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    templateEngineOverride: 'njk',
  };
}

module.exports = configEleventy;