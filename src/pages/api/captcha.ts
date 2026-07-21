// pages/api/captcha.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import svgCaptcha from 'svg-captcha';

interface CaptchaCache {
  text: string;
  refreshId: string;
}

let captchaCache: CaptchaCache = { text: '', refreshId: '' }; // In-memory storage (can be improved)

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const captcha = svgCaptcha.create({
    size: 6,
    noise: 3,
    color: true,
    background: '#f2f2f2',
  });

  // Generate a unique refresh ID
  const refreshId = Math.random().toString(36).substring(2, 15);

  // Store CAPTCHA text and refresh ID
  captchaCache = {
    text: captcha.text,
    refreshId: refreshId
  };

  res.status(200).json({ 
    data: captcha.data,
    refreshId: refreshId
  });
}

export function getCaptchaText() {
  return captchaCache.text;
}

export function getCaptchaRefreshId() {
  return captchaCache.refreshId;
}
