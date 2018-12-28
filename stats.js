const fs = require('fs');

const data = fs.readFileSync('cleanBuilds.json', { encoding: 'utf-8'});
const builds = JSON.parse(data);

let failedBuilds = 0;
let successfulBuilds = 0;
const stagesStats = {};

for (let i= 0; i < builds.length; i++) {
    const build = builds[i];
    if (build.state === 'passed') {
        successfulBuilds++;
    } else if (build.state === 'failed' || build.state === 'errored') {
        failedBuilds++;
    } else {
        // cancelled
    }
    build.stages.map(stage => {
        if (typeof stagesStats[stage.name] === 'undefined') {
            stagesStats[stage.name] = {
                passed: 0,
                failed: 0,
                errored: 0,
                canceled: 0,
            }
        }
        stagesStats[stage.name][stage.state]++;
    });
}
console.log('Builds stats:');
console.log('Successful', successfulBuilds);
console.log('Failed', failedBuilds);
console.log();
console.log('Stages stats:');
console.log(stagesStats);
