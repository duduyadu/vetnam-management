import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Typography,
  Tabs,
  Tab,
  Autocomplete,
  Divider,
  Chip,
  Slider,
  Paper,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import { consultationsAPI, studentsAPI } from '../services/api';
import { extractErrorMessage } from '../utils/errorHandler';
import { useLanguage } from '../contexts/LanguageContext';

interface ConsultationModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  consultation?: any;
  studentId?: number;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`consultation-tabpanel-${index}`}
      aria-labelledby={`consultation-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const ConsultationModal: React.FC<ConsultationModalProps> = ({ 
  open, 
  onClose, 
  onSuccess, 
  consultation, 
  studentId
}) => {
  const { t, language, setLanguage } = useLanguage();
  const initialFormData = {
    student_id: studentId || '',
    consultation_date: new Date().toISOString().split('T')[0],
    consultation_type: '',
    evaluation_category: 'unified',
    counselor: '',
    summary: '',
    improvements: '',
    next_goals: '',
    student_opinion: '',
    counselor_evaluation: '',
    next_consultation_date: '',
    topik_test_number: 0,
    topik_reading: 0,
    topik_listening: 0,
    topik_total: 0,
    // 학업 평가 필드들
    academic_evaluation: '',
    strength_areas: '',
    weakness_areas: '',
    learning_strategy: '',
    expected_topik_level: '',  // 예상 토픽 등급
    // 한국어 평가 필드들
    korean_evaluation: '',
    major_evaluation: '',
    // 생활 및 활동 필드들
    social_relationship: '',
    class_attitude: '',
    adaptation_level: '',
    growth_potential: '',
    club_activities: '',
    volunteer_activities: '',
    awards: '',
    portfolio_status: '준비 중',
    // 희망 대학 및 전공
    target_university: '',
    target_major: '',
    // 종합 의견 필드
    final_recommendation: '',
    summary_vi: '',
    // 출석률 및 참여도
    attendance_rate: '',
    participation_grade: '',
    vocabulary_known: 0  // 숫자로 변경
  };

  const [formData, setFormData] = useState<any>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await studentsAPI.getAll();
        if (response.data.data && Array.isArray(response.data.data)) {
          setStudents(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch students:', error);
      }
    };

    if (open && !consultation && !studentId) {
      fetchStudents();
    }
  }, [open, consultation, studentId]);

  useEffect(() => {
    if (open) {
      if (consultation) {
        const actionItems = consultation.action_items && typeof consultation.action_items === 'object'
          ? consultation.action_items 
          : {};
        
        setFormData({
          ...initialFormData,
          student_id: consultation.student_id,
          consultation_date: consultation.consultation_date?.split('T')[0] || '',
          consultation_type: consultation.consultation_type || '',
          evaluation_category: 'unified',
          counselor: consultation.counselor || '',
          summary: consultation.summary || '',
          summary_vi: consultation.summary_vi || '',
          ...actionItems
        });
      } else if (studentId) {
        setFormData({
          ...initialFormData,
          student_id: studentId,
          evaluation_category: 'unified'
        });
      } else {
        setFormData({
          ...initialFormData,
          evaluation_category: 'unified'
        });
      }
      setTabValue(0);
      setError('');
    }
  }, [open, consultation, studentId]);

  const handleClose = () => {
    setFormData(initialFormData);
    setTabValue(0);
    setError('');
    onClose();
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError('');

      if (!formData.student_id) {
        setError('학생을 선택해주세요.');
        setLoading(false);
        return;
      }

      const actionItems = {
        improvements: formData.improvements || '',
        next_goals: formData.next_goals || '',
        student_opinion: formData.student_opinion || '',
        counselor_evaluation: formData.counselor_evaluation || '',
        next_consultation_date: formData.next_consultation_date || '',
        topik_test_number: formData.topik_test_number || 0,
        topik_reading: formData.topik_reading || 0,
        topik_listening: formData.topik_listening || 0,
        topik_total: formData.topik_total || 0,
        // 학업 평가
        academic_evaluation: formData.academic_evaluation || '',
        strength_areas: formData.strength_areas || '',
        weakness_areas: formData.weakness_areas || '',
        learning_strategy: formData.learning_strategy || '',
        expected_topik_level: formData.expected_topik_level || '',
        // 한국어 평가
        korean_evaluation: formData.korean_evaluation || '',
        major_evaluation: formData.major_evaluation || '',
        // 생활 및 활동
        social_relationship: formData.social_relationship || '',
        class_attitude: formData.class_attitude || '',
        adaptation_level: formData.adaptation_level || '',
        growth_potential: formData.growth_potential || '',
        club_activities: formData.club_activities || '',
        volunteer_activities: formData.volunteer_activities || '',
        awards: formData.awards || '',
        portfolio_status: formData.portfolio_status || '준비 중',
        // 희망 대학 및 전공
        target_university: formData.target_university || '',
        target_major: formData.target_major || '',
        // 출석률 및 참여도
        attendance_rate: formData.attendance_rate || '',
        participation_grade: formData.participation_grade || '',
        vocabulary_known: formData.vocabulary_known || 0,
        // 종합 의견
        final_recommendation: formData.final_recommendation || ''
      };

      const dataToSend = {
        student_id: formData.student_id,
        consultation_date: formData.consultation_date,
        consultation_type: formData.consultation_type || '정기 상담',
        evaluation_category: 'unified',
        counselor: formData.counselor || '',
        summary: formData.summary || '',
        summary_vi: formData.summary_vi || '',
        action_items: JSON.stringify(actionItems)
      };
      
      console.log('📤 Sending consultation data:', {
        ...dataToSend,
        action_items_parsed: actionItems
      });

      if (consultation) {
        await consultationsAPI.update(consultation.consultation_id, dataToSend);
      } else {
        await consultationsAPI.create(dataToSend);
      }

      onSuccess();
      handleClose();
    } catch (err) {
      const errorMsg = extractErrorMessage(err);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            {consultation ? t('title.editConsultation') : t('title.newConsultation')}
          </Typography>
          <ToggleButtonGroup
            value={language}
            exclusive
            onChange={(_, newLang) => newLang && setLanguage(newLang)}
            size="small"
          >
            <ToggleButton value="ko">한국어</ToggleButton>
            <ToggleButton value="vi">Tiếng Việt</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)} variant="scrollable" scrollButtons="auto">
          <Tab label={t('tab.basicInfo')} />
          <Tab label={t('tab.academicEvaluation')} />
          <Tab label={t('tab.koreanEvaluation')} />
          <Tab label={t('tab.lifeActivities')} />
          <Tab label={t('tab.evaluationGoals')} />
          <Tab label={t('tab.topikMock')} />
          <Tab label={t('tab.visaPrep')} />
          <Tab label={t('tab.overallOpinion')} />
        </Tabs>

        {/* 기본 정보 탭 */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {!consultation && (
              <Autocomplete
                options={students}
                getOptionLabel={(option) => 
                  `${option.name || option.student_code} (${option.student_code})`
                }
                value={students.find(s => s.student_id === formData.student_id) || null}
                onChange={(_, newValue) => {
                  setFormData((prev: any) => ({
                    ...prev,
                    student_id: newValue?.student_id || ''
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="학생 선택"
                    required
                    fullWidth
                  />
                )}
                disabled={!!studentId}
              />
            )}

            <TextField
              label={t('field.consultationDate')}
              type="date"
              value={formData.consultation_date}
              onChange={(e) => setFormData({ ...formData, consultation_date: e.target.value })}
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel>{t('field.consultationType')}</InputLabel>
              <Select
                value={formData.consultation_type}
                label={t('field.consultationType')}
                onChange={(e) => setFormData({ ...formData, consultation_type: e.target.value })}
                required
              >
                <MenuItem value="정기 상담">{t('type.regular')}</MenuItem>
                <MenuItem value="특별 상담">{t('type.special')}</MenuItem>
                <MenuItem value="입학 상담">{t('type.admission')}</MenuItem>
                <MenuItem value="진로 상담">{t('type.career')}</MenuItem>
                <MenuItem value="학업 상담">{t('type.academic')}</MenuItem>
                <MenuItem value="생활 상담">{t('type.life')}</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label={t('field.counselor')}
              value={formData.counselor}
              onChange={(e) => setFormData({ ...formData, counselor: e.target.value })}
              fullWidth
              required
            />

            <TextField
              label={t('field.consultationSummary')}
              multiline
              rows={3}
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              fullWidth
              required
              helperText={t('helper.consultationSummary')}
            />

            <TextField
              label={t('field.consultationSummaryVi')}
              multiline
              rows={3}
              value={formData.summary_vi}
              onChange={(e) => setFormData({ ...formData, summary_vi: e.target.value })}
              fullWidth
              helperText={t('helper.consultationSummaryVi')}
            />
          </Box>
        </TabPanel>

        {/* 학업 평가 탭 */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6" gutterBottom>
              {t('section.academicEvaluation')}
            </Typography>
            
            <TextField
              label={t('field.academicAchievement')}
              multiline
              rows={4}
              value={formData.academic_evaluation}
              onChange={(e) => setFormData({ ...formData, academic_evaluation: e.target.value })}
              fullWidth
              helperText={t('helper.academicAchievement')}
            />

            <TextField
              label={t('field.strengthAreas')}
              multiline
              rows={2}
              value={formData.strength_areas}
              onChange={(e) => setFormData({ ...formData, strength_areas: e.target.value })}
              fullWidth
            />

            <TextField
              label={t('field.weaknessAreas')}
              multiline
              rows={2}
              value={formData.weakness_areas}
              onChange={(e) => setFormData({ ...formData, weakness_areas: e.target.value })}
              fullWidth
            />

            <TextField
              label={t('field.learningStrategy')}
              multiline
              rows={3}
              value={formData.learning_strategy}
              onChange={(e) => setFormData({ ...formData, learning_strategy: e.target.value })}
              fullWidth
            />

            <Divider sx={{ my: 2 }} />

            <FormControl fullWidth>
              <InputLabel>{t('field.expectedTopikLevel')}</InputLabel>
              <Select
                value={formData.expected_topik_level}
                label={t('field.expectedTopikLevel')}
                onChange={(e) => setFormData({ ...formData, expected_topik_level: e.target.value })}
              >
                <MenuItem value="">{language === 'ko' ? '선택 안함' : 'Không chọn'}</MenuItem>
                <MenuItem value="1급">{language === 'ko' ? '1급 (80점 이상)' : 'Cấp 1 (từ 80 điểm)'}</MenuItem>
                <MenuItem value="2급">{language === 'ko' ? '2급 (140점 이상)' : 'Cấp 2 (từ 140 điểm)'}</MenuItem>
                <MenuItem value="3급">{language === 'ko' ? '3급 (120점 이상)' : 'Cấp 3 (từ 120 điểm)'}</MenuItem>
                <MenuItem value="4급">{language === 'ko' ? '4급 (150점 이상)' : 'Cấp 4 (từ 150 điểm)'}</MenuItem>
                <MenuItem value="5급">{language === 'ko' ? '5급 (190점 이상)' : 'Cấp 5 (từ 190 điểm)'}</MenuItem>
                <MenuItem value="6급">{language === 'ko' ? '6급 (230점 이상)' : 'Cấp 6 (từ 230 điểm)'}</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </TabPanel>

        {/* 한국어 평가 탭 */}
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6" gutterBottom>
              {t('section.koreanAbilityEvaluation')}
            </Typography>
            
            <TextField
              label={t('field.koreanAbility')}
              multiline
              rows={4}
              value={formData.korean_evaluation}
              onChange={(e) => setFormData({ ...formData, korean_evaluation: e.target.value })}
              fullWidth
              helperText={language === 'ko' ? '학생의 한국어 능력을 종합적으로 평가해주세요' : 'Đánh giá toàn diện năng lực tiếng Hàn của học sinh'}
            />

            <TextField
              label={t('field.majorReadiness')}
              multiline
              rows={3}
              value={formData.major_evaluation}
              onChange={(e) => setFormData({ ...formData, major_evaluation: e.target.value })}
              fullWidth
            />
          </Box>
        </TabPanel>

        {/* 생활 및 활동 탭 */}
        <TabPanel value={tabValue} index={3}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6" gutterBottom>
              {t('section.lifeAndActivities')}
            </Typography>
            
            <TextField
              label={t('field.socialRelationship')}
              multiline
              rows={2}
              value={formData.social_relationship}
              onChange={(e) => setFormData({ ...formData, social_relationship: e.target.value })}
              fullWidth
            />

            <TextField
              label={t('field.classAttitude')}
              multiline
              rows={2}
              value={formData.class_attitude}
              onChange={(e) => setFormData({ ...formData, class_attitude: e.target.value })}
              fullWidth
            />

            <TextField
              label={t('field.adaptationLevel')}
              multiline
              rows={2}
              value={formData.adaptation_level}
              onChange={(e) => setFormData({ ...formData, adaptation_level: e.target.value })}
              fullWidth
            />

            <TextField
              label={t('field.growthPotential')}
              multiline
              rows={2}
              value={formData.growth_potential}
              onChange={(e) => setFormData({ ...formData, growth_potential: e.target.value })}
              fullWidth
            />

            <Divider sx={{ my: 2 }} />
            
            <Typography variant="subtitle1" gutterBottom>
              {t('section.portfolio')}
            </Typography>

            <TextField
              label={t('field.clubActivities')}
              multiline
              rows={2}
              value={formData.club_activities}
              onChange={(e) => setFormData({ ...formData, club_activities: e.target.value })}
              fullWidth
            />

            <TextField
              label={t('field.volunteerActivities')}
              multiline
              rows={2}
              value={formData.volunteer_activities}
              onChange={(e) => setFormData({ ...formData, volunteer_activities: e.target.value })}
              fullWidth
            />

            <TextField
              label={t('field.awards')}
              multiline
              rows={2}
              value={formData.awards}
              onChange={(e) => setFormData({ ...formData, awards: e.target.value })}
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel>{t('field.portfolioStatus')}</InputLabel>
              <Select
                value={formData.portfolio_status}
                label={t('field.portfolioStatus')}
                onChange={(e) => setFormData({ ...formData, portfolio_status: e.target.value })}
              >
                <MenuItem value="준비 중">{t('portfolio.preparing')}</MenuItem>
                <MenuItem value="진행 중">{t('portfolio.inProgress')}</MenuItem>
                <MenuItem value="완료">{t('portfolio.completed')}</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </TabPanel>

        {/* 평가 및 목표 탭 */}
        <TabPanel value={tabValue} index={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="subtitle2" color="primary">
              {t('section.pdfIncluded')}
            </Typography>
            
            <Divider />

            <Typography variant="h6" gutterBottom>
              {t('section.universityAndMajor')}
            </Typography>

            <TextField
              label={t('field.targetUniversity')}
              value={formData.target_university}
              onChange={(e) => setFormData({ ...formData, target_university: e.target.value })}
              fullWidth
              helperText={t('helper.targetUniversity')}
            />

            <TextField
              label={t('field.targetMajor')}
              value={formData.target_major}
              onChange={(e) => setFormData({ ...formData, target_major: e.target.value })}
              fullWidth
              helperText={t('helper.targetMajor')}
            />

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
              {t('section.attendanceAndParticipation')}
            </Typography>

            <TextField
              label={t('field.attendanceRate')}
              type="number"
              value={formData.attendance_rate}
              onChange={(e) => setFormData({ ...formData, attendance_rate: e.target.value })}
              fullWidth
              InputProps={{ inputProps: { min: 0, max: 100 } }}
              helperText={t('helper.attendanceRate')}
            />

            <FormControl fullWidth>
              <InputLabel>{t('field.participationGrade')}</InputLabel>
              <Select
                value={formData.participation_grade}
                label={t('field.participationGrade')}
                onChange={(e) => setFormData({ ...formData, participation_grade: e.target.value })}
              >
                <MenuItem value="매우 적극적">{t('participation.veryActive')}</MenuItem>
                <MenuItem value="적극적">{t('participation.active')}</MenuItem>
                <MenuItem value="보통">{t('participation.normal')}</MenuItem>
                <MenuItem value="소극적">{t('participation.passive')}</MenuItem>
                <MenuItem value="매우 소극적">{t('participation.veryPassive')}</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label={t('field.vocabularyKnown')}
              type="number"
              value={formData.vocabulary_known}
              onChange={(e) => setFormData({ ...formData, vocabulary_known: parseInt(e.target.value) || 0 })}
              fullWidth
              InputProps={{ inputProps: { min: 0, max: 1000 } }}
              helperText={t('helper.vocabularyKnown')}
            />

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
              {t('section.improvementsAndGoals')}
            </Typography>

            <TextField
              label={t('field.improvements')}
              multiline
              rows={3}
              value={formData.improvements}
              onChange={(e) => setFormData({ ...formData, improvements: e.target.value })}
              fullWidth
              helperText={t('helper.improvements')}
            />

            <TextField
              label={t('field.nextGoals')}
              multiline
              rows={3}
              value={formData.next_goals}
              onChange={(e) => setFormData({ ...formData, next_goals: e.target.value })}
              fullWidth
              helperText={t('helper.nextGoals')}
            />

            <TextField
              label={t('field.studentOpinion')}
              multiline
              rows={3}
              value={formData.student_opinion}
              onChange={(e) => setFormData({ ...formData, student_opinion: e.target.value })}
              fullWidth
              helperText={t('helper.studentOpinion')}
            />

            <TextField
              label={t('field.nextConsultationDate')}
              placeholder="예: 20250505 → 2025-05-05"
              value={formData.next_consultation_date}
              onChange={(e) => {
                let value = e.target.value.replace(/[^0-9]/g, '');
                
                // 8자리 숫자가 입력되면 자동으로 날짜 형식으로 변환
                if (value.length === 8) {
                  const year = value.substring(0, 4);
                  const month = value.substring(4, 6);
                  const day = value.substring(6, 8);
                  value = `${year}-${month}-${day}`;
                } else if (value.length > 4 && value.length < 8) {
                  // 부분적으로 입력된 경우 처리
                  const year = value.substring(0, 4);
                  const month = value.substring(4, 6);
                  const day = value.substring(6, 8);
                  
                  if (month) {
                    value = `${year}-${month}`;
                    if (day) {
                      value += `-${day}`;
                    }
                  }
                }
                
                setFormData({ ...formData, next_consultation_date: value });
              }}
              fullWidth
              helperText={t('helper.nextConsultationDate')}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </TabPanel>

        {/* TOPIK 모의고사 탭 */}
        <TabPanel value={tabValue} index={5}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6" gutterBottom>
              {t('section.topikMockTest')}
            </Typography>
            
            <FormControl fullWidth>
              <TextField
                label={t('field.topikTestNumber')}
                type="number"
                value={formData.topik_test_number}
                onChange={(e) => setFormData({ ...formData, topik_test_number: parseInt(e.target.value) || 0 })}
                InputProps={{ inputProps: { min: 0, max: 8 } }}
                helperText={t('helper.topikTestNumber')}
              />
            </FormControl>

            {formData.topik_test_number > 0 && (
              <>
                <Box>
                  <Typography gutterBottom>{t('field.topikReading')}</Typography>
                  <Slider
                    value={formData.topik_reading}
                    onChange={(_, value) => {
                      const newReading = value as number;
                      setFormData({ 
                        ...formData, 
                        topik_reading: newReading,
                        topik_total: newReading + formData.topik_listening
                      });
                    }}
                    max={100}
                    valueLabelDisplay="on"
                    marks={[
                      { value: 0, label: '0' },
                      { value: 50, label: '50' },
                      { value: 100, label: '100' }
                    ]}
                  />
                </Box>

                <Box>
                  <Typography gutterBottom>{t('field.topikListening')}</Typography>
                  <Slider
                    value={formData.topik_listening}
                    onChange={(_, value) => {
                      const newListening = value as number;
                      setFormData({ 
                        ...formData, 
                        topik_listening: newListening,
                        topik_total: formData.topik_reading + newListening
                      });
                    }}
                    max={100}
                    valueLabelDisplay="on"
                    marks={[
                      { value: 0, label: '0' },
                      { value: 50, label: '50' },
                      { value: 100, label: '100' }
                    ]}
                  />
                </Box>

                <Paper sx={{ p: 2, bgcolor: formData.topik_total >= 140 ? 'success.light' : formData.topik_total >= 80 ? 'warning.light' : 'grey.100' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="h6">
                        {t('field.topikTotal')}: {formData.topik_total}/200
                      </Typography>
                      {formData.topik_total >= 140 && (
                        <Chip label={t('topik.level2Achieved')} color="success" />
                      )}
                      {formData.topik_total >= 80 && formData.topik_total < 140 && (
                        <Chip label={t('topik.level1')} color="warning" />
                      )}
                      {formData.topik_total < 80 && formData.topik_total > 0 && (
                        <Chip label={t('topik.notPassed')} color="default" />
                      )}
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        • {t('topik.level1Requirement')}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        • {t('topik.level2Requirement')}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </>
            )}
          </Box>
        </TabPanel>

        {/* 비자 준비 탭 */}
        <TabPanel value={tabValue} index={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Alert severity="info">
              {t('visa.consultationRecordNotice')}
            </Alert>

            <Typography variant="h6">{t('visa.checklist')}</Typography>
            
            <Box sx={{ pl: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                ✓ {t('visa.checkTopikAnalysis')}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                ✓ {t('visa.checkAttendance')}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                ✓ {t('visa.checkPreparation')}
              </Typography>
            </Box>
          </Box>
        </TabPanel>

        {/* 종합 의견 탭 */}
        <TabPanel value={tabValue} index={7}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6" gutterBottom>
              {t('section.overallOpinion')}
            </Typography>
            
            <TextField
              label={t('field.counselorEvaluation')}
              multiline
              rows={4}
              value={formData.counselor_evaluation}
              onChange={(e) => setFormData({ ...formData, counselor_evaluation: e.target.value })}
              fullWidth
              helperText={t('helper.counselorEvaluation')}
            />

            <TextField
              label={t('field.finalRecommendation')}
              multiline
              rows={4}
              value={formData.final_recommendation}
              onChange={(e) => setFormData({ ...formData, final_recommendation: e.target.value })}
              fullWidth
              helperText={t('helper.finalRecommendation')}
            />
          </Box>
        </TabPanel>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          {t('button.cancel')}
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          disabled={loading}
        >
          {loading ? t('button.saving') : t('button.save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConsultationModal;