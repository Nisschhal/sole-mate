# SoleMate 👟

## Your Ultimate Shoe Shopping Destination

**SoleMate** is an e-commerce platform tailored for shoe enthusiasts. Discover a curated selection of stylish, comfortable, and affordable footwear for every occasion. Whether you’re looking for casual sneakers, formal shoes, or the latest trends, SoleMate has you covered. Step up your shoe game today! 👞👠

---

## Table of Contents 📑

- [Features 🌟](#features)
- [Technologies Used 🛠️](#technologies-used)
- [Implementations ⚙️](#implementations)
  - [UploadThing Setup with App Router 📸](#1-uploadthing-setup-with-app-router)
  - [Prisma ORM with PostgreSQL 🗄️](#2-prisma-orm-installation-for-postgresql)
  - [Server Actions for Validation 🔍](#3-server-actions-for-validation)
  - [CRUD Operations 📝](#4-crud-operations)
  - [Stripe Payment Integration 💳](#5-stripe-integration)
  - [Recharts for Analytics 📊](#6-recharts-for-analytics)
  - [Deployment 🚀](#7-deployment)
- [Learning Outcomes 📚](#learning-outcomes)
- [Conclusion 👋](#conclusion)

---

## Features 🌟

- **User Authentication**: Secure login and registration with **Kinde Auth**.
- **Product Management**: Full CRUD operations for managing a categorized product catalog.
- **Image Uploads**: Integrated **UploadThing** for product images.
- **Responsive Design**: Designed with **Tailwind CSS** and **Shadcn/ui** for a mobile-friendly, consistent look.
- **Cart Functionality**: Serverless cart database powered by **Upstash Redis** for real-time updates.
- **Payment Integration**: Seamless payment handling with **Stripe**.
- **Data Visualization**: Interactive analytics with **Recharts** for insights into product trends.

---

## Technologies Used 🛠️

- **Next.js 14**: Full-stack framework for integrating frontend and backend.
- **TypeScript**: Ensures code reliability with type safety.
- **TailwindCSS**: Utility-first CSS for rapid styling.
- **Shadcn/ui**: Component library with built-in icon support via `lucide-react`.
- **Kinde Auth**: Secure, easy-to-configure authentication.
- **React Hot Toast**: User feedback through toast notifications.
- **Neon**: Serverless PostgreSQL for scalable data management.
- **Prisma**: ORM for database management.
- **Vercel Avatar**: Default avatars for user profiles.
- **Upstash with Redis**: Serverless cart management.
- **Stripe**: Payment processing.
- **Recharts**: Data visualization for analytics.

---

## Implementations ⚙️

### 1. UploadThing Setup with App Router 📸

1. **API Keys**: Add the following to your `.env` file:

   - `UPLOADTHING_TOKEN`
   - `UPLOADTHING_SECRET`
   - `UPLOADTHING_APP_ID`

2. **Configure Files**:

   - Copy `api/uploadthing/core.ts` and set the user from `kindAuthSession`.

3. **Route Configuration**:

   - Add `app/uploadthing/route.ts` to your project.

4. **Tailwind CSS**:

   - Update `tailwind.config.ts` to end with `export default withUt(config);`.

5. **Create & Use Upload Component**:

   - Build an upload component in `app/lib/uploadthing.ts` and add `<UploadDropZone endpoint="imageUploader" />` in the desired section.

6. **Optimize for SSR**:
   - Use SSR plugins as per documentation for server-side rendering.

### 2. Prisma ORM with PostgreSQL 🗄️

1. **Install Prisma**:

   - Install CLI: `npm install prisma --save-dev` for development.
   - Install Client: `npm install @prisma/client` for runtime interactions.

2. **Setup & Initialize**:

   - Run `npx prisma init` and configure `DATABASE_URL` in Prisma’s `.env` from Neon.
   - Define models in `prisma/schema.prisma` and push schema with `npx prisma db push`.
   - Use `npx prisma studio` to manage data locally.

3. **Model Creation**:

   - Set up models and routes to save user data.
   - Redirect Kinde Auth post-login to `KINDE_POST_LOGIN_REDIRECT_URL` in `.env`.

   _Note: Import Prisma for CRUD operations from `@app/lib/db.ts`._

### 3. Server Actions for Validation 🔍

1. **Server Actions**:

   - Create `app/actions.ts` for actions like `createProducts`.

2. **Validation with Zod**:

   - Set constraints in `app/lib/zodSchema.ts` and enforce with **Conform**.

3. **Client-Side Validation**:

   - Manage form state with `useFormState()` and controls with `useForm()` from `@conform-to/react`.

   _Ensure `imagePattern` in `next.config.mjs` accepts `utf.io` hostname._

### 4. CRUD Operations 📝

- Create, read, update, and delete products. Categorize them by Men, Women, and Kids.
- Attach `productId` to manage edits and deletions.

### 5. Stripe Payment Integration 💳

1. **Stripe Setup**:

   - Configure in `app/lib/stripe` with API keys and TypeScript support.

2. **Checkout Session**:

   - Use `checkout()` to set up Stripe sessions with cart details from Redis.

3. **Stripe Webhooks**:

   - Configure a webhook in `app/api/stripe/route.ts` to monitor checkout events.

   _Stripe actions in `actions.ts` initialize sessions, handle success/cancellation, and manage cart data._

### 6. Recharts for Analytics 📊

- Install Recharts and use `ResponsiveContainer` as a scaffold.
- Follow [Recharts Documentation](https://recharts.org/en-US/guide/getting-started) for setup.

### 7. Deployment 🚀

- **Error and Bug Resolution**: Addressed deployment issues on Vercel, including ESLint and Next.js v14 compatibility.
- **Auth Configuration**: Updated **Kinde Auth** URLs for seamless production authentication.
- **Stripe Webhook**: Configured secure `stripe_webhook` environment variable in Vercel for reliable Stripe communication.

---

## Learning Outcomes 📚

Building **SoleMate** provided me, as a full stack developer, with valuable experience in key technologies and e-commerce functionality.

### Frontend

1. **Modern Tools**: Mastered **Next.js** and **TypeScript** for full-stack development.
2. **UI Design**: Gained experience with **Tailwind CSS** and **Shadcn/ui** for responsive, user-friendly interfaces.
3. **Form Management**: Learned to validate data with **Zod** and **Conform**, enhancing user input reliability.
4. **UX Enhancements**: Implemented **React Hot Toast** for responsive notifications.

### Backend

1. **Database Management**: Used **Prisma** with **Neon** for data storage, schema management, and relationships.
2. **Secure Authentication**: Integrated **Kinde Auth** and managed redirects for secure user login.
3. **Serverless Data**: Implemented **Redis** with Upstash for efficient cart management.
4. **Stripe Payment Handling**: Set up Stripe for payments, including secure webhook event monitoring.

### Deployment

1. **Bug Resolution and Optimization**: Gained experience troubleshooting Vercel deployment issues, including ESLint and Next.js v14 challenges.
2. **Production Configurations**: Configured **Kinde Auth** and Stripe with environment-specific URLs for secure production setup.
3. **Webhook Setup**: Configured secure **Stripe webhook** endpoint in Vercel, handling event-driven communication reliably.

### Overall

- **Problem-Solving Skills**: Learned to address real-world challenges in data validation, state management, and UI/UX design.
- **End-to-End Development**: Gained full-stack experience managing frontend, backend, and deployment aspects independently.
- **Production Readiness**: Developed skills in deploying and configuring a production app, managing environment variables, and optimizing for Vercel.

---

## Conclusion 👋

Thank you for checking out **SoleMate**! This project has been an invaluable learning experience, helping me understand core concepts of e-commerce development. If you have feedback or suggestions, please feel free to reach out or open an issue on GitHub.

Happy coding!
