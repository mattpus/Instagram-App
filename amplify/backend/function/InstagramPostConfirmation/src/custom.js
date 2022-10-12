/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context) => {
  console.log('LAMBDA FUNC IS WORKING');
  console.log(event);
  return event;
};
