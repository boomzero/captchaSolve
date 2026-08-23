# Deprecated and no longer in use!

# captchaSolve

Cloudflare Worker that reads four-digit CAPTCHA images with the multimodal
`@cf/meta/llama-4-scout-17b-16e-instruct` model.

## How to test
```bash
curl -s https://www.xmoj.tech/vcode.php | \
curl -X POST https://captchasolve.xmoj-script.workers.dev \
     -H "Content-Type: application/octet-stream" \
     --data-binary "@-"
```
