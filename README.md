# Installation
To Get Started Make Sure To Clone the NestJS Backend for this app. You can find it [here](https://github.com/isri21/NestJS-Task-API)

After Setting up the backend:

1. Clone this repo
```bash
git clone https://github.com/isri21/NextJS-Task-Page.git
```

2. Move into the repo
```bash
cd NextJS-Task-Page/
```

3. Setup the following environment variables
```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

- This set's the URL for the backend. We can also just create a `.env` file in the directory instead of creating the environment variable system wide; To do this use the command below.

```bash
echo "NEXT_PUBLIC_BASE_URL=http://localhost:3000" > .env
```

4. Install the dependencies
```bash
pnpm i
```

5. Run the dev server
```bash
pnpm run dev
```