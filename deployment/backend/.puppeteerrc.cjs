/**
 * Puppeteer 설정 파일
 * Render와 같은 제한된 환경에서 Puppeteer가 작동하도록 설정
 */

const { join } = require('path');

module.exports = {
  // Chromium 캐시 디렉토리 설정
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
  
  // Chromium 다운로드 스킵 옵션 (환경변수로 제어)
  skipDownload: false,
  
  // 다운로드 호스트 (더 빠른 미러 사용)
  downloadHost: 'https://storage.googleapis.com',
  
  // 실행 경로 (설치된 Chromium 사용)
  executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined
};