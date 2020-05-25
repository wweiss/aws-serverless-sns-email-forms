# AWS Serverless SNS Email Forms

A serverless application to simplify emailing form submissions using SNS.

## Architecture
1.  Form data, in the form of a JSON payload, is POSTed.

2.  The POST triggers the **EmailFormHandler** lambda function via Api Gateway.

3.  Validation is performed.

    i. The format of the payload is verified.

    ii. The reCaptcha token, if enabled, is verified.

    iii. Finally, the JSON  schema specified by the payload is loaded from S3 and used to verify the form fields are 
         valid.

4.  If validation fails, an error is returned.

5.  If validation succeeds, the message is formated using the Mustache template specified by the payload.

5.  The formatted message is sent to the email address specified in the **RecipientEmailAddress** parameter via SNS.

## Installation Steps

1.  [Create an AWS account](https://portal.aws.amazon.com/gp/aws/developer/registration/index.html) if you do not 
    already have one and login

2.  Go to the app's page on the [Serverless Application Repository](https://console.aws.amazon.com/lambda/home?region=us-east-1#/create/app?applicationId=arn:aws:serverlessrepo:us-east-1:771389557967:applications/SnsEmailForms). 

3.  Provide the required app parameters (see below for steps to create Google reCaptcha parameters)

4.  Click "Deploy"

## Parameters

In addition to the Etsy API key parameter, the app also requires some of the following parameters:

1.  **Stage** (optional) - The Api Gateway stage to use. Default: prod.

2.  **RecipientEmailAddress** (required) - The email address that the processed messages should ultimately be sent to.

3.  **TemplateBucketName** (required) - The S3 bucket that will be created and used to store validation schemas and 
    templates.

4.  **RecaptchaEnabled** (optional) - Indicates if reCaptcha will be used to prevent abuse. **RecaptchaSecretKey** is 
    required if this parameter is set to **true**. Default: false.

5.  **RecaptchaSecretKey** (optional) - The secret key provided by Google.  Please see details below. Default: empty.

6.  **CorsEnabled** (optional) - Indicates if CORS headers will be returned. Default: false.

7.  **CorsOrigins** (optional) - If **CorsEnabled** is `true`, this is a comma delimited list of approved origins. The 
    incoming origin is matched against the list and is returned if present. Default: *.

8.  **CorsHeaders** (optional) - If **CorsEnabled** is `true`, this is a comma delimited list of approved headers. 
    Default: *.

### Adjusting the Logging Level

After deploying the application, the logging level can be adjusted by:

1. Accessing your [AWS Console](https://aws.amazon.com)

2. Click on **Services** in the header and then select **Compute > Lambda**

3. Find the SNS Email lambda function in the list and click it.

4. On the first screen, **Configuration**, scroll down to **Environment variables**

5. Click **Edit** in the upper right corner

    1. Click **Add environement variable** at the bottom of the list

    2. Enter **LOGGING_LEVEL** as the key and one of the following values:
    
            - ALL
            - TRACE
            - DEBUG
            - INFO
            - WARN
            - ERROR

    3. Click **Save**

Please note that you may have to wait for a new instance of the lambda to be created for your changes to take effect.

## Enabling Google reCaptcha

In order to enable reCaptcha functionality, you will first need a secret key. The following steps walk you through 
registering your site with Google reCaptcha.

1.  Go to the [Google reCaptcha](https://www.google.com/recaptcha/intro/v3.html) site and click **Admin console** 
    in the upper right hand corner.

    i. Note: If you do not have a Google account, you will need to make one.

2.  Register the app that contains forms you want to protect with reCaptcha:

    i. Click the "+".

    ii. Enter a "Label" for the application.

    iii. Select "reCaptcha v2" for the "reCaptcha type". *Currently, only v2 is supported*.

    iv.  Under "Domains", enter all the domains that your app will operate under.

    v.   Enter you email address under "Owners".

    vi.  Accept the Terms of Service and click "Submit".

3.  Get the keys:

    i.   After registering your application you will be provided with a site key and a secret key.

      -  The site key will be used in the widget on your client side form.

      - Use the secret key as the value for the **RecaptchaSecretKey** parameter.
  