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

const Method = (method) => (req) =>
  req.method.toLowerCase() === method.toLowerCase();
const Connect = Method("connect");
const Delete = Method("delete");
const Get = Method("get");
const Head = Method("head");
const Options = Method("options");
const Patch = Method("patch");
const Post = Method("post");
const Put = Method("put");
const Trace = Method("trace");

const Header = (header, val) => (req) => req.headers.get(header) === val;
const Host = (host) => Header("host", host.toLowerCase());
const Referrer = (host) => Header("referrer", host.toLowerCase());

const Path = (regExp) => (req) => {
  const url = new URL(req.url);
  const path = url.pathname;
  const match = path.match(regExp) || [];
  return match[0] === path;
};

class Router {
  constructor() {
    this.routes = [];
    this._default = this._notfound;
  }

  _notfound(request) {
    return new Response("Page not found", {
      status: 404,
      statusText: "not found",
      headers: {
        "content-type": "text/plain",
      },
    });
  }

  _handle(conditions, handler) {
    this.routes.push({
      conditions,
      handler,
    });
    return this;
  }

  handle(url, handler) {
    return this._handle([Path(url)], handler);
  }

  connect(url, handler) {
    return this._handle([Connect, Path(url)], handler);
  }

  delete(url, handler) {
    return this._handle([Delete, Path(url)], handler);
  }

  get(url, handler) {
    return this._handle([Get, Path(url)], handler);
  }

  head(url, handler) {
    return this._handle([Head, Path(url)], handler);
  }

  options(url, handler) {
    return this._handle([Options, Path(url)], handler);
  }

  patch(url, handler) {
    return this._handle([Patch, Path(url)], handler);
  }

  post(url, handler) {
    return this._handle([Post, Path(url)], handler);
  }

  put(url, handler) {
    return this._handle([Put, Path(url)], handler);
  }

  trace(url, handler) {
    return this._handle([Trace, Path(url)], handler);
  }

  // all as default
  all(handler) {
    return this._handle([], handler);
  }

  // register a default handler
  default(handler) {
    this._default = handler || this._notfound;
    return this;
  }

  // serve http request
  serve(request) {
    const route = this.resolve(request);
    return route ? route.handler(request) : this._default(request);
  }

  // find the correct handler
  resolve(request) {
    return this.routes.find((r) => {
      if (!r.conditions || (Array.isArray(r) && !r.conditions.length)) {
        return true;
      }

      if (typeof r.conditions === "function") {
        return r.conditions(request);
      }

      return r.conditions.every((c) => c(request));
    });
  }
}

// module.exports = Router;
export default Router;
