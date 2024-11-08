# SoleMate

## Your Ultimate Shoe Shopping Destination

**SoleMate** is an e-commerce platform tailored for shoe enthusiasts. Explore a curated selection of stylish, comfortable, and affordable footwear for every occasion. Whether you're in the market for casual sneakers, formal shoes, or the latest footwear trends, SoleMate has something for everyone. Step up your shoe game today!

---

## Features

- **User Authentication**: Secure user login and registration using **Kinde Auth**.
- **Product Management**: CRUD operations for managing a product catalog with categories like Men, Women, and Kids.
- **Image Uploads**: Image upload capabilities with **UploadThing**, allowing users to add visuals to products.
- **Responsive Design**: Built with **Tailwind CSS** and **Shadcn/ui** for a consistent, mobile-friendly experience.
- **Cart Functionality**: Serverless cart database using **Upstash Redis** for fast, real-time data management.
- **Payment Integration**: Seamless payment processing using **Stripe**.
- **Data Visualization**: Interactive charts for product analytics, using **Recharts**.

---

## Technologies Used

- **Next.js 14**: Full-stack framework for seamless frontend and backend integration.
- **TypeScript**: Adds type safety, making the codebase more maintainable.
- **TailwindCSS**: Utility-first CSS framework for efficient styling.
- **Shadcn/ui**: Component library with built-in dependencies like `lucide-react` for icons.
- **Kinde Auth**: Simplified authentication for secure user management.
- **React Hot Toast**: Toast notifications for actions like image uploads.
- **Neon**: Serverless PostgreSQL for scalable database solutions.
- **Prisma**: ORM for streamlined database operations.
- **Vercel Avatar**: Default user profile avatars.
- **Upstash with Redis**: Serverless database for cart functionality.
- **Stripe**: Payment gateway for processing transactions.
- **Recharts**: Data visualization library for product analytics.

---

## Implementations

### 1. UploadThing Setup with App Router

1. **Get API Keys**: Add the following to your `.env` file:

   - `UPLOADTHING_TOKEN`
   - `UPLOADTHING_SECRET`
   - `UPLOADTHING_APP_ID`

2. **Setup Files**:

   - Copy `api/uploadthing/core.ts` and adjust `maxFileCount` if needed.
   - Set the user from `kindAuthSession`.

3. **Configure Route**:

   - Copy `app/uploadthing/route.ts` to your project.

4. **Tailwind CSS Configuration**:

   - Update `tailwind.config.ts` to end with `export default withUt(config);`.

5. **Create Upload Component**:

   - Create an upload component in `app/lib/uploadthing.ts`.

6. **Import Upload Component**:

   - Use `<UploadDropZone endpoint="imageUploader" />` in your image upload section.

7. **Optimize SSR**:
   - Use SSR plugins as described in the documentation for enhanced server-side rendering.

### 2. Prisma ORM Installation for PostgreSQL

1. **Install Prisma CLI** (Development Dependency):

   - `npm install prisma --save-dev`
   - Manages database schemas and migrations.

2. **Install Prisma Client** (Runtime Dependency):

   - `npm install @prisma/client`
   - Required to interact with the database at runtime.

3. **Initialize Prisma**:

   - Run `npx prisma init` for model/schema creation.
   - Paste the `DATABASE_URL` from Neon into Prisma’s `.env`.
   - Define models in `prisma/schema.prisma` and push schema with `npx prisma db push`.
   - Run `npx prisma studio` to view and manage data locally.

4. **Model Creation**:

   - Set up a model in `api/auth/creation/route.js` and ensure that the route `/api/auth/creation` is configured to save user data.
   - Use the `KINDE_POST_LOGIN_REDIRECT_URL` in `.env` for Kinde auth redirection after login.

   _Note: When using Prisma for CRUD, import from `@app/lib/db.ts` instead of `@prisma/client`._

### 3. Server Actions for Validation

1. **Server Actions**:

   - Create `app/actions.ts` for server actions such as `createProducts` to validate data.

2. **Data Validation with Zod**:

   - Set up `app/lib/zodSchema.ts` to define constraints for models.
   - Use **Conform** to enforce these constraints. Check `conform.guide` for setup details.

3. **Client-side Validation**:

   - Use `useFormState()` for state management and `useForm()` from `@conform-to/react` for form controls.

   _Note: Ensure that `imagePattern` in `next.config.mjs` is configured to accept `utf.io` hostname for image uploads._

### 4. CRUD Operations

1. **Product Management**:
   - Create, read, update, and delete products, categorized by All, Men, Women, and Kids.
   - Attach `productId` to manage edits and deletions.

### 5. Stripe Integration

1. **Setup Stripe in `app/lib/stripe`**:

   - Configure Stripe API key, version, and TypeScript support.
   - Use `checkout()` in `app/actions.ts` to:
     - Fetch the user's cart from Redis.
     - Configure Stripe line items.
     - Initialize Stripe sessions with metadata and success/cancel URLs.

2. **Stripe Webhooks**:

   - Set up `app/api/stripe/route.ts` to handle POST requests upon checkout completion.
   - On completion, create a new order in the database via Prisma and clear the cart from Redis.

   _Note: Stripe actions in `actions.ts` trigger `app/lib/stripe` to initialize sessions, handle success or cancellation, and clear cart items in the database._

### 6. Recharts for Analytics

1. **Install Recharts**:
   - Use `ResponsiveContainer` to scaffold charts.
   - Refer to [Recharts Documentation](https://recharts.org/en-US/guide/getting-started) for more.

---

## Learning Outcomes

As a beginner, developing **SoleMate** allowed me to gain hands-on experience with essential web technologies and e-commerce functionalities. Here’s what I learned:

### Frontend

1. **Modern Tools**: Learned how to use **Next.js** and **TypeScript** to build a full-stack, type-safe application.
2. **Component Libraries**: Gained experience with **Tailwind CSS** and **Shadcn/ui** to create a responsive, professional UI.
3. **State Management and Forms**: Used **Zod** and **Conform** for validating and managing form data, improving data integrity.
4. **User Experience**: Implemented toast notifications with **React Hot Toast** to improve user feedback.

### Backend

1. **Database Management**: Set up and managed a PostgreSQL database with **Prisma** and **Neon**, learning about schema creation and data relationships.
2. **Authentication**: Integrated **Kinde Auth** for secure user authentication and managed redirect flows.
3. **Serverless and Real-Time Data**: Used **Redis** with Upstash for managing the cart functionality, giving me an introduction to serverless databases.
4. **Payment Processing**: Configured **Stripe** for secure payment handling and set up webhooks to monitor transaction events.

### Overall

- **Improved Problem-Solving**: Building this project helped me tackle real-world issues in data validation, state management, and UI/UX design.
- **End-to-End Development**: Gained experience in full-stack development, working independently on both the frontend and backend aspects of the application.
- **Deployment and Production Readiness**: Learned how to deploy the app on Vercel and manage environment variables securely.

---

## Conclusion

Thank you for checking out **SoleMate**! This project was a valuable learning experience, helping me understand key principles in building e-commerce platforms from scratch. If you have any feedback or suggestions, feel free to reach out or open an issue on GitHub.

Happy coding!
