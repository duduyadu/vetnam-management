// MUI v5 타입 오버라이드
import '@mui/material/styles';

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    outlined: true;
    elevation: true;
  }
}

declare module '@mui/material/Box' {
  interface BoxProps {
    component?: React.ElementType;
  }
}