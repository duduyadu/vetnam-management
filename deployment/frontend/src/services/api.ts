import axios from 'axios';

// 환경변수가 제대로 작동하지 않아서 하드코딩
const API_BASE_URL = 'https://vietnam-student-backend-production.up.railway.app/api';

// 디버깅용: 실제 API URL 확인
console.log('🔥 HARDCODED API_BASE_URL:', API_BASE_URL);
console.log('⚠️ Using Railway backend directly');

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 요청 인터셉터 - 토큰 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 에러 처리
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.config.url, response.status);
    return response;
  },
  (error) => {
    console.error('API Error:', error.config?.url, error.response?.status, error.response?.data);
    
    // 로그인 요청은 401 에러가 정상이므로 리다이렉트하지 않음
    if (error.response?.status === 401 && !error.config?.url?.includes('/auth/login')) {
      // 토큰 만료 또는 인증 실패
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (username: string, password: string) => 
    api.post('/auth/login', { username, password }),
  
  register: (userData: any) => 
    api.post('/auth/register', userData),
  
  refreshToken: (token: string) => 
    api.post('/auth/refresh-token', { token }),
  
  changePassword: (currentPassword: string, newPassword: string) =>
    api.post('/auth/change-password', { current_password: currentPassword, new_password: newPassword })
};

// Students API
export const studentsAPI = {
  getAll: (params?: any) => 
    api.get('/students', { params }),
  
  getById: (id: number) => 
    api.get(`/students/${id}`),
  
  getByCode: (studentCode: string) =>
    api.get(`/students/by-code/${studentCode}`),
  
  create: (data: any) => 
    api.post('/students', data),
  
  update: (id: number, data: any) => 
    api.put(`/students/${id}`, data),
  
  delete: (id: number, config?: any) => 
    api.delete(`/students/${id}`, config)
};

// Menu API
export const menuAPI = {
  getMenuItems: (language: string = 'ko') =>
    api.get('/menu', { params: { language } })
};

// Users API
export const usersAPI = {
  getAll: () => 
    api.get('/users'),
  
  getById: (id: number) => 
    api.get(`/users/${id}`),
  
  update: (id: number, data: any) => 
    api.put(`/users/${id}`, data),
  
  resetPassword: (id: number, newPassword: string) =>
    api.post(`/users/${id}/reset-password`, { new_password: newPassword }),
  
  delete: (id: number) =>
    api.delete(`/users/${id}`)
};

// Consultations API
export const consultationsAPI = {
  getAll: (params?: any) => 
    api.get('/consultations', { params }),
  
  getById: (id: number) => 
    api.get(`/consultations/${id}`),
  
  create: (data: any) => 
    api.post('/consultations', data),
  
  update: (id: number, data: any) => 
    api.put(`/consultations/${id}`, data),
  
  delete: (id: number) => 
    api.delete(`/consultations/${id}`)
};

// Agencies API
export const agenciesAPI = {
  getAll: () => 
    api.get('/agencies'),
  
  create: (data: any) => 
    api.post('/agencies', data),
  
  update: (id: number, data: any) => 
    api.put(`/agencies/${id}`, data),
  
  delete: (id: number) => 
    api.delete(`/agencies/${id}`)
};

// TOPIK API
export const topikAPI = {
  getStudentExams: (studentId: number) => 
    api.get(`/topik/student/${studentId}`),
  
  create: (data: any) => 
    api.post('/topik', data),
  
  update: (examId: number, data: any) => 
    api.put(`/topik/${examId}`, data),
  
  delete: (examId: number) => 
    api.delete(`/topik/${examId}`),
  
  getDashboard: () => 
    api.get('/topik/dashboard')
};

// PDF Reports API
export const pdfAPI = {
  // 상담 보고서 PDF 생성
  generateConsultationReport: (consultationId: number, studentId: number) => {
    const token = localStorage.getItem('token');
    const url = `${API_BASE_URL}/pdf-reports/consultation/${consultationId}/student/${studentId}`;
    
    // 직접 다운로드를 위한 window.open 사용
    window.open(`${url}?token=${token}`, '_blank');
  },
  
  // PDF 미리보기
  previewConsultationReport: (consultationId: number, studentId: number) => {
    const token = localStorage.getItem('token');
    const url = `${API_BASE_URL}/pdf-reports/preview/consultation/${consultationId}/student/${studentId}`;
    window.open(`${url}?token=${token}`, '_blank');
  },
  
  // 공식 보고서 생성 (비자/대학용)
  generateOfficialReport: async (data: {
    studentId: number;
    consultationIds: number[];
    purpose: 'visa' | 'university';
    additionalInfo?: string;
  }) => {
    const response = await api.post('/pdf-reports/official', data, {
      responseType: 'blob'
    });
    
    // Blob을 다운로드 링크로 변환
    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `official_report_${data.studentId}_${Date.now()}.pdf`;
    link.click();
    window.URL.revokeObjectURL(url);
  },
  
  // 보고서 생성 이력 조회
  getReportHistory: (studentId: number) =>
    api.get(`/pdf-reports/history/student/${studentId}`)
};

// Dashboard API
export const dashboardAPI = {
  getStats: () => 
    api.get('/dashboard/stats'),
  
  getRecentActivities: () =>
    api.get('/dashboard/recent-activities'),
  
  getUpcomingConsultations: () =>
    api.get('/dashboard/upcoming-consultations')
};

export default api;