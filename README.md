# Smart Student ID Card Generator

A professional ReactJS application for generating customizable student identification cards with comprehensive information and modern design.

![Student ID Card Generator](screenshots/preview.png)

## 🚀 Features

- **Multiple Template Options**: Choose between blue and white card designs
- **Dynamic QR Code Generation**: QR codes containing student information for quick scanning
- **Medical Alert / Allergies**: Highlight important medical information with distinctive styling
- **Photo Upload**: Support for student photo uploads with default placeholder
- **Downloadable Cards**: Export cards as high-quality PNG files
- **Data Persistence**: Saved cards stored in PostgreSQL database
- **Responsive Design**: Works on desktop and mobile devices

## 💻 Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, shadcn UI
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **API**: RESTful architecture
- **Build Tools**: Vite, ESBuild
- **Libraries**: 
  - QR Code: qrcode.react
  - Image Processing: html-to-image
  - Form Management: react-hook-form, zod validation
  - Data Fetching: TanStack Query

## 🛠️ Installation & Setup

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/student-id-generator.git
   cd student-id-generator
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Configure environment variables
   Create a `.env` file in the root directory:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/student_cards
   ```

4. Initialize the database
   ```bash
   npm run db:push
   ```

5. Start the development server
   ```bash
   npm run dev
   ```

## 📝 Usage

1. Fill out the student information form
2. Select allergies/medical alerts if applicable
3. Upload a student photo (or use default placeholder)
4. Choose a template design
5. Submit to generate the ID card
6. Download as PNG or save to database
7. View saved cards for later reference

## 🗂️ Project Structure

```
├── client/
│   ├── src/
│   │   ├── assets/           # Static assets
│   │   ├── components/       # React components
│   │   │   ├── ui/           # Generic UI components
│   │   │   ├── BlueTemplate.tsx
│   │   │   ├── WhiteTemplate.tsx
│   │   │   ├── StudentForm.tsx
│   │   │   └── IDCardPreview.tsx
│   │   ├── lib/              # Utility functions
│   │   ├── pages/            # Page components
│   │   ├── types/            # TypeScript type definitions
│   │   ├── App.tsx           # Main application component
│   │   └── main.tsx          # Entry point
├── server/
│   ├── routes.ts             # API routes
│   ├── storage.ts            # Data storage interface
│   ├── db.ts                 # Database connection
│   └── index.ts              # Server entry point
├── shared/
│   └── schema.ts             # Shared data schema
├── uploads/                  # Photo upload storage
├── tailwind.config.ts        # Tailwind configuration
└── tsconfig.json             # TypeScript configuration
```

## 🔧 API Endpoints

- `GET /api/student-cards` - Get all student cards
- `GET /api/student-cards/:rollNumber` - Get specific student card
- `POST /api/student-cards` - Create a new student card
- `DELETE /api/student-cards/:rollNumber` - Delete a student card

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🧪 Testing

Run tests with:
```bash
npm test
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

Developed with ❤️ by [Your Name]