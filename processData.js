const fs = require('fs');

const data = fs.readFileSync('builds.json', { encoding: 'utf-8'});
const builds = JSON.parse(data);

const cleanBuilds = builds.map(build => {
    return {
        id: build.id,
        number: build.number,
        state: build.state,
        duration: build.duration,
        eventType: build['event_type'],
        previousState: build['previous_state'],
        pullRequestTitle: build['pull_request_title'],
        pullRequestNumber: build['pull_request_number'],
        startedAt: build['started_at'],
        finishedAt: build['finished_at'],
        branch: build.branch.name,
        commit: {
            id: build.commit.id,
            sha: build.commit.sha,
            message: build.commit.message,
        },
        jobs: build.jobs.map(job => {
            return {
                id: job.id,
                number: job.number,
                state: job.state,
                startedAt: job['started_at'],
                finishedAt: job['finished_at'],
            }
        }),
        stages: build.stages.map(stage => {
            return {
                id: stage.id,
                name: stage.name,
                state: stage.state,
                startedAt: stage['started_at'],
                finishedAt: stage['finished_at'],
            }
        }),
        createdBy: build['created_by'].login,
        updatedAt: build['updated_at']
    }
})

fs.writeFileSync('cleanBuilds.json', JSON.stringify(cleanBuilds));
