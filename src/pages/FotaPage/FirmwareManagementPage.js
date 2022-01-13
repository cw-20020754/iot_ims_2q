import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFirmwareList } from "../../redux/reducers/fotaInfoSlice";
import DataGridTables from "../../components/table/DataGridTables";
import {
  getText,
  isNull,
  makeQuery,
  makeRowsFormat,
} from "../../common/utils/CowayUtils";
import dayjs from "dayjs";
import MatEdit from "../../components/table/MatEdit";
import AlertMessage from "../../components/AlertMessage";
import SearchCondition from "../../components/SearchCondition";

/**
 * 펌웨어관리
 */
const FirmwareManagementPage = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showSearch, setShowSearch] = useState(false);

  const dispatch = useDispatch();
  const [initial, setInitial] = useState(true);
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
  const codes = useSelector((state) => state.sharedInfo.codes);
  const [searchOption, setSearchOption] = useState(null);

  const [param, setParam] = useState({ page: 0, size: 10 });

  const firmwareMngList = useSelector(
    (state) => state.fotaInfo.firmwareMng.list
  );
  const firmwareMngTotal = useSelector(
    (state) => state.fotaInfo.firmwareMng.totalElements
  );

  const transMsg = useSelector((state) => state.sharedInfo.messages);

  const text = {
    search: getText(transMsg, "word.search"),
    firmware: getText(transMsg, "word.firmware"),
    name: getText(transMsg, "word.name"),
    ver: getText(transMsg, "word.ver"),
    file: getText(transMsg, "word.file"),
    type: getText(transMsg, "word.type"),
    devModelCode: getText(transMsg, "word.devModelCode"),
    size: getText(transMsg, "word.size"),
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
      id: "frmwrType",
      category: "frmwrType",
      label: text.firmware + " " + text.type,
      type: "selectBox",
    },
    {
      id: "devModelCode",
      category: "devModelCode",
      label: text.devModelCode,
      type: "selectBox",
    },
    {
      id: "frmwrName",
      label: text.firmware + " " + text.name,
      type: "textBox",
    },
    {
      id: "frmwrVer",
      label: text.firmware + " " + text.ver,
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
        return (
          <MatEdit
            category={"firmwareMng"}
            param={params.row}
            searchOption={searchOption}
          />
        );
      },
    },
    {
      field: "frmwrName",
      headerName: text.firmware + " " + text.name,
      width: 250,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "frmwrVer",
      headerName: text.firmware + " " + text.ver,
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "fileName",
      headerName: text.file + " " + text.name,
      width: 300,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "frmwrType",
      headerName: text.firmware + " " + text.type,
      width: 150,
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
      field: "fileSizeTxt",
      headerName: text.file + " " + text.size,
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
        getFirmwareList({
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
          !isNull(firmwareMngList) && makeRowsFormat(firmwareMngList, codes)
        }
        columns={columns}
        param={param}
        totalElement={firmwareMngTotal}
        isLoading={isLoading}
        searchOption={searchOption}
        category={"firmwareManage"}
        onFetchData={onFetchData}
        onRefresh={onRefresh}
      />
    </div>
  );
};

export default FirmwareManagementPage;
