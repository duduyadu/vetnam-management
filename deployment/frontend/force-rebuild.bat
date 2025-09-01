@echo off
echo ========================================
echo 🔥 ULTRATHINK 강제 재빌드 스크립트
echo ========================================
echo.

echo [1/5] 기존 빌드 삭제 중...
rmdir /s /q build 2>nul
rmdir /s /q node_modules\.cache 2>nul
echo ✅ 기존 빌드 삭제 완료
echo.

echo [2/5] 환경변수 설정 중...
echo REACT_APP_API_URL=https://vietnam-student-backend-production.up.railway.app/api > .env
echo ✅ .env 파일 생성 완료
echo.

echo [3/5] 패키지 설치 중...
call npm install --legacy-peer-deps
echo ✅ 패키지 설치 완료
echo.

echo [4/5] 빌드 시작...
call npm run build
echo ✅ 빌드 완료
echo.

echo [5/5] 빌드 확인 중...
echo.
echo === onrender.com 검색 중 (없어야 함) ===
findstr /i "onrender" build\static\js\*.js
if %errorlevel% equ 0 (
    echo ❌ 경고: onrender.com이 여전히 빌드에 있습니다!
) else (
    echo ✅ 좋습니다! onrender.com이 없습니다!
)
echo.

echo === railway.app 검색 중 (있어야 함) ===
findstr /i "railway" build\static\js\*.js > nul
if %errorlevel% equ 0 (
    echo ✅ 좋습니다! railway.app이 빌드에 있습니다!
) else (
    echo ❌ 경고: railway.app이 빌드에 없습니다!
)
echo.

echo ========================================
echo 🎉 빌드 완료!
echo ========================================
echo.
echo 다음 단계:
echo 1. GitHub Desktop에서 커밋
echo    - src/services/api.ts (하드코딩됨)
echo    - force-rebuild.bat (이 파일)
echo.
echo 2. 커밋 메시지: "Force hardcode Railway API URL"
echo.
echo 3. Push 버튼 클릭
echo.
echo 4. Netlify가 자동 배포될 때까지 3-5분 대기
echo.
echo 5. 시크릿 모드로 테스트
echo ========================================
pause