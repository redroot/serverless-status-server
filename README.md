# Serverless Status Server

A serverless implementation of a simple status server that features:

- Homepage contain all current status keys, messages and last updated time
- Ability to filter for ok, warning, and critical statuses
- Ability to search for specific status key
- Ability to POST to an endpoint to update a status, using a token for auth
- Uses DynamoDB to store statuses

By default it runs on a 'dev' stage but you can set the stage to whatever value you want.

## Getting Started

If you haven't already, set up [Serverless](https://serverless.com/).

- Set up a [AWS profile with the correct access permissions for serverless](https://serverless.com/framework/docs/providers/aws/guide/credentials/).
- Either export the access key id and secret access key to your environment, or make use of `~/.aws/credentials` and `direv` using a `.envrc` file - [see example](https://medium.com/blechatech/how-to-setup-aws-credentials-for-new-code-cc80c44cc67).
- Then, fork the codebase and clone it locally!
- Update the token and

## Local Development

- You can test the functions locally with `serverless invoke local -f list` or `serverless invoke local -f update PARAMS`. Unfortunately the output of the list function won't tell you much as it spits out close-to-unreadable HTML.

## Testing

- There are tests!

## Deployment Notes

- When you are ready to deploy, run `serverless deploy -v` to deploy to the dev stage
- You can optionially set the stage with `--stage` as option for the above.
- If you want a custom domain, comment out the custom domain part in the serverless.yaml

## TODO

- add dynamodb backend and get update working with token
- add simple autorefresh with local storage.
- add better design
- node prune before deploy?
- get secret tokens for different envs
- better docs - testing locally, deployment to stating, deployiment to production
- tests?

## TODO V2

- Cron style status tasks within this repo with common DSL
