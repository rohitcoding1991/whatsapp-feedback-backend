const twilio = require('twilio');
require('dotenv').config();
const { sendFeedbackEmail } = require('./functions');
const querystring = require('querystring');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

exports.handler = async (event) => {
    if (event.requestContext.http.method === 'POST' && event.requestContext.http.path === '/whatsapp') {
        return handleWhatsAppEvent(event);
    } else if (event.requestContext.http.method === 'GET' && event.requestContext.http.path === '/send-survey') {
        return handleSendSurveyEvent(event);
    } else {
        return {
            statusCode: 404,
            body: JSON.stringify({ message: 'Not Found today check' })
        };
    }
};

const handleWhatsAppEvent = async (event) => {
  let requestBody;
  try {
      let body = event.body;
      if (event.isBase64Encoded) {
          body = Buffer.from(event.body, 'base64').toString('utf-8');
      }
      requestBody = querystring.parse(body);
      console.log('Parsed request body:', requestBody);
  } catch (error) {
      console.error('Error parsing request body:', error);
      return {
          statusCode: 400,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: 'Invalid request body' })
      };
  }

  const { Body, From } = requestBody;
  console.log({ Body, From });

  if (!Body || !From) {
      console.error('Missing Body or From in request');
      return {
          statusCode: 400,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: 'Missing Body or From in request' })
      };
  }

  let responseMessage = '';

  if (['9', '10'].includes(Body)) {
      responseMessage = 'Thank you for your positive feedback!';
  } else if (['7', '8'].includes(Body)) {
      responseMessage = 'Thank you for your feedback!';
  } else if (['1', '2', '3', '4', '5', '6'].includes(Body)) {
      responseMessage = 'We appreciate your feedback and will work to improve!';
  } else {
      responseMessage = 'Please reply with a number between 1 and 10 to provide your feedback.';
  }
  try {
    const emailPromise = sendFeedbackEmail(From, Body);
    const messagePromise = client.messages.create({
      body: responseMessage,
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: From
    });

    const [emailResult, messageResult] = await Promise.all([emailPromise, messagePromise]);
    console.log('Email sent:', emailResult);
    console.log('WhatsApp message sent:', messageResult);
  } catch (error) {
      console.error('Error sending message or email:', error);
      return {
          statusCode: 500,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: 'Error processing request' })
      };
  }

  return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'WhatsApp event handled' })
  };
};


const handleSendSurveyEvent = async (event) => {
    const surveyMessage = `Thanks for shopping with us! On a scale of 1 to 10, how likely are you to recommend us to others?\n\n9 or 10 - Very Likely 😊\n7 or 8 - Likely 😐\n1 to 6 - Unlikely 😞\n\nReply with your rating.`;
    const { to } = event.queryStringParameters || {};

    if (!to) {
        return {
            statusCode: 400,
            body: JSON.stringify({ status: "failed", message: "to cannot be empty" })
        };
    }
    try {
        await client.messages.create({
            body: surveyMessage,
            from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
            to: `whatsapp:${+to}`,
        });
        console.log('Survey sent');
    } catch (error) {
        console.error('Error sending survey:', error.message,error);
    }
    return {
      statusCode: 200,
      body: JSON.stringify({ status: "success", message: "msg send successfully" })
  };
};
