@echo off
echo ========================================
echo 🔍 onrender.com 수정 검증 스크립트
echo ========================================
echo.

echo [환경 변수 파일 확인]
echo.
echo === .env ===
type .env | findstr /i "API_URL"
echo.
echo === .env.local ===
type .env.local | findstr /i "API_URL"
echo.
echo === .env.production ===
type .env.production | findstr /i "API_URL"
echo.
echo ----------------------------------------
echo.

echo [빌드 파일 검증]
echo.
if exist build\static\js (
    echo 빌드 파일이 존재합니다. 검증 중...
    echo.
    echo === onrender.com 검색 (없어야 함) ===
    findstr /i "onrender" build\static\js\*.js 2>nul
    if %errorlevel% equ 0 (
        echo ❌ 문제: onrender.com이 여전히 존재합니다!
    ) else (
        echo ✅ 성공: onrender.com이 제거되었습니다!
    )
    echo.
    echo === railway.app 검색 (있어야 함) ===
    findstr /i "railway" build\static\js\*.js > nul 2>&1
    if %errorlevel% equ 0 (
        echo ✅ 성공: railway.app이 포함되어 있습니다!
    ) else (
        echo ❌ 문제: railway.app이 없습니다!
    )
) else (
    echo ⚠️ 빌드 파일이 없습니다. 먼저 빌드를 실행해주세요:
    echo    npm run build
)
echo.
echo ----------------------------------------
echo.

echo [권장 조치]
echo.
echo 1. 문제가 발견되면:
echo    - fix-onrender-references.bat 실행
echo.
echo 2. 모든 것이 정상이면:
echo    - git add .
echo    - git commit -m "Fix: Remove all onrender.com references"
echo    - git push
echo.
echo 3. 배포 후 테스트:
echo    - https://vetnam-student.netlify.app (시크릿 모드)
echo    - F12 → Network 탭에서 API 요청 확인
echo.
echo ========================================
pause