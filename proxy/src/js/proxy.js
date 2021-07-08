/*
 * Copyright (c) 2020 wellwell.work, LLC by Zoe
 *
 * Licensed under the Apache License 2.0 (the "License");
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Router from "./router";

class EvilProxy {
  version = "v0.0.1";

  // UI - PROXY API

  // template => application

  // defualt: system
  // select the template, init in client with form

  // auto add system javascript to html

  // templates:
  // - id: auto-picture
  //   name: Auto Pictures
  //   description: Auto download pictures in your website.
  //   category: tool
  //   keywords: []
  //   ui: https://labs.zoe.im/sitevil-auto-picture # we are trying to load this a the home page
  // - id: fake # without ui, but i need the init form
  //

  // load confiruation from remote repository
  // configuration:
  // - load mode template: index.html, assets, etc. use query to select mode
  // - index url: auto load directlly with template
  // - modify content directlly from configuration on mode.
  // - configuration contains multi mitm modes
  // - request proxy handler

  // load modifier configurations

  // evil site from headers:
  // - _ev_host: www.google.com

  // proxy signer: PATH: /__evil__/{url}
  //               HEADERS:

  // common response headers:
  // - access-control-allow-origin: *, or current site
  // - _ev_ver: version

  // remove response headers:
  // - content-security-policy
  // - content-security-policy-report-only
  // - clear-site-data

  constructor() {
    this.count = 0;

    // register handle
    this.router = new Router();

    this.router.handle("/");
  }

  // normal proxy the request: take request get the response and return
  // request just come's from client
  // register url patterm with handle
  async proxy(request) {
    // create a new request from orginal one
    const opts = {
      mode: "cors",
      method: request.method,
    };
  }

  // handle is the main method to process the request
  async handle(request) {
    this.count++;
    return new Response(`Hello worker! We have handled ${this.count} times`, {
      status: 200,
    });
  }
}

// module.exports = EvilProxy;
export default EvilProxy;
