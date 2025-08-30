import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import agencyService from '../services/agencyService';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Divider,
  Stack,
  CircularProgress,
  Avatar,
  IconButton,
  Alert
} from '@mui/material';
import {
  PhotoCamera as PhotoCameraIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

interface StudentAddModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (studentData: any) => void;
}

const StudentAddModal: React.FC<StudentAddModalProps> = ({ open, onClose, onSubmit }) => {
  const { t } = useTranslation();
  const [agencies, setAgencies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState('');
  
  useEffect(() => {
    // 유학원 목록 가져오기 (캐싱 서비스 사용)
    if (open) {
      fetchAgencies();
    }
  }, [open]);
  
  const fetchAgencies = async () => {
    try {
      setLoading(true);
      // 캐싱 서비스를 통해 유학원 데이터 가져오기
      const agencyData = await agencyService.getAgencies();
      setAgencies(agencyData);
    } catch (error) {
      console.error('Failed to fetch agencies:', error);
      setAgencies([]);
    } finally {
      setLoading(false);
    }
  };
  const [formData, setFormData] = useState({
    name: '',
    birth_date: '',
    gender: '',
    phone: '',
    email: '',
    address_vietnam: '',
    address_korea: '',
    parent_name: '',
    parent_phone: '',
    parent_income: '',
    high_school: '',
    gpa: '',
    desired_major: '',
    desired_university: '',
    visa_type: '',
    visa_expiry: '',
    alien_registration: '',
    agency_id: '',
    agency_enrollment_date: ''
  });

  const handlePhotoSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 파일 크기 체크 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setPhotoError(t('student.photoSizeError'));
      return;
    }

    // 파일 타입 체크
    if (!['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(file.type)) {
      setPhotoError(t('student.photoTypeError'));
      return;
    }

    setPhotoError('');
    setPhotoFile(file);

    // 미리보기 생성
    const reader = new FileReader();
    reader.onload = (e) => {
      setPhotoPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    setPhotoError('');
  };

  const handleChange = (field: string) => (event: any) => {
    let value = event.target.value;
    
    // 생년월일 입력 시 자동 포맷팅 (YYYYMMDD -> YYYY-MM-DD)
    if (field === 'birth_date') {
      // 숫자만 추출
      value = value.replace(/\D/g, '');
      
      // 8자리까지만 입력 가능
      if (value.length > 8) {
        value = value.slice(0, 8);
      }
      
      // 자동 하이픈 삽입
      if (value.length >= 4 && value.length <= 6) {
        value = value.slice(0, 4) + '-' + value.slice(4);
      } else if (value.length > 6) {
        value = value.slice(0, 4) + '-' + value.slice(4, 6) + '-' + value.slice(6, 8);
      }
    }
    
    // 유학원 등록 년월 자동 포맷팅 (YYYYMM -> YYYY-MM)
    if (field === 'agency_enrollment_date') {
      // 숫자만 추출
      value = value.replace(/\D/g, '');
      
      // 6자리까지만 입력 가능
      if (value.length > 6) {
        value = value.slice(0, 6);
      }
      
      // 4자리 이상이면 하이픈 자동 삽입
      if (value.length >= 4) {
        value = value.slice(0, 4) + '-' + value.slice(4);
      }
    }
    
    // 비자 만료일 자동 포맷팅 (YYYYMMDD -> YYYY-MM-DD)
    if (field === 'visa_expiry' && !value.includes('-')) {
      // 숫자만 추출
      const numbers = value.replace(/\D/g, '');
      
      if (numbers.length === 8) {
        value = numbers.slice(0, 4) + '-' + numbers.slice(4, 6) + '-' + numbers.slice(6, 8);
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    // 기본 유효성 검사
    if (!formData.name || !formData.birth_date || !formData.phone || !formData.agency_id) {
      alert('이름, 생년월일, 연락처, 소속 유학원은 필수 입력 항목입니다.');
      setSubmitting(false);
      return;
    }
    
    setSubmitting(true);

    // 생년월일 유효성 검사 (이미 하이픈이 포함되어 있음)
    const birthDate = formData.birth_date.replace(/-/g, '');
    
    // 8자리 숫자인지 확인
    if (birthDate.length !== 8) {
      alert('생년월일을 8자리 숫자로 입력해주세요. (예: 20050815)');
      return;
    }
    
    const year = parseInt(birthDate.slice(0, 4));
    const month = parseInt(birthDate.slice(4, 6));
    const day = parseInt(birthDate.slice(6, 8));
    
    // 날짜 유효성 검사
    if (month < 1 || month > 12) {
      alert(t('student.monthError'));
      return;
    }
    
    if (day < 1 || day > 31) {
      alert(t('student.dayError'));
      return;
    }
    
    if (year < 1900 || year > new Date().getFullYear()) {
      alert(t('student.yearError'));
      return;
    }

    try {
      const submitData: any = {
        ...formData,
        name_ko: formData.name, // 백엔드가 기대하는 필드명
        name_vi: formData.name, // 베트남어 이름 (같은 이름 사용)
        // student_code는 백엔드에서 자동 생성됨
      };

      // 사진 파일이 있으면 Base64로 변환하여 추가
      if (photoFile) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          submitData.photo = e.target?.result as string;
          await onSubmit(submitData);
        };
        reader.readAsDataURL(photoFile);
      } else {
        await onSubmit(submitData);
      }
      
      // 폼 초기화
      setFormData({
        name: '',
        birth_date: '',
        gender: '',
        phone: '',
        email: '',
        address_vietnam: '',
        address_korea: '',
        parent_name: '',
        parent_phone: '',
        parent_income: '',
        high_school: '',
        gpa: '',
        desired_major: '',
        desired_university: '',
        visa_type: '',
        visa_expiry: '',
        alien_registration: '',
        agency_id: '',
        agency_enrollment_date: ''
      });
      
      // 사진 관련 상태 초기화
      setPhotoFile(null);
      setPhotoPreview(null);
      setPhotoError('');
      
      onClose();
    } catch (error) {
      console.error('Failed to submit:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    // 폼 초기화
    setFormData({
      name: '',
      birth_date: '',
      gender: '',
      phone: '',
      email: '',
      address_vietnam: '',
      address_korea: '',
      parent_name: '',
      parent_phone: '',
      parent_income: '',
      high_school: '',
      gpa: '',
      desired_major: '',
      desired_university: '',
      visa_type: '',
      visa_expiry: '',
      alien_registration: '',
      agency_id: '',
      agency_enrollment_date: ''
    });
    // 사진 관련 상태 초기화
    setPhotoFile(null);
    setPhotoPreview(null);
    setPhotoError('');
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>{t('student.addStudent')}</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          {/* 사진 업로드 섹션 */}
          <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              src={photoPreview || undefined}
              sx={{ width: 100, height: 100 }}
            />
            <Box>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="photo-upload-button"
                type="file"
                onChange={handlePhotoSelect}
              />
              <label htmlFor="photo-upload-button">
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<PhotoCameraIcon />}
                  size="small"
                >
                  {t('student.selectPhoto')}
                </Button>
              </label>
              {photoPreview && (
                <IconButton
                  size="small"
                  onClick={handleRemovePhoto}
                  sx={{ ml: 1 }}
                >
                  <DeleteIcon />
                </IconButton>
              )}
              {photoError && (
                <Alert severity="error" sx={{ mt: 1 }}>
                  {photoError}
                </Alert>
              )}
            </Box>
          </Box>

          {/* 기본 정보 */}
          <Typography variant="h6" gutterBottom color="primary">
            {t('student.basicInfo')}
          </Typography>
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label={`${t('student.name')} *`}
                value={formData.name}
                onChange={handleChange('name')}
                required
              />
              <TextField
                fullWidth
                label={`${t('student.birthDate')} *`}
                value={formData.birth_date}
                onChange={handleChange('birth_date')}
                placeholder="20050815"
                inputProps={{ maxLength: 10 }}
                helperText={t('student.birthDateHelper')}
                required
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="agency-select-label">{t('student.agency')}</InputLabel>
                <Select
                  labelId="agency-select-label"
                  value={formData.agency_id || ''}
                  label={t('student.agency')}
                  onChange={handleChange('agency_id')}
                  disabled={loading}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 300,
                      },
                    },
                  }}
                >
                  <MenuItem value="">
                    <em>{t('common.notSelected')}</em>
                  </MenuItem>
                  {loading ? (
                    <MenuItem disabled>
                      {t('student.loadingAgencies')}
                    </MenuItem>
                  ) : (
                    agencies.map((agency) => (
                      <MenuItem key={agency.agency_id} value={agency.agency_id}>
                        {agency.agency_name}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label={t('student.agencyEnrollmentDate')}
                value={formData.agency_enrollment_date}
                onChange={handleChange('agency_enrollment_date')}
                placeholder="202501"
                helperText={t('student.enrollmentDateHelper')}
                inputProps={{ maxLength: 7 }}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>{t('student.gender')}</InputLabel>
                <Select
                  value={formData.gender}
                  label={t('student.gender')}
                  onChange={handleChange('gender')}
                >
                  <MenuItem value="male">{t('student.male')}</MenuItem>
                  <MenuItem value="female">{t('student.female')}</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label={`${t('student.phone')} *`}
                value={formData.phone}
                onChange={handleChange('phone')}
                required
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label={t('student.email')}
                type="email"
                value={formData.email}
                onChange={handleChange('email')}
              />
              <TextField
                fullWidth
                label={t('student.addressVietnam')}
                value={formData.address_vietnam}
                onChange={handleChange('address_vietnam')}
              />
            </Box>
            <TextField
              fullWidth
              label={t('student.addressKorea')}
              value={formData.address_korea}
              onChange={handleChange('address_korea')}
            />
          </Stack>

          <Divider sx={{ my: 2 }} />

          {/* 가족 정보 */}
          <Typography variant="h6" gutterBottom color="primary">
            {t('student.familyInfo')}
          </Typography>
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label={t('student.parentName')}
                value={formData.parent_name}
                onChange={handleChange('parent_name')}
              />
              <TextField
                fullWidth
                label={t('student.parentPhone')}
                value={formData.parent_phone}
                onChange={handleChange('parent_phone')}
              />
            </Box>
            <TextField
              fullWidth
              label={t('student.parentIncome')}
              value={formData.parent_income}
              onChange={handleChange('parent_income')}
              placeholder={t('student.incomeExample')}
            />
          </Stack>

          <Divider sx={{ my: 2 }} />

          {/* 학업 정보 */}
          <Typography variant="h6" gutterBottom color="primary">
            {t('student.academicInfo')}
          </Typography>
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label={t('student.highSchool')}
                value={formData.high_school}
                onChange={handleChange('high_school')}
              />
              <TextField
                fullWidth
                label={t('student.gpa')}
                type="number"
                value={formData.gpa}
                onChange={handleChange('gpa')}
                inputProps={{ min: 0, max: 10, step: 0.1 }}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label={t('student.desiredMajor')}
                value={formData.desired_major}
                onChange={handleChange('desired_major')}
              />
              <TextField
                fullWidth
                label={t('student.desiredUniversity')}
                value={formData.desired_university}
                onChange={handleChange('desired_university')}
              />
            </Box>
          </Stack>

          <Divider sx={{ my: 2 }} />

          {/* 비자 정보 */}
          <Typography variant="h6" gutterBottom color="primary">
            {t('student.visaInfo')}
          </Typography>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>{t('student.visaType')}</InputLabel>
                <Select
                  value={formData.visa_type}
                  label={t('student.visaType')}
                  onChange={handleChange('visa_type')}
                >
                  <MenuItem value="D-2">{t('student.visaD2')}</MenuItem>
                  <MenuItem value="D-4-1">{t('student.visaD41')}</MenuItem>
                  <MenuItem value="D-4-7">{t('student.visaD47')}</MenuItem>
                  <MenuItem value="other">{t('student.visaOther')}</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label={t('student.visaExpiry')}
                value={formData.visa_expiry}
                onChange={handleChange('visa_expiry')}
                placeholder="20250131"
                helperText={t('student.visaExpiryHelper')}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <TextField
              fullWidth
              label={t('student.alienRegistration')}
              value={formData.alien_registration}
              onChange={handleChange('alien_registration')}
              placeholder="123456-1234567"
            />
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" disabled={submitting}>
          {t('common.cancel')}
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          color="primary"
          disabled={submitting || loading}
          startIcon={submitting ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {submitting ? t('common.processing') : t('student.addStudent')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudentAddModal;