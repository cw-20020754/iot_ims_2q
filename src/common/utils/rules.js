const rules = {
  // input invalid className
  checkIsValid: (value, maxLength) => {
    if (value.length > 0 && value.length <= maxLength) {
      return "is-valid";
    } else {
      return "is-invalid";
    }
  },

  // 필수 입력 항목 입니다.
  requireAlert: (value) => {
    if (value) {
      return !!value.toString().trim() || "필수 입력 항목 입니다.";
    }
    return !!value || "필수 입력 항목 입니다.";
  },

  // 50글자 이하로 입력해주세요.
  maxLength: (value, length) => {
    const len = length || 50;
    if (typeof value === "number" || typeof value === "string") {
      return value.length <= len || `${len} ${"글자 이하로 입력해주세요."}`;
    } else if (typeof value === "object") {
      return (
        value.every((v) => v.length <= len) ||
        `${len} ${"글자 이하로 입력해주세요."}`
      );
    } else {
      return false;
    }
  },
};

export default rules;
