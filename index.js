
const promisify = f => function() {
  return new Promise((resolve, reject) => {

    const callback = arguments[f.length - 1];

    arguments[f.length - 1] = (err, data) => {
      if (callback){
        callback(err, data);
      } else {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    };

    arguments.length = f.length;

    f.apply(this, Array.from(arguments));

  });
}

module.exports = promisify;
