// Minimal Meta (WhatsApp) webhook endpoint for Render
// - GET /  : verification handshake (hub.challenge)
// - POST / : receives webhooks (messages, statuses, etc.)

const express = require('express');

const app = express();
app.use(express.json({ limit: '2mb' }));

const port = process.env.PORT || 3000;
const verifyToken = process.env.VERIFY_TOKEN;

if (!verifyToken) {
  console.warn('WARN: VERIFY_TOKEN is not set. Set it in Render Environment Variables.');
}

app.get('/', (req, res) => {
  const mode = req.query['hub.mode'];
  const challenge = req.query['hub.challenge'];
  const token = req.query['hub.verify_token'];

  if (mode === 'subscribe' && token && verifyToken && token === verifyToken) {
    console.log('WEBHOOK VERIFIED');
    return res.status(200).send(challenge);
  }

  return res.status(403).end();
});

app.post('/', (req, res) => {
  const timestamp = new Date().toISOString();
  console.log(`\nWebhook received ${timestamp}`);
  console.log(JSON.stringify(req.body, null, 2));
  return res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
