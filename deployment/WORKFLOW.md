# 개발 및 배포 워크플로우 가이드

## 🔄 올바른 작업 흐름

### 1️⃣ 평소 개발 작업
```bash
# 항상 메인 폴더에서 작업
cd vietnam-student-management

# 여기서 모든 개발/수정 진행
# - 새 기능 추가
# - 버그 수정
# - 코드 개선
```

### 2️⃣ 로컬 테스트
```bash
# 메인 폴더에서 테스트
cd vietnam-student-management/frontend
npm start

# 다른 터미널에서
cd vietnam-student-management/backend
npm start
```

### 3️⃣ 배포 준비 (변경사항이 있을 때만)
```bash
# deploy 폴더로 이동
cd deploy

# 메인에서 변경사항 가져오기
update-from-main.bat

# 로컬에서 배포 버전 테스트
test-local.bat
```

### 4️⃣ 배포
```bash
# Git에 푸시
git add .
git commit -m "Update: 기능 설명"
git push

# Vercel과 Render가 자동으로 재배포
```

## ⚠️ 중요 규칙

### ✅ DO (해야 할 것)
- **개발**: vietnam-student-management 폴더에서만
- **테스트**: 메인 폴더에서 먼저 테스트
- **동기화**: 배포 전 update-from-main.bat 실행
- **커밋**: 배포 폴더는 배포할 때만 커밋

### ❌ DON'T (하지 말아야 할 것)
- deploy 폴더에서 직접 개발하지 마세요
- 두 폴더를 동시에 수정하지 마세요
- package.json 변경 시 수동 확인 필요

## 📦 새 패키지 추가 시

메인 프로젝트에 새 패키지를 추가했다면:

1. **메인 프로젝트에서**:
```bash
cd vietnam-student-management/frontend
npm install 새패키지명
```

2. **deploy 폴더에도 추가**:
```bash
cd deploy/frontend
npm install 새패키지명 --legacy-peer-deps
```

## 🔍 폴더 역할 정리

| 폴더 | 용도 | 작업 빈도 |
|------|------|----------|
| vietnam-student-management | 개발/수정 | 매일 |
| deploy | 배포용 | 배포할 때만 |

## 💡 Pro Tips

1. **브랜치 전략**:
   - main: 배포 버전
   - develop: 개발 버전
   - feature/*: 기능 개발

2. **자동화 도구**:
   - GitHub Actions로 자동 배포 설정 가능
   - 메인 저장소 변경 시 자동으로 deploy 업데이트

3. **환경 변수**:
   - 개발: .env.development
   - 배포: .env.production

## 🚨 문제 해결

### deploy 폴더가 최신이 아닐 때
```bash
cd deploy
update-from-main.bat
```

### 충돌이 발생했을 때
```bash
# 백업이 있으므로 복구 가능
cd deploy/frontend
xcopy src.backup src\ /E /Y /I
```

### 패키지 버전 충돌
- deploy 폴더의 package.json은 Vercel 호환 버전 유지
- 메인 프로젝트는 최신 버전 사용 가능