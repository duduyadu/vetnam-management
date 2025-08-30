@echo off
echo ========================================
echo Git Line Endings 자동 수정
echo ========================================
echo.

echo [1/4] Git 초기화 확인 중...
if not exist .git (
    echo Git 저장소가 아닙니다. 먼저 Git을 초기화합니다...
    git init
    echo Git 저장소를 생성했습니다.
    echo.
)

echo [2/4] 줄 끝 문자 설정 중...
git config core.autocrlf input
echo 설정 완료!
echo.

echo [3/4] 파일 정규화 중...
git add --renormalize .
echo 모든 파일의 줄 끝 문자를 수정했습니다.
echo.

echo [4/4] 변경사항 커밋 중...
git commit -m "Fix: Normalize line endings to LF"
echo 커밋 완료!
echo.

echo ========================================
echo 완료되었습니다!
echo ========================================
echo.
echo GitHub에 이미 연결되어 있다면:
echo   git push
echo.
echo GitHub에 아직 연결 안 했다면:
echo   1. GitHub에서 새 저장소 생성
echo   2. git remote add origin [저장소 URL]
echo   3. git push -u origin main
echo.
pause