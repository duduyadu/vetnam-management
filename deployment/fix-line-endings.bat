@echo off
echo ========================================
echo Line Endings 수정 스크립트
echo ========================================
echo.

echo Git 설정 중...
git config core.autocrlf input
git config core.eol lf

echo.
echo 캐시 초기화 중...
git rm --cached -r .
git reset --hard

echo.
echo 변경사항 다시 추가 중...
git add .

echo.
echo ========================================
echo 완료!
echo ========================================
echo.
echo 이제 다음 명령을 실행하세요:
echo git commit -m "Fix: line endings to LF"
echo git push
echo.
pause