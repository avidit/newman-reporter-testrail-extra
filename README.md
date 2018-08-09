# newman-reporter-testrail

A [newman](https://github.com/postmanlabs/newman) reporter for [testrail](http://docs.gurock.com/testrail-api2/start)

## Installation
    npm install newman-reporter-testrail

## Usage

### Add test case ids to assertions
Prefix test assertions with testRail case Id CXXXXXX, including the letter C. Multiple test case ids can be added.
```javascript
pm.test("C12345 C67890 Status code is 200", function () {
    pm.response.to.have.status(200);
});
```

### Set the environment variables.
```
TESTRAIL_HOST='https://testrail.domain.com' # TestRail host.
TESTRAIL_USERNAME='username@domain.com'     # TestRail username.
TESTRAIL_PASSWORD='testrail_password'       # TestRail password.
TESTRAIL_API_KEY='testrail_api_key'         # TestRail API key.
TESTRAIL_PROJECT_ID='testrail_project_id'   # TestRail project id.
TESTRAIL_SUITE_ID='testrail_suite_id'       # (optional) TestRail suite id. Required for multi-suite projects.
TESTRAIL_RUN_NAME='Automation run'          # (optional) Name of test run to create.
```

Note: Either [username and password](http://docs.gurock.com/testrail-api2/accessing#username_and_password) or [username and api key](http://docs.gurock.com/testrail-api2/accessing#username_and_api_key) can be used.

### Run newman test with the reporter option `-r testrail`
    newman run my-collection.postman_collection.json -r cli,testrail
