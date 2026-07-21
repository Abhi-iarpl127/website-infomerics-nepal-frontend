// pages/api/verify-text-captcha.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getCaptchaText, getCaptchaRefreshId } from './captcha';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userInput, refreshId } = req.body;
  const actualCaptcha = getCaptchaText();
  const currentRefreshId = getCaptchaRefreshId();

  if (!refreshId || refreshId !== currentRefreshId) {
    return res.status(400).json({ 
      success: false, 
      message: 'CAPTCHA has expired. Please refresh and try again.' 
    });
  }

  if (
    userInput &&
    actualCaptcha &&
    userInput.toLowerCase() === actualCaptcha.toLowerCase()
  ) {
    res.status(200).json({ success: true, message: 'CAPTCHA correct!' });
  } else {
    res.status(400).json({ success: false, message: 'Incorrect CAPTCHA.' });
  }
}
