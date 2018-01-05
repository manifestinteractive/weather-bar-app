**[↤ Developer Overview](../README.md#developer-overview)**

Unit Testing and Code Coverage Reports
===

#### Unit Tests

__Weather Bar__ makes use of the [Karma](https://karma-runner.github.io/1.0/index.html) test runner and the [Mocha](https://mochajs.org) test framework (with [Chai](http://chaijs.com)) for unit testing.

Both Mocha and Chai are integrated using `karma-mocha` and `karma-chai` respectively, so all APIs such as `expect` are globally available in test files.

To run tests:

```bash
# run unit & end-to-end tests
npm test

# lint all JS/Vue component files in `src/`
npm run lint
```

#### Code Coverage

Running `npm test` will also generate code coverage reports in `./test/unit/coverage/`.  Unit Tests will automatically fail if Code Coverage reports fall below the following thresholds:

* Statements: 75%
* Branches: 75%
* Functions: 75%
* Lines: 75%
