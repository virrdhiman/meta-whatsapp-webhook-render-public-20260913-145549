## Render Deployment (Meta WhatsApp Webhooks)

### 1) Create a GitHub repo
1. In GitHub, create a new repository (any name).
2. Upload these two files at the repo root:
   - `app.js`
   - `package.json`

If you keep them in a folder, make sure Render’s **Root Directory** points to that folder.

### 2) Create a Render Web Service
1. Render Dashboard → **New** → **Web Service**.
2. Connect your GitHub account and pick the repo.
3. Settings:
   - Environment: **Node**
   - Build Command: `npm install`
   - Start Command: `node app.js`

### 3) Add Environment Variables
In Render → your service → **Environment**:
- `VERIFY_TOKEN` = `PUT_A_RANDOM_STRING_HERE`

Example value (you can use this format):
- `VERIFY_TOKEN = my_whatsapp_verify_2026_09_13`

### 4) Get your Callback URL
After deploy succeeds, Render shows a public URL like:
- `https://your-service-name.onrender.com`

Use this as the **Callback URL** in Meta (include the trailing `/` if Meta accepts it):
- Callback URL: `https://your-service-name.onrender.com/`

### 5) Put these into Meta App Dashboard
Meta App Dashboard → **WhatsApp** → **Webhooks** → **Configuration**:
- Callback URL: `https://your-service-name.onrender.com/`
- Verify token: the exact string you put in `VERIFY_TOKEN`

Click **Verify and save**.

### 6) Subscribe + test
1. Subscribe to the `messages` webhook field.
2. Click `Test` next to `messages`.
3. Check Render logs for `WEBHOOK VERIFIED` and webhook payload JSON.

### Notes
- While the Meta app is **unpublished**, you will only receive **test webhooks** from the dashboard.
- You will not receive real production message/status webhooks until the app is published and configured for production.
