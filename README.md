
# IoT Dashboard with AWS Integration🌐 

<img width="2000" height="2000" alt="schematic diagram" src="https://github.com/user-attachments/assets/c3686887-0a9d-460d-b3da-58a1a15f32f0" />

📌 Overview

This project is a real-time IoT monitoring dashboard integrated with AWS IoT Core for device connectivity, AWS SNS for SMS & Email alerts, and a user management system for secure access.

Users can register, log in, monitor IoT device data, and receive instant alerts via SMS or email when threshold values are exceeded.

🏗️ Architecture

Flow:

IoT Device publishes telemetry → AWS IoT Core (MQTT Broker)

Dashboard fetches data → React (Frontend) + Springboot/MongoDB(Backend)

Alerts triggered → AWS SNS (SMS + Email)

User Management → Auth backend + DB


🚀 Features

✅ Real-time IoT data monitoring via AWS IoT Core
✅ Interactive dashboard (charts, alerts, device status)
✅ AWS SNS integration for SMS & Email alerts
✅ User registration & authentication
✅ Secure data storage with MongoDB
✅ Scalable cloud-native design

⚙️ Tech Stack

Frontend: React, Tailwind CSS, Recharts (graphs)
Backend:  Node.js
Cloud Services: AWS IoT Core, AWS SNS
Deployment: Docker + AWS EC2/S3

🛠️ SetupClone the repo
git clone https://github.com/your-username/iot-dashboard-aws.git
cd iot-dashboard-aws

Frontend Setup
cd frontend
npm install
npm run dev

Deploy Infrastructure
cd infrastructure

Example if using AWS CDK
cdk deploy

📡 Example Use Case

Smart Farming: Monitor soil moisture, temperature, humidity.

Smart Home: Monitor energy usage, trigger alerts for abnormal consumption.

Industrial IoT: Monitor machines & send real-time failure alerts.

👨‍💻 Author

Hashan Tharanga
📩 Contact: hashantharanga2001@gmail.com
🌐 Portfolio: itsmehashan.live
