import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ko' | 'vi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language;
    return saved || 'vi'; // 베트남어를 기본값으로 설정
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// 번역 데이터
const translations: Record<Language, Record<string, string>> = {
  ko: {
    // 섹션 제목
    'section.academicEvaluation': '학업 평가',
    'section.koreanAbilityEvaluation': '한국어 능력 평가',
    'section.lifeAndActivities': '생활 및 활동',
    'section.portfolio': '포트폴리오',
    'section.universityAndMajor': '희망 대학 및 전공',
    'section.attendanceAndParticipation': '출석 및 참여도',
    'section.improvementsAndGoals': '개선사항 및 목표',
    'section.overallOpinion': '종합 의견',
    'section.pdfIncluded': '아래 항목들은 PDF 보고서에 포함됩니다',
    
    // 탭 레이블
    'tab.basicInfo': '기본 정보',
    'tab.academicEvaluation': '학업 평가',
    'tab.koreanEvaluation': '한국어 평가',
    'tab.lifeActivities': '생활 및 활동',
    'tab.evaluationGoals': '평가 및 목표',
    'tab.topikMock': 'TOPIK 모의고사',
    'tab.visaPrep': '비자 준비',
    'tab.overallOpinion': '종합 의견',
    
    // 기본 정보
    'field.selectStudent': '학생 선택',
    'field.consultationDate': '상담 날짜',
    'field.consultationType': '상담 유형',
    'field.counselor': '상담사',
    'field.consultationSummary': '상담 요약',
    'field.consultationSummaryVi': '상담 요약 (베트남어)',
    
    // 상담 유형 옵션
    'type.regular': '정기 상담',
    'type.special': '특별 상담',
    'type.admission': '입학 상담',
    'type.career': '진로 상담',
    'type.academic': '학업 상담',
    'type.life': '생활 상담',
    
    // 학업 평가
    'field.academicAchievement': '학업 성취도 평가',
    'field.strengthAreas': '강점 영역',
    'field.weaknessAreas': '보완 필요 영역',
    'field.learningStrategy': '학습 전략',
    'field.expectedTopikLevel': '예상 토픽 등급',
    
    // 희망 대학 및 전공
    'field.targetUniversity': '희망 대학',
    'field.targetMajor': '희망 전공',
    
    // 출석 및 참여도
    'field.attendanceRate': '출석률 (%)',
    'field.participationGrade': '수업 참여도',
    'field.vocabularyKnown': '알고 있는 단어 수 (1000개 중)',
    
    // 참여도 옵션
    'participation.veryActive': '매우 적극적',
    'participation.active': '적극적',
    'participation.normal': '보통',
    'participation.passive': '소극적',
    'participation.veryPassive': '매우 소극적',
    
    // 한국어 평가
    'field.koreanAbility': '한국어 능력 평가',
    'field.majorReadiness': '전공 학습 준비도',
    
    // 생활 및 활동
    'field.socialRelationship': '교우 관계',
    'field.classAttitude': '수업 태도',
    'field.adaptationLevel': '한국 생활 적응도',
    'field.growthPotential': '성장 가능성',
    'field.clubActivities': '동아리 활동',
    'field.volunteerActivities': '봉사 활동',
    'field.awards': '수상 경력',
    'field.portfolioStatus': '포트폴리오 상태',
    
    // 포트폴리오 상태 옵션
    'portfolio.preparing': '준비 중',
    'portfolio.inProgress': '진행 중',
    'portfolio.completed': '완료',
    
    // 개선사항 및 목표
    'field.improvements': '개선 필요사항',
    'field.nextGoals': '다음 목표',
    'field.studentOpinion': '학생 의견',
    'field.nextConsultationDate': '다음 상담 예정일',
    
    // 종합 의견
    'field.counselorEvaluation': '상담사 종합 평가',
    'field.finalRecommendation': '최종 추천사항',
    
    // 도움말 텍스트
    'helper.consultationSummary': '상담 내용을 간략히 요약해주세요',
    'helper.consultationSummaryVi': '선택사항 - 베트남어 번역',
    'helper.academicAchievement': '학생의 전반적인 학업 성취도를 평가해주세요',
    'helper.targetUniversity': '학생이 희망하는 대학교',
    'helper.targetMajor': '학생이 희망하는 전공',
    'helper.attendanceRate': '학생의 출석률 (0-100%)',
    'helper.vocabularyKnown': '학생이 알고 있는 한국어 단어 개수 (0-1000)',
    'helper.improvements': '학생이 개선해야 할 점을 구체적으로 기록',
    'helper.nextGoals': '다음 상담까지 달성할 목표',
    'helper.studentOpinion': '학생의 생각과 다짐',
    'helper.nextConsultationDate': '날짜를 20250505 형식으로 입력하면 자동으로 2025-05-05로 변환됩니다',
    'helper.counselorEvaluation': '상담사의 종합적인 평가를 작성해주세요',
    'helper.finalRecommendation': '학생과 학부모를 위한 최종 추천사항을 작성해주세요',
    
    // 버튼
    'button.cancel': '취소',
    'button.save': '저장',
    'button.saving': '저장 중...',
    
    // 제목
    'title.newConsultation': '새 상담 기록',
    'title.editConsultation': '상담 기록 수정',
    'title.newStudent': '새 학생 등록',
    'title.editStudent': '학생 정보 수정',
    
    // TOPIK 관련
    'section.topikMockTest': 'TOPIK 모의고사 점수 입력',
    'field.topikTestNumber': '회차',
    'field.topikReading': '읽기 (0-100점)',
    'field.topikListening': '듣기 (0-100점)',
    'field.topikTotal': '총점',
    'helper.topikTestNumber': '0회차는 입력 안함을 의미합니다',
    'topik.level2Achieved': 'TOPIK 2급 달성!',
    'topik.level1': 'TOPIK 1급',
    'topik.notPassed': '미달',
    'topik.level1Requirement': 'TOPIK 1급: 80점 이상',
    'topik.level2Requirement': 'TOPIK 2급: 140점 이상 (목표)',
    
    // 비자 관련
    'visa.consultationRecordNotice': '이 상담 기록은 비자 신청 및 대학 입학 심사에 제출될 수 있습니다.',
    'visa.checklist': '체크리스트',
    'visa.checkTopikAnalysis': 'TOPIK 모의고사 성적 분석 포함',
    'visa.checkAttendance': '출석률 및 학습 태도 언급',
    'visa.checkPreparation': '한국 유학 준비도 평가',
    
    // 상담 기록 페이지
    'page.consultationManagement': '상담 기록 관리',
    'button.newConsultation': '새 상담 기록',
    'placeholder.searchConsultation': '학생 이름, 학생 코드, 상담 내용으로 검색...',
    'text.downloadProgress': '다운로드 진행 중...',
    'table.consultationDate': '상담 날짜',
    'table.studentName': '학생명',
    'table.studentCode': '학생 코드',
    'table.consultationType': '상담 유형',
    'table.counselor': '담당 교사',
    'table.nextConsultation': '다음 상담',
    'table.actions': '작업',
    'text.loading': '로딩 중...',
    'text.noConsultations': '상담 기록이 없습니다. 상담을 추가해주세요.',
    
    // 엑셀 관리 페이지
    'page.excelManagement': '엑셀 관리',
    'label.downloadScope': '다운로드 범위',
    'scope.allStudents': '전체 학생',
    'scope.agencyStudents': '소속 유학원 학생',
    'button.downloadStudentList': '학생 목록 다운로드',
    'button.downloadConsultationRecords': '상담 기록 다운로드',
    'button.downloadTemplate': '템플릿 다운로드',
    'button.uploadStudentInfo': '학생 정보 업로드',
    'error.noTemplatePermission': '템플릿 다운로드 권한이 없습니다.',
    'error.templateDownloadError': '템플릿 다운로드 중 오류가 발생했습니다.',
    
    // 대시보드 페이지
    'dashboard.recentActivity': '최근 활동',
    'dashboard.noRecentActivity': '최근 활동 내역이 없습니다.',
    'dashboard.upcomingSchedule': '다가오는 일정'
  },
  
  vi: {
    // 섹션 제목
    'section.academicEvaluation': 'Đánh giá học tập',
    'section.koreanAbilityEvaluation': 'Đánh giá năng lực tiếng Hàn',
    'section.lifeAndActivities': 'Sinh hoạt và hoạt động',
    'section.portfolio': 'Hồ sơ năng lực',
    'section.universityAndMajor': 'Trường đại học và ngành học mong muốn',
    'section.attendanceAndParticipation': 'Chuyên cần và mức độ tham gia',
    'section.improvementsAndGoals': 'Cải thiện và mục tiêu',
    'section.overallOpinion': 'Ý kiến tổng hợp',
    'section.pdfIncluded': 'Các mục dưới đây sẽ được đưa vào báo cáo PDF',
    
    // 탭 레이블
    'tab.basicInfo': 'Thông tin cơ bản',
    'tab.academicEvaluation': 'Đánh giá học tập',
    'tab.koreanEvaluation': 'Đánh giá tiếng Hàn',
    'tab.lifeActivities': 'Sinh hoạt và hoạt động',
    'tab.evaluationGoals': 'Đánh giá và mục tiêu',
    'tab.topikMock': 'Thi thử TOPIK',
    'tab.visaPrep': 'Chuẩn bị visa',
    'tab.overallOpinion': 'Ý kiến tổng hợp',
    
    // 기본 정보
    'field.selectStudent': 'Chọn học sinh',
    'field.consultationDate': 'Ngày tư vấn',
    'field.consultationType': 'Loại tư vấn',
    'field.counselor': 'Người tư vấn',
    'field.consultationSummary': 'Tóm tắt tư vấn',
    'field.consultationSummaryVi': 'Tóm tắt tư vấn (tiếng Việt)',
    
    // 상담 유형 옵션
    'type.regular': 'Tư vấn định kỳ',
    'type.special': 'Tư vấn đặc biệt',
    'type.admission': 'Tư vấn nhập học',
    'type.career': 'Tư vấn nghề nghiệp',
    'type.academic': 'Tư vấn học tập',
    'type.life': 'Tư vấn sinh hoạt',
    
    // 학업 평가
    'field.academicAchievement': 'Đánh giá thành tích học tập',
    'field.strengthAreas': 'Điểm mạnh',
    'field.weaknessAreas': 'Cần cải thiện',
    'field.learningStrategy': 'Chiến lược học tập',
    'field.expectedTopikLevel': 'Cấp độ TOPIK dự kiến',
    
    // 희망 대학 및 전공
    'field.targetUniversity': 'Trường đại học mong muốn',
    'field.targetMajor': 'Ngành học mong muốn',
    
    // 출석 및 참여도
    'field.attendanceRate': 'Tỷ lệ điểm danh (%)',
    'field.participationGrade': 'Mức độ tham gia lớp học',
    'field.vocabularyKnown': 'Số từ vựng biết (trong 1000 từ)',
    
    // 참여도 옵션
    'participation.veryActive': 'Rất tích cực',
    'participation.active': 'Tích cực',
    'participation.normal': 'Bình thường',
    'participation.passive': 'Thụ động',
    'participation.veryPassive': 'Rất thụ động',
    
    // 한국어 평가
    'field.koreanAbility': 'Đánh giá năng lực tiếng Hàn',
    'field.majorReadiness': 'Mức độ sẵn sàng học chuyên ngành',
    
    // 생활 및 활동
    'field.socialRelationship': 'Quan hệ bạn bè',
    'field.classAttitude': 'Thái độ học tập',
    'field.adaptationLevel': 'Mức độ thích nghi cuộc sống Hàn Quốc',
    'field.growthPotential': 'Tiềm năng phát triển',
    'field.clubActivities': 'Hoạt động câu lạc bộ',
    'field.volunteerActivities': 'Hoạt động tình nguyện',
    'field.awards': 'Giải thưởng',
    'field.portfolioStatus': 'Trạng thái portfolio',
    
    // 포트폴리오 상태 옵션
    'portfolio.preparing': 'Đang chuẩn bị',
    'portfolio.inProgress': 'Đang tiến hành',
    'portfolio.completed': 'Hoàn thành',
    
    // 개선사항 및 목표
    'field.improvements': 'Cần cải thiện',
    'field.nextGoals': 'Mục tiêu tiếp theo',
    'field.studentOpinion': 'Ý kiến học sinh',
    'field.nextConsultationDate': 'Ngày tư vấn tiếp theo',
    
    // 종합 의견
    'field.counselorEvaluation': 'Đánh giá tổng hợp của người tư vấn',
    'field.finalRecommendation': 'Khuyến nghị cuối cùng',
    
    // 도움말 텍스트
    'helper.consultationSummary': 'Hãy tóm tắt ngắn gọn nội dung tư vấn',
    'helper.consultationSummaryVi': 'Tùy chọn - Bản dịch tiếng Việt',
    'helper.academicAchievement': 'Đánh giá thành tích học tập tổng thể của học sinh',
    'helper.targetUniversity': 'Trường đại học mà học sinh mong muốn',
    'helper.targetMajor': 'Ngành học mà học sinh mong muốn',
    'helper.attendanceRate': 'Tỷ lệ điểm danh của học sinh (0-100%)',
    'helper.vocabularyKnown': 'Số lượng từ vựng tiếng Hàn học sinh biết (0-1000)',
    'helper.improvements': 'Ghi cụ thể những điểm học sinh cần cải thiện',
    'helper.nextGoals': 'Mục tiêu cần đạt được đến lần tư vấn tiếp theo',
    'helper.studentOpinion': 'Suy nghĩ và quyết tâm của học sinh',
    'helper.nextConsultationDate': 'Nhập ngày theo định dạng 20250505 sẽ tự động chuyển thành 2025-05-05',
    'helper.counselorEvaluation': 'Viết đánh giá tổng hợp của người tư vấn',
    'helper.finalRecommendation': 'Viết khuyến nghị cuối cùng cho học sinh và phụ huynh',
    
    // 버튼
    'button.cancel': 'Hủy',
    'button.save': 'Lưu',
    'button.saving': 'Đang lưu...',
    
    // 제목
    'title.newConsultation': 'Ghi chép tư vấn mới',
    'title.editConsultation': 'Chỉnh sửa ghi chép tư vấn',
    'title.newStudent': 'Đăng ký học sinh mới',
    'title.editStudent': 'Chỉnh sửa thông tin học sinh',
    
    // TOPIK 관련
    'section.topikMockTest': 'Nhập điểm thi thử TOPIK',
    'field.topikTestNumber': 'Lần thi',
    'field.topikReading': 'Đọc (0-100 điểm)',
    'field.topikListening': 'Nghe (0-100 điểm)',
    'field.topikTotal': 'Tổng điểm',
    'helper.topikTestNumber': 'Lần thi thứ 0 có nghĩa là không nhập',
    'topik.level2Achieved': 'Đạt TOPIK cấp 2!',
    'topik.level1': 'TOPIK cấp 1',
    'topik.notPassed': 'Chưa đạt',
    'topik.level1Requirement': 'TOPIK cấp 1: 80 điểm trở lên',
    'topik.level2Requirement': 'TOPIK cấp 2: 140 điểm trở lên (mục tiêu)',
    
    // Visa 관련
    'visa.consultationRecordNotice': 'Hồ sơ tư vấn này có thể được nộp khi xin visa và xét tuyển đại học.',
    'visa.checklist': 'Danh sách kiểm tra',
    'visa.checkTopikAnalysis': 'Bao gồm phân tích điểm thi thử TOPIK',
    'visa.checkAttendance': 'Đề cập đến tỷ lệ điểm danh và thái độ học tập',
    'visa.checkPreparation': 'Đánh giá mức độ sẵn sàng du học Hàn Quốc',
    
    // Trang quản lý hồ sơ tư vấn
    'page.consultationManagement': 'Quản lý hồ sơ tư vấn',
    'button.newConsultation': 'Hồ sơ tư vấn mới',
    'placeholder.searchConsultation': 'Tìm kiếm theo tên học sinh, mã học sinh, nội dung tư vấn...',
    'text.downloadProgress': 'Đang tải xuống...',
    'table.consultationDate': 'Ngày tư vấn',
    'table.studentName': 'Tên học sinh',
    'table.studentCode': 'Mã học sinh',
    'table.consultationType': 'Loại tư vấn',
    'table.counselor': 'Giáo viên phụ trách',
    'table.nextConsultation': 'Buổi tư vấn tiếp theo',
    'table.actions': 'Thao tác',
    'text.loading': 'Đang tải...',
    'text.noConsultations': 'Không có hồ sơ tư vấn. Vui lòng thêm mới.',
    
    // Trang quản lý Excel
    'page.excelManagement': 'Quản lý Excel',
    'label.downloadScope': 'Phạm vi tải xuống',
    'scope.allStudents': 'Tất cả học sinh',
    'scope.agencyStudents': 'Học sinh của trung tâm',
    'button.downloadStudentList': 'Tải danh sách học sinh',
    'button.downloadConsultationRecords': 'Tải hồ sơ tư vấn',
    'button.downloadTemplate': 'Tải mẫu',
    'button.uploadStudentInfo': 'Tải lên thông tin học sinh',
    'error.noTemplatePermission': 'Không có quyền tải mẫu.',
    'error.templateDownloadError': 'Lỗi khi tải mẫu.',
    
    // Trang bảng điều khiển
    'dashboard.recentActivity': 'Hoạt động gần đây',
    'dashboard.noRecentActivity': 'Không có hoạt động gần đây.',
    'dashboard.upcomingSchedule': 'Lịch sắp tới'
  }
};