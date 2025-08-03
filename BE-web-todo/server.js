// 🚀 TODO APP SERVER - HOÀN TOÀN MỚI
// Tác giả: Ngô Minh Hoàng
// Phiên bản: 2.0.0
// Mô tả: Server Express.js tối ưu cho ứng dụng quản lý công việc

console.log('🎯 ===== KHỞI ĐỘNG TODO SERVER V2.0 =====');
console.log('📅 Thời gian:', new Date().toLocaleString('vi-VN'));

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// ===== LOGGING SYSTEM =====
const log = {
  info: (message) => console.log(`ℹ️  ${new Date().toLocaleTimeString('vi-VN')} - ${message}`),
  success: (message) => console.log(`✅ ${new Date().toLocaleTimeString('vi-VN')} - ${message}`),
  error: (message) => console.log(`❌ ${new Date().toLocaleTimeString('vi-VN')} - ${message}`),
  warn: (message) => console.log(`⚠️  ${new Date().toLocaleTimeString('vi-VN')} - ${message}`)
};

// ===== KHỞI TẠO THỦ MỤC DATA =====
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
  log.success('Tạo thư mục data thành công');
}

// Khởi tạo file dữ liệu
const usersFile = path.join(dataDir, 'users.json');
const todosFile = path.join(dataDir, 'todos.json');

if (!fs.existsSync(usersFile)) {
  fs.writeFileSync(usersFile, JSON.stringify([], null, 2));
  log.success('Khởi tạo users.json');
}

if (!fs.existsSync(todosFile)) {
  fs.writeFileSync(todosFile, JSON.stringify([], null, 2));
  log.success('Khởi tạo todos.json');
}

// ===== MIDDLEWARE CONFIGURATION =====
log.info('Cấu hình middleware...');

// Security
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
    },
  },
  crossOriginEmbedderPolicy: false
}));

// CORS
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 200, // 200 requests per IP
  message: {
    error: 'Quá nhiều requests. Vui lòng thử lại sau.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
app.use((req, res, next) => {
  log.info(`${req.method} ${req.path} - IP: ${req.ip}`);
  next();
});

log.success('Middleware đã cấu hình xong');

// ===== STATIC FILES =====
const frontendPath = path.join(__dirname, 'web-to-do', 'build');
log.info(`Frontend path: ${frontendPath}`);

if (fs.existsSync(frontendPath)) {
  app.use(express.static(frontendPath));
  log.success('Serve static files từ React build');
} else {
  log.warn('Thư mục build không tìm thấy');
}

// ===== DATABASE HELPER =====
const db = {
  read: (file) => {
    try {
      const data = fs.readFileSync(file, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      log.error(`Lỗi đọc file ${file}: ${error.message}`);
      return [];
    }
  },
  
  write: (file, data) => {
    try {
      fs.writeFileSync(file, JSON.stringify(data, null, 2));
      return true;
    } catch (error) {
      log.error(`Lỗi ghi file ${file}: ${error.message}`);
      return false;
    }
  },
  
  generateId: () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }
};

// ===== API ROUTES =====

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'TODO Server v2.0 đang hoạt động',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '2.0.0',
    database: {
      users: db.read(usersFile).length,
      todos: db.read(todosFile).length
    }
  });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'Backend API v2.0 hoạt động tốt!',
    data: {
      server: 'Express.js',
      database: 'JSON Files',
      authentication: 'JWT',
      features: ['CRUD Operations', 'Authentication', 'Security', 'Logging'],
      timestamp: new Date().toISOString()
    }
  });
});

// ===== AUTH ROUTES =====
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'todo-app-secret-key-2025';

// Middleware xác thực
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      error: 'Access token required',
      message: 'Vui lòng đăng nhập để truy cập'
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        error: 'Invalid token',
        message: 'Token không hợp lệ hoặc đã hết hạn'
      });
    }
    req.user = user;
    next();
  });
};

// Đăng ký
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password, fullName } = req.body;

    // Validation
    if (!username || !email || !password || !fullName) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Vui lòng điền đầy đủ thông tin'
      });
    }

    const users = db.read(usersFile);

    // Kiểm tra email tồn tại
    if (users.find(u => u.email === email)) {
      return res.status(409).json({
        error: 'Email exists',
        message: 'Email này đã được sử dụng'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Tạo user mới
    const newUser = {
      _id: db.generateId(),
      username,
      email,
      password: hashedPassword,
      fullName,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    users.push(newUser);
    db.write(usersFile, users);

    // Tạo JWT token
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    log.success(`User đăng ký: ${email}`);

    res.status(201).json({
      success: true,
      message: 'Đăng ký thành công',
      data: {
        user: {
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          fullName: newUser.fullName
        },
        token
      }
    });

  } catch (error) {
    log.error(`Lỗi đăng ký: ${error.message}`);
    res.status(500).json({
      error: 'Registration failed',
      message: 'Lỗi hệ thống khi đăng ký'
    });
  }
});

// Đăng nhập
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'Missing credentials',
        message: 'Vui lòng nhập email và mật khẩu'
      });
    }

    const users = db.read(usersFile);
    const user = users.find(u => u.email === email);

    if (!user) {
      return res.status(401).json({
        error: 'Invalid credentials',
        message: 'Email hoặc mật khẩu không đúng'
      });
    }

    // Kiểm tra password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        error: 'Invalid credentials',
        message: 'Email hoặc mật khẩu không đúng'
      });
    }

    // Tạo JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    log.success(`User đăng nhập: ${email}`);

    res.json({
      success: true,
      message: 'Đăng nhập thành công',
      data: {
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          fullName: user.fullName
        },
        token
      }
    });

  } catch (error) {
    log.error(`Lỗi đăng nhập: ${error.message}`);
    res.status(500).json({
      error: 'Login failed',
      message: 'Lỗi hệ thống khi đăng nhập'
    });
  }
});

// Lấy thông tin user hiện tại
app.get('/api/auth/me', authenticateToken, (req, res) => {
  try {
    const users = db.read(usersFile);
    const user = users.find(u => u._id === req.user.userId);

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: 'Không tìm thấy thông tin người dùng'
      });
    }

    res.json({
      success: true,
      data: {
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          fullName: user.fullName
        }
      }
    });

  } catch (error) {
    log.error(`Lỗi lấy thông tin user: ${error.message}`);
    res.status(500).json({
      error: 'Failed to get user info',
      message: 'Lỗi hệ thống'
    });
  }
});

// ===== TODO ROUTES =====

// Lấy danh sách todos
app.get('/api/todos', authenticateToken, (req, res) => {
  try {
    const todos = db.read(todosFile);
    const userTodos = todos.filter(todo => todo.user === req.user.userId);

    // Sắp xếp theo thời gian tạo (mới nhất trước)
    userTodos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({
      success: true,
      data: {
        todos: userTodos,
        total: userTodos.length
      }
    });

  } catch (error) {
    log.error(`Lỗi lấy todos: ${error.message}`);
    res.status(500).json({
      error: 'Failed to get todos',
      message: 'Lỗi hệ thống khi lấy danh sách công việc'
    });
  }
});

// Tạo todo mới
app.post('/api/todos', authenticateToken, (req, res) => {
  try {
    const { title, description, priority, category, dueDate, tags } = req.body;

    if (!title) {
      return res.status(400).json({
        error: 'Title required',
        message: 'Tiêu đề công việc là bắt buộc'
      });
    }

    const todos = db.read(todosFile);

    const newTodo = {
      _id: db.generateId(),
      title,
      description: description || '',
      priority: priority || 'medium',
      category: category || '',
      dueDate: dueDate || new Date().toISOString().split('T')[0],
      tags: tags || [],
      user: req.user.userId,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      completedAt: null
    };

    todos.push(newTodo);
    db.write(todosFile, todos);

    log.success(`Todo tạo mới: ${title} - User: ${req.user.email}`);

    res.status(201).json({
      success: true,
      message: 'Tạo công việc thành công',
      data: {
        todo: newTodo
      }
    });

  } catch (error) {
    log.error(`Lỗi tạo todo: ${error.message}`);
    res.status(500).json({
      error: 'Failed to create todo',
      message: 'Lỗi hệ thống khi tạo công việc'
    });
  }
});

// Cập nhật todo
app.put('/api/todos/:id', authenticateToken, (req, res) => {
  try {
    const todoId = req.params.id;
    const updates = req.body;

    const todos = db.read(todosFile);
    const todoIndex = todos.findIndex(todo => 
      todo._id === todoId && todo.user === req.user.userId
    );

    if (todoIndex === -1) {
      return res.status(404).json({
        error: 'Todo not found',
        message: 'Không tìm thấy công việc'
      });
    }

    // Cập nhật todo
    const updatedTodo = {
      ...todos[todoIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    // Nếu mark completed, thêm completedAt
    if (updates.completed && !todos[todoIndex].completed) {
      updatedTodo.completedAt = new Date().toISOString();
    }

    todos[todoIndex] = updatedTodo;
    db.write(todosFile, todos);

    log.success(`Todo cập nhật: ${updatedTodo.title} - User: ${req.user.email}`);

    res.json({
      success: true,
      message: 'Cập nhật công việc thành công',
      data: {
        todo: updatedTodo
      }
    });

  } catch (error) {
    log.error(`Lỗi cập nhật todo: ${error.message}`);
    res.status(500).json({
      error: 'Failed to update todo',
      message: 'Lỗi hệ thống khi cập nhật công việc'
    });
  }
});

// Xóa todo
app.delete('/api/todos/:id', authenticateToken, (req, res) => {
  try {
    const todoId = req.params.id;

    const todos = db.read(todosFile);
    const todoIndex = todos.findIndex(todo => 
      todo._id === todoId && todo.user === req.user.userId
    );

    if (todoIndex === -1) {
      return res.status(404).json({
        error: 'Todo not found',
        message: 'Không tìm thấy công việc'
      });
    }

    const deletedTodo = todos[todoIndex];
    todos.splice(todoIndex, 1);
    db.write(todosFile, todos);

    log.success(`Todo xóa: ${deletedTodo.title} - User: ${req.user.email}`);

    res.json({
      success: true,
      message: 'Xóa công việc thành công'
    });

  } catch (error) {
    log.error(`Lỗi xóa todo: ${error.message}`);
    res.status(500).json({
      error: 'Failed to delete todo',
      message: 'Lỗi hệ thống khi xóa công việc'
    });
  }
});

// ===== SPA FALLBACK =====
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({
      error: 'API endpoint not found',
      path: req.path,
      availableEndpoints: [
        'GET /api/health',
        'GET /api/test',
        'POST /api/auth/register',
        'POST /api/auth/login',
        'GET /api/auth/me',
        'GET /api/todos',
        'POST /api/todos',
        'PUT /api/todos/:id',
        'DELETE /api/todos/:id'
      ]
    });
  }

  // Serve React app
  const indexPath = path.join(frontendPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).json({
      error: 'Frontend not found',
      message: 'Vui lòng build frontend trước'
    });
  }
});

// ===== ERROR HANDLING =====
app.use((err, req, res, next) => {
  log.error(`Server Error: ${err.message}`);
  res.status(500).json({
    error: 'Internal server error',
    message: 'Lỗi hệ thống nội bộ'
  });
});

// ===== SERVER START =====
const server = app.listen(PORT, () => {
  console.log('\n🎉 ===== TODO SERVER V2.0 STARTED =====');
  console.log(`🚀 Server: http://localhost:${PORT}`);
  console.log(`📱 Frontend: http://localhost:${PORT}`);
  console.log(`🔗 API: http://localhost:${PORT}/api`);
  console.log(`🏥 Health: http://localhost:${PORT}/api/health`);
  console.log(`🧪 Test: http://localhost:${PORT}/api/test`);
  console.log(`💾 Database: JSON Files`);
  console.log(`🔒 Auth: JWT Tokens`);
  console.log(`⏰ Started: ${new Date().toLocaleString('vi-VN')}`);
  console.log('=========================================\n');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  log.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    log.success('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  log.info('SIGINT received, shutting down gracefully');
  server.close(() => {
    log.success('Server closed');
    process.exit(0);
  });
});

module.exports = app;
