require("dotenv").config();
const debug =  true;
function info(...params) {
  if (debug) {
    console.info(params);
  }
}

function error(...params) {
  if (debug) {
    console.error(params);
  }
}

function warn(...params) {
  if (debug) {
    console.warn(params);
  }
}

function log(...params) {
  if (debug) {
    console.log(params);
  }
}

module.exports = {
  info,
  warn,
  error,
  log,
};
