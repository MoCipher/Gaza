# Cloudflare Pages Deployment Guide

## 🚀 **Deploying Gaza App to Cloudflare Pages**

This guide will help you deploy your Next.js application with MongoDB integration to Cloudflare Pages.

## 📋 **Prerequisites**

1. **Cloudflare Account** - Sign up at [cloudflare.com](https://cloudflare.com)
2. **GitHub Repository** - Your code should be in a GitHub repository
3. **MongoDB Atlas Account** - For your database (already configured)

## 🔧 **Step 1: Prepare Your Repository**

### 1.1 Push Your Code to GitHub
```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit for Cloudflare Pages deployment"

# Add your GitHub repository as remote
git remote add origin https://github.com/yourusername/gaza-app.git

# Push to GitHub
git push -u origin main
```

### 1.2 Verify Configuration Files
Make sure these files are in your repository root:
- ✅ `_headers` - Security headers
- ✅ `_redirects` - URL routing rules
- ✅ `wrangler.toml` - Cloudflare configuration
- ✅ `next.config.ts` - Updated Next.js config
- ✅ `package.json` - Updated with build scripts

## 🌐 **Step 2: Deploy to Cloudflare Pages**

### 2.1 Connect GitHub Repository
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages** in the left sidebar
3. Click **"Create a project"**
4. Choose **"Connect to Git"**
5. Select your GitHub repository (`gaza-app`)
6. Click **"Begin setup"**

### 2.2 Configure Build Settings
Use these settings in the Cloudflare Pages setup:

**Framework preset:** `Next.js (Static HTML Export)`

**Build command:**
```bash
npm run pages:build
```

**Build output directory:**
```
.next
```

**Root directory:** (leave empty)

**Node.js version:** `18` or `20`

### 2.3 Environment Variables
Add these environment variables in Cloudflare Pages:

1. Go to **Settings** → **Environment variables**
2. Add the following variables:

```bash
# MongoDB Configuration
MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
MONGODB_DB=voices-of-palestine

# NextAuth Configuration
NEXTAUTH_URL=https://your-app-name.pages.dev
NEXTAUTH_SECRET=your-super-secret-key-here

# Application Environment
NODE_ENV=production
```

**⚠️ Important:** Replace the placeholder values with your actual:
- MongoDB connection string
- Database name
- NextAuth secret (generate a strong random string)
- Your actual Cloudflare Pages domain

### 2.4 Deploy
1. Click **"Save and Deploy"**
2. Wait for the build to complete (usually 2-5 minutes)
3. Your site will be available at `https://your-app-name.pages.dev`

## 🔒 **Step 3: Configure Custom Domain (Optional)**

### 3.1 Add Custom Domain
1. Go to your Pages project
2. Click **"Custom domains"**
3. Click **"Set up a custom domain"**
4. Enter your domain name
5. Follow the DNS configuration instructions

### 3.2 SSL Certificate
Cloudflare automatically provides SSL certificates for your custom domain.

## 🛠️ **Step 4: Configure MongoDB for Production**

### 4.1 Update MongoDB Network Access
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Navigate to **Network Access**
3. Add Cloudflare IP ranges or use `0.0.0.0/0` for development
4. **For production:** Add specific Cloudflare IP ranges

### 4.2 Update Connection String
Make sure your MongoDB connection string includes:
- Correct username and password
- Proper cluster URL
- Database name parameter

## 🔍 **Step 5: Test Your Deployment**

### 5.1 Test Basic Functionality
1. Visit your deployed site
2. Test user registration: `/auth/signup`
3. Test user login
4. Test testimonial submission: `/submit`
5. Test admin dashboard: `/admin`

### 5.2 Test API Endpoints
```bash
# Test API endpoints
curl https://your-app-name.pages.dev/api/testimonials
curl https://your-app-name.pages.dev/api/upload
```

## 🚨 **Troubleshooting**

### Common Issues:

**1. Build Failures**
- Check Node.js version compatibility
- Verify all dependencies are in `package.json`
- Check for TypeScript errors

**2. API Routes Not Working**
- Ensure environment variables are set correctly
- Check MongoDB connection string
- Verify network access in MongoDB Atlas

**3. Authentication Issues**
- Verify `NEXTAUTH_URL` matches your domain
- Check `NEXTAUTH_SECRET` is set
- Ensure MongoDB adapter is configured correctly

**4. Image Upload Issues**
- Check file upload limits in Cloudflare Pages
- Verify upload directory permissions
- Test with smaller file sizes first

### Debug Commands:
```bash
# Check build locally
npm run pages:build

# Test production build locally
npm run build && npm run start

# Check environment variables
echo $MONGODB_URI
echo $NEXTAUTH_URL
```

## 📊 **Step 6: Monitor and Maintain**

### 6.1 Analytics
- Cloudflare provides built-in analytics
- Monitor page views, performance, and errors

### 6.2 Performance Optimization
- Enable Cloudflare's CDN features
- Use Cloudflare's image optimization
- Monitor Core Web Vitals

### 6.3 Security
- Review security headers in `_headers` file
- Monitor for security vulnerabilities
- Keep dependencies updated

## 🎯 **What You Get**

After successful deployment:
- ✅ **Global CDN** - Fast loading worldwide
- ✅ **Automatic SSL** - Secure HTTPS connection
- ✅ **Serverless Functions** - API routes work seamlessly
- ✅ **Git Integration** - Automatic deployments on push
- ✅ **Custom Domain** - Professional web address
- ✅ **Analytics** - Built-in performance monitoring
- ✅ **Free Tier** - Generous free usage limits

## 🔄 **Continuous Deployment**

Once set up, every push to your main branch will automatically trigger a new deployment:

```bash
# Make changes to your code
git add .
git commit -m "Update features"
git push origin main

# Cloudflare Pages will automatically deploy the changes
```

## 📞 **Support**

If you encounter issues:
1. Check Cloudflare Pages build logs
2. Review MongoDB Atlas connection logs
3. Test API endpoints individually
4. Verify environment variables are set correctly

---

**🎉 Congratulations!** Your Gaza App is now deployed on Cloudflare Pages with global CDN, automatic SSL, and serverless functions!
