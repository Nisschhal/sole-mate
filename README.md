# SoleMate

## Your Ultimate Shoe Shopping Destination

SoleMate is an e-commerce platform designed exclusively for shoe lovers. Discover a curated collection of stylish, comfortable, and affordable footwear for every occasion. Whether you're looking for casual sneakers, formal dress shoes, or the latest trends in footwear, SoleMate has it all. Step up your shoe game today!

---

### Dependencies

- **Next.js 14**: Full stack framework
- **Typescript**: For Type Safety for JavaScript
- **TailwindCSS**: For Styling
- **Shadcn/ui (library)**: For Components
  - Auto Installed Dependencis: lucide-react
- **Kinde Auth**: For authentication process
- **React Hot Toast**: For toast infos, such as image upload successfully or Failed!

## Implementation

1. **UploadThing** with App Router:

   - Setup the project
     - Get the API keys to .env: UPLOADTHING_TOKEN, UPLOADTHING_SECRET, and UPLOADTHING_APP_ID
   - Copy and Paste api/uploadthing/core.ts file
     - and maxFileCount (if required)
     - set the user from the kindAuthSession
   - Copy and Paste app/uploadthing/route.ts file
   - Apply tailwindcss style in tailwind.config.ts to end withUt(config);
   - Create the uploadthing component in app/lib/uploadthing.ts
   - Import the <UploadDropZone endpoint="imageUploader" /> at the image upload section
   - For better SSR, use SSR plugins as shown in docs

2.
