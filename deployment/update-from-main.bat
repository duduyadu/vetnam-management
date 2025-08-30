@echo off
echo ========================================
echo 메인 프로젝트에서 변경사항 가져오기
echo ========================================
echo.

echo [1/4] 기존 소스 백업 중...
if exist frontend\src.backup rmdir /s /q frontend\src.backup
if exist backend\routes.backup rmdir /s /q backend\routes.backup
xcopy frontend\src frontend\src.backup\ /E /I /Q >nul 2>&1
xcopy backend\routes backend\routes.backup\ /E /I /Q >nul 2>&1

echo [2/4] Frontend 소스 코드 업데이트 중...
xcopy ..\vietnam-student-management\frontend\src frontend\src\ /E /Y /I /Q
xcopy ..\vietnam-student-management\frontend\public frontend\public\ /E /Y /I /Q
copy ..\vietnam-student-management\frontend\tsconfig.json frontend\ /Y >nul 2>&1

echo [3/4] Backend 소스 코드 업데이트 중...
xcopy ..\vietnam-student-management\backend\routes backend\routes\ /E /Y /I /Q
xcopy ..\vietnam-student-management\backend\services backend\services\ /E /Y /I /Q
xcopy ..\vietnam-student-management\backend\middleware backend\middleware\ /E /Y /I /Q
xcopy ..\vietnam-student-management\backend\config backend\config\ /E /Y /I /Q
xcopy ..\vietnam-student-management\backend\helpers backend\helpers\ /E /Y /I /Q
xcopy ..\vietnam-student-management\backend\utils backend\utils\ /E /Y /I /Q
xcopy ..\vietnam-student-management\backend\templates backend\templates\ /E /Y /I /Q
copy ..\vietnam-student-management\backend\server.js backend\ /Y >nul 2>&1

echo [4/4] 완료!
echo.
echo ========================================
echo 업데이트 완료!
echo ========================================
echo.
echo 주의: package.json은 자동 업데이트하지 않습니다.
echo      새로운 패키지를 추가했다면 수동으로 업데이트하세요.
echo.
echo 다음 단계:
echo 1. git add .
echo 2. git commit -m "Update: 변경 내용"
echo 3. git push
echo.
pause