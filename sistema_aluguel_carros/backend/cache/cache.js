class Cache {
  static cachedDados() {
    const  cache = require("node-cache");
    return new cache();
  }
}

module.exports = Cache.cachedDados()


