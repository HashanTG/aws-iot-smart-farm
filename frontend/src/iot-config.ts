// src/iot-config.ts

// !!! SECURITY WARNING: NEVER USE HARDCODED CREDENTIALS IN PRODUCTION !!!
// This approach is ONLY for local development/demonstration.
// For production, use AWS Amplify with Cognito Identity Pools or a backend service.

const iotConfig = {
    // Your AWS IoT Core endpoint (from AWS Console -> IoT Core -> Settings)
    // It should start with 'aXXXXXXX-ats.iot.<region>.amazonaws.com'
    host: 'a1ejrwhr1xznth-ats.iot.eu-north-1.amazonaws.com',

    // Your AWS region (e.g., 'eu-north-1')
    region: 'eu-north-1',

    // Your AWS Access Key ID (from the IAM user you created)
    accessKeyId: 'YOUR_IAM_ACCESS_KEY_ID', // Replace with your Access Key ID

    // Your AWS Secret Access Key (from the IAM user you created)
    secretKey: 'YOUR_IAM_SECRET_ACCESS_KEY', // Replace with your Secret Access Key

    // A unique client ID for your web application
    // Should be unique per connection to avoid conflicts
    clientId: 'web-plant-dashboard-' + Math.random().toString(16).substr(2, 8),

    // The MQTT topic your ESP32 publishes to
    topic: 'esp32/pub',
};

export default iotConfig;
