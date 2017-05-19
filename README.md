# promisify

## Available as an npm dependency at "@withjoy/promisify"

This helper is designed to ease the transition from callbacks to promises.

Similar to the Bluebird promisify this helper takes a function whose lasts argument is a callback and converts it to a function that returns a promise. There is one important difference though: if a callback is passed to the new function it will perform as it once did maintaining backwards compatibility.

Wrap every old function you touch with promisify. There is no need to worry about where else it is used in the code because backwards compatibility is maintained.

Context is maintained as well so it is perfectly valid to wrap a function on an object with promisify e.g.

```javascript
// Safe :) context is maintained properly
Test.prototype.getValue = promisify(function(callback) {
  callback(null, this.value);
});
```

See test/test.js for all the supported cases. If you think of another then please comment or even better make a pr :)

# promisify.inverse

Promisify.inverse is for making a new function (that returns a promise) backwards compatible.

It can be confusing and disruptive to add a function that returns a promise amongst dozens of other functions that take callbacks but we have to do it to move forward. Wrapping your new function in promisify.inverse gives you the best of both worlds. If someone accidentally passes a callback with your function it will still work.
