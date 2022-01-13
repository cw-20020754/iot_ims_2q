import React, { useCallback, useEffect, useState } from "react";
import {
  getText,
  isNull,
  makeQuery,
  makeRowsFormat,
} from "../../common/utils/CowayUtils";
import dayjs from "dayjs";
import { getFotaPolicyList } from "../../redux/reducers/fotaInfoSlice";
import { useDispatch, useSelector } from "react-redux";
import DataGridTables from "../../components/table/DataGridTables";
import MatEdit from "../../components/table/MatEdit";
import AlertMessage from "../../components/AlertMessage";
import SearchCondition from "../../components/SearchCondition";

/**
 * FOTA 정책관리
 */
const FotaPolicyManagementPage = (props) => {
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
    policyName: "",
    policyStatus: "",
    devModelCode: "",
    targetId: "",
    startDate: startDate,
    endDate: endDate,
  });

  const [param, setParam] = useState({ page: 0, size: 10 });

  const fotaPolicyList = useSelector((state) => state.fotaInfo.fotaPolicy.list);
  const fotaPolicyTotal = useSelector(
    (state) => state.fotaInfo.fotaPolicy.totalElements
  );
  const transMsg = useSelector((state) => state.sharedInfo.messages);

  const text = {
    search: getText(transMsg, "word.search"),
    target: getText(transMsg, "word.target"),
    id: getText(transMsg, "word.id"),
    policy: getText(transMsg, "word.policy"),
    name: getText(transMsg, "word.name"),
    desc: getText(transMsg, "word.desc"),
    status: getText(transMsg, "word.status"),
    type: getText(transMsg, "word.type"),
    publish: getText(transMsg, "word.publish"),
    cert: getText(transMsg, "word.cert"),
    firmware: getText(transMsg, "word.firmware"),
    wifi: getText(transMsg, "word.wifi"),
    ver: getText(transMsg, "word.ver"),
    mcu: getText(transMsg, "word.mcu"),
    devModelCode: getText(transMsg, "word.devModelCode"),
    regId: getText(transMsg, "word.regId"),
    regDate: getText(transMsg, "word.regDate"),
    updId: getText(transMsg, "word.updId"),
    updDate: getText(transMsg, "word.updDate"),
    use: getText(transMsg, "word.use"),
    yn: getText(transMsg, "word.yn"),
    valid_tempError: getText(transMsg, "desc.tempError"),
    term: getText(transMsg, "word.term"),
  };

  const conditionFormList = [
    {
      id: "policyStatus",
      category: "fotaShadowStatus",
      label: text.policy + " " + text.status,
      type: "selectBox",
    },
    {
      id: "devModelCode",
      category: "devModelCode",
      label: text.devModelCode,
      type: "selectBox",
    },
    {
      id: "policyName",
      label: text.policy + " " + text.name,
      type: "textBox",
    },
    {
      id: "targetId",
      label: text.target + " " + text.id,
      type: "textBox",
    },
  ];

  const columns = [
    {
      field: "editDelete",
      headerName: "",
      editable: false,
      headerAlign: "center",
      align: "center",
      sortable: false,
      filter: false,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        // 신규
        if (params.row.policyStatus === 1) {
          return (
            <MatEdit
              category={"fotaPolicyMng"}
              param={params.row}
              searchOption={searchOption}
            />
          );
        }
      },
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
      field: "policyName",
      headerName: text.policy + " " + text.name,
      width: 250,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "policyDesc",
      headerName: text.policy + " " + text.desc,
      width: 300,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "policyStatusName",
      headerName: text.policy + " " + text.status,
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "targetType",
      headerName: text.publish + " " + text.target + " " + text.type,
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "targetType",
      headerName: text.publish + " " + text.type,
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "targetType",
      headerName: text.cert + " " + text.type,
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "wifiFrmwrName",
      headerName: text.wifi + " " + text.firmware + " " + text.name,
      width: 200,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "wifiFrmwrVer",
      headerName: text.wifi + " " + text.firmware + " " + text.ver,
      width: 200,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "mcuFrmwrName",
      headerName: text.mcu + " " + text.firmware + " " + text.name,
      width: 200,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "mcuFrmwrVer",
      headerName: text.mcu + " " + text.firmware + " " + text.ver,
      width: 200,
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
    {
      field: "useYn",
      headerName: text.use + " " + text.yn,
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "encryptKey",
      headerName: "encryptKey",
      hide: true,
    },
    {
      field: "encryptKey",
      headerName: "encryptKey",
      hide: true,
    },
    {
      field: "encryptedFileUrl",
      headerName: "encryptedFileUrl",
      hide: true,
    },
    {
      field: "frmwrDesc",
      headerName: "frmwrDesc",
      hide: true,
    },
    {
      field: "frmwrId",
      headerName: "frmwrId",
      hide: true,
    },
    {
      field: "frmwrVerNo",
      headerName: "frmwrVerNo",
      hide: true,
    },
    {
      field: "originalFileUrl",
      headerName: "originalFileUrl",
      hide: true,
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

  const [isFail, setIsFail] = useState(false);
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
        getFotaPolicyList({
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
        rows={!isNull(fotaPolicyList) && makeRowsFormat(fotaPolicyList, codes)}
        columns={columns}
        param={param}
        totalElement={fotaPolicyTotal}
        isLoading={isLoading}
        searchOption={searchOption}
        category={"fotaPolicyManage"}
        onFetchData={onFetchData}
        onRefresh={onRefresh}
      />
    </div>
  );
};

export default FotaPolicyManagementPage;
