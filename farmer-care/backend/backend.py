from flask import Flask, request, jsonify
from twilio.rest import Client
import requests
from dotenv import load_dotenv
import os


# Load environment variables from backend/.env
load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

app = Flask(__name__)

API_KEY = os.getenv("WEATHER_API_KEY")
account_sid = os.getenv("TWILIO_SID")
auth_token = os.getenv("TWILIO_AUTH_TOKEN")
twilio_phone = os.getenv("TWILIO_PHONE")

@app.route("/", methods=["GET"])
def home():
    return "Flask SMS Alert Backend is Running!"

@app.route("/send-sms", methods=["POST"])
def send_sms():
    data = request.json
    crops = data.get("crops", [])
    location = data.get("location", "city_name")
    phone = data.get("phone", "")

    if not phone:
        return jsonify({"success": False, "message": "No phone number provided."})

    url = f"http://api.openweathermap.org/data/2.5/forecast?q={location}&appid={API_KEY}"
    response = requests.get(url)
    weather_data = response.json()

    rainfall = weather_data["list"][0].get("rain", {}).get("3h", 0)
    alerts = []

    crop_thresholds = {
        "Rice": {"min_rainfall": 544, "max_rainfall": 2775},
        "Maize": {"min_rainfall": 500, "max_rainfall": 750},
        "Coconut": {"min_rainfall": 1000, "max_rainfall": 3000},
        "Wheat": {"min_rainfall": 400, "max_rainfall": 1500},
    }

    for crop in crops:
        if crop in crop_thresholds:
            min_rain = crop_thresholds[crop]["min_rainfall"]
            max_rain = crop_thresholds[crop]["max_rainfall"]

            if rainfall < min_rain:
                alerts.append(f"Low rainfall detected! Irrigation needed for {crop}.")
            elif rainfall > max_rain:
                alerts.append(f"Excessive rainfall! Ensure proper drainage for {crop}.")

    if alerts:
        alert_message = "\n".join(alerts)

        try:
            client = Client(account_sid, auth_token)
            message = client.messages.create(
                body=alert_message,
                from_=twilio_phone,
                to=phone
            )
            return jsonify({"success": True, "message_sid": message.sid})
        except Exception as e:
            return jsonify({"success": False, "error": str(e)})

    return jsonify({"success": False, "message": "No alerts triggered."})

if __name__ == "__main__":
    app.run(debug=True)
