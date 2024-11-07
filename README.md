# SoleMate

## Your Ultimate Shoe Shopping Destination

SoleMate is an e-commerce platform designed exclusively for shoe lovers. Discover a curated collection of stylish, comfortable, and affordable footwear for every occasion. Whether you're looking for casual sneakers, formal dress shoes, or the latest trends in footwear, SoleMate has it all. Step up your shoe game today!

---

## Technologies

- **Next.js 14**: Full stack framework
- **Typescript**: For Type Safety for JavaScript
- **TailwindCSS**: For Styling
- **Shadcn/ui (library)**: For Components
  - Auto Installed Dependencis: lucide-react
- **Kinde Auth**: For authentication process
- **React Hot Toast**: For toast infos, such as image upload successfully or Failed!
- **Neon**: For serveless postgresSQL
- **Prisma**: For Object Relation Mapping(ORM)
- **Vercel/avatar**: For default user profile
- **upstash with Redis**: For Serverless Cart Database
- **Stripe** : For payent process

# Implementations

## 1. UploadThing Setup with App Router

### Project Setup

1. **Get API Keys**: Add the following to your `.env` file:

   - `UPLOADTHING_TOKEN`
   - `UPLOADTHING_SECRET`
   - `UPLOADTHING_APP_ID`

2. **Copy Files**:

   - Copy `api/uploadthing/core.ts` and adjust `maxFileCount` if needed.
   - Set the user from `kindAuthSession`.

3. **Copy Route**:

   - Copy `app/uploadthing/route.ts` to your project.

4. **Tailwind CSS Configuration**:

   - Update `tailwind.config.ts` to end with `export default withUt(config);`.

5. **Create Upload Component**:

   - Create the upload component in `app/lib/uploadthing.ts`.

6. **Import Upload Component**:

   - Use `<UploadDropZone endpoint="imageUploader" />` in your image upload section.

7. **Optimize SSR**:
   - Use SSR plugins as described in the documentation for better server-side rendering.

## 2. Prisma ORM Installation for PostgreSQL

### Development Dependency

- **Prisma CLI**: Install with `npm install prisma --save-dev`
  - **Why?**: Needed for managing database schemas and migrations during development.

### Runtime Dependency

- **@prisma/client**: Install with `npm install @prisma/client`
  - **Why?**: Required at runtime to interact with the database in production.

### Init primsa

- Prisma file for model/schema creation via `npx prisma init`
- Paste the DATABASE_URL from the Neon --> Prisma(.env)
- Create required models in built file prisma/schema.prisma
- Push Schema to db neon: `npx prisma db push`
- To run local studio: `npx prisma studio`

### Model Creation

- Create `api/auth/creation/route.js` for Models creation
- Error might occur while using **Prisma** from `@prisma/client` follow _https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices_
- create a model in the file and specify the api route: `/api/auth/creation` to save the user to db as kinde auth looks for KINDE_POST_LOGIN_REDIRECT_URL in .env file to redirect after login

**_Note: while importing `primsa` for CRUD don't import from `@prima/client` import from `@app/lib/db.ts`_**

## Server Action for Validation

- Create an `app/actions.ts` to create server actions: **createProducts** to do data validation
- **zod** for enforcing/creating constraints for incoming data
  - app/lib/zodSchema.ts: defined the requirement constraints for models
- **conform** for validating the enforced constraints:: follow conform.guide --> tutorial && parseWithZod for implementation details
- use the _**parseWithZod(formData, {schema: zodProductSchema})**_
- pass the submission.reply() to catch on **useFormState() for next 14** but **useActionState() for next 15** which do same work
-

## Client side Validation using zod

- using useFormState() to get the previous state and server actions
- useForm() from **@conform-to/react** for form fleids control

_Note: make sure to use image.imagePattern in next.config.mjs file to make sure your image accept utf.io hostname_

### CRUD Operations

- Products Creations
- Product Fetch via Category: All, Men, Women, Kids
- Product Update
- Product Delete and Edit via productId, attched to nextjs FormData

#### Learning Outcome:

- Able to customize shadcn theme for custom requirement
- Uploadthing for next.js
- PostgreSQL
