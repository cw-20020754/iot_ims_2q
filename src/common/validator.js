/* eslint-disable no-useless-escape */
const validator = {
  isSameStraightChar(limitCnt, password) {
    let sameCnt = 0;
    for (let i = 0; i < password.length; i++) {
      if (password.charCodeAt(i) === password.charCodeAt(i + 1)) {
        sameCnt++;
      }
    }

    return sameCnt > 0 && sameCnt >= limitCnt;
  },

  isStraightChar(limitCnt, password) {
    let sameCnt = 0;
    for (let i = 0; i < password.length; i++) {
      if (password.charCodeAt(i) + 1 === password.charCodeAt(i + 1)) {
        sameCnt++;
      }
    }

    return sameCnt > 0 && sameCnt >= limitCnt;
  },

  /**
   * @desc: 영어와 숫자로만 되어 있는지 검증
   * @param: 대상 문자열
   * @return: boolean
   */
  isOnlyEnglishAndNumber(value) {
    const pattern = /^[A-Za-z0-9]*$/;
    return pattern.test(value);
  },

  /**
   * @date: 2019-02-26
   * @author: hipark
   * @desc: 숫자로만 되어 있는지 검증
   * @param: 대상 문자열
   * @return: boolean
   */
  isOnlyNumber(value) {
    const pattern = /^[0-9]*$/;
    return pattern.test(value);
  },

  /**
   * @desc: IP 패턴 일치 검증
   * @param: 대상 문자열
   * @return: boolean
   */
  isIpPattern(value) {
    const pattern =
      /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
    return pattern.test(value);
  },

  /**
   * @desc: IP 패턴(* 포함) 일치 검증
   * @param: 대상 문자열
   * @return: boolean
   */
  isIpAsterixPattern(value) {
    const pattern =
      /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){2}(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[\*])\.)(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[\*])$/;
    return pattern.test(value);
  },

  isIpLastAsterixPattern(value) {
    const pattern =
      /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){2}(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.)(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[\*])$/;
    return pattern.test(value);
  },

  /**
   * @desc: E-Mail 패턴 일치 검증
   * @param: 대상 문자열
   * @return: boolean
   */
  isEmailPattern(value) {
    const pattern = /^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+)$/;
    return pattern.test(value);
  },

  /**
   * @desc: Mobile 패턴 일치 검증
   * @param: 대상 문자열
   * @return: boolean
   */
  isMobilePhonePattern(value) {
    const pattern =
      /^(01[0|1|6-9]|070|02|0[3-9]{1}[0-9]{1})([- ]*)([0-9]{3}|[0-9]{4})([- ]*)([0-9]{4})$/;
    return pattern.test(value);
  },
};

export default validator;
