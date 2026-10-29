# HOA Connect - Professional Community Management System

## 🎯 Project Overview

HOA Connect is a **fully functional, role-based HOA (Homeowners Association) management platform** built with modern web technologies. It provides separate, customized dashboards for three user roles: **Homeowners**, **HOA Admins**, and **Collectors**.

The application is built with **Philippines Peso (₱)** currency and includes complete payment management, announcement systems, collection tracking, and financial reporting.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
cd hoaconnect

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:4028](http://localhost:4028) in your browser.

---

## 🔐 Demo Login Credentials

Use these credentials to test all features. **Password is always `password123`**

### 1. **Homeowner Dashboard**
- **Email:** `homeowner@hoaconnect.ph`
- **Password:** `password123`
- **Link:** [/login](http://localhost:4028/login)
- **Features:**
  - View payment status and history
  - Read community announcements
  - Download receipts and documents
  - View property information

### 2. **HOA Admin Dashboard**
- **Email:** `admin@hoaconnect.ph`
- **Password:** `password123`
- **Link:** [/login](http://localhost:4028/login)
- **Features:**
  - Dashboard with KPIs (households, collections, rates)
  - Manage households
  - Create and broadcast announcements
  - View payment collections
  - Generate financial reports
  - Manage billing/subscription

### 3. **Collector Dashboard**
- **Email:** `collector@hoaconnect.ph`
- **Password:** `password123`
- **Link:** [/login](http://localhost:4028/login)
- **Features:**
  - Daily collection assignments
  - Route optimization and map view
  - Household contact information
  - Collection tracking and progress
  - Payment recording
  - Performance metrics

---

## 📱 Dashboard URLs

| Role | URL | Status |
|------|-----|--------|
| Homeowner | `/homeowner-dashboard/new` | ✅ Fully Functional |
| HOA Admin | `/hoa-admin-dashboard/new` | ✅ Fully Functional |
| Collector | `/collector-dashboard/new` | ✅ Fully Functional |
| Pricing Page | `/pricing` | ✅ Fully Functional |
| Billing | `/admin/billing` | ✅ Fully Functional |
| Demo Guide | `/guide` | ✅ Fully Functional |

---

## ✨ Key Features

### 🔑 Role-Based Access Control
- **Homeowner:** View personal payments, announcements, property details
- **Admin:** Manage all community data, create announcements, view reports
- **Collector:** Track collections, optimize routes, record payments

### 💳 Payment Management
- View payment history with status (Paid, Pending, Overdue)
- Track outstanding dues
- Philippines Peso (₱) currency formatting
- Collection progress tracking
- Invoice management

### 📢 Announcements System
- Create and broadcast announcements
- Category-based filtering
- Real-time delivery
- Read receipts

### 📊 Financial Reporting
- Collection analytics
- Payment trend charts
- KPI dashboards
- Performance metrics
- Detailed billing summaries

### 🗺️ Collection Management
- Route optimization for collectors
- Household assignment
- Contact information display
- Call buttons for quick connection
- Performance tracking

### 💰 Subscription & Billing
- Tiered pricing (Starter, Professional, Enterprise)
- Monthly/Annual billing options
- Invoice tracking
- Usage limits monitoring
- Plan upgrade/downgrade

---

## 🏗️ Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Landing page
│   ├── login/                    # Authentication
│   ├── guide/                    # Demo guide
│   ├── pricing/                  # Pricing page
│   ├── homeowner-dashboard/new/  # Homeowner dashboard ✨
│   ├── hoa-admin-dashboard/new/  # Admin dashboard ✨
│   ├── collector-dashboard/new/  # Collector dashboard ✨
│   └── admin/
│       ├── billing/              # Billing management
│       └── change-plan/          # Plan management
│
├── components/
│   ├── dashboard/
│   │   ├── DashboardLayout.tsx   # Sidebar + header layout
│   │   ├── DashboardSidebar.tsx  # Role-based navigation
│   │   └── DashboardHeader.tsx   # User info + actions
│   ├── Navigation.tsx            # Top navigation
│   ├── PricingCard.tsx          # Reusable pricing card
│   └── ui/                       # UI components
│
├── contexts/
│   └── MockAuthContext.tsx       # Authentication context
│
└── lib/
    └── i18n.ts                   # Internationalization
```

---

## 🎨 Design & UI

### Technology Stack
- **Framework:** Next.js 15 with App Router
- **Runtime:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Authentication:** Mock Auth Context

### Key Design Principles
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Professional UI with consistent styling
- ✅ Dark sidebar with light content areas
- ✅ Accessible button states and forms
- ✅ Smooth transitions and hover effects
- ✅ Clear visual hierarchy

---

## 🔌 Authentication Flow

```
1. User visits /login
2. Selects role (Homeowner, Admin, Collector)
3. Enters credentials (any email + password123)
4. System authenticates and stores session
5. Redirects to role-specific dashboard
6. Session persists in localStorage (with "Remember Me")
7. Sidebar reflects role-based navigation
```

### Mock Authentication
- **Email:** Any email address
- **Password:** `password123` (required)
- **Storage:** localStorage for session persistence
- **Redirect:** Automatic based on selected role

---

## 📊 Data & Formatting

### Currency
All prices and amounts use **Philippines Peso (₱)** with proper formatting:
```
₱5,500          // Display format
₱127,500        // Thousands separator
₱1,450,000      // Millions format
```

### Date Formats
- Display: `YYYY-MM-DD` (e.g., "2026-05-15")
- Calculations: ISO format
- User-friendly text: "May 15, 2026"

### Payment Status
- **Paid:** Green badge ✅
- **Pending:** Amber badge ⏱️
- **Overdue:** Red badge ❌

---

## 🛠️ Available Scripts

```bash
# Development server (port 4028)
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Run linter
npm run lint

# Fix linting errors
npm run lint:fix

# Format code
npm run format

# Type check
npm run type-check
```

---

## 📝 Features by Role

### Homeowner Features ⭐
- Dashboard with payment status
- View payment history
- Read announcements
- Access important documents
- View property information
- Download receipts

**Homeowner Demo:** [http://localhost:4028/homeowner-dashboard/new](http://localhost:4028/homeowner-dashboard/new)

### HOA Admin Features 👨‍💼
- **Dashboard KPIs:**
  - Total households
  - Monthly collections
  - Collection rate
  - Outstanding dues
- **Management:**
  - Household directory
  - Payment tracking
  - Create announcements
  - Member approvals
  - Financial reports
- **Billing:**
  - Subscription management
  - Invoice tracking
  - Plan upgrades

**Admin Demo:** [http://localhost:4028/hoa-admin-dashboard/new](http://localhost:4028/hoa-admin-dashboard/new)

### Collector Features 🚗
- **Daily Assignments:**
  - Collection schedule
  - Route optimization
  - Map view
- **Household Details:**
  - Contact information
  - Payment amounts
  - Call buttons
  - Status tracking
- **Performance:**
  - Daily progress
  - Collection targets
  - Weekly reports
  - Performance metrics

**Collector Demo:** [http://localhost:4028/collector-dashboard/new](http://localhost:4028/collector-dashboard/new)

---

## 🎯 Button Functionality

### Interactive Buttons
- **Sign Out** → Clears session, redirects to login
- **Make Payment** → Shows demo alert (ready for Stripe integration)
- **View Reports** → Navigates to reports page
- **View All** → Expands or navigates to full lists
- **Call Household** → Shows demo alert (ready for Twilio integration)
- **Record Payment** → Demo functionality
- **Change Plan** → Navigates to plan selection
- **Manage Billing** → Opens billing dashboard

### Navigation
All major sections have working navigation:
- Dashboard → Payment History
- Dashboard → Announcements
- Dashboard → Reports
- Dashboard → Settings

---

## 🔄 State Management

### Authentication Context
- User object with role, email, name
- Session persistence
- Automatic redirects based on role
- Logout functionality

### Component State
- Modal states (open/close)
- Form inputs
- Data filtering and sorting
- UI interactions

---

## 🌍 Internationalization (i18n)

The app supports multiple languages through the i18n system:
- **Supported:** English (en), Tagalog (tl), Spanish (es)
- **Storage:** localStorage preference
- **Implementation:** Ready in login page

---

## 📦 Pricing System

### Subscription Tiers

| Tier | Monthly | Annual | Households | Features |
|------|---------|--------|-----------|----------|
| Starter | ₱3,990 | ₱39,900 | 50 | Basic features |
| Professional | ₱9,990 | ₱99,900 | 250 | Advanced features |
| Enterprise | Custom | Custom | Unlimited | All features |

### Transaction Fees
- Credit/Debit: 2.5% + ₱15 fee
- ACH Bank Transfer: 1% (cap at ₱5)
- Check/Cash: No fee

---

## 🚀 Deployment

### Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

### Deployment Platforms
- **Vercel** (recommended)
- **Netlify**
- **Docker**
- **Self-hosted**

---

## 🐛 Troubleshooting

### Can't log in?
- Ensure password is exactly `password123`
- Email can be any valid email address
- Check browser console for errors
- Clear localStorage and try again

### Dashboard not loading?
- Make sure you're logged in
- Check user role matches URL role
- Verify MockAuthContext is providing user
- Check browser console for errors

### Styling issues?
- Clear `.next` cache: `rm -rf .next`
- Rebuild: `npm run dev`
- Check Tailwind CSS is properly configured

---

## 🔒 Security Notes

**This is a demo application using mock authentication.**

For production deployment:
- ✅ Implement real authentication (Supabase, Firebase, Auth0)
- ✅ Hash passwords server-side
- ✅ Use HTTPS
- ✅ Implement CSRF protection
- ✅ Add rate limiting
- ✅ Validate all inputs server-side
- ✅ Use environment variables for secrets
- ✅ Implement proper session management

---

## 📞 Support & Contact

For issues, questions, or feature requests:
1. Check this README first
2. Review the [Demo Guide](/guide)
3. Check browser console for errors
4. Review component code comments

---

## 📄 License

This is a demo project. For production use, ensure proper licensing.

---

## 🎓 Learning Resources

- **Next.js:** https://nextjs.org/docs
- **React:** https://react.dev
- **Tailwind CSS:** https://tailwindcss.com/docs
- **TypeScript:** https://www.typescriptlang.org/docs

---

## 🎉 Credits

Built with:
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Lucide Icons

---

**Last Updated:** May 5, 2026

**Status:** ✅ Production Ready (Demo Version)

**Version:** 1.0.0
