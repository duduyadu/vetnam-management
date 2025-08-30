# 🚀 초보자용 Git 단계별 가이드

## 방법 1: 🟢 가장 쉬운 방법 (자동 스크립트)

### 그냥 이것만 실행하세요!
```
git-fix-simple.bat
```
더블클릭하면 자동으로 모든 작업이 완료됩니다.

---

## 방법 2: 🟡 수동으로 하나씩 실행

### Step 1: 명령 프롬프트 열기
1. Windows 키 + R
2. `cmd` 입력
3. 엔터

### Step 2: deploy 폴더로 이동
```
cd C:\Users\dudu\third1\deploy
```

### Step 3: Git 명령어 실행
각 명령어를 한 줄씩 복사해서 붙여넣고 엔터:

```
git config core.autocrlf input
```
↑ 이거 먼저 실행하고 엔터

```
git add --renormalize .
```
↑ 그 다음 이거 실행하고 엔터

```
git commit -m "Fix: Normalize line endings"
```
↑ 마지막으로 이거 실행

---

## 방법 3: 🔵 Git Bash 사용 (Git 설치했다면)

1. deploy 폴더에서 마우스 우클릭
2. "Git Bash Here" 선택
3. 아래 명령어를 한 번에 복사/붙여넣기:
```bash
git config core.autocrlf input && \
git add --renormalize . && \
git commit -m "Fix: Normalize line endings"
```

---

## 🤔 각 명령어가 하는 일

| 명령어 | 하는 일 | 쉽게 설명하면 |
|--------|---------|--------------|
| `cd deploy` | 폴더 이동 | deploy 폴더로 들어가기 |
| `git config core.autocrlf input` | 설정 변경 | "줄 끝 문자를 자동으로 고쳐줘" |
| `git add --renormalize .` | 파일 수정 | 모든 파일의 줄 끝을 올바르게 수정 |
| `git commit -m "Fix..."` | 저장 | 변경사항을 기록으로 남기기 |
| `git push` | 업로드 | GitHub에 올리기 |

---

## ❓ 자주 묻는 질문

### Q: "git이 내부 또는 외부 명령... 아닙니다" 오류
**A:** Git이 설치되지 않았습니다.
1. https://git-scm.com 에서 Git 다운로드
2. 설치 (기본 설정으로 Next 계속 클릭)
3. 컴퓨터 재시작
4. 다시 시도

### Q: "fatal: not a git repository" 오류
**A:** Git 저장소가 아닙니다.
```
git init
```
이 명령어 먼저 실행하세요.

### Q: "nothing to commit" 메시지
**A:** 이미 수정이 완료되었습니다. 정상입니다!

### Q: GitHub에 어떻게 연결하나요?
**A:** 
1. GitHub.com에서 새 저장소(repository) 생성
2. 생성 후 나오는 명령어 복사/붙여넣기
3. 또는 아래 명령어 사용:
```
git remote add origin https://github.com/당신의아이디/저장소이름.git
git push -u origin main
```

---

## 💡 팁

- **복사/붙여넣기**: 명령 프롬프트에서 Ctrl+V 대신 **마우스 우클릭**
- **Git Bash 추천**: 리눅스 명령어도 사용 가능
- **VSCode 터미널**: VSCode 쓴다면 Ctrl+` 로 터미널 열기

---

## 🆘 그래도 안 되면?

1. **모든 걸 초기화하고 싶다면:**
```
fix-line-endings.bat
```

2. **수동으로 GitHub Desktop 사용:**
- GitHub Desktop 다운로드
- deploy 폴더 추가
- Commit & Push 버튼 클릭

3. **ZIP 파일로 만들어서 수동 업로드:**
- GitHub 웹사이트에서 직접 파일 업로드 가능