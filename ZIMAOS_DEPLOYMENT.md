# ZimaOS / CasaOS Deployment Guide

Hosting this application on ZimaOS is straightforward thanks to Zima's built-in CasaOS App Store architecture. Follow these exact steps to deploy the application on your home server.

## 1. Prepare the Codebase on ZimaOS
You need to transfer this project folder to a storage location on your ZimaOS server.
- **Option A:** SSH into your ZimaOS server and `git clone` your repository.
- **Option B:** Zip the `Portfolio` folder, upload it through the ZimaOS Web UI "Files" app, and extract it.

Ensure you know the absolute path to your folder on ZimaOS (for example, `/DATA/AppData/Portfolio`).

## 2. Import the Application
ZimaOS allows you to install custom applications directly using a Docker Compose file.

1. Open your **ZimaOS Dashboard**.
2. Click the **+** (Install) button on the main screen to open the App Store.
3. In the top right corner of the App Store, click **Custom Install**.
4. In the upper right corner of the Custom Install window, click the **Import** icon (it looks like a document with a down arrow).
5. Open the `docker-compose.zimaos.yml` file from your project on your computer, copy its entirely, and paste it into the Import window.
6. Click **Submit**.

## 3. Configure Your Environment Variables
After you click Submit, ZimaOS will parse the file and automatically populate the UI fields!

Scroll down in the ZimaOS Custom Install window and you will see fields for all your required integrations:
- `AUTH_SECRET`: Put any random long string here.
- `OWNER_PASSWORD`: The password you want to use to log into your dashboard.
- `GITHUB_USERNAME`: Your GitHub username.
- `GITHUB_TOKEN`: Your Personal Access Token.
- `DISCORD_ID`: Your Discord user ID.
- `OPENWEATHER_API_KEY`: Your weather API key.
- `OPENWEATHER_CITY`: e.g., "Hanoi"

> [!TIP]
> ZimaOS saves these variables automatically, so if you ever need to change your password or update an API key, you can just click the "Settings" gear on the app icon in your dashboard to update them!

## 4. Install & Launch!
1. At the bottom of the installation window, you will need to map the volume for the build context. Under the `web` container configuration in the UI, ensure the build context or volume maps to the directory where you placed the code in Step 1. 
   *(Note: ZimaOS UI sometimes prefers pre-built images. If it asks for an Image instead of a Build Context, you will need to run `docker-compose -f docker-compose.zimaos.yml up -d --build` manually via SSH once, after which ZimaOS will automatically detect and manage it in the UI!)*
2. Click **Install**.
3. ZimaOS will now build your Next.js application, start your PostgreSQL database, and automatically run the Prisma database migrations using the startup script I built for you.
4. Once it finishes, the **Personal OS** icon will appear on your ZimaOS dashboard. Just click it to open your new live production website!
