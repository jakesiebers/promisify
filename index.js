
const promisify = f => function() {
  const p = new Promise((resolve, reject) => {

    const callback = arguments[f.length - 1];

    arguments[f.length - 1] = (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }

      if (callback) callback(err, data);
    };

    arguments.length = f.length;

    f.apply(this, Array.from(arguments));

  });

  p.catch(() => {});
  
  return p;
}

module.exports = promisify;
