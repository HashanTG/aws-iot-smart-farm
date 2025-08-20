#include <WiFi.h>
#include <WebServer.h>

// Your WiFi credentials
const char* ssid = "LAPTOP";
const char* password = "hashan123";

// Set GPIO pin for LED
const int ledPin = 2;  // Onboard LED (GPIO 2 on most ESP32 boards)
bool ledState = false; // Track LED state

// Create WebServer on port 80
WebServer server(80);

// HTML page
String htmlPage() {
  String page = "<!DOCTYPE html><html>";
  page += "<head><meta name='viewport' content='width=device-width, initial-scale=1.0'>";
  page += "<style>body{font-family:Arial;text-align:center;margin-top:50px;} button{padding:15px;font-size:20px;margin:10px;}</style>";
  page += "</head><body>";
  page += "<h2>ESP32 LED Control</h2>";
  page += "<p>LED is currently: <b>" + String(ledState ? "ON" : "OFF") + "</b></p>";
  page += "<a href='/on'><button>Turn ON</button></a>";
  page += "<a href='/off'><button>Turn OFF</button></a>";
  page += "</body></html>";
  return page;
}

// Handle root "/"
void handleRoot() {
  server.send(200, "text/html", htmlPage());
}

// Handle LED ON
void handleOn() {
  digitalWrite(ledPin, HIGH);
  ledState = true;
  server.send(200, "text/html", htmlPage());
}

// Handle LED OFF
void handleOff() {
  digitalWrite(ledPin, LOW);
  ledState = false;
  server.send(200, "text/html", htmlPage());
}

void setup() {
  Serial.begin(115200);
  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, LOW);

  // Connect to WiFi
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  unsigned long startAttemptTime = millis();

  while (WiFi.status() != WL_CONNECTED && millis() - startAttemptTime < 20000) {
    delay(500);
    Serial.print(".");
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\n✅ WiFi connected!");
    Serial.print("ESP32 IP Address: ");
    Serial.println(WiFi.localIP());
    
    // Define routes
    server.on("/", handleRoot);
    server.on("/on", handleOn);
    server.on("/off", handleOff);

    server.begin();
    Serial.println("HTTP server started");
  } else {
    Serial.println("\n❌ Failed to connect to WiFi!");
  }
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    server.handleClient();
  }
}
