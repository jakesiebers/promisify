# promisify

This helper is designed to ease the transition from callbacks to promises.

Similar to the Bluebird promisify this helper takes a function whose lasts argument is a callback and converts it to a function that returns a promise. There is one important difference though: if a callback is passed to the new function it will perform as it once did maintaining backwards compatibility.

Wrap every old function you touch with promisify. There is no need to worry about where else it is used in the code because backwards compatibility is maintained.


Context is maintained as well so it is perfectly valid to wrap a function on an object with promisify e.g.

Test.prototype.getValue = promisify(function(callback) {
  callback(null, this.value);
});

See test/test.js for all the supported cases. If you think of another then please comment or even better make a pr :)
