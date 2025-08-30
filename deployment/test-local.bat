@echo off
echo ========================================
echo 로컬 테스트 환경 실행
echo ========================================
echo.

echo Backend 서버 시작 중...
start cmd /k "cd backend && npm start"

timeout /t 5 /nobreak > nul

echo Frontend 서버 시작 중...
start cmd /k "cd frontend && npm start"

echo.
echo ========================================
echo 서버가 시작되었습니다!
echo ========================================
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo 종료하려면 각 cmd 창을 닫으세요.
echo.
pause