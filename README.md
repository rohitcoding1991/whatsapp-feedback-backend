# Introduction

This project sets up a **`WhatsApp feedback survey`** using **`AWS Lambda functions and Twilio`**. The process involves creating a Twilio account, setting up a WhatsApp Sandbox, deploying a Node.js Lambda function, and configuring the integration between Twilio and AWS Lambda.


## Tech Stack Used
- [Twilio](https://www.twilio.com/) for setting up WhatsApp messaging.
- [AWS Lambda](https://ap-south-1.console.aws.amazon.com/lambda/home?region=ap-south-1#/discover)  for deploying the serverless function.
- [Node js](https://nodejs.org/en/download/package-manager) for the backend logic.

## Setup Steps
### Twilio Setup For What`s up messages**
- Create a  [Twilio Account](https://ap-south-1.console.aws.amazon.com/lambda/home?region=ap-south-1#/discover)
- Log in to your Twilio Console Dashboard.
- Set Up WhatsApp Sandbox
- Navigate to Messaging Settings
- Follow the instructions to set up a WhatsApp Sandbox. You may need to verify your phone number as a sandbox user.

### AWS Lambda Function Setup
- Create a Lambda Function
- Log in to the AWS Management Console.
- Navigate to the AWS Lambda service.
- Click "Create Function" and select "Author from scratch".
- Choose Node.js as the runtime, name your function, and configure the necessary permissions.
- Click "Create Function".
### Prepare and Deploy Your Code
- Prepare Your Code
- Zip your Node.js project, including the code and dependencies.
- Deploy to AWS Lambda.
- On the Lambda function's page, click "Upload" and select your zipped project file.
- Click "Deploy" to upload and deploy your code.
### Configure Lambda Function URL
- Create a Function URL
- In the Lambda function console, navigate to the "Function URL" section.
- Click "Create function URL", select the access type based on your needs, and copy the generated URL.
- Update Endpoints
- Append /send-survey to the Lambda function URL for sending feedback survey messages.
- Append /whatsapp to the Lambda function URL for handling incoming messages from WhatsApp.
### Installation
- **Clone the Repository**
```bash
git clone https://github.com/rohitcoding1991/whatsapp-feedback-backend.git
```
- Navigate to the Project Directory
```bash 
 cd whatsapp-feedback-backend
```
- Install the Dependencies **npm install**
### Usage
 #### Set Up Environment Variables
- Create a .env file in the root directory and add your Twilio credentials
- TWILIO_ACCOUNT_SID=
- TWILIO_AUTH_TOKEN=
- TWILIO_WHATSAPP_NUMBER=
- EMAIL=
- PASS=
- FROM_EMAIL=
- TO_EMAIL=
### Node.js Version
- The project is developed and tested using Node.js version 20.15.0.












