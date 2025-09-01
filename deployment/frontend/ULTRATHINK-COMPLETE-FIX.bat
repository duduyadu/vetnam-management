@echo off
echo ==========================================
echo 🔥 ULTRATHINK 완전 해결 스크립트
echo ==========================================
echo.
echo 이 스크립트는 onrender.com 문제를 완전히 해결합니다.
echo.

echo [단계 1/8] 실행 중인 프로세스 종료
echo 모든 Node.js 프로세스를 종료합니다...
taskkill /F /IM node.exe 2>nul
timeout /t 2 >nul
echo ✅ 프로세스 종료 완료
echo.

echo [단계 2/8] 기존 빌드 및 캐시 완전 삭제
rmdir /s /q build 2>nul
rmdir /s /q node_modules\.cache 2>nul
rmdir /s /q .cache 2>nul
del /q package-lock.json 2>nul
echo ✅ 캐시 삭제 완료
echo.

echo [단계 3/8] 환경 변수 파일 재생성
echo # 개발 환경 설정> .env
echo PORT=3001>> .env
echo REACT_APP_API_URL=https://vietnam-student-backend-production.up.railway.app/api>> .env
echo ✅ .env 파일 생성 완료

echo # 로컬 개발 환경 설정> .env.local
echo PORT=3001>> .env.local
echo REACT_APP_API_URL=https://vietnam-student-backend-production.up.railway.app/api>> .env.local
echo ✅ .env.local 파일 생성 완료

echo # Production 환경 설정> .env.production
echo REACT_APP_API_URL=https://vietnam-student-backend-production.up.railway.app/api>> .env.production
echo REACT_APP_ENV=production>> .env.production
echo ✅ .env.production 파일 생성 완료
echo.

echo [단계 4/8] 환경변수 확인
echo === 현재 환경변수 설정 ===
type .env | findstr API
echo ==============================
echo.

echo [단계 5/8] node_modules 재설치
echo 패키지를 새로 설치합니다 (1-2분 소요)...
call npm install --legacy-peer-deps
echo ✅ 패키지 설치 완료
echo.

echo [단계 6/8] 빌드 실행
echo 프로젝트를 빌드합니다 (2-3분 소요)...
call npm run build
echo ✅ 빌드 완료
echo.

echo [단계 7/8] 빌드 검증
echo.
echo === onrender.com 검색 (없어야 함) ===
findstr /i /r "onrender\.com" build\static\js\*.js 2>nul
if %errorlevel% equ 0 (
    echo ❌ 문제: onrender.com이 여전히 존재합니다!
    echo.
    echo 추가 조치가 필요합니다:
    echo 1. node_modules 폴더 완전 삭제 후 재설치
    echo 2. Windows 재시작 후 다시 시도
) else (
    echo ✅ 성공: onrender.com이 완전히 제거되었습니다!
)
echo.

echo === railway.app 검색 (있어야 함) ===
findstr /i "railway\.app" build\static\js\*.js > nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ 성공: railway.app이 정상적으로 포함되었습니다!
) else (
    echo ⚠️ 경고: railway.app이 없습니다. 환경변수를 확인하세요.
)
echo.

echo [단계 8/8] 개발 서버 시작
echo.
echo ==========================================
echo 🎯 다음 단계
echo ==========================================
echo 1. 브라우저를 완전히 종료하고 다시 열기
echo 2. 시크릿 모드로 접속 (Ctrl+Shift+N)
echo 3. F12 개발자 도구 열기
echo 4. Network 탭에서 "Disable cache" 체크
echo 5. 아래 명령어로 개발 서버 시작:
echo.
echo    npm start
echo.
echo 6. 콘솔에서 다음 메시지 확인:
echo    🚀 API_BASE_URL: https://vietnam-student-backend-production.up.railway.app/api
echo    ✅ Using: Railway backend
echo.
echo ==========================================
echo.
pause