
const Promise = require('bluebird');

const promisify = f => function() {

  const callback = arguments[f.length - 1];

  if (callback) {
    return f.apply(this, Array.from(arguments));
  } else {
    return new Promise((resolve, reject) => {

      arguments[f.length - 1] = (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      };

      arguments.length = f.length;

      f.apply(this, Array.from(arguments));

    });
  }

}

promisify.inverse = f => function() {

  const callback = arguments[f.length];

  const res = Promise.resolve().then(() => f.apply(this, Array.from(arguments)));

  if (callback) {
    res.then(
      data => callback(null, data),
      callback
    );
  } else {
    return res;
  }

}

module.exports = promisify;
