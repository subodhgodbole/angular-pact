# angular-pact

Since [Pact](https://github.com/pact-foundation/pact-js) has deprecated support for Karma with 10.x version.
This project showcases, how you can have Karma and Jest both Testing Frameworks together in one project and -

- Write and execute (new) Pact tests using Jest.
- And continue using Karma for executing existing unit tests (until you migrate).

## Commands

- Running tests using Karma - Files ending with `.karma.spec.ts` are considered.

```sh
npm run test
```

- Running standard Unit Tests using Jest - Files ending with `.jest.spec.ts` are considered.

```sh
npm run test:jest
```

- Running Pact Tests using Jest - Files ending with `.pact.spec.ts` are considered.

```sh
npm run test:pact
```

Note:
I tried using below Regex, which uses lookbehind. This way Karma considers all ".spec.ts" files except ones ending with `.pact.spec.ts` and `.jest.spec.ts`. This way we do not have to rename existing Karma test files with ".karma.spec.ts". But this did not work!

```sh
// In src/test.ts
const context = require.context('./', true, /.*(?<!(jest|pact))\.spec\.ts/);
```
