import React, { useState, useEffect, useCallback } from "react";
import {
  getText,
  isNull,
  makeQuery,
  makeRowsFormat,
} from "../../common/utils/CowayUtils";
import DataGridTables from "../../components/table/DataGridTables";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { getHistoryList } from "../../redux/reducers/fotaInfoSlice";
import AlertMessage from "../../components/AlertMessage";
import SearchCondition from "../../components/SearchCondition";

/**
 * Fota 이력 조회
 */

const FotaHistroySearchPage = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [initial, setInitial] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const codes = useSelector((state) => state.sharedInfo.codes);
  const [startDate, setStartDate] = useState(
    dayjs(new Date())
      .add(-7, "days")
      .hour(0)
      .minute(0)
      .second(0)
      .format("YYYY-MM-DDTHH:mm")
  );

  const [endDate, setEndDate] = useState(
    dayjs(new Date()).hour(23).minute(59).second(59).format("YYYY-MM-DDTHH:mm")
  );
  const [searchOption, setSearchOption] = useState({
    startDate: startDate,
    endDate: endDate,
    isCertExpired: "",
    certStatus: "",
    devModelCode: "",
    serial: "",
  });

  const [param, setParam] = useState({ page: 0, size: 10 });

  const fotaHistoryList = useSelector(
    (state) => state.fotaInfo.fotaHistory.list
  );
  const fotaHistoryTotal = useSelector(
    (state) => state.fotaInfo.fotaHistory.totalElements
  );

  const [isFail, setIsFail] = useState(false);

  const transMsg = useSelector((state) => state.sharedInfo.messages);

  const text = {
    serialNum: getText(transMsg, "word.serialNum"),
    devModelCode: getText(transMsg, "word.devModelCode"),
    fota: getText(transMsg, "word.fota"),
    status: getText(transMsg, "word.status"),
    cert: getText(transMsg, "word.cert"),
    regId: getText(transMsg, "word.regId"),
    regDate: getText(transMsg, "word.regDate"),
    updId: getText(transMsg, "word.updId"),
    updDate: getText(transMsg, "word.updDate"),
    valid_tempError: getText(transMsg, "desc.tempError"),
    search: getText(transMsg, "word.search"),
    term: getText(transMsg, "word.term"),
    policy: getText(transMsg, "word.policy"),
    name: getText(transMsg, "word.name"),
    target: getText(transMsg, "word.target"),
    id: getText(transMsg, "word.id"),
    originDt: getText(transMsg, "word.originDt"),
    wifi: getText(transMsg, "word.wifi"),
    ver: getText(transMsg, "word.ver"),
    mcu: getText(transMsg, "word.mcu"),
    expired: getText(transMsg, "word.expired"),
    query: getText(transMsg, "word.query"),
    firmware: getText(transMsg, "word.firmware"),
    yn: getText(transMsg, "word.yn"),
    type: getText(transMsg, "word.type"),
  };

  const conditionFormList = [
    {
      id: "fotaStatus",
      category: "fotaShadowStatus",
      label: text.fota + " " + text.status,
      type: "selectBox",
    },
    {
      id: "certStatus",
      category: "fotaShadowStatus",
      label: text.cert + " " + text.status,
      type: "selectBox",
    },
    {
      id: "devModelCode",
      category: "devModelCode",
      label: text.devModelCode,
      type: "selectBox",
    },
    {
      id: "serial",
      label: text.serialNum,
      type: "textBox",
    },
  ];

  const columns = [
    {
      field: "originDt",
      headerName: text.originDt,
      width: 200,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "devModelCode",
      headerName: text.devModelCode,
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "serial",
      headerName: text.serialNum,
      width: 250,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "certStatusName",
      headerName: text.cert + text.status,
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "wifiFotaStatus",
      headerName: text.wifi + " " + text.fota + " " + text.status,
      width: 200,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "wifiFrmwrVer",
      headerName: text.wifi + " " + text.firmware + " " + text.ver,
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "mcuFotaStatus",
      headerName: text.mcu + " " + text.fota + " " + text.status,
      width: 200,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "mcuFrmwrVer",
      headerName: text.mcu + " " + text.firmware + " " + text.ver,
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "isCertExpired",
      headerName: text.cert + " " + text.expired + text.yn,
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "queryType",
      headerName: text.query + " " + text.type,
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "regId",
      headerName: text.regId,
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "regDate",
      headerName: text.regDate,
      width: 250,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "updId",
      headerName: text.updId,
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "updDate",
      headerName: text.updDate,
      width: 250,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
  ];

  // 리프레시 누른 경우
  const onRefresh = () => {
    setStartDate(
      dayjs(new Date())
        .add(-7, "days")
        .hour(0)
        .minute(0)
        .second(0)
        .format("YYYY-MM-DDTHH:mm")
    );
    setEndDate(
      dayjs(new Date())
        .hour(23)
        .minute(59)
        .second(59)
        .format("YYYY-MM-DDTHH:mm")
    );

    setSearchOption(null);

    setShowSearch(false);
    onFetchData();
    window.scrollTo(0, 0);
  };

  const onFetchData = useCallback(
    async (data, conditions) => {
      if (initial) {
        setInitial(false);
      }

      setIsLoading(true);
      let params = isNull(data) ? param : data;
      let option = "";

      if (!isNull(conditions)) {
        option = conditions;
        setSearchOption(conditions);
      } else if (!isNull(searchOption)) {
        option = searchOption;
      }

      const result = await dispatch(
        getHistoryList({
          param: makeQuery(params, option),
        })
      );

      if (!isNull(result)) {
        setIsLoading(false);

        if (isNull(result.payload)) {
          setIsFail(true);

          setTimeout(() => {
            setIsFail(false);
          }, 3000);
        }
      }
    },
    [dispatch, param, searchOption, initial]
  );

  useEffect(() => {
    if (initial) {
      onFetchData();
    }
  }, [onFetchData, initial]);

  return (
    <div>
      {isFail && (
        <AlertMessage
          isSuccess={false}
          title={"Error"}
          message={text.valid_tempError}
        />
      )}

      {/* 검색 */}
      <SearchCondition
        onFetchData={onFetchData}
        conditionFormList={conditionFormList}
      />
      {/* 테이블 영역 */}
      <DataGridTables
        rows={
          !isNull(fotaHistoryList) && makeRowsFormat(fotaHistoryList, codes)
        }
        columns={columns}
        param={param}
        totalElement={fotaHistoryTotal}
        isLoading={isLoading}
        searchOption={searchOption}
        category={"historySearch"}
        onFetchData={onFetchData}
        onRefresh={onRefresh}
      />
    </div>
  );
};

export default FotaHistroySearchPage;
