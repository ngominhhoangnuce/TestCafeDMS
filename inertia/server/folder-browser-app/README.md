# 📂 Folder Browser App

The **Folder Browser App** is a web-based application that lets users browse folders from a static file server. Users can click on a folder to explore its contents, specifically rendering the `index.html` file inside that folder.  

---

## 📁 Project Structure

```
folder-browser-app
├── public
│   └── index.html           # Main HTML file for the web application
├── src
│   ├── App.tsx              # Root component with routing logic
│   ├── components
│   │   ├── FolderList.tsx   # Displays the list of available folders
│   │   └── FolderViewer.tsx # Renders the selected folder's index.html
│   ├── api
│   │   └── folders.ts       # API calls to fetch data from the static server
│   └── types
│       └── index.ts         # Shared TypeScript interfaces and types
├── package.json              # npm configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project documentation
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd folder-browser-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the app
```bash
npm start
```

### 4. Open in browser
Go to **`http://localhost:3000`** to view the application.  

---

## 🖥️ Usage

- The homepage displays a list of folders fetched from the static file server.  
- Click on a folder to open it.  
- The app automatically loads and displays the **`index.html`** file inside the selected folder.  

---

## 🤝 Contributing

Contributions are welcome!  
- Open an issue for bug reports or feature requests.  
- Submit a pull request with improvements or fixes.  

---

## 📜 License

This project is licensed under the **MIT License**.
