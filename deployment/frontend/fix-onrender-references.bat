@echo off
echo ========================================
echo 🔧 onrender.com 참조 완전 제거 스크립트
echo ========================================
echo.

echo [1/7] 기존 빌드 및 캐시 삭제 중...
rmdir /s /q build 2>nul
rmdir /s /q node_modules\.cache 2>nul
echo ✅ 기존 빌드 삭제 완료
echo.

echo [2/7] 환경 변수 파일 수정 중...
echo # 로컬 개발 환경 설정 (git에 커밋되지 않음)> .env.local
echo PORT=3001>> .env.local
echo REACT_APP_API_URL=https://vietnam-student-backend-production.up.railway.app/api>> .env.local
echo ✅ .env.local 파일 수정 완료
echo.

echo [3/7] .env 파일 확인 중...
echo PORT=3001> .env
echo REACT_APP_API_URL=https://vietnam-student-backend-production.up.railway.app/api>> .env
echo ✅ .env 파일 수정 완료
echo.

echo [4/7] .env.production 파일 확인 중...
echo # Railway 백엔드 URL> .env.production
echo REACT_APP_API_URL=https://vietnam-student-backend-production.up.railway.app/api>> .env.production
echo.>> .env.production
echo # 기타 환경 변수>> .env.production
echo REACT_APP_ENV=production>> .env.production
echo ✅ .env.production 파일 수정 완료
echo.

echo [5/7] 패키지 설치 중...
call npm install --legacy-peer-deps
echo ✅ 패키지 설치 완료
echo.

echo [6/7] 프로젝트 빌드 중...
call npm run build
echo ✅ 빌드 완료
echo.

echo [7/7] 빌드 검증 중...
echo.
echo === onrender.com 검색 중 (없어야 함) ===
findstr /i "onrender" build\static\js\*.js 2>nul
if %errorlevel% equ 0 (
    echo ❌ 경고: onrender.com이 여전히 빌드에 있습니다!
    echo.
    echo 추가 조치 필요:
    echo 1. node_modules 폴더 삭제 후 재설치
    echo 2. 브라우저 캐시 완전 삭제
) else (
    echo ✅ 좋습니다! onrender.com이 제거되었습니다!
)
echo.

echo === railway.app 검색 중 (있어야 함) ===
findstr /i "railway" build\static\js\*.js > nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ 좋습니다! railway.app이 빌드에 포함되었습니다!
) else (
    echo ❌ 경고: railway.app이 빌드에 없습니다!
)
echo.

echo ========================================
echo 🎉 작업 완료!
echo ========================================
echo.
echo 다음 단계:
echo 1. 로컬 테스트: npm start
echo 2. GitHub에 커밋 및 푸시
echo 3. Netlify 자동 배포 확인 (3-5분)
echo 4. 시크릿 모드로 테스트
echo.
echo 배포 URL: https://vetnam-student.netlify.app
echo ========================================
pause