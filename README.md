# captchaSolve
## How to test
```bash
curl -s https://www.xmoj.tech/vcode.php | \
curl -X POST https://captchasolve.xmoj-script.workers.dev \
     -H "Content-Type: application/octet-stream" \
     --data-binary "@-"
```
