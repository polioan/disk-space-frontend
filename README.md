# Frontend for "disk space" web-service

First setup backend! (https://github.com/polioan/disk-space-backend)

## System requirements
- **nodejs** >= 15
- **npm** > 8

## How to launch

First create .env file and specify VITE_BASE_URL (base api url)
```
echo VITE_BASE_URL="http://localhost:3000/api" >> .env
```

Install dependencies
```
npm ci
```

Start in dev
```
npm run dev
```
