# MongoDB Atlas Setup Guide

## 🗄️ **Step-by-Step MongoDB Configuration**

### **1. Create MongoDB Atlas Account**
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new cluster (choose the FREE tier)

### **2. Configure Database Access**
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create a username and password (save these!)
5. Set privileges to "Read and write to any database"

### **3. Configure Network Access**
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Choose "Allow access from anywhere" (0.0.0.0/0) for development
4. Or add your specific IP address

### **4. Get Connection String**
1. Go to "Clusters" and click "Connect" on your cluster
2. Choose "Connect your application"
3. Select "Node.js" as driver
4. Copy the connection string

### **5. Update Environment Variables**
Edit the `.env.local` file with your actual MongoDB connection string:

```bash
# Replace with your actual MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/voices-of-palestine?retryWrites=true&w=majority

# Database name
MONGODB_DB=voices-of-palestine

# NextAuth configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-here-change-this-in-production

# Application environment
NODE_ENV=development
```

### **6. Restart Development Server**
After updating the environment variables:
```bash
npm run dev
```

### **7. Test the Setup**
Once MongoDB is configured, you can:
1. Create admin users: `POST /api/admin/create-admin`
2. Register regular users: `POST /api/auth/register`
3. Sign in: `POST /api/auth/signin`
4. Access admin dashboard: `/admin`

## 🔧 **Quick Test Commands**

```bash
# Create an admin user
curl -X POST http://localhost:3000/api/admin/create-admin \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@palestine.com","password":"admin123"}'

# Register a regular user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"user@palestine.com","password":"user123"}'
```

## 🚨 **Important Notes**

- **Never commit** `.env.local` to version control
- **Change the secret** in production
- **Use strong passwords** for database users
- **Restrict network access** in production
- **Backup your data** regularly

## 🎯 **What This Enables**

With MongoDB configured, you'll have:
- ✅ **User Authentication** - Sign up, sign in, sign out
- ✅ **Admin Dashboard** - Manage testimonials and users
- ✅ **Data Persistence** - Testimonials saved to database
- ✅ **User Roles** - Admin vs regular user permissions
- ✅ **Session Management** - Secure user sessions
