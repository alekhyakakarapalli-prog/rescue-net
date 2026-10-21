# Rescue-Net: AI-Powered Natural Disaster Management System
> **"Saving Lives When Networks Fail"**  
> *Final Year Capstone / Academic Engineering Project*

---

## 📌 Executive Summary & Abstract
During catastrophic natural disasters (flash floods, super cyclones, earthquakes, and tsunamis), critical infrastructure such as cellular communication towers, power distribution grids, and internet backbones are among the first to fail. Conventional disaster response systems rely heavily on functional telecommunication networks. When these fail, stranded victims are unable to signal their distress, and emergency disaster response forces (NDRF, SDRF, civil defense) operate blind.

**Rescue-Net** solves this fundamental bottleneck through an intelligent, decentralized, offline-first disaster response architecture. It integrates:
1. **Offline Store-and-Forward Mesh Network:** Uses zero-pairing peer-to-peer ad-hoc forwarding (Web Bluetooth API & LoRa 915 MHz/868 MHz) so that SOS packets hop through nearby smartphones and autonomous aerial drones even without internet connectivity.
2. **Autonomous Rescue Drone Fleet Command:** Hexacopters equipped with FLIR thermal imaging, altitude telemetry, and automatic medical payload drop mechanisms.
3. **Live GIS Victim Triage Dashboard:** Real-time GIS mapping powered by Leaflet.js and OpenStreetMap with automated priority triage classification.
4. **Multi-Hazard Early Warning System:** Real-time meteorological telemetry via OpenWeatherMap API and an in-browser Web Audio API dual-frequency emergency siren synthesizer.
5. **Dynamic Relief Shelter & Medical Inventory Management:** Live occupancy tracking, medical supplies tracking, and direct turn-by-turn Google Maps routing for civilians.

---

## 🛠️ Complete Technology Stack

| Layer | Technologies Used | Rationale / Engineering Justification |
|---|---|---|
| **Frontend UI/UX** | HTML5, CSS3, JavaScript (ES6+), Tailwind CSS | Lightweight, zero-build, responsive across smartphones, tablets, and command workstations. |
| **GIS & Geospatial** | Leaflet.js, OpenStreetMap | 100% Free, open-source, no billing or API key limits. Supports dark-tactical military HUD styling and custom animated markers. |
| **Database & Cloud** | Firebase Cloud Firestore, Firebase Auth | Real-time multi-client document synchronization, document change listeners (`onSnapshot`). |
| **Offline Resilience** | LocalStorage, Service Worker (PWA) | Guarantees zero data loss; persists distress beacons offline and auto-synchronizes upon reconnection. |
| **Acoustic Warning** | Web Audio API (Synthesizer) | Synthesizes dual-frequency emergency siren tones locally without relying on external MP3 URLs or network downloads. |
| **Hardware / IoT Simulation** | Web Bluetooth API, LoRa Radio Frame Protocol | Demonstrates real-world ESP32/SX1276 LoRa transceiver integration and packet serialization. |

---

## 🚀 Key Modules & Capabilities

### 1. Home / Landing Command Center
- **Mission Critical Hero Section:** Features the signature tagline *"Saving Lives When Networks Fail"*.
- **One-Touch Emergency SOS:** Captures high-accuracy device GPS (`navigator.geolocation`) with sub-meter accuracy and medical triage categorization.
- **Offline-First Safeguard:** When `navigator.onLine` is false, encrypts and queues the SOS into local flash memory, alerting the user: *"Saved Offline - Will send via Mesh Network & LoRa"*.
- **Dynamic Stats Telemetry:** Real-time counters for *Victims Rescued*, *Active Drone Fleet*, *Operational Shelters*, and *Active Mesh Nodes*.

### 2. Early Warning & Meteorological Radar
- **Multi-Hazard Alert Stream:** Covers Flash Floods, Cyclones, Earthquakes/Tremors, and Tsunamis.
- **Color-Coded Threat Matrix:** Red = Critical Threat, Yellow = Warning / Advisory, Green = Safe / All Clear.
- **Web Audio Siren Generator:** Native oscillator synthesizing 700Hz to 1100Hz frequency-modulated wail with audio visualizer waveform bars and 25-second acoustic safety cutoff.
- **OpenWeatherMap Integration:** Supports live city weather data or simulated high-fidelity disaster radar telemetry.

### 3. Live Victim Tracking & GIS Triage (Core Page)
- **Split-Screen Ergonomics:**
  - *Left Panel:* Searchable victim roster with triage priority badges, timestamp elapsed, contact info, and medical requirements.
  - *Right Panel:* Fullscreen interactive Leaflet.js GIS map with tactical dark mode tiles.
- **Pulsing Status Markers:** Glowing red beacon for Critical, amber beacon for Drone En Route, and emerald green for Safely Rescued.
- **Interactive Triage Workflow:** Click any victim to inspect battery percentage, distance, and launch the **"Assign Drone"** dispatcher.
- **Disaster Geofences:** Visual flood inundation risk zones and coastal surge polygons.
- **"Intercept New SOS" Simulator:** Generates live random incoming distress packets for live demonstration to examiners.

### 4. Autonomous Drone Command Center
- **Fleet Roster Cards:** 4 active drones (Alpha-1 Heavy Hexacopter, Falcon-X Long Range Scout, Guardian-3 Medical Courier, Apex-4 Rapid Responder) with live battery meters, altitudes, ground speeds, and LoRa link RSSI.
- **Tactical Aerial Video HUD:** Responsive video container featuring aerial disaster reconnaissance with authentic military HUD overlay (crosshair, altimeter, ground speed, artificial horizon, and FLIR Thermal IR toggle).
- **Animated Flight Path on Map:** Continuous marker interpolation moving smoothly along pre-programmed search waypoints.
- **Mission Control Commands:**
  - `Deploy Drone`: Initiates autonomous flight corridor.
  - `Deliver Medical Kit`: Executes descent and parachute payload drop.
  - `Scan Area`: Activates rotating radar sweep beam to discover hidden offline beacons.
  - `Return to Base (RTL)`: Directs drone back to launchpad HQ.
- **Airborne LoRa Packet Sniffer:** Real-time stream of intercepted offline SOS packets received at 915.2 MHz.

### 5. Offline SOS & Store-and-Forward Mesh Network
- **Interactive Visual Animation:** 4-stage pipeline visualizing packet traversal:
  $$\text{Victim Phone (Dead Tower)} \xrightarrow{\text{BLE / Wi-Fi Direct}} \text{Volunteer Phone} \xrightarrow{\text{LoRa 915MHz}} \text{Drone Relay} \xrightarrow{\text{Satellite}} \text{Rescue HQ}$$
- **"Test Offline Mode" Sandbox:** Simulates complete cellular breakdown, queues packets into `localStorage`, and displays packet headers (`Packet ID`, `RSSI`, `Hop Count`).
- **Web Bluetooth API Scanner:** Integrates browser BLE to search for nearby ESP32 LoRa relay nodes.

### 6. Shelter & Medical Inventory Management
- **Camp Directory:** Relief shelters with address, phone hotline, and category tags.
- **Resource Progress Gauges:** Live capacity, free beds, food rations (days supply), medicine trauma kits, clean drinking water, and on-duty doctors.
- **One-Click Turn-by-Turn Navigation:** Direct Google Maps navigation URL (`https://www.google.com/maps/dir/?api=1&destination=lat,lng`).
- **Administrative Resource Modal:** Real-time updates for beds and medical supplies.

---

## 📁 Project Directory Structure

```
rescue-net/
├── index.html              # Master Single Page Application (All 6 views)
├── manifest.json           # Progressive Web App (PWA) manifest
├── sw.js                   # Service Worker for offline caching & PWA
├── README.md               # Complete Project Documentation & Viva Guide
├── css/
│   └── style.css           # Custom tactical HUD styles, animations & radar pulses
├── js/
│   ├── firebase-config.js  # Firebase Firestore & offline-resilient RescueDB layer
│   ├── app.js              # SPA router, auth system, stats counters, toasts
│   ├── sos.js              # Geolocation, emergency form, offline outbox
│   ├── weather.js          # Early Warning hazard cards, Web Audio siren
│   ├── tracking.js         # Leaflet map, pulsing markers, victim triage
│   ├── drones.js           # Drone fleet telemetry, animated path, HUD, LoRa sniffer
│   ├── mesh.js             # Store-and-forward animation, Bluetooth scanner
│   └── shelters.js         # Shelter directory, inventory bars, Google Maps routing
└── icons/
    └── icon.svg            # Custom SVG logo, shield emblem, and PWA icon
```

---

## ⚡ How to Run the Project

### Method 1: Instant Direct Launch (Zero Installation Required!)
Simply double-click `index.html` in your file explorer. It will open in any modern browser (Google Chrome, Microsoft Edge, Brave, Mozilla Firefox).

### Method 2: Local HTTP Server (Recommended for PWA & Service Worker)
Using Python (pre-installed on Windows/macOS/Linux):
```powershell
cd c:\alekhya\Desktop\rescue-net
python -m http.server 8000
```
Then navigate to: `http://localhost:8000` in your browser.

---

## 🎓 College Viva & Examination Demonstration Guide

During project presentation, demonstrate the features in this order:

1. **Demonstrate Offline SOS:**
   - On the Home page, click the pulsating red **SOS** button.
   - Show how it captures GPS coordinates (`navigator.geolocation`).
   - Go to the **Offline Mesh** tab and click **"TEST OFFLINE MODE"**.
   - Show the prompt: *"Saved Offline, will send via Bluetooth/LoRa when network available"*.
   - Point out the packet appearing in the **Offline Outbox**.
   - Click **"Restore Network"** and show automatic cloud synchronization.

2. **Demonstrate Early Warning & Audio Siren:**
   - Switch to the **Early Warning** tab.
   - Click **"TEST EMERGENCY SIREN"** to play the synthesized dual-tone siren.
   - Explain to examiners that this uses the **Web Audio API** oscillator synth, eliminating dependencies on external audio files that could fail when offline.
   - Filter cards by disaster type (Flood, Cyclone, Tremor).

3. **Demonstrate Live GIS Victim Tracking:**
   - Switch to the **Live Tracking** tab.
   - Show the split-screen view: victim roster on the left, full Leaflet map on the right.
   - Point out the custom glowing/pulsing markers and the flood inundation polygons.
   - Click **"Intercept New SOS"** to demonstrate live real-time triage updates.
   - Click on any victim marker, view their popup, and click **"Assign Drone"**.

4. **Demonstrate Drone Command Center:**
   - Switch to the **Drone Command** tab.
   - Show the 4 drone telemetry cards (Battery 85%, LoRa RSSI -72dBm).
   - Point out the **animated drone moving along the flight corridor** in real-time.
   - Click **"FLIR Thermal Mode"** on the aerial video feed to show infrared filtering.
   - Click **"Scan Area"** to run the radar sweep beam.

5. **Demonstrate Shelter Management:**
   - Switch to the **Shelters** tab.
   - Point out the real-time bed occupancy and medical supply bars.
   - Click **"Google Maps Route"** to show instant GPS evacuation navigation.

---

## 🔒 Security & Data Privacy
- Client-side data is sanitized to prevent XSS.
- Offline packets utilize structured JSON envelopes ready for AES-GCM-256 payload encryption.
- Firebase security rules follow role-based authorization separating citizen reports from incident commander dispatch controls.

---

**Developed for Academic Excellence & Disaster Relief Innovation.**
