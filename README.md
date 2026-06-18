# clear-cap-assignment

This project is a Typescript implementation of the Clear Capital Code Sample Instructions.

## Assumptions

### Error Handling and Logging

Since this code is a "component of a larger system", I have assumed the larger system has proper error handling and logging techniques to handle thrown exceptions.

### Edge Cases

There could be some different handling around the edge case of lines with only tabs, consecutive tabs, or starting/ending with tabs (and blank lines I suppose). Per the `.split()` documentation at (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split): "If separator appears at the beginning (or end) of the string, it still has the effect of splitting, resulting in an empty (i.e., zero length) string appearing at the first (or last) position of the returned array." This results in the token array containing an extra element for the trailing zero-length string. While this makes sense and I believe the implementation is technically correct, when writing the test case for it, I was initially surprised by the result so I thought I would mention it here.

## Dependencies

This project was built using Nodejs v26.3.0, NPM 11.16.0, Typescript 6.0.3 and Docker/Docker Compose.

## Quick Start

It is recommended to use Docker and Docker Compose to run tests for this project.

The Docker container _only_ runs the test suite. See below for running the tests or index.ts file locally.

1. Clone the repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Run `docker compose up -d` to build and start the docker container test suite. This will install the necessary dependencies, compile the Typescript code, and run the tests.
4. To view the test results, run `docker compose logs -f` in your terminal. This will display the logs from the test suite, including the results of the tests.

If you make modifications to the code and want to re-run the test suite under Docker, you can run `docker compose up --build -d` to rebuild the container with your changes and run the tests again.

## Running Test Suite Locally

1. Ensure you have Nodejs v26.3.0 and NPM 11.16.0 installed on your machine. (other versions may work but have not been tested).
2. Navigate to the project directory in your terminal.
3. Run `npm install` to install the dependencies.
4. Run `npm run test` to run the test suite.

## Running index.ts Locally

1. Ensure you have Nodejs v26.3.0 and NPM 11.16.0 installed on your machine. (other versions may work but have not been tested).
2. Navigate to the project directory in your terminal.
3. Run `npm install` to install the dependencies.
4. Run `npm run build` to compile the Typescript code.
5. Run `npm run start` to execute the compiled code.

If you wish to see the output for a specific mode, you can comment in/out the corresponding calls in index.ts.

## A Word of Caution

The sample files provided have been carefully formatted to work with the test cases. Be aware that when working with the files in your IDE, it may autoformat the files and ruin the test cases.
