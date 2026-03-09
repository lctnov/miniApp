# Sử dụng image Node.js phiên bản 20 (bản alpine - nhẹ, tối ưu dung lượng)
FROM node:20-alpine AS builder

# Thiết lập thư mục làm việc bên trong container là /app
# Mọi lệnh tiếp theo sẽ được chạy trong thư mục này
WORKDIR /app

# Sao chép file package.json và package-lock.json (nếu có) vào container
# Dùng package*.json để copy cả 2 file
COPY package*.json ./

# Cài đặt các dependencies được khai báo trong package.json
RUN npm install

# cài pm2 global để dùng runtime
RUN npm install -g pm2

# Sao chép toàn bộ source code từ máy local vào container
COPY . .

# Mở cổng 1211 để container có thể nhận request từ bên ngoài
EXPOSE 1211

# Lệnh mặc định khi container khởi động
# Chạy file server.js bằng Node.js
CMD ["sh", "-c", "npm run migrate && pm2-runtime ecosystem.config.js"]