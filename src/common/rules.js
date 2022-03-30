import validator from './validator';

const rules = {
  // 필수 입력 항목 입니다.
  requireAlert: (value) =>
    !value || !value.toString().trim() ? '필수 입력 항목 입니다.' : '',

  // 필수 선택 항목 입니다.
  requireSelectAlert: (value) =>
    value !== undefined && value !== null ? '' : '필수 선택 항목 입니다.',

  // 영어와 숫자만 입력해주세요.
  characterOnlyAlert: (value) =>
    validator.isOnlyEnglishAndNumber(value)
      ? ''
      : '영어와 숫자만 입력해주세요.',

  // 시작 시간이 종료 시간 보다 클 수 없습니다.
  dateRangeAlert: (startDate, endDate) =>
    new Date(startDate) < new Date(endDate)
      ? '시작 시간이 종료 시간 보다 클 수 없습니다.'
      : '',

  // 이메일 형식에 맞게 입력해주세요.
  emailAlert: (value) =>
    validator.isEmailPattern(value) ? '' : '이메일 형식에 맞게 입력해주세요.',

  // IPv4 형식에 맞게 입력해주세요.
  multiIpv4Alert: (value) =>
    value.every((ip) => validator.isIpPattern(ip))
      ? ''
      : 'IPv4 형식에 맞게 입력해주세요.',

  // 5 글자 이상 입력해주세요.
  minLength: (value, length) => {
    const len = length || 5;
    if (typeof value === 'number' || typeof value === 'string') {
      return value.length < len ? `${len} ${'글자 이상 입력해주세요.'}` : '';
    } else if (typeof value === 'object') {
      return value.every((v) => v.trim().length < len)
        ? `${len} ${'글자 이상 입력해주세요.'}`
        : '';
    } else {
      return '';
    }
  },

  // 50글자 이하로 입력해주세요.
  maxLength: (value, length) => {
    const len = length || 50;
    if (typeof value === 'number' || typeof value === 'string') {
      return value.length > len ? `${len} ${'글자 이하로 입력해주세요.'}` : '';
    } else if (typeof value === 'object') {
      return !value.every((v) => v.length > len)
        ? `${len} ${'글자 이하로 입력해주세요.'}`
        : '';
    } else {
      return '';
    }
  },

  // 사용자 계정을 입력해 주세요.
  emptyIdAlert: (value) => !!value || '사용자 계정을 입력해 주세요.',

  // 패스워드를 입력해 주세요.
  emptyPasswordAlert: (value) => !!value || '패스워드를 입력해 주세요.',

  // 숫자만 입력 해 주세요.
  numberAlert: (value) =>
    validator.isOnlyNumber(value) ? '' : '숫자만 입력 해 주세요.',

  // 연락처 형식이 맞지 않습니다.
  mobilePhoneAlert: (value) =>
    validator.isMobilePhonePattern(value) ? '' : '연락처 형식이 맞지 않습니다.',
};

export default rules;
