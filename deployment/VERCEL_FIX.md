# Vercel 배포 오류 해결 방법

## 문제
TypeScript 4.9.5와 react-i18next 15.6.1 버전 충돌

## 해결 방법 (3가지 중 선택)

### 방법 1: Vercel에서 npm 설정 (권장)
Vercel 프로젝트 설정에서:
1. Settings → General
2. Build & Development Settings
3. Install Command를 다음으로 변경:
```
npm install --legacy-peer-deps
```

### 방법 2: package.json 수정
frontend/package.json에서 다음 중 하나 선택:

**옵션 A: TypeScript 업그레이드**
```json
"typescript": "^5.0.0"
```

**옵션 B: react-i18next 다운그레이드**
```json
"react-i18next": "^13.5.0"
```

### 방법 3: .npmrc 파일 확인
frontend/.npmrc 파일이 있는지 확인:
```
legacy-peer-deps=true
```

## Vercel 환경 변수 설정
1. Vercel 대시보드 → Settings → Environment Variables
2. 추가:
   - Name: `REACT_APP_API_URL`
   - Value: `https://your-backend.onrender.com`
   - Environment: Production, Preview, Development

## 빌드 명령어 커스터마이징
Vercel 설정에서 Build Command:
```
CI=false npm run build
```
(경고를 오류로 처리하지 않음)

## 트러블슈팅

### 여전히 오류가 발생한다면:
1. package-lock.json 삭제
2. node_modules 삭제  
3. 로컬에서 테스트:
```bash
npm install --legacy-peer-deps
npm run build
```

### Vercel 로그 확인
- Functions 탭에서 빌드 로그 확인
- 정확한 오류 메시지 파악

## 긴급 해결책
만약 위 방법이 모두 실패하면:
1. React 18로 다운그레이드
2. 모든 MUI 패키지를 v5로 다운그레이드
3. react-router-dom을 v6로 다운그레이드