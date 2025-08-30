# 🔧 Vercel 환경 변수 나중에 수정하는 방법

## 📍 환경 변수 찾아가는 경로

### 방법 1: Vercel 대시보드에서
1. [Vercel](https://vercel.com) 로그인
2. **프로젝트 클릭** (vietnam-student-frontend)
3. 상단 메뉴에서 **"Settings"** 탭 클릭
4. 왼쪽 사이드바에서 **"Environment Variables"** 클릭
5. 여기서 수정!

### 방법 2: 직접 URL로 이동
```
https://vercel.com/[your-username]/[project-name]/settings/environment-variables
```

## 📝 환경 변수 수정 순서

### 1단계: Settings 페이지 이동
```
프로젝트 대시보드
    ↓
Settings 탭 (상단 메뉴)
    ↓
Environment Variables (왼쪽 메뉴)
```

### 2단계: REACT_APP_API_URL 찾기
현재 값: `http://localhost:5000`

### 3단계: 수정하기
1. 해당 변수 오른쪽 **⋮** (점 3개) 클릭
2. **"Edit"** 선택
3. Value를 Backend URL로 변경
   ```
   https://vietnam-backend.onrender.com
   ```
4. **"Save"** 클릭

### 4단계: 재배포
- 자동으로 재배포되거나
- **"Redeploy"** 버튼 클릭

## 🎯 화면 위치 가이드

```
Vercel 대시보드
├── Overview
├── Analytics
├── Speed Insights
├── Settings ← 여기 클릭!
│   ├── General
│   ├── Domains
│   ├── Integrations
│   ├── Environment Variables ← 여기서 수정!
│   ├── Functions
│   └── ...
└── ...
```

## 💡 Pro Tips

### Backend URL 확인 방법
Render 배포 완료 후:
1. Render 대시보드에서 서비스 클릭
2. 상단에 URL 표시됨 (예: `https://vietnam-backend.onrender.com`)
3. 이 URL 복사

### 환경 변수 즉시 적용
1. 환경 변수 수정 후
2. Deployments 탭 이동
3. 최신 배포 옆 **⋮** 클릭
4. **"Redeploy"** 선택
5. **"Use existing Build Cache"** 체크 해제
6. **"Redeploy"** 클릭

## ⚠️ 주의사항

- 환경 변수 변경 후 반드시 재배포 필요
- Production, Preview, Development 모두 체크되어 있는지 확인
- URL 끝에 `/` 붙이지 말 것

## 📱 테스트 방법

환경 변수 업데이트 후:
1. 브라우저 개발자 도구 열기 (F12)
2. Network 탭 확인
3. API 호출이 새 URL로 가는지 확인

## 🆘 못 찾겠다면

### 빠른 해결책:
1. Vercel 대시보드 메인 페이지
2. 프로젝트 카드에서 **"View Project"** 클릭
3. URL 끝에 `/settings/environment-variables` 추가
   ```
   예: https://vercel.com/dudu/vietnam-student/settings/environment-variables
   ```