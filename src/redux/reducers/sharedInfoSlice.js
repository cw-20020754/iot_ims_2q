import { createSlice } from "@reduxjs/toolkit";
import React from "react";
const name = "sharedInfo";

const initialState = {
  messages: [
    {
      msgId: "word.term",
      msg: "기간",
      localeId: "ko",
    },
    {
      msgId: "word.search",
      msg: "검색",
      localeId: "ko",
    },
    {
      msgId: "word.appTitle",
      msg: "통합관제",
      localeId: "ko",
    },
    {
      msgId: "word.dashboard",
      msg: "Dashboard",
      localeId: "ko",
    },
    {
      msgId: "word.stats",
      msg: "통계",
      localeId: "ko",
    },
    {
      msgId: "word.fota",
      msg: "FOTA",
      localeId: "ko",
    },
    {
      msgId: "word.policy",
      msg: "정책",
      localeId: "ko",
    },
    {
      msgId: "word.device",
      msg: "Device",
      localeId: "ko",
    },
    {
      msgId: "word.member",
      msg: "Member",
      localeId: "ko",
    },
    {
      msgId: "word.firmwareManage",
      msg: "펌웨어관리",
      localeId: "ko",
    },
    {
      msgId: "word.originDt",
      msg: "발생일시",
      localeId: "ko",
    },
    {
      msgId: "word.fotaPolicyManage",
      msg: "FOTA 정책관리",
      localeId: "ko",
    },
    {
      msgId: "word.certPolicyManage",
      msg: "인증서 정책관리",
      localeId: "ko",
    },
    {
      msgId: "word.statusSearch",
      msg: "상태 조회",
      localeId: "ko",
    },
    {
      msgId: "word.historySearch",
      msg: "이력 조회",
      localeId: "ko",
    },
    {
      msgId: "word.userAccount",
      msg: "사용자계정",
      localeId: "ko",
    },
    {
      msgId: "word.password",
      msg: "패스워드",
      localeId: "ko",
    },
    {
      msgId: "word.login",
      msg: "로그인",
      localeId: "ko",
    },
    {
      msgId: "word.logout",
      msg: "로그아웃",
      localeId: "ko",
    },
    {
      msgId: "word.init",
      msg: "초기화",
      localeId: "ko",
    },
    {
      msgId: "word.close",
      msg: "닫기",
      localeId: "ko",
    },
    {
      msgId: "word.serialNum",
      msg: "시리얼번호",
      localeId: "ko",
    },
    {
      msgId: "word.refresh",
      msg: "새로고침",
      localeId: "ko",
    },
    {
      msgId: "word.upload",
      msg: "업로드",
      localeId: "ko",
    },
    {
      msgId: "word.download",
      msg: "다운로드",
      localeId: "ko",
    },
    {
      msgId: "word.cert",
      msg: "인증",
      localeId: "ko",
    },
    {
      msgId: "word.query",
      msg: "쿼리",
      localeId: "ko",
    },
    {
      msgId: "word.expired",
      msg: "만료",
      localeId: "ko",
    },
    {
      msgId: "word.save",
      msg: "저장",
      localeId: "ko",
    },
    {
      msgId: "word.cancel",
      msg: "취소",
      localeId: "ko",
    },
    {
      msgId: "word.list",
      msg: "목록",
      localeId: "ko",
    },
    {
      msgId: "word.excel",
      msg: "엑셀",
      localeId: "ko",
    },
    {
      msgId: "word.reg",
      msg: "등록",
      localeId: "ko",
    },
    {
      msgId: "word.add",
      msg: "추가",
      localeId: "ko",
    },
    {
      msgId: "word.modify",
      msg: "수정",
      localeId: "ko",
    },
    {
      msgId: "word.delete",
      msg: "삭제",
      localeId: "ko",
    },
    {
      msgId: "word.name",
      msg: "이름",
      localeId: "ko",
    },
    {
      msgId: "word.type",
      msg: "유형",
      localeId: "ko",
    },
    {
      msgId: "word.desc",
      msg: "설명",
      localeId: "ko",
    },
    {
      msgId: "word.inst",
      msg: "설치",
      localeId: "ko",
    },
    {
      msgId: "word.file",
      msg: "파일",
      localeId: "ko",
    },
    {
      msgId: "word.url",
      msg: "URL",
      localeId: "ko",
    },
    {
      msgId: "word.encrypt",
      msg: "암호화",
      localeId: "ko",
    },
    {
      msgId: "word.origin",
      msg: "원본",
      localeId: "ko",
    },
    {
      msgId: "word.yn",
      msg: "여부",
      localeId: "ko",
    },
    {
      msgId: "word.conn",
      msg: "연결",
      localeId: "ko",
    },
    {
      msgId: "word.use",
      msg: "사용",
      localeId: "ko",
    },
    {
      msgId: "word.regId",
      msg: "등록자 아이디",
      localeId: "ko",
    },
    {
      msgId: "word.regDate",
      msg: "등록일시",
      localeId: "ko",
    },
    {
      msgId: "word.updId",
      msg: "수정자 아이디",
      localeId: "ko",
    },
    {
      msgId: "word.updDate",
      msg: "수정일시",
      localeId: "ko",
    },
    {
      msgId: "word.date",
      msg: "일시",
      localeId: "ko",
    },
    {
      msgId: "word.size",
      msg: "크기",
      localeId: "ko",
    },
    {
      msgId: "word.ver",
      msg: "버전",
      localeId: "ko",
    },
    {
      msgId: "word.devModelCode",
      msg: "기기모델코드",
      localeId: "ko",
    },
    {
      msgId: "word.status",
      msg: "상태",
      localeId: "ko",
    },
    {
      msgId: "word.reservation",
      msg: "예약",
      localeId: "ko",
    },
    {
      msgId: "word.id",
      msg: "아이디",
      localeId: "ko",
    },
    {
      msgId: "word.time",
      msg: "시간",
      localeId: "ko",
    },
    {
      msgId: "word.target",
      msg: "대상",
      localeId: "ko",
    },
    {
      msgId: "word.publish",
      msg: "배포",
      localeId: "ko",
    },
    {
      msgId: "word.mcu",
      msg: "MCU",
      localeId: "ko",
    },
    {
      msgId: "word.wifi",
      msg: "WIFI",
      localeId: "ko",
    },
    {
      msgId: "word.history",
      msg: "이력",
      localeId: "ko",
    },
    {
      msgId: "word.firmware",
      msg: "펌웨어",
      localeId: "ko",
    },
    {
      msgId: "word.hardware",
      msg: "하드웨어",
      localeId: "ko",
    },
    {
      msgId: "word.expected",
      msg: "예정",
      localeId: "ko",
    },
    {
      msgId: "word.factory",
      msg: "공장",
      localeId: "ko",
    },
    {
      msgId: "word.shipment",
      msg: "출하",
      localeId: "ko",
    },
    {
      msgId: "word.manage",
      msg: "관리",
      localeId: "ko",
    },
    {
      msgId: "word.loc",
      msg: "지역",
      localeId: "ko",
    },
    {
      msgId: "word.line",
      msg: "라인",
      localeId: "ko",
    },
    {
      msgId: "word.mac",
      msg: "MAC",
      localeId: "ko",
    },
    {
      msgId: "word.order",
      msg: "주문",
      localeId: "ko",
    },
    {
      msgId: "word.num",
      msg: "번호",
      localeId: "ko",
    },
    {
      msgId: "word.model",
      msg: "모델",
      localeId: "ko",
    },
    {
      msgId: "word.sido",
      msg: "시/도",
      localeId: "ko",
    },
    {
      msgId: "word.gugun",
      msg: "구/군",
      localeId: "ko",
    },
    {
      msgId: "word.server",
      msg: "서버",
      localeId: "ko",
    },
    {
      msgId: "word.ip",
      msg: "IP",
      localeId: "ko",
    },
    {
      msgId: "word.sensor",
      msg: "센서",
      localeId: "ko",
    },
    {
      msgId: "word.error",
      msg: "에러",
      localeId: "ko",
    },
    {
      msgId: "word.control",
      msg: "제어",
      localeId: "ko",
    },
    {
      msgId: "desc.ipNotAllowAlert",
      msg: "접근 가능한 IP가 아닙니다.",
      localeId: "ko",
    },
    {
      msgId: "desc.sessionTimeExpiredAlert",
      msg: "장시간 사용하지 않아 세션이 종료 되었습니다. 재로그인이 필요합니다.",
      localeId: "ko",
    },
    {
      msgId: "desc.loginFailAlert",
      msg: "ID나 패스워드가 잘 못 되었습니다.",
      localeId: "ko",
    },
    {
      msgId: "word.copyright",
      msg: "Copyright Coway Co., Ltd. All Rights reserved.",
      localeId: "ko",
    },
    {
      msgId: "desc.tempError",
      msg: "일시적인 문제가 발생했습니다. 잠시후에 다시 시도해주세요.",
      localeId: "ko",
    },
    {
      msgId: "desc.validation.frmwrName",
      msg: "펌웨어 이름을 입력해주세요. (128자 이내).",
      localeId: "ko",
    },
    {
      msgId: "desc.validation.frmwrDesc",
      msg: "펌웨어 설명을 입력해주세요. (2048자 이내).",
      localeId: "ko",
    },
    {
      msgId: "desc.validation.frmwrVer",
      msg: " 펌웨어 버전을 입력해주세요. (128자 이내).",
      localeId: "ko",
    },
    {
      msgId: "desc.validation.policyName",
      msg: "정어 이름을 입력해주세요. (128자 이내).",
      localeId: "ko",
    },
    {
      msgId: "desc.validation.policyDesc",
      msg: "정책 설명을 입력해주세요. (2048자 이내)",
      localeId: "ko",
    },
    {
      msgId: "desc.validation.targetId",
      msg: "대상 아이디를 입력해주세요. (18자 이내)",
      localeId: "ko",
    },
    {
      msgId: "desc.validation.wifiFrmwrVer",
      msg: "WIFI 펌웨어 버전을 선택해 주세요.",
      localeId: "ko",
    },
    {
      msgId: "desc.validation.mcuFrmwrVer",
      msg: "MCU 펌웨어 버전을 선택해 주세요.",
      localeId: "ko",
    },
    {
      msgId: "desc.registerSuccess",
      msg: "Firmware registration successful!",
      localeId: "ko",
    },
  ],
  codes: [
    {
      // 여부
      category: "yn",
      items: [
        {
          text: "Y",
          value: true,
        },
        {
          text: "N",
          value: false,
        },
      ],
    },
    {
      // frmwrType 정보
      category: "frmwrType",
      items: [
        {
          text: "NONE",
          value: "",
        },
        {
          text: "WIFI",
          value: 1,
        },
        {
          text: "MCU",
          value: 2,
        },
      ],
    },
    {
      // policyStatus 정보
      category: "policyStatus",
      items: [
        {
          text: "NONE",
          value: 0,
        },
        {
          text: "신규",
          value: 1,
        },
        {
          text: "배포대기",
          value: 2,
        },
        {
          text: "배포중",
          value: 3,
        },
        {
          text: "성공",
          value: 4,
        },
        {
          text: "실패",
          value: 5,
        },
      ],
    },
    {
      // fotaShadowStatus 정보
      category: "fotaShadowStatus",
      items: [
        {
          text: "NONE",
          value: 0,
        },
        {
          text: "신규",
          value: 1,
        },
        {
          text: "배포대기",
          value: 2,
        },
        {
          text: "배포중",
          value: 3,
        },
        {
          text: "성공",
          value: 4,
        },
        {
          text: "실패",
          value: 5,
        },
      ],
    },
    {
      // certShadowStatus 정보
      category: "certShadowStatus",
      items: [
        {
          text: "NONE",
          value: 0,
        },
        {
          text: "신규",
          value: 1,
        },
        {
          text: "배포대기",
          value: 2,
        },
        {
          text: "배포중",
          value: 3,
        },
        {
          text: "성공",
          value: 4,
        },
        {
          text: "실패",
          value: 5,
        },
      ],
    },
    {
      // targetType 정보
      category: "targetType",
      items: [
        {
          text: "제품군",
          value: 1,
        },
        {
          text: "단일제품",
          value: 2,
        },
      ],
    },
    {
      // publishType 정보
      category: "publishType",
      items: [
        {
          text: "즉시배포",
          value: 1,
        },
        {
          text: "예약배포",
          value: 2,
        },
      ],
    },
    {
      // applyCertType 정보
      category: "applyCertType",
      items: [
        {
          text: "UNKNOWN",
          value: 0,
        },
        {
          text: "ALL",
          value: 1,
        },
        {
          text: "ROOT CA",
          value: 2,
        },
        {
          text: "MQTT 인증서",
          value: 3,
        },
      ],
    },
    {
      // 기기 모델 코드 정보
      category: "devModelCode",
      items: [
        { text: "NONE", value: "" },
        { text: "히든프로(CHP)[02FER]", value: "02FER" },
        { text: "히든프로(CP)[02FES]", value: "02FES" },
        { text: "히든세로(CHP)[02FE8]", value: "02FE8" },
        { text: "히든세로(CP)[02FE9]", value: "02FE9" },
        { text: "히든빌트인(CHP)[02FDC]", value: "02FDC" },
        { text: "히든빌트인(CP)[02FDD]", value: "02FDD" },
        { text: "아이콘MAX[02FEA]", value: "02FEA" },
        { text: "비데(BAS-38A)[02FEN]", value: "02FEN" },
        { text: "비데(BAS-37A)[02FDJ]", value: "02FDJ" },
        { text: "노블제습기[02FE4]", value: "02FE4" },
        { text: "마블 20(브라운)[02FA0]", value: "02FA0" },
        { text: "마블 20(베이지)[02FCX]", value: "02FCX" },
        { text: "마블 20(그레이)[02FDB]", value: "02FDB" },
        { text: "마블 20(화이트)[02FDK]", value: "02FDK" },
        { text: "마블 15(브라운)[02FBY]", value: "02FBY" },
        { text: "마블 15(베이지)[02FCY]", value: "02FCY" },
        { text: "마블 15(그레이)[02FE7]", value: "02FE7" },
        { text: "마블 15(화이트)[02FE6]", value: "02FE6" },
        { text: "마블 30(브라운)[02FEC]", value: "02FEC" },
        { text: "마블 30(베이지)[02FED]", value: "02FED" },
        { text: "마블 30(그레이)[02FCP]", value: "02FCP" },
        { text: "마블 30(화이트)[02FEE]", value: "02FEE" },
        { text: "LTEMB [LTEMB]", value: "LTEMB" },
        { text: "Airmega250S [02F9R]", value: "02F9R" },
        { text: "한뼘 CHP(BG) [02F9K]", value: "02F9K" },
        { text: "한뼘 CP(BG) [02F9L]", value: "02F9L" },
        { text: "한뼘 CHP(WT) [02FAI]", value: "02FAI" },
        { text: "한뼘 CP(WT) [02FAJ]", value: "02FAJ" },
        { text: "한뼘 CHP(SL) [02FB9]", value: "02FB9" },
        { text: "한뼘 CP(SL) [02FBA]", value: "02FBA" },
        { text: "한뼘 CHP(NV) [02FAG]", value: "02FAG" },
        { text: "한뼘 CP(NV) [02FAH]", value: "02FAH" },
        { text: "한뼘 CHP(BU) [02FBB]", value: "02FBB" },
        { text: "한뼘 CP(BU) [02FBC]", value: "02FBC" },
        { text: "한뼘 CHP(GN) [02FDY]", value: "02FDY" },
        { text: "한뼘 CP(GN) [02FDZ]", value: "02FDZ" },
        { text: "한뼘 CHP(PK) [02FE0]", value: "02FE0" },
        { text: "한뼘 CP(PK) [02FE1]", value: "02FE1" },
        { text: "아쿠아메가 200C(W) [02F3E]", value: "02F3E" },
        { text: "MQTT 테스트용 청정기 [2MQTT]", value: "2MQTT" },
        { text: "MQTT 테스트용 [3MQTT]", value: "3MQTT" },
        { text: "킹덤 청정기 [02F4H]", value: "02F4H" },
        { text: "에어메가 400S 일본향 [02F4W]", value: "02F4W" },
        { text: "에어메가 300S 유럽향 [02F4M]", value: "02F4M" },
        { text: "에어메가 300S 일본향 [02F4L]", value: "02F4L" },
        { text: "에어메가 300S 대만향 [02F4N]", value: "02F4N" },
        { text: "NFC 제품군 [02NFC]", value: "02NFC" },
        { text: "Connected Mighty [02F5O]", value: "02F5O" },
        { text: "안테나 공기진단기 [2FVRM]", value: "2FVRM" },
        { text: "블루문 청정기 [02ES8]", value: "02ES8" },
        { text: "플랫폼 DRS 청정기 [02F5Y]", value: "02F5Y" },
        { text: "캡틴 로즈(스페셜 에디션) [02ER0]", value: "02ER0" },
        { text: "캡틴 실버 청정기 [02ETJ]", value: "02ETJ" },
        { text: "캡틴 라일락 청정기 [02ETK]", value: "02ETK" },
        { text: "에어메가 300S 인도향 [02F7D]", value: "02F7D" },
        { text: "에어메가 400S 일본향(white) [02F83]", value: "02F83" },
        { text: "안테나 공기진단기 (LTE-M) [LTEMA]", value: "LTEMA" },
        { text: "액티브 액션 [02EYI]", value: "02EYI" },
        { text: "엘리트 정수기 [02EPN]", value: "02EPN" },
        { text: "에어메가 400S [02DNO]", value: "02DNO" },
        { text: "에어메가 300S [02DXB]", value: "02DXB" },
        { text: "에어메가 400S Graghite [02EUZ]", value: "02EUZ" },
        { text: "에어메가 방판형 [02EWD]", value: "02EWD" },
        { text: "인스타 아이스 정수기 [02EUL]", value: "02EUL" },
        { text: "인스타 아이스소다 정수기(WT) [02EW3]", value: "02EW3" },
        { text: "인스타 아이스소다 정수기(WT) [02EY8]", value: "02EY8" },
        { text: "인스타 아이스 정수기(SL) [02EY1]", value: "02EY1" },
        { text: "인스타 아이스 정수기(WT) [02EUM]", value: "02EUM" },
        { text: "인스타 아이스소다 정수기(SL) [02EUN]", value: "02EUN" },
        { text: "캡틴 청정기 [02D8F]", value: "02D8F" },
      ],
    },
    {
      // FOTA 데이터 상태
      category: "fotaStatus",
      items: [
        { text: "NONE", value: 0 },
        { text: "INIT", value: 1 },
        { text: "STATE ERROR", value: 2 },
        { text: "PARAM ERROR", value: 3 },
        { text: "VERSION_ERROR", value: 4 },
        { text: "RESOLVE5", value: 5 },
        { text: "RESOLVE6", value: 6 },
        { text: "RESOLVE7", value: 7 },
        { text: "RESOLVE8", value: 8 },
        { text: "RESOLVE9", value: 9 },
        { text: "RESOLVE10", value: 10 },
        { text: "DOWNLOAD STARTED", value: 11 },
        { text: "DOWNLOAD DNS ERROR", value: 12 },
        { text: "DOWNLOAD RESPONSE ERROR", value: 13 },
        { text: "DOWNLOAD SIZE ERROR", value: 14 },
        { text: "DOWNLOAD FILE ERROR", value: 15 },
        { text: "DOWNLOAD ERROR", value: 16 },
        { text: "DECRYPT KEY ERROR", value: 17 },
        { text: "DECRYPT ERROR", value: 18 },
        { text: "RESOLVE19", value: 19 },
        { text: "RESOLVE20", value: 20 },
        { text: "DOWNLOAD SUCCESS", value: 21 },
        { text: "RESOLVE22", value: 22 },
        { text: "RESOLVE23", value: 23 },
        { text: "RESOLVE24", value: 24 },
        { text: "RESOLVE25", value: 25 },
        { text: "RESOLVE26", value: 26 },
        { text: "RESOLVE27", value: 27 },
        { text: "RESOLVE28", value: 28 },
        { text: "RESOLVE29", value: 29 },
        { text: "RESOLVE30", value: 30 },
        { text: "INSTALL STARTED", value: 31 },
        { text: "INSTALL FAILED", value: 32 },
        { text: "RESOLVE33", value: 33 },
        { text: "RESOLVE34", value: 34 },
        { text: "RESOLVE35", value: 35 },
        { text: "RESOLVE36", value: 36 },
        { text: "RESOLVE37", value: 37 },
        { text: "RESOLVE38", value: 38 },
        { text: "RESOLVE39", value: 39 },
        { text: "RESOLVE40", value: 40 },
        { text: "DEVICE TYPE ERROR", value: 41 },
        { text: "ROM FILE SIZE ERROR", value: 42 },
        { text: "VERSION_INIT", value: 101 },
        { text: "VERSION_NO_CHANGE", value: 102 },
        { text: "FOTA_PROCESSING", value: 103 },
        { text: "FOTA_INSTALL_FAILED", value: 104 },
        { text: "VERSION_UPDATED", value: 111 },
        { text: "VERSION_UPDATE_FAIL", value: 112 },
      ],
    },
    {
      // 인증만료 상태
      category: "certStatus",
      items: [
        { text: "NONE", value: 0 },
        { text: "INIT", value: 1 },
        { text: "STATE ERROR", value: 2 },
        { text: "PARAM ERROR", value: 3 },
        { text: "INTERNAL_ERROR", value: 4 },
        { text: "RESOLVE5", value: 5 },
        { text: "RESOLVE6", value: 6 },
        { text: "RESOLVE7", value: 7 },
        { text: "RESOLVE8", value: 8 },
        { text: "RESOLVE9", value: 9 },
        { text: "PARAM DOWNLOAD_CA_ERROR", value: 10 },
        { text: "CERT_REQUEST_STARTED", value: 11 },
        { text: "CERT_SERVER_DNS_ERROR", value: 12 },
        { text: "CERT_SERVER_RESPONSE_ERROR", value: 13 },
        { text: "CERT_SERVER_ERROR_CODE_F1000", value: 14 },
        { text: "CERT_SERVER_ERROR_CODE_F2000", value: 15 },
        { text: "CERT_SERVER_ERROR_EXCEPTION_F3000", value: 16 },
        { text: "CERT_SERVER_ERROR_INFO_ETC_F4000", value: 17 },
        { text: "CERT_SERVER_ERROR_NOT_FOUND_DEVICE_F4001", value: 18 },
        { text: "CERT_SERVER_ERROR_UNKNOWN_INFO_F4002", value: 19 },
        { text: "CERT_SERVER_ERROR_CERT_FAIL_F5000", value: 20 },
        { text: "CERT_SERVER_ERROR_ACCESS_DENY_F5001", value: 21 },
        { text: "CERT_SERVER_ERROR_CERT_EXPIRED_F5002", value: 22 },
        { text: "CERT_SERVER_ERROR_CODE_ETC", value: 23 },
        { text: "DOWNLOAD_STARTED", value: 31 },
        { text: "DOWNLOAD_PRIVATE_KEY_ERROR", value: 32 },
        { text: "DOWNLOAD_CERT_ERROR", value: 33 },
        { text: "DOWNLOAD_SUCCESS", value: 34 },
        { text: "RESOLVE35", value: 35 },
        { text: "RESOLVE36", value: 35 },
        { text: "RESOLVE37", value: 35 },
        { text: "RESOLVE38", value: 35 },
        { text: "RESOLVE39", value: 35 },
        { text: "RESOLVE40", value: 35 },
        { text: "CERT_INIT", value: 101 },
        { text: "CERT_PROCESSING", value: 102 },
        { text: "CERT_RECONNECT", value: 111 },
      ],
    },
    {
      // Device Status 정보
      category: "deviceStatus",
      items: [
        {
          text: "운영",
          value: 1,
        },
        {
          text: "반납",
          value: 2,
        },
        {
          text: "재고",
          value: 3,
        },
      ],
    },
    {
      category: "wifiHwType",
      items: [
        {
          text: "INC5000 SINGLE",
          value: 0,
        },
        {
          text: "INC5000 DUAL",
          value: 1,
        },
        {
          text: "INC6000 SINGLE",
          value: 2,
        },
        {
          text: "INC5000 DUAL",
          value: 3,
        },
        {
          text: "기타1",
          value: 10,
        },
      ],
    },
    {
      category: "mcuHwType",
      items: [
        {
          text: "default",
          value: 0,
        },
      ],
    },
  ],
};

const sharedInfoSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: {},
});

export default sharedInfoSlice.reducer;
