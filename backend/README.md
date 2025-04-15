# bodyweighttracker.xyz backend 

This deploys the backend infrastructure for bodyweighttracker.xyz. ApiGateway, lambda, and DynamoDB are used. 

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npm run dev`     build, 
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template

## Deploying 
Be sure to set your `AWS_PROFILE` and `AWS_REGION` before running `npm run deploy`.

## Endpoints
- Root 
    - Local - http://localhost:3000/
    - Prod - https://o4z0lccjf7.execute-api.eu-west-1.amazonaws.com/prod/
- /weight
    - GET - Returns mock json data for weights
    - POST - Adds weight data for user

## Testing API 
```bash
# Add new weight entry
curl -X POST \
  http://localhost:3000/weight \
  -H 'Content-Type: application/json' \
  -d '[{"weight": 75.5, "date": "2024-03-19"}]'
```

## Database scripts 
The `/scripts` directory contains scripts for viewing the database and bulk updating the database. These are useful for debugging. 

They rely on TypeScript so will need `ts-node` or `bun` to run. 

#### View contents of DB
```bash
WEIGHT_TABLE_NAME=<your-table-name> ts-node scripts/viewDb.ts
```

#### Bulk update the DB (with JSON file)
```bash
WEIGHT_TABLE_NAME=<your-table-name> ts-node scripts/bulkDbUpdate.ts scripts/sample-weights.json
```