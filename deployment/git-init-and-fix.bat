@echo off
echo ========================================
echo Git 저장소 생성 및 Line Endings 수정
echo ========================================
echo.

echo [1/5] Git 저장소 초기화 중...
git init
echo Git 저장소를 생성했습니다!
echo.

echo [2/5] 기본 브랜치를 main으로 설정 중...
git branch -M main
echo.

echo [3/5] 줄 끝 문자 설정 중...
git config core.autocrlf input
git config core.eol lf
echo 설정 완료!
echo.

echo [4/5] 모든 파일 추가 중...
git add .
echo 파일 추가 완료!
echo.

echo [5/5] 첫 번째 커밋 생성 중...
git commit -m "Initial commit: Vietnam Student Management System"
echo 커밋 완료!
echo.

echo ========================================
echo 성공적으로 완료되었습니다!
echo ========================================
echo.
echo 다음 단계:
echo.
echo 1. GitHub.com에 로그인
echo 2. "New repository" 버튼 클릭
echo 3. Repository name: vietnam-student-deploy (또는 원하는 이름)
echo 4. "Create repository" 클릭
echo 5. 생성된 페이지에서 아래 명령어 복사해서 실행:
echo.
echo    git remote add origin https://github.com/[당신의아이디]/[저장소이름].git
echo    git push -u origin main
echo.
pause