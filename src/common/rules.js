import validator from './validator';

const rules = {
  // 필수 입력 항목 입니다.
  requireAlert: (value) => {
    if (value) {
      return !!value.toString().trim() || '필수 입력 항목 입니다.';
    }

    return !!value || '필수 입력 항목 입니다.';
  },

  // 필수 선택 항목 입니다.
  requireSelectAlert: (value) => {
    return (value !== undefined && value !== null) || '필수 선택 항목 입니다.';
  },

  // 영어와 숫자만 입력해주세요.
  characterOnlyAlert: (value) => {
    return (
      validator.isOnlyEnglishAndNumber(value) || '영어와 숫자만 입력해주세요.'
    );
  },

  // 시작 시간이 종료 시간 보다 클 수 없습니다.
  dateRangeAlert: (startDate, endDate) => {
    return (
      new Date(startDate) < new Date(endDate) ||
      '시작 시간이 종료 시간 보다 클 수 없습니다.'
    );
  },

  // 이메일 형식에 맞게 입력해주세요.
  emailAlert: (value) => {
    return (
      validator.isEmailPattern(value) || '이메일 형식에 맞게 입력해주세요.'
    );
  },

  // 이메일 형식에 맞게 입력해주세요.
  multiEmailAlert: (value) => {
    if (!value) {
      return !value;
    } else {
      return (
        validator.isEmailPattern(value) || '이메일 형식에 맞게 입력해주세요.'
      );
    }
  },

  // 이메일 형식에 맞게 입력해주세요.
  multiEmailAlertAllowEmpty: (value) => {
    if (!value || value.length < 1) {
      return !value || value.length < 1;
    } else {
      return (
        value.every((email) => validator.isEmailPattern(email)) ||
        '이메일 형식에 맞게 입력해주세요.'
      );
    }
  },

  // IPv4 형식에 맞게 입력해주세요.
  multiIpv4Alert: (value) => {
    if (!value || value.length < 1) {
      return !value || value.length < 1;
    } else {
      return (
        value.every((ip) => validator.isIpPattern(ip)) ||
        'IPv4 형식에 맞게 입력해주세요.'
      );
    }
  },

  // 5 글자 이상 입력해주세요.
  minLength: (value, length) => {
    // console.log('minLength value >> ', value);
    const len = length || 5;
    if (typeof value === 'number' || typeof value === 'string') {
      return value.length >= len || `${len} ${'글자 이상 입력해주세요.'}`;
    } else if (typeof value === 'object') {
      return (
        value.every((v) => v.trim().length >= len) ||
        `${len} ${'글자 이상 입력해주세요.'}`
      );
    } else {
      return false;
    }
  },

  // 50글자 이하로 입력해주세요.
  maxLength: (value, length) => {
    const len = length || 50;
    if (typeof value === 'number' || typeof value === 'string') {
      return value.length <= len || `${len} ${'글자 이하로 입력해주세요.'}`;
    } else if (typeof value === 'object') {
      return (
        value.every((v) => v.length <= len) ||
        `${len} ${'글자 이하로 입력해주세요.'}`
      );
    } else {
      return false;
    }
  },

  // 사용자 계정을 입력해 주세요.
  emptyIdAlert: (value) => !!value || '사용자 계정을 입력해 주세요.',

  // 패스워드를 입력해 주세요.
  emptyPasswordAlert: (value) => !!value || '패스워드를 입력해 주세요.',

  // 숫자만 입력 해 주세요.
  numberAlert: (value) => {
    return validator.isOnlyNumber(value) || '숫자만 입력 해 주세요.';
  },

  // 연락처 형식이 맞지 않습니다.
  mobilePhoneAlert: (value) => {
    if (!value) {
      return !value;
    } else {
      return (
        validator.isMobilePhonePattern(value) || '연락처 형식이 맞지 않습니다.'
      );
    }
  },
};

export default rules;
