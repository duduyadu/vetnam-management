# 📋 Vercel 프로젝트 설정 값

## 🔧 Configure Project 화면에서 입력할 내용

### 1. Project Name
```
vietnam-student-frontend
```
(또는 원하는 이름)

### 2. Framework Preset
```
Create React App
```
(자동으로 감지되지만 확인)

### 3. Root Directory
```
frontend
```
⚠️ **중요**: `frontend` 폴더를 지정해야 함!

### 4. Build and Output Settings

#### Build Command (⭐ 가장 중요)
```
npm install --legacy-peer-deps && npm run build
```

#### Output Directory
```
build
```

#### Install Command
```
npm install --legacy-peer-deps
```

### 5. Environment Variables (환경 변수)

다음 변수들을 추가:

| Name | Value | 설명 |
|------|-------|------|
| `REACT_APP_API_URL` | `https://your-backend.onrender.com` | Backend URL (Render 배포 후 입력) |
| `CI` | `false` | 빌드 경고를 오류로 처리하지 않음 |
| `NODE_VERSION` | `18` | Node.js 버전 지정 |

## 📝 환경 변수 추가 방법

1. "Environment Variables" 섹션 찾기
2. "Add" 버튼 클릭
3. 각 변수 입력:
   - Name: `REACT_APP_API_URL`
   - Value: 일단 `http://localhost:5000` (나중에 수정)
   - Environment: ✅ Production, ✅ Preview, ✅ Development
4. 반복해서 모든 변수 추가

## 🎯 최종 설정 화면 예시

```
Project Name: vietnam-student-frontend
Framework Preset: Create React App
Root Directory: frontend ← 편집 버튼 클릭해서 변경!

Build & Output Settings:
├── Build Command: npm install --legacy-peer-deps && npm run build
├── Output Directory: build
└── Install Command: npm install --legacy-peer-deps

Environment Variables:
├── REACT_APP_API_URL = http://localhost:5000
├── CI = false
└── NODE_VERSION = 18
```

## ⚠️ 자주 발생하는 오류 해결

### 1. TypeScript 버전 충돌
Build Command를 다음으로 변경:
```
npm install --legacy-peer-deps --force && npm run build
```

### 2. Module not found 오류
Install Command를 다음으로 변경:
```
npm ci --legacy-peer-deps
```

### 3. Build 실패 시
Environment Variables에 추가:
- `NPM_FLAGS` = `--legacy-peer-deps`
- `SKIP_PREFLIGHT_CHECK` = `true`

## 🔄 배포 후 Backend URL 업데이트

Render에서 Backend 배포 완료 후:

1. Vercel Dashboard → Settings
2. Environment Variables
3. `REACT_APP_API_URL` 값을 실제 Backend URL로 변경
   예: `https://vietnam-backend.onrender.com`
4. Redeploy 클릭

## ✅ 체크리스트

배포 전 확인:
- [ ] Root Directory가 `frontend`로 설정됨
- [ ] Build Command에 `--legacy-peer-deps` 포함
- [ ] CI = false 환경 변수 추가
- [ ] REACT_APP_API_URL 환경 변수 추가

## 📱 배포 완료 후 테스트

1. 배포된 URL 접속 (예: `https://vietnam-student.vercel.app`)
2. 콘솔에서 에러 확인 (F12 → Console)
3. API 연결 테스트 (로그인 시도)