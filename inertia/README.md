Example: Use TestCafe with an External TypeScript Compiler

This simple JavaScript project explains how to use TestCafe with an external TypeScript compiler.

Why use an external compiler?

TestCafe can run TypeScript tests out of the box. When you launch a TypeScript fixture, the framework uses its built-in TypeScript compiler
to generate JavaScript code.

However, some users may prefer to use an external TypeScript compiler—for example, to have more control over the compilation process, or to work with a different version of TypeScript.

What this example shows

This example demonstrates how to set up a TestCafe project with TypeScript tests that do not use the framework’s built-in TypeScript compiler.

test.ts contains a simple test.

tsconfig.json defines custom TypeScript compilation settings.

package.json includes scripts to compile the test into JavaScript and run it with TestCafe.

How to run it

1. Install the dependencies (testcafe and typescript@5):
   npm install

2. Change the screenshotPrefix link in run-tests.js file to match your local machine path
   Ex: const screenshotPrefix = "E:\\Hicas\\inertia\\screenshots\\";

3. Change the srcDir link in run-tests.js file to match your local machine path
   Ex: const srcDir = "E:\\Hicas\\inertia\\screenshots";

4. Compile TypeScript code into JavaScript
   npm run compile

5. Run the script:
   node run-tests.js
