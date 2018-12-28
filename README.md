# Travis builds stats

## Prerequisites

- installed travis client [https://github.com/travis-ci/travis.rb#installation](https://github.com/travis-ci/travis.rb#installation)

## Configuration

- login into travis cli (for github token only public_repo is required)
- check if it worked with `travis whatsup`
- get your token with `travis token`
- replace `your_token_goes_here` in `fetchData.js` with your token from previous step
- set your `repo id` in `fetchData.js`
- set how many latest builds you want to check in `fetchData.js`

## Usage

- run `npm run fetchData` for fetching data from travis API
- run `npm run cleanData` to remove unnecessary things from fetched data
- run `npm run extractStats` to generate stats about your build

It should report amount of successful and failed builds (counts failed and errored). Cancelled builds are not counted.
Additionally stats about stages states will be printed.
