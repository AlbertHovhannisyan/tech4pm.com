# Tech4PM.com

> **Modern Product Management Education Platform**  
> Structured PM training, technical depth, AI-first thinking.

A production-ready website for a Product Management education platform focused on **Technical PMs, AI PMs, and career transitions into PM**.

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 20.9.0 (required for Next.js 16)
- **npm** >= 10.0.0 or **yarn** >= 1.22.0

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tech4pm
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables** (optional)
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

The main page (index) is automatically served at `/` - this is the home page.

---

## 📁 Project Structure

```
tech4pm/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Main page (index) - Home page
│   ├── layout.tsx          # Root layout
│   ├── globals.css        # Global styles & brand colors
│   ├── contact/           # Contact page
│   ├── programs/          # Programs listing
│   ├── pm-journey/        # Interactive skill analysis
│   └── resources/          # Resources library
├── components/            # Reusable components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── CTA.tsx
├── public/                # Static assets
├── .env.example           # Environment variables template
├── next.config.ts         # Next.js configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies & scripts
```

---

## 🛠 Development

### Available Scripts

```bash
# Development server (with hot reload)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Type checking
npm run type-check

# Format code (if Prettier is configured)
npm run format
```

### Development Best Practices

1. **TypeScript**: All components are typed. Run `npm run type-check` before committing.

2. **Linting**: Use `npm run lint` to check for issues. Fix automatically with `npm run lint:fix`.

3. **Code Style**: Follow the existing patterns:
   - Use functional components with TypeScript
   - Client components marked with `'use client'`
   - Consistent naming: PascalCase for components, camelCase for functions

4. **Component Structure**:
   ```tsx
   'use client'; // Only if needed
   
   import { motion } from 'framer-motion';
   
   export default function ComponentName() {
     // Component logic
     return (
       // JSX
     );
   }
   ```

---

## 🎨 Brand & Design System

### Color Palette

- **Primary Gradient**: Neon Pink (#FF2E93) → Electric Purple (#8B5CF6) → Deep Violet (#5B2EFF)
- **Background**: Dark Navy (#0B0F1A), Secondary Dark (#111827)
- **Accents**: Cyan Glow (#22D3EE), Success Green (#22C55E)
- **Text**: Primary (#E5E7EB), Muted (#9CA3AF)

### Typography

- **Body**: Inter
- **Display**: Space Grotesk

### Design Principles

- Dark mode default
- Premium, technical aesthetic
- Glow effects and neon borders
- Smooth animations with Framer Motion
- Mobile-first responsive design

---

## 📄 Pages

1. **Home** (`/`) - Main landing page
   - Hero section with animated gradient
   - Who It's For section
   - Value propositions
   - Programs overview
   - Skill path preview
   - Testimonials

2. **Programs** (`/programs`)
   - 5 structured tracks (Foundations, Technical, AI/ML, Growth, Product Ops)
   - Detailed curriculum and learning outcomes
   - Comparison table
   - FAQ section

3. **PM Journey** (`/pm-journey`)
   - Interactive 3-step flow
   - Skill radar chart (Chart.js)
   - Personalized recommendations
   - Gap analysis

4. **Resources** (`/resources`)
   - Filterable resource library
   - Templates, tools, playbooks, case studies
   - Category and tag filters

5. **Contact** (`/contact`)
   - Contact form
   - Calendly booking integration (placeholder)
   - Quick action links

---

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file (see `.env.example`):

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Tech4PM
```

### Next.js Configuration

The `next.config.ts` includes:
- Image optimization
- Security headers
- Production optimizations
- Console log removal in production

### Customization

1. **Calendly Integration**: Update `/app/contact/page.tsx` with your Calendly URL
2. **Contact Form**: Create API route at `/app/api/contact/route.ts` for form submission
3. **Analytics**: Add Google Analytics or other tracking in `app/layout.tsx`

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Import project in [Vercel](https://vercel.com)
3. Vercel will auto-detect Next.js and deploy

### Other Platforms

#### Netlify

```bash
npm run build
# Deploy the .next folder
```

#### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

#### Traditional Server

```bash
# Build the application
npm run build

# Start production server
npm start
```

The app will run on port 3000 by default. Set `PORT` environment variable to change.

---

## 📦 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS 4
- **Animations**: Framer Motion
- **Charts**: Chart.js + react-chartjs-2
- **Deployment**: Vercel-ready (or any Node.js host)

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000 (Mac/Linux)
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Type Errors

```bash
# Check TypeScript
npm run type-check
```

---

## 📝 Notes

- The main page (index) is at `app/page.tsx` - this serves as the home page at `/`
- All pages use the App Router structure
- Client components are marked with `'use client'` directive
- Server components are default (no directive needed)

---

## 🤝 Contributing

1. Follow the existing code style
2. Run `npm run lint` and `npm run type-check` before committing
3. Test on multiple screen sizes
4. Ensure all links and forms work correctly

---

## 📄 License

Private - All rights reserved

---

## 🆘 Support

For issues or questions, please contact the development team.

---

**Built with ❤️ for Product Managers**
