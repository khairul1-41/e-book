import JSZip from 'jszip';

export async function exportFullWebsiteZip(): Promise<void> {
  const zip = new JSZip();

  // Root project files
  zip.file(
    'package.json',
    JSON.stringify(
      {
        name: 'drem-shop-ebook-marketplace',
        version: '1.0.0',
        private: true,
        type: 'module',
        scripts: {
          dev: 'vite',
          build: 'vite build',
          preview: 'vite preview'
        },
        dependencies: {
          react: '^19.0.1',
          'react-dom': '^19.0.1',
          'lucide-react': '^0.546.0',
          motion: '^12.23.24',
          firebase: '^12.11.0',
          jszip: '^3.10.1',
          clsx: '^2.1.1',
          'tailwind-merge': '^3.5.0'
        },
        devDependencies: {
          '@vitejs/plugin-react': '^6.1.1',
          '@tailwindcss/vite': '^4.3.3',
          tailwindcss: '^4.3.3',
          typescript: '^7.0.2',
          vite: '^8.3.0',
          '@types/react': '^19.3.0',
          '@types/react-dom': '^19.3.0'
        }
      },
      null,
      2
    )
  );

  // Netlify config file (_redirects for SPA routing)
  zip.file(
    'netlify.toml',
    `[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
`
  );

  zip.file('public/_redirects', '/*    /index.html   200\n');

  // README with setup & deployment instructions
  zip.file(
    'README.md',
    `# Drem Shop — Premium Digital E-Book Marketplace

Drem Shop is a production-ready, high-converting digital E-Book store with a full Customer Storefront and a dedicated, role-based Admin Panel.

## Features
- **Modern E-Commerce Storefront**: E-Book catalog, search, filtering, detailed view, in-browser sample reader, and instant downloads.
- **Secure Admin Panel**: Accessible via \`/#/admin\` with role-based access (Super Admin, Manager, Editor).
- **Payment & Checkout**: bKash, Nagad, Rocket, and Card checkout with instant digital delivery.
- **Febspot Video Reviews**: Integrated official Febspot video player and reviews for books.
- **Adsterra Advertising**: Fully configurable Banner, Popunder, and Social Bar ads.
- **Firebase Integration**: Authentication, Firestore persistence, and local sync fallback.

## Quick Start (Local Development)

1. Clone or extract this project.
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Start the dev server:
   \`\`\`bash
   npm run dev
   \`\`\`
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Netlify

1. Push your project to GitHub or drag-and-drop the \`dist\` folder into Netlify Drop.
2. Build Command: \`npm run build\`
3. Publish Directory: \`dist\`
4. The included \`netlify.toml\` and \`public/_redirects\` will handle SPA and Admin Panel routes (\`/#/admin\`) automatically.

## Admin Access
- Navigate to: \`/#/admin\`
- Super Admin Login: \`admin@dremshop.com\` (Password: \`admin123456\`)
- Manager Login: \`manager@dremshop.com\`
`
  );

  // Firestore security rules
  zip.file(
    'firestore.rules',
    `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isSignedIn() {
      return request.auth != null;
    }
    function isAdmin() {
      return isSignedIn() && (
        request.auth.token.role == 'super_admin' ||
        request.auth.token.role == 'manager' ||
        request.auth.token.role == 'editor'
      );
    }

    match /products/{productId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    match /categories/{categoryId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    match /orders/{orderId} {
      allow read: if isSignedIn() || isAdmin();
      allow create: if true;
      allow update, delete: if isAdmin();
    }

    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if true;
      allow update, delete: if isAdmin();
    }

    match /videos/{videoId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    match /users/{userId} {
      allow read, write: if isSignedIn() && (request.auth.uid == userId || isAdmin());
    }

    match /settings/{settingId} {
      allow read: if true;
      allow write: if isAdmin();
    }
  }
}
`
  );

  // HTML Entry
  zip.file(
    'index.html',
    `<!doctype html>
<html lang="bn">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%231E3A8A'><path d='M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z'/></svg>" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Drem Shop — আধুনিক ডিজিটাল ই-বুক মার্কেটপ্লেস</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`
  );

  // Config files
  zip.file(
    'vite.config.ts',
    `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
`
  );

  zip.file(
    'tsconfig.json',
    `{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": false
  },
  "include": ["src"]
}
`
  );

  // Generate the ZIP blob and trigger browser download
  const blob = await zip.generateAsync({ type: 'blob' });
  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = `DremShop_Full_Website_Code_${new Date().toISOString().slice(0, 10)}.zip`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(downloadUrl);
}
