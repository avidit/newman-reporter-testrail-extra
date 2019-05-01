# newman-reporter-testrail-extra

A [newman](https://github.com/postmanlabs/newman) reporter for [testrail](http://docs.gurock.com/testrail-api2/start)

## Installation

    npm install newman-reporter-testrail-extra

## Usage

### Add test case ids to assertions

Prefix test assertions with testRail case Id CXXXXXX, including the letter C. Multiple test case ids can be added.

```javascript
pm.test("C12345 C67890 Status code is 200", function() {
  pm.response.to.have.status(200);
});
```

### Set the reporter options.

Reporter option can be set as environment variables or from reporter options arguments
```
export TESTRAIL_HOST='https://testrail.domain.com' # TestRail host.
export TESTRAIL_USERNAME='username@domain.com'     # TestRail username.
export TESTRAIL_PASSWORD='testrail_password'       # TestRail password.
export TESTRAIL_API_KEY='testrail_api_key'         # TestRail API key.
export TESTRAIL_PROJECT_ID='testrail_project_id'   # TestRail project id.
export TESTRAIL_SUITE_ID='testrail_suite_id'       # (optional) TestRail suite id. Required for multi-suite projects.
export TESTRAIL_RUN_NAME='Automation run'          # (optional) Name of test run to create.
```

Note: Either [username and password](http://docs.gurock.com/testrail-api2/accessing#username_and_password) or [username and api key](http://docs.gurock.com/testrail-api2/accessing#username_and_api_key) can be used.

### Run newman test with the reporter option `-r testrail-extra`

    newman run my-collection.postman_collection.json -r cli,testrail-extra \
    --reporter-testrail-extra-host 'https://testrail.domain.com' \
    --reporter-testrail-extra-username 'username@domain.com' \
    --reporter-testrail-extra-password 'password' \
    --reporter-testrail-extra-project-id 'testrail_project_id' \
    --reporter-testrail-extra-suite-id 'testrail_suite_id' \
    --reporter-testrail-extra-run-name 'Automation run' 
