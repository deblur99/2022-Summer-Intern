const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

// 람다 함수가 동기 함수면 callback 매개변수를 호출하여 반환 및 종료하고,
// 비동기 함수면 return 문을 통해 반환 및 종료한다.

exports.handler = async (event, context) => {
    let statusMsg = "";
    let statusCode = 200;
    const headers = {
        "Content-Type": "application/json"
    };
    
    const params = {
        TableName: 'ImgTable',
        Item: event
    };
    
    try {
        await dynamo.put(params).promise();   
        statusMsg = "Uploading OK";
    } catch (e) {
        statusCode = 400;
        statusMsg = e.message;
    }
        
    return {
        statusCode,
        headers,
        statusMsg
    };
};