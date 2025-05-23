# TODO App - Neobrutalism Task Management

A modern, feature-rich TODO application built with Next.js and styled with a bold neobrutalism design approach. Manage your tasks efficiently with advanced features like image attachments, priority levels, due dates, and customizable themes.

![TODO App Screenshot](https://via.placeholder.com/800x400/FFB6C1/000000?text=TODO+App+Dashboard)

## ✨ Features

### Core Functionality
- **Task Management**: Create, edit, delete, and mark tasks as complete
- **Image Attachments**: Add images to your tasks for better visual organization
- **Priority Levels**: Set task priorities (Low, Medium, High) with visual indicators
- **Due Dates**: Schedule tasks with due date tracking
- **Tags**: Organize tasks with custom tags
- **Search & Filter**: Find tasks quickly with built-in filtering

### User Experience
- **Neobrutalism Design**: Bold, colorful UI with strong borders and shadows
- **Responsive Layout**: Works seamlessly on desktop and mobile devices
- **Dark/Light Mode**: Toggle between themes (coming soon)
- **Customizable Accent Colors**: Choose from 6 accent color themes
- **Smooth Animations**: Engaging hover effects and transitions

### Authentication & Security
- **Secure Authentication**: Email/password login with NextAuth.js
- **User Registration**: Easy account creation with validation
- **Protected Routes**: Middleware-based route protection
- **Session Management**: Secure JWT-based sessions

### Settings & Customization
- **Profile Management**: Update user information and avatar
- **Accent Color Themes**: Blue, Pink, Green, Yellow, Orange, Purple, Cyan
- **Email Notifications**: Toggle notification preferences
- **User Settings**: Persistent user preferences

### Admin & User Management
- **Role-Based Access Control**: User, Admin, and Superuser roles
- **Admin Dashboard**: Statistics and system overview
- **User Management**: Create, edit, delete, and manage user accounts
- **Role Management**: Promote/demote users with proper restrictions
- **System Statistics**: User activity, todo completion rates, and more

## 🛠️ Technology Stack

### Frontend
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library with latest features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Tailwind Animate](https://github.com/jamiebuilds/tailwindcss-animate)** - Animation utilities

### Backend & Database
- **[Prisma](https://www.prisma.io/)** - Type-safe database ORM
- **[SQLite](https://www.sqlite.org/)** - Lightweight database (easily switchable)
- **[NextAuth.js](https://next-auth.js.org/)** - Authentication solution
- **[bcrypt](https://github.com/kelektiv/node.bcrypt.js)** - Password hashing

### UI Components
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[React Hook Form](https://react-hook-form.com/)** - Form management
- **[Zod](https://zod.dev/)** - Schema validation

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Turbopack](https://turbo.build/pack)** - Fast bundler for development

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd htm
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Add the following environment variables:
   ```env
   NEXTAUTH_SECRET=your-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Create a superuser account (optional)**
   ```bash
   npm run create-superuser
   ```
   This will create an admin account that can manage users and access the admin panel.

6. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── todos/         # Todo CRUD operations
│   │   ├── profile/       # User profile management
│   │   ├── settings/      # User settings
│   │   └── upload/        # File upload handling
│   ├── dashboard/         # Protected dashboard pages
│   │   ├── todos/         # Todo management pages
│   │   ├── profile/       # Profile management
│   │   └── settings/      # Settings page
│   ├── auth/              # Authentication pages
│   │   ├── login/         # Login page
│   │   └── register/      # Registration page
│   └── (marketing)/       # Public pages
│       ├── about/         # About page
│       ├── features/      # Features page
│       ├── privacy/       # Privacy policy
│       └── terms/         # Terms of service
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard-specific components
│   ├── todos/            # Todo-related components
│   ├── profile/          # Profile components
│   └── settings/         # Settings components
├── lib/                  # Utility libraries
│   ├── auth.ts           # NextAuth configuration
│   ├── db.ts             # Prisma client
│   ├── session.ts        # Session utilities
│   └── utils.ts          # General utilities
├── hooks/                # Custom React hooks
├── styles/               # Global styles
└── middleware.ts         # Next.js middleware
```

## 🔌 API Routes

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/[...nextauth]` - NextAuth.js authentication

### Todos
- `GET /api/todos` - Get user's todos
- `POST /api/todos` - Create new todo
- `PATCH /api/todos/[id]` - Update todo
- `DELETE /api/todos/[id]` - Delete todo

### User Management
- `GET /api/profile` - Get user profile
- `PATCH /api/profile` - Update user profile
- `GET /api/settings` - Get user settings
- `PATCH /api/settings` - Update user settings

### Admin Routes (Admin+ Access Required)
- `GET /api/admin/stats` - Get admin dashboard statistics
- `GET /api/admin/users` - Get all users
- `POST /api/admin/users` - Create new user (Superuser only)
- `GET /api/admin/users/[id]` - Get specific user
- `PATCH /api/admin/users/[id]` - Update user (role changes require Superuser)
- `DELETE /api/admin/users/[id]` - Delete user (Superuser only)

### File Upload
- `POST /api/upload` - Upload images for todos

## 🗄️ Database Schema

### User Model
```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  password      String
  image         String?
  role          Role      @default(USER)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  todos         Todo[]
  settings      Settings?
}
```

### Todo Model
```prisma
model Todo {
  id          String    @id @default(cuid())
  title       String
  description String?
  completed   Boolean   @default(false)
  priority    Priority  @default(MEDIUM)
  dueDate     DateTime?
  tags        String?
  image       String?   // Optional image attachment
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  userId      String
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

### Settings Model
```prisma
model Settings {
  id                 String  @id @default(cuid())
  accentColor        String  @default("blue") // blue, pink, green, yellow, purple, cyan
  emailNotifications Boolean @default(true)
  userId             String  @unique
  user               User    @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

### Priority Enum
```prisma
enum Priority {
  LOW
  MEDIUM
  HIGH
}
```

### Role Enum
```prisma
enum Role {
  USER
  ADMIN
  SUPERUSER
}
```

## 🔐 Authentication

The app uses **NextAuth.js** with credentials provider for authentication:

### Features
- Email/password authentication
- Secure password hashing with bcrypt
- JWT-based sessions
- Protected routes with middleware
- Automatic session management
- Role-based access control (User, Admin, Superuser)
- Admin route protection

### Configuration
```typescript
// lib/auth.ts
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // Email/password authentication
    })
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    signOut: "/",
  }
}
```

## 👥 Role-Based Access Control

### User Roles

#### **USER** (Default)
- Create, edit, and delete their own todos
- Update their profile and settings
- Access personal dashboard

#### **ADMIN**
- All USER permissions
- View admin dashboard with system statistics
- View and manage all user accounts
- Cannot change user roles (except with Superuser permission)
- Cannot delete users

#### **SUPERUSER**
- All ADMIN permissions
- Create new user accounts
- Change user roles (promote/demote)
- Delete user accounts
- Full system administration access

### Role Hierarchy & Restrictions

- **Role Changes**: Only Superusers can change user roles
- **Self-Protection**: Users cannot change their own role or delete themselves
- **Superuser Protection**: Only Superusers can modify other Superuser accounts
- **Admin Creation**: Only Superusers can create Admin or Superuser accounts

### Creating Your First Superuser

```bash
npm run create-superuser
```

This interactive script will:
1. Prompt for name, email, and password
2. Create a new Superuser account
3. Set up default admin settings
4. Provide login credentials

### Admin Dashboard Features

- **User Statistics**: Total users, new registrations, role distribution
- **Todo Analytics**: Completion rates, priority distribution, activity trends
- **Top Users**: Most active users by todo count
- **System Metrics**: Average todos per user, completion percentages

## 🎨 Neobrutalism Design System

### Design Principles
- **Bold Borders**: 3-4px black borders on all elements
- **Strong Shadows**: Offset shadows for depth (4px-8px)
- **Vibrant Colors**: High contrast color combinations
- **Chunky Typography**: Bold, black font weights
- **Geometric Shapes**: Sharp corners, no rounded edges
- **Hover Effects**: Transform and shadow animations

### Color Palette
```css
/* Accent Colors */
--accent-blue: #3B82F6
--accent-pink: #EC4899
--accent-green: #10B981
--accent-yellow: #F59E0B
--accent-orange: #F97316
--accent-purple: #8B5CF6
--accent-cyan: #06B6D4

/* Background Colors */
--bg-primary: #FEF3C7    /* Yellow-50 */
--bg-secondary: #FFFFFF   /* White */
--bg-accent: Dynamic based on user selection
```

### Component Styling
```css
.neobrutal-card {
  @apply border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0)];
}

.neobrutal-button {
  @apply border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0)]
         hover:shadow-[6px_6px_0px_0px_rgba(0,0,0)]
         hover:translate-x-[-2px] hover:translate-y-[-2px]
         transition-all duration-200;
}
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Features
- Collapsible sidebar navigation
- Touch-friendly button sizes
- Optimized form layouts
- Responsive grid systems

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:studio    # Open Prisma Studio
```

### Environment Variables
```env
# Authentication
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Database (optional - defaults to SQLite)
DATABASE_URL="file:./dev.db"
```

### Code Style
- **TypeScript**: Strict mode enabled
- **ESLint**: Next.js recommended config
- **Prettier**: Automatic code formatting
- **Tailwind**: Utility-first CSS approach

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms
The app can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- Heroku
- DigitalOcean App Platform

### Database Considerations
- **Development**: SQLite (included)
- **Production**: PostgreSQL, MySQL, or SQLite with persistent storage

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Maintain the neobrutalism design consistency

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Vercel** - For hosting and deployment platform
- **Radix UI** - For accessible component primitives
- **Tailwind CSS** - For the utility-first CSS framework
- **Prisma** - For the excellent database toolkit

## 📞 Support

If you have any questions or need help:

1. **Check the documentation** above
2. **Search existing issues** on GitHub
3. **Create a new issue** with detailed information
4. **Join our community** discussions

---

**Built with ❤️ using Next.js and Neobrutalism Design**