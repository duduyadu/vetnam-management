# Line Endings (줄 끝 문자) 해결 가이드

## 🔍 문제 설명
- Windows는 줄 끝에 `CRLF` (Carriage Return + Line Feed) 사용
- Linux/Mac은 줄 끝에 `LF` (Line Feed)만 사용
- Git에서 이 차이로 인한 경고 발생

## ✅ 해결 방법

### 1. 즉시 해결 (권장)
```bash
# deploy 폴더에서
git config core.autocrlf input
git add --renormalize .
git commit -m "Fix: Normalize line endings"
```

### 2. 완전 초기화 (문제가 계속될 때)
```bash
# deploy 폴더에서
fix-line-endings.bat
```

### 3. Git 전역 설정 (한 번만)
```bash
# Windows 사용자
git config --global core.autocrlf true

# Mac/Linux 사용자
git config --global core.autocrlf input
```

## 📁 추가된 파일 설명

### `.gitattributes`
- Git이 파일별로 줄 끝 처리 방식 지정
- `.js`, `.json` 등은 항상 LF 사용
- `.bat` 파일은 Windows용이므로 CRLF 유지

### `.editorconfig`
- 에디터(VSCode, WebStorm 등)가 자동으로 줄 끝 설정
- 새 파일 생성 시 올바른 형식 자동 적용

### `fix-line-endings.bat`
- 기존 파일들의 줄 끝 문자 일괄 수정
- 문제가 지속될 때 사용

## 🎯 효과
- ✅ "LF will be replaced by CRLF" 경고 제거
- ✅ 팀원 간 일관된 코드 형식
- ✅ 배포 시 플랫폼 호환성 보장

## 💡 VSCode 설정 (선택사항)
1. Settings (Ctrl+,)
2. "Files: Eol" 검색
3. `\n` (LF) 선택

또는 settings.json에 추가:
```json
{
  "files.eol": "\n"
}
```

## 🚨 주의사항
- 이미 커밋된 파일은 다음 커밋에서 자동 수정됨
- 팀원 모두가 같은 설정 사용 권장
- `.gitattributes` 파일은 반드시 저장소에 포함