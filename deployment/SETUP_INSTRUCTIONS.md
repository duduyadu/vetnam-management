# 🚀 베트남 학생 관리 시스템 설정 가이드

## 📋 현재 상태 체크리스트

### ✅ 완료된 작업
- [x] 사용자 인증을 이메일에서 사용자명(username)으로 변경
- [x] 백엔드를 Railway에 배포
- [x] 프론트엔드를 Netlify에 배포  
- [x] API URL을 Railway 주소로 통일
- [x] Agencies.tsx 문법 오류 수정
- [x] 데이터베이스 테이블 생성 SQL 스크립트 준비

### ❌ 필요한 작업
- [ ] Supabase에 누락된 테이블 생성
- [ ] Netlify 환경변수 설정
- [ ] 브라우저 캐시 클리어 및 재배포

---

## 1️⃣ Supabase 데이터베이스 테이블 생성 (긴급!)

### 문제
현재 `audit_logs`, `menu_items`, `menu_translations` 등 여러 테이블이 누락되어 500 에러가 발생하고 있습니다.

### 해결 방법

1. **Supabase 대시보드 접속**
   - https://supabase.com 에서 로그인
   - 해당 프로젝트 선택

2. **SQL Editor 열기**
   - 왼쪽 사이드바에서 "SQL Editor" 클릭
   - "New query" 버튼 클릭

3. **SQL 스크립트 실행**
   - `create-all-tables.sql` 파일의 전체 내용을 복사
   - SQL Editor에 붙여넣기
   - "RUN" 버튼 클릭
   
   **중요**: 스크립트가 성공적으로 실행되면 하단에 "Success. No rows returned" 메시지가 표시됩니다.

4. **테이블 생성 확인**
   - 왼쪽 사이드바에서 "Table Editor" 클릭
   - 다음 테이블들이 생성되었는지 확인:
     - audit_logs
     - menu_items
     - menu_translations
     - attribute_definitions
     - student_attributes
     - exam_results
     - learning_progress
     - academic_goals
     - report_templates
     - generated_reports

---

## 2️⃣ Netlify 환경변수 설정

### 현재 문제
프론트엔드가 환경변수를 찾지 못해 하드코딩된 Railway URL을 사용 중입니다.

### 해결 방법

1. **Netlify 대시보드 접속**
   - https://app.netlify.com 로그인
   - 해당 사이트 선택 (vetnam-student 또는 vietnam-student)

2. **환경변수 설정**
   - Site settings → Environment variables 클릭
   - "Add a variable" 버튼 클릭
   - 다음 변수 추가:
     ```
     Key: REACT_APP_API_URL
     Value: https://vietnam-student-backend-production.up.railway.app/api
     ```
   - "Save" 클릭

3. **재배포 트리거**
   - Deploys 탭으로 이동
   - "Trigger deploy" → "Clear cache and deploy site" 클릭
   - 배포 완료까지 2-3분 대기

---

## 3️⃣ 브라우저 캐시 클리어

### Chrome/Edge
1. `Ctrl + Shift + Delete` 키 누르기
2. "캐시된 이미지 및 파일" 체크
3. 시간 범위: "전체 기간"
4. "인터넷 사용 기록 삭제" 클릭

### 또는 시크릿/InPrivate 모드 사용
- Chrome: `Ctrl + Shift + N`
- Edge: `Ctrl + Shift + N`

---

## 4️⃣ 기능 테스트 체크리스트

모든 설정 완료 후 다음 기능들을 테스트하세요:

### 로그인 테스트
1. https://vetnam-student.netlify.app 접속
2. 관리자 계정으로 로그인:
   - 사용자명: admin
   - 비밀번호: Admin123!@#

### CRUD 테스트
- [ ] 유학원 추가/수정/삭제
- [ ] 학생 추가/수정/삭제
- [ ] 상담 기록 추가/수정/삭제
- [ ] 사용자 추가/수정/삭제

### 네트워크 확인
브라우저 개발자 도구(F12) → Network 탭에서:
- 모든 API 요청이 `vietnam-student-backend-production.up.railway.app`로 가는지 확인
- `onrender.com`으로 가는 요청이 없는지 확인

---

## 5️⃣ 문제 해결 가이드

### 여전히 500 에러가 발생하는 경우
1. Railway 로그 확인:
   ```
   Railway 대시보드 → 프로젝트 선택 → Logs 탭
   ```
2. 어떤 테이블이 누락되었는지 확인
3. 해당 테이블만 개별적으로 생성

### 401 Unauthorized 에러
1. 로그아웃 후 다시 로그인
2. localStorage 클리어:
   ```javascript
   localStorage.clear()
   ```
3. 페이지 새로고침

### API URL이 여전히 잘못된 경우
1. 브라우저 콘솔(F12)에서 확인:
   ```javascript
   console.log(process.env.REACT_APP_API_URL)
   ```
2. undefined면 Netlify 환경변수 재설정 필요
3. Netlify 재배포 후 5분 대기

---

## 📞 추가 도움이 필요한 경우

위 단계를 모두 따라했는데도 문제가 해결되지 않으면:

1. **정확한 에러 메시지 캡처**
   - 브라우저 콘솔 에러
   - 네트워크 탭 실패한 요청
   - Railway 로그

2. **현재 상태 확인**
   - Supabase 테이블 목록 스크린샷
   - Netlify 환경변수 설정 스크린샷
   - 브라우저 콘솔 로그

3. **Claude에게 질문**
   ```
   "다음 에러가 발생합니다: [에러 메시지]
   이미 시도한 것: [시도한 내용]
   현재 상태: [스크린샷 또는 설명]
   어떻게 해결할 수 있을까요?"
   ```

---

## ✨ 최종 확인

모든 설정이 완료되면:
- ✅ 로그인이 정상적으로 작동
- ✅ 모든 CRUD 기능이 작동
- ✅ 엑셀 업로드/다운로드 가능
- ✅ PDF 보고서 생성 가능
- ✅ 다국어 전환 가능

축하합니다! 시스템이 정상적으로 작동합니다! 🎉