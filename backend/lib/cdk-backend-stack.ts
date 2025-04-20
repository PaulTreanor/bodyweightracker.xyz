import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';


export class CdkBackendStack extends cdk.Stack {
	constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		// **** DynamoDB ****
		const weightTable = new dynamodb.Table(this, 'WeightTable', {
			partitionKey: { name: 'userEmail', type: dynamodb.AttributeType.STRING },
			sortKey: { name: 'date', type: dynamodb.AttributeType.STRING },
			billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
			removalPolicy: cdk.RemovalPolicy.DESTROY, // For development only
		});

		// **** Lambda ****
		const weightApiLambda = new lambda.Function(this, 'WeightAPIHandler', {
			runtime: lambda.Runtime.NODEJS_18_X,
			code: lambda.Code.fromAsset('lambda'),
			handler: 'weightApi.handler',
			environment: {
				WEIGHT_TABLE_NAME: weightTable.tableName
			}
		});

		// **** API Gateway ****
		const api = new apigateway.RestApi(this, 'WeightApi', {
			restApiName: 'Weight API',
			description: 'For reading and updating user weight data',
			defaultCorsPreflightOptions: {
				allowOrigins: ['*'],
				allowMethods: ['GET', 'POST', 'OPTIONS'],
				allowHeaders: ['Content-Type', 'Authorization'],
				allowCredentials: true
			}
		});

		// **** COGNITO User Pool ****
		const userPool = new cognito.UserPool(this, 'WeightmateUserPool', {
			userPoolName: 'WeightmateUserPool',
			selfSignUpEnabled: true,
			// Email verification flow
			autoVerify: { email: true }, 
			signInAliases: {
				email: true 
			},
			passwordPolicy: {
				minLength: 8,
				requireLowercase: true,
				requireDigits: true,
				requireSymbols: true,
				requireUppercase: true,
			},
			
		});

		// **** COGNITO User Pool Client ****
		const userPoolClient = new cognito.UserPoolClient(this, 'WeightmateWebClient', {
			userPool,
			userPoolClientName: 'WeightmateWeb',
			authFlows: {
				userSrp: true,
				userPassword: true,  
			},
			preventUserExistenceErrors: true,
		});

		// API and lambda config
		const auth = new apigateway.CognitoUserPoolsAuthorizer(this, 'WeightApiAuthorizer', {
			cognitoUserPools: [userPool]
		});
		weightTable.grantReadWriteData(weightApiLambda);

		// Create API Gateway resource and method
		const weightApiIntegration = new apigateway.LambdaIntegration(weightApiLambda);
		
		// This makes the API route /weight
		const weightEndpoint = api.root.addResource('weight');
		weightEndpoint.addMethod('GET', weightApiIntegration, {
			authorizer: auth,
			authorizationType: apigateway.AuthorizationType.COGNITO,
		});
		weightEndpoint.addMethod('POST', weightApiIntegration, {
			authorizer: auth,
			authorizationType: apigateway.AuthorizationType.COGNITO,
		}); 

		// **** Outputs ****
		new cdk.CfnOutput(this, 'ApiEndpoint', {
			description: 'API Gateway endpoint URL',
			value: api.url
		});

		new cdk.CfnOutput(this, 'WeightApiLambdaArn', {
			description: 'Weight API Lambda Function ARN',
			value: weightApiLambda.functionArn
		});

		new cdk.CfnOutput(this, 'UserPoolId', {
			description: 'User Pool ID',
			value: userPool.userPoolId
		});

		new cdk.CfnOutput(this, 'UserPoolClientId', {
			description: 'User Pool Client ID',
			value: userPoolClient.userPoolClientId
		});

	}
}