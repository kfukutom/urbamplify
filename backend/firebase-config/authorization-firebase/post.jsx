import { firebaseConfig } from '../firebaseConfig';
import https from 'https';
import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());

app.post('/sessionLogin', (req, res) => {
  const idToken = req.body.idToken;
  const csrfToken = req.body.csrfToken;

  // Validate CSRF token
  if (csrfToken !== req.cookies.csrfToken) {
    res.status(401).send('UNAUTHORIZED REQUEST!');
    return;
  }

  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days in milliseconds

  const options = {
    method: 'POST',
    hostname: 'identitytoolkit.googleapis.com',
    path: `/v1/accounts:signInWithCustomToken?key=${firebaseConfig.apiKey}`,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const request = https.request(options, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      if (response.statusCode === 200) {
        const result = JSON.parse(data);
        const sessionCookie = result.idToken; // Use the ID token as a session cookie
        const cookieOptions = { maxAge: expiresIn, httpOnly: true, secure: true };
        res.cookie('session', sessionCookie, cookieOptions);
        res.json({ status: 'success' });
      } else {
        res.status(401).send('UNAUTHORIZED REQUEST!');
      }
    });
  });

  request.on('error', (error) => {
    console.error("Error during session creation:", error);
    res.status(500).send('Internal Server Error');
  });

  request.write(JSON.stringify({
    idToken,
    returnSecureToken: true
  }));

  request.end();
});

export default app;