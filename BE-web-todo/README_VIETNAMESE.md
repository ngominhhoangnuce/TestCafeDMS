# 📝 Ứng Dụng Quản Lý Công Việc Hàng Ngày - TODO APP

## 📋 Tổng Quan Dự Án

Đây là một ứng dụng web quản lý công việc đầy đủ tính năng, được xây dựng với:
- **Backend**: Node.js + Express.js 
- **Frontend**: React + TypeScript + Ant Design
- **Database**: JSON Files (thay vì MongoDB)
- **Authentication**: JWT + bcrypt

## 🏗️ Cấu Trúc Thư Mục

```
E:\Hicas\BE-web-todo\
├── 📁 data/                       # Dữ liệu lưu trữ
│   ├── users.json                 # File lưu thông tin người dùng
│   └── todos.json                 # File lưu danh sách công việc
├── 📁 web-to-do/                  # Frontend React App
│   ├── 📁 src/
│   │   ├── 📁 components/         # Các component React
│   │   ├── 📁 services/           # API service layer
│   │   └── 📁 types/              # TypeScript interfaces
│   └── 📁 build/                  # Frontend đã build
├── server.js                      # Server chính (tất cả logic trong 1 file)
├── package.json                   # Dependencies
├── .env                          # Environment variables
└── README_VIETNAMESE.md          # Tài liệu tiếng Việt
```

## 🔧 Các File Chính Và Chức Năng

### 📂 Backend Core Files

#### 1. `server.js` - Server Chính Tối Ưu
```javascript
// Server Express.js hoàn chỉnh trong 1 file duy nhất
// Bao gồm tất cả:
// - Middleware configuration (CORS, Security, Rate Limiting)
// - JSON Database operations
// - Authentication với JWT + bcrypt
// - Todo CRUD APIs
// - Static file serving cho React
// - Error handling và logging
// - Graceful shutdown
```

#### 2. `data/` - Cơ Sở Dữ Liệu JSON
```
users.json  - Lưu thông tin người dùng (email, password hash, profile)
todos.json  - Lưu danh sách công việc với user relationship
```

### 📂 Frontend React Files

#### 3. `web-to-do/src/App.tsx` - Component Chính
```typescript
// Quản lý state chính của ứng dụng:
// - Authentication state (user, token, isAuthenticated)
// - Tasks state và CRUD operations
// - UI state (selectedDate, viewMode, filters)
// - API integration cho tất cả operations
```

#### 4. `web-to-do/src/services/api.ts` - API Service Layer
```typescript
// Lớp service kết nối với backend API:
// - Authentication: login, register, getCurrentUser
// - Todo CRUD: getTodos, createTodo, updateTodo, deleteTodo
// - Error handling và token management
```

#### 5. `web-to-do/src/components/` - UI Components
- `Login.tsx` - Form đăng nhập/đăng ký
- `Header.tsx` - Thanh header với user menu
- `Sidebar.tsx` - Thanh bên navigation
- `TaskForm.tsx` - Form tạo/sửa công việc
- `MainContent.tsx` - Hiển thị danh sách công việc

## 🗃️ Cấu Trúc Dữ Liệu

### 📊 User Schema (users.json)
```json
{
  "_id": "auto-generated-id",
  "username": "tên_đăng_nhập",
  "email": "email@example.com", 
  "password": "mật_khẩu_đã_hash_với_bcrypt",
  "fullName": "Họ Và Tên",
  "isActive": true,
  "createdAt": "2025-08-03T10:30:08.036Z",
  "updatedAt": "2025-08-03T10:30:08.037Z"
}
```

### 📋 Todo Schema (todos.json)
```json
{
  "_id": "auto-generated-id",
  "title": "Tiêu đề công việc",
  "description": "Mô tả chi tiết",
  "priority": "low|medium|high",
  "category": "Danh mục",
  "dueDate": "2025-08-03",
  "reminderDate": "2025-08-02T09:00:00Z",
  "tags": ["tag1", "tag2"],
  "user": "user_id_của_người_tạo",
  "completed": false,
  "createdAt": "2025-08-03T10:30:08.036Z",
  "updatedAt": "2025-08-03T10:30:08.037Z",
  "completedAt": null
}
```

## 🔐 Flow Xác Thực (Authentication Flow)

### 1. Đăng Ký User Mới
```
Frontend → POST /api/auth/register → Validation → Hash Password → Save to users.json → Return JWT
```

### 2. Đăng Nhập
```
Frontend → POST /api/auth/login → Find User → Compare Password → Return JWT + User Info
```

### 3. Bảo Vệ API
```
Request → Check Authorization Header → Verify JWT → Add user to req.user → Continue
```

## 📝 Flow Quản Lý Công Việc

### 1. Tạo Công Việc Mới
```
TaskForm → API Service → POST /api/todos → Validation → Add user ID → Save to todos.json
```

### 2. Lấy Danh Sách Công Việc
```
App Load → API Service → GET /api/todos → Filter by user → Return tasks → Update State
```

### 3. Cập Nhật Công Việc
```
Task Edit → API Service → PUT /api/todos/:id → Validation → Update in todos.json
```

### 4. Xóa Công Việc
```
Delete Button → API Service → DELETE /api/todos/:id → Remove from todos.json
```

## 🚀 Cách Chạy Ứng Dụng

### 1. Cài Đặt Dependencies
```bash
# Backend
cd E:\Hicas\BE-web-todo
npm install

# Frontend  
cd web-to-do
npm install
```

### 2. Build Frontend
```bash
cd web-to-do
npm run build
```

### 3. Khởi Động Server
```bash
cd E:\Hicas\BE-web-todo
node server.js
```

### 4. Truy Cập Ứng Dụng
- **Frontend**: http://localhost:3001
- **API**: http://localhost:3001/api

## 📡 API Endpoints

### 🔐 Authentication APIs
```
POST /api/auth/register    # Đăng ký user mới
POST /api/auth/login       # Đăng nhập
GET  /api/auth/me          # Lấy thông tin user hiện tại
```

### 📋 Todo APIs  
```
GET    /api/todos          # Lấy danh sách công việc (có filter/pagination)
POST   /api/todos          # Tạo công việc mới
GET    /api/todos/:id      # Lấy công việc theo ID
PUT    /api/todos/:id      # Cập nhật công việc
DELETE /api/todos/:id      # Xóa công việc
GET    /api/todos/stats    # Thống kê công việc
GET    /api/todos/date/:date # Lấy công việc theo ngày
```

## 🔒 Bảo Mật

### 1. Password Security
- Sử dụng bcrypt để hash password với salt rounds = 12
- Không lưu password plain text

### 2. JWT Token
- Token có thời hạn (có thể config)
- Lưu trong localStorage của browser
- Gửi trong Authorization header

### 3. API Protection
- Tất cả todo APIs cần authentication
- Rate limiting để chống spam
- CORS configuration

## 🎨 UI/UX Features

### 1. Responsive Design
- Antd components responsive
- Mobile-friendly layout
- Collapsible sidebar

### 2. User Experience  
- Loading states
- Error handling
- Success messages
- Form validation

### 3. Theme & Styling
- Ant Design theme
- Custom CSS files
- Consistent color scheme

## 📁 File Dữ Liệu Hiện Tại

### users.json
```json
// Hiện có 2 users:
// 1. username: "hoang" - Ngô Minh Hoàng  
// 2. username: "tranminhquang" - Trần Minh Quang
```

### todos.json
```json
// Hiện tại trống [] - chưa có công việc nào
// Sẽ được populate khi users tạo tasks
```

## 🐛 Debugging & Logging

### 1. Console Logs
- Success operations: ✅ messages
- Error operations: ❌ messages  
- Database operations logging

### 2. Error Handling
- Try-catch blocks trong API calls
- User-friendly error messages
- Fallback states

## 🚀 Triển Khai Production

### 1. Environment Variables
```
NODE_ENV=production
PORT=3001
JWT_SECRET=your-secret-key
FRONTEND_PATH=./web-to-do/build
```

### 2. Security Headers
- Helmet.js cho security headers
- CORS configuration
- Rate limiting

### 3. Static File Serving
- Express static middleware
- SPA fallback routing
- Gzip compression

## 📚 Thư Viện Sử Dụng

### Backend Dependencies
```json
{
  "express": "Web framework",
  "cors": "CORS handling", 
  "helmet": "Security headers",
  "bcryptjs": "Password hashing",
  "jsonwebtoken": "JWT tokens",
  "joi": "Data validation",
  "express-rate-limit": "Rate limiting",
  "moment": "Date handling"
}
```

### Frontend Dependencies  
```json
{
  "react": "UI library",
  "typescript": "Type safety",
  "antd": "UI components",
  "dayjs": "Date handling"
}
```

## 💡 Lưu Ý Quan Trọng

1. **Dữ liệu lưu theo user**: Mỗi user chỉ thấy công việc của mình
2. **JWT Authentication**: Token cần thiết cho mọi API call
3. **JSON Database**: Thay vì MongoDB, dùng file JSON đơn giản
4. **Real-time sync**: Frontend sync với backend qua API calls
5. **Error handling**: Có xử lý lỗi user-friendly
6. **Responsive**: Hoạt động tốt trên mobile và desktop

## 🎯 Tính Năng Chính Đã Implement

✅ Đăng ký/Đăng nhập user  
✅ JWT Authentication  
✅ Tạo/Sửa/Xóa công việc  
✅ Filter và search công việc  
✅ View theo ngày/tháng/năm  
✅ Priority và category  
✅ Responsive UI  
✅ API backend hoàn chỉnh  
✅ JSON file database  

## 📞 Hỗ Trợ

Nếu có vấn đề, kiểm tra:
1. Server có đang chạy trên port 3001?
2. Frontend đã được build?
3. JWT token có hợp lệ?
4. File dữ liệu có quyền write?
5. Console có error messages?

---

**🎉 Ứng dụng đã sẵn sàng sử dụng!**
