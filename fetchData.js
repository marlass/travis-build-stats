const fetch = require('node-fetch');
const fs = require('fs');

async function run() {
    async function getDataAboutLastBuilds({ repoId, buildsToCheck }) {
        let buildsCount = 0;
        let builds = [];
        let baseUrl = 'https://api.travis-ci.org';
        let nextUrl = `/repo/${repoId}/builds?sort_by=finished_at:desc&limit=100&include=build.jobs`;
        while (buildsCount < buildsToCheck) {
            const res = await fetch(`${baseUrl}${nextUrl}`,
                { 
                    headers: {
                        "Travis-API-Version": "3",
                        "User-Agent": "Error stats",
                        "Authorization": "token your_token_goes_here"
                    }
                });
            const data = await res.json();
            builds = [...builds, ...data.builds];
            buildsCount += 100;
            console.log(buildsCount);
            nextUrl = data['@pagination'].next['@href'];
        }
        return builds;
    }
    
    const buildsToCheck = 3000;
    const repositoryId = 21255588;
    
    const dataAboutLastBuilds = await getDataAboutLastBuilds({ repoId: repositoryId, buildsToCheck });

    fs.writeFileSync('builds.json', JSON.stringify(dataAboutLastBuilds));
}

run();
