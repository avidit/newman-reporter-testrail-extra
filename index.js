const Testrail = require('testrail-api');


class TestRailReporter {
    constructor(emitter, reporterOptions) {

        const host = process.env.TESTRAIL_HOST || reporterOptions.host || '';
        const user = process.env.TESTRAIL_USERNAME || reporterOptions.username || '';
        const password = process.env.TESTRAIL_PASSWORD || process.env.TESTRAIL_API_KEY || reporterOptions.password || '';
        const project_id = process.env.TESTRAIL_PROJECT_ID || reporterOptions.projectId || '';
        const suite_id = process.env.TESTRAIL_SUITE_ID || reporterOptions.suiteId || '';
        const run_name = process.env.TESTRAIL_RUN_NAME || reporterOptions.runName || 'Automation Run';

        if (!(host && user && password && project_id)) {
            console.log('please provide testrail details');
            return;
        }

        let testrail = new Testrail({
            host: host,
            user: user,
            password: password
        });

        const run_details = {
            name: run_name,
            description: `${run_name} - ${new Date().toISOString()}`,
            suite_id: suite_id
        }
        const results = [];

        emitter.on('assertion', (err, o) => {
            const re = /\bC(\d+)\b/;
            const str = o.assertion.split(' ');
            const case_ids = str.filter(i => i.match(re)).map(i => i.substr(1));
            case_ids.forEach((case_id) => {
                results.push({
                    case_id: case_id,
                    status_id: (err) ? 5 : 1,
                    comment: (err) ? `Test failed: ${err.message}` : 'Test passed'
                });
            });
        });

        emitter.on('beforeDone', (err) => {
            if (err) {
                return;
            }
            testrail.addRun(project_id, run_details)
                .then((result) => {
                    console.log('creating run...', result.response.statusMessage)
                    console.log(result.body.url);
                    var run_id = result.body.id;
                    testrail.addResultsForCases(run_id, results)
                        .then((result) => {
                            console.log('adding results...', result.response.statusMessage)
                            testrail.closeRun(run_id)
                                .then((result) => {
                                    console.log('closing run...', result.response.statusMessage)
                                }).catch((error) => {
                                    console.log(error.message);
                                });
                        }).catch((error) => {
                            console.log(error.message);
                        });
                }).catch((error) => {
                    console.log(error.message);
                });
        });
    }
}

module.exports = TestRailReporter;
