
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

module.exports = promisify;
