# 베트남 학생 관리 시스템 - 배포 가이드

## 📋 사전 준비 사항

1. **GitHub 계정** - 코드 저장소용
2. **Vercel 계정** - Frontend 배포용 (GitHub 계정으로 가입)
3. **Railway 계정** - Backend 배포용 (GitHub 계정으로 가입)

## 🚀 배포 단계

### 1단계: GitHub에 코드 업로드

```bash
# deploy 폴더로 이동
cd deploy

# Git 초기화
git init

# 모든 파일 추가
git add .

# 커밋
git commit -m "Initial commit"

# GitHub에서 새 저장소 생성 후
git remote add origin https://github.com/your-username/vietnam-student-system.git
git branch -M main
git push -u origin main
```

### 2단계: Backend 배포 (Railway)

1. [Railway](https://railway.app) 로그인
2. "New +" → "Web Service" 클릭
3. GitHub 저장소 연결
4. 설정:
   - **Name**: vietnam-student-backend
   - **Root Directory**: backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. 환경 변수 설정 (Environment 탭에서):
   ```
   NODE_ENV=production
   JWT_SECRET=your-secret-key-here
   FRONTEND_URL=https://your-app.vercel.app
   ```
6. "Create Web Service" 클릭

### 3단계: Database 생성 (Railway)

1. Railway 대시보드에서 "New" → "Database" → "PostgreSQL" 클릭
2. 설정:
   - **Name**: vietnam-student-db
   - **Region**: Singapore (아시아)
   - **Plan**: Free
3. "Create Database" 클릭
4. 생성된 데이터베이스 정보를 Backend 환경 변수에 추가

### 4단계: Frontend 배포 (Vercel)

1. [Vercel](https://vercel.com) 로그인
2. "Import Project" 클릭
3. GitHub 저장소 선택
4. 설정:
   - **Root Directory**: frontend
   - **Framework Preset**: Create React App
5. 환경 변수 설정:
   ```
   REACT_APP_API_URL=https://vietnam-student-backend-production.up.railway.app/api
   ```
6. "Deploy" 클릭

## ⚙️ 환경 변수 설정

### Frontend (.env)
```env
REACT_APP_API_URL=https://vietnam-student-backend-production.up.railway.app/api
```

### Backend (.env)
```env
# Database
DB_HOST=your-database-host.railway.app
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=vietnam_student_db

# Server
PORT=5000
NODE_ENV=production

# Security
JWT_SECRET=your-super-secret-jwt-key

# CORS
FRONTEND_URL=https://your-app.vercel.app
```

## 🔧 문제 해결

### TypeScript 버전 충돌
- `.npmrc` 파일이 있는지 확인
- 내용: `legacy-peer-deps=true`

### Build 실패
```bash
# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run build

# Backend
cd backend
rm -rf node_modules package-lock.json
npm install
```

### CORS 오류
- Backend 환경 변수의 `FRONTEND_URL` 확인
- Frontend 환경 변수의 `REACT_APP_API_URL` 확인

## 📱 배포 URL

배포 완료 후:
- Frontend: `https://your-app.vercel.app`
- Backend: `https://vietnam-student-backend-production.up.railway.app`
- API 문서: `https://vietnam-student-backend-production.up.railway.app/api-docs`

## 🔄 업데이트 방법

코드 수정 후:
```bash
git add .
git commit -m "Update: 설명"
git push
```
- Vercel과 Railway가 자동으로 재배포합니다

## 📞 지원

문제가 있으면:
1. 각 서비스의 로그 확인
2. 환경 변수 재확인
3. 의존성 버전 확인