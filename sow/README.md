# SOW — Spare On Wheel Official Website

> **Tagline:** *“An ecosystem for your vehicle.”*  
> **Headquarters:** Kerala, India

---

## 1. Overview

The official website for **SOW — Spare On Wheel**, built as an ultra-premium automotive technology platform inspired by the clean whitespace, cinematic hierarchy, and storytelling of modern Apple product pages.

This website is engineered with zero framework overhead using pure, standards-compliant **HTML5**, **CSS3**, and **Vanilla JavaScript**. It runs directly by opening `index.html` in any browser, works with static web servers, and is 100% compatible with **GitHub Pages** and custom domain deployments.

---

## 2. Screenshot Inventory & Section Mapping

All app screenshots featured across the site are authentic, high-resolution screens from the **SOW Customer App** design packages. The original source files in `/design` remain untouched, and the active screens are organized under `/assets/screenshots/`:

| Original Source Path in `design/` | Website Section | Destination File | Feature Context |
| :--- | :--- | :--- | :--- |
| `design/home_manual_first_bulk/home_HOME01_manual_car_home_dashboard_v1.png` | **Hero Overview** | `/assets/screenshots/home.png` | Canonical high-res Home dashboard with vehicle status, quick actions & health gauge |
| `design/home_ui_v2_expansion/home_HV09_mixed_vehicle_switcher_v1.png` | **Garage / Vehicle Mgmt** | `/assets/screenshots/garage.png` | Multi-vehicle garage switcher (car + motorcycle fleet) |
| `design/SOW_Digital_Vehicle_Passport_UI_Images/DVP-01_Vehicle_Passport_Dashboard.png` | **Vehicle Passport (DVP)** | `/assets/screenshots/dvp.png` | Digital Vehicle Passport dashboard, ownership & identity |
| `design/SOW_Digital_Vehicle_Passport_UI_Images/DVP-04_Passport_Verification_Trust.png` | **Passport Trust & Record** | `/assets/screenshots/dvp-trust.png` | Verification trust score, timeline records & compliance |
| `design/home_manual_first_bulk/home_AI01_ai_assistant_home_v1.png` | **SOW AI** | `/assets/screenshots/sow-ai.png` | SOW AI conversational automotive assistant interface |
| `design/home_ui_bulk/home_HB01_vehicle_health_overview_v1.png` | **Vehicle Health** | `/assets/screenshots/vehicle-health.png` | Detailed telemetry & health score breakdown (Engine, Battery, Tyres, Brakes) |
| `design/SOW_SOS_UI_All_Screens/01_SOS_Dashboard.png` | **Emergency SOS** | `/assets/screenshots/sos.png` | Emergency assistance request dashboard & service options |
| `design/SOW_SOS_UI_All_Screens/11_Live_Tracking.png` | **SOS Live Tracking** | `/assets/screenshots/sos-tracking.png` | Live responder GPS tracking with map ETA & Service PIN |
| `design/marketplace/marketplace_MP01_sow_marketplace_home_v1.png` | **Standard Marketplace** | `/assets/screenshots/marketplace.png` | Automotive parts & accessories catalog |
| `design/marketplace/marketplace_MP34_45min_home_v1.png` | **⚡ Quick Marketplace** | `/assets/screenshots/quick-marketplace.png` | Instant 45-minute local fulfillment storefront |
| `design/marketplace/marketplace_MP16_compatibility_check_v1.png` | **Fitment Engine** | `/assets/screenshots/fitment-check.png` | Vehicle-aware part compatibility verification badge |
| `design/community/batch_1_foundation/community_B01_community_home_feed_v1.png` | **Community Feed** | `/assets/screenshots/community.png` | Automotive enthusiast feed & discussions |
| `design/community/batch_5_ride_ecosystem/community_J01_ride_events_feed_v1.png` | **Community Rides** | `/assets/screenshots/community-rides.png` | Community group rides, route builder & participant list |
| `design/home_manual_first_bulk/home_DOC01_documents_wallet_v1.png` | **Document Vault** | `/assets/screenshots/documents.png` | Digital Document Wallet (RC, PUC, invoices & permits) |
| `design/home_manual_first_bulk/home_INS01_insurance_overview_v1.png` | **Insurance** | `/assets/screenshots/insurance.png` | Policy status, coverage summary & renewal alerts |
| `design/community/batch_3_search_profiles/community_H05_workshop_profile_v1.png` | **SOW for Business** | `/assets/screenshots/workshop.png` | Verified workshop partner profile & service bay |
| `design/community/batch_3_search_profiles/community_H01_own_community_profile_v1.png` | **Owner Profile** | `/assets/screenshots/profile.png` | Owner credentials, badges & verified ownership records |

---

## 3. Project Directory Structure

```
/
├── index.html            # Main multi-section production homepage
├── privacy.html          # Comprehensive Privacy Policy
├── terms.html            # Terms of Service agreement
├── favicon.ico           # Binary browser icon
├── manifest.json         # PWA and mobile bookmark metadata
├── robots.txt            # Search crawler directives
├── sitemap.xml           # XML sitemap for search indexing
├── CNAME                 # Custom domain configuration placeholder
├── README.md             # Complete documentation
│
├── css/
│   ├── reset.css         # Modern reset & box-sizing normalization
│   ├── variables.css     # Design tokens (Emerald, SF Pro, spacing, radii, shadows)
│   ├── styles.css        # Master stylesheet & CSS device phone frames
│   ├── animations.css    # 60fps micro-animations & reduced motion media queries
│   └── responsive.css    # Breakpoints for 320px to 1920px+
│
├── js/
│   ├── main.js           # Main bootstrapper
│   ├── navigation.js     # Translucent glass scroll header & mobile menu drawer
│   ├── animations.js     # IntersectionObserver reveal & health gauge counter
│   ├── gallery.js        # Interactive screenshot showcase & mobile swipe
│   └── contact.js        # Client validation & configurable endpoint handler
│
└── assets/
    ├── logo/             # SOW vector logos (sow-logo.svg, sow-icon.svg, etc.)
    ├── screenshots/      # Real SOW Customer App screenshots
    ├── icons/            # SOW navigation and feature SVG icons
    └── images/           # Rendered 3D verification emblems & badges
```

---

## 4. Local Development & Preview

Because this project relies exclusively on native web standards:

### Option A: Open directly in your browser
Double-click `index.html` or open it with any browser.

### Option B: Local Static Server (Recommended)
Run Python's built-in HTTP server from the project directory:

```bash
# Start server on port 8080
python3 -m http.server 8080

# Open in browser:
# http://localhost:8080
```

---

## 5. GitHub Pages Deployment Guide

To deploy this website to GitHub Pages:

### Step 1: Create a GitHub Repository
1. Log in to [GitHub](https://github.com/) and click **New repository**.
2. Name the repository (e.g. `sow-website` or `<username>.github.io`).
3. Set visibility to **Public**.

### Step 2: Push Files to GitHub
From your local terminal in the project directory:
```bash
git init
git add .
git commit -m "Initial release of official SOW website"
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/<REPO_NAME>.git
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Navigate to your repository on GitHub.
2. Click **Settings** (tab at the top).
3. In the left sidebar, click **Pages**.
4. Under **Build and deployment** > **Branch**:
   - Select **main**
   - Folder: `/ (root)`
5. Click **Save**.
6. GitHub will deploy the site to `https://<YOUR_USERNAME>.github.io/<REPO_NAME>/`.

---

## 6. Custom Domain Setup (e.g. `spareonwheel.com`)

When ready to connect your custom domain:

1. **Configure DNS Records** at your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.):
   - Add **A Records** pointing `@` to GitHub Pages IP addresses:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - Add a **CNAME Record** pointing `www` to `<YOUR_USERNAME>.github.io`.

2. **Update the CNAME file**:
   Replace the contents of `CNAME` with your exact custom domain:
   ```
   spareonwheel.com
   ```
   Commit and push to `main`.

3. **Enforce HTTPS**:
   In GitHub repository **Settings** > **Pages** > check **Enforce HTTPS**.

---

## 7. Swapping App Screenshots in the Future

The CSS smartphone frames are designed to adapt automatically to any standard smartphone aspect ratio. To update or replace any screenshot:

1. Drop the new PNG image into `/assets/screenshots/` with the corresponding filename (e.g., `home.png`, `dvp.png`, `sow-ai.png`).
2. Refresh the browser. No HTML or CSS changes are required!

---

© 2026 **SOW — Spare On Wheel**. All rights reserved.
