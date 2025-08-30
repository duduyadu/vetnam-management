@echo off
echo ========================================
echo 베트남 학생 관리 시스템 배포 준비
echo ========================================
echo.

echo [1/5] node_modules 폴더 삭제 중...
cd frontend
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
cd ..

cd backend
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
cd ..

echo.
echo [2/5] Frontend 의존성 설치 중...
cd frontend
call npm install --legacy-peer-deps
cd ..

echo.
echo [3/5] Backend 의존성 설치 중...
cd backend
call npm install
cd ..

echo.
echo [4/5] Frontend 빌드 중...
cd frontend
call npm run build
cd ..

echo.
echo [5/5] 완료!
echo.
echo ========================================
echo 배포 준비 완료!
echo ========================================
echo.
echo 다음 단계:
echo 1. GitHub에 코드 업로드
echo 2. Vercel에서 Frontend 배포
echo 3. Render에서 Backend 배포
echo.
echo 자세한 내용은 README.md를 참고하세요.
echo.
pause