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

### Model Creation

- Create `api/auth/creation/route.js` for Models creation
- Error might occur while using **Prisma** from `@prisma/client` follow _https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices_
- create a model in the file

#### Learning Outcome:

- Able to customize shadcn theme for custom requirement
- Uploadthing for next.js
