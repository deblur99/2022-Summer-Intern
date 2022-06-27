const AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-1'});

const dynamo = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

// 람다 함수가 동기 함수면 callback 매개변수를 호출하여 반환 및 종료하고,
// 비동기 함수면 return 문을 통해 반환 및 종료한다.

exports.handler = async (event, context) => {
    let body;
    let statusCode = 200;
    const headers = {
        "Content-Type": "application/json"
    };
    
    try {
        body = await dynamo.scan({ TableName: "ImgTable" }).promise();
    } catch (e) {
        statusCode = 400;
        body = e.message;
    } finally {
        body = JSON.stringify(body);
    }
    
    return {
        statusCode,
        headers,
        body
    };
};