import React, { useState, useEffect, useCallback } from "react";
import { Select, TextField } from "@material-ui/core";
import { Alert, AlertTitle, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import { dateFormatConvert, fileSize, getCodeCategoryItems, isNull, makeQuery } from "../../common/utils/CowayUtils";
import MenuItem from "@mui/material/MenuItem";
import DataGridTables from "../../components/DataGridTables";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { getHistoryList } from "../../redux/reducers/fotaInfoSlice";

/**
 * Fota 이력 조회
 */

const FotaHistroySearchPage = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [initial, setInitial] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const options = useSelector((state) => state.getData.codes);
  const [startDate, setStartDate] = useState(
      dayjs(new Date())
          .add(-7, "days")
          .hour(0)
          .minute(0)
          .second(0)
          .format('YYYY-MM-DDTHH:mm')
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

  const fotaHistoryList = useSelector((state) => state.fotaInfo.fotaHistory.list);
  const fotaHistoryTotal = useSelector(
      (state) => state.fotaInfo.fotaHistory.totalElements
  );

  const [isFail, setIsFail] = useState(false);

  const columns = [
    {
      field: "originDt",
      headerName: "발생일시",
      width: 200,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "devModelCode",
      headerName: "기기모델코드",
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "serial",
      headerName: "시리얼번호",
      width: 250,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "certStatusName",
      headerName: "인증상태",
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "wifiFotaStatus",
      headerName: "WIFI FOTA 상태",
      width: 200,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "wifiFrmwrVer",
      headerName: "WIFI 펌웨어버전",
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "mcuFotaStatus",
      headerName: "MCU FOTA 상태",
      width: 200,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "mcuFrmwrVer",
      headerName: "MCU 펌웨어버전",
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "isCertExpired",
      headerName: "인증 만료여부",
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "queryType",
      headerName: "쿼리 유형",
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "regId",
      headerName: "등록자 아이디",
      width: 200,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "regDate",
      headerName: "등록일시",
      width: 250,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "updId",
      headerName: "수정자 아이디",
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "updDate",
      headerName: "수정 일시",
      width: 250,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
  ];

  const onHandleSearch = () => {
    setShowSearch(!showSearch);
  };

  const onChangeFormData = (e) => {
    const { name, value } = e.target;
    // console.log("name, value >> ", name, value);

    setSearchOption((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const makeRowsFormat = (list) => {
    let rows = [];
    if (list.length > 0) {
      list.map((item, index) => {
        rows.push({
          ...item,
          id: index,
          regDate: dateFormatConvert(item.regDate),
          updDate: dateFormatConvert(item.updDate),
          originDt: dateFormatConvert(item.originDt),
          certStatusName: item.certStatusName,
          wifiFotaStatus:getCodeCategoryItems(options, "fotaStatus").filter((el) => el.value === item.wifiFotaStatus)[0].text,
          mcuFotaStatus:getCodeCategoryItems(options, "fotaStatus").filter((el) => el.value === item.mcuFotaStatus)[0].text,
          isCertExpired: item.isCertExpired ? 'Y' : 'N'
        });
        return rows;
      });
    }
    return rows;
  };

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

    setSearchOption({
      isCertExpired: "",
      certStatus: "",
      devModelCode: "",
      serial: "",
      startDate: startDate,
      endDate: endDate,
    });

    setShowSearch(false);
    onFetchData();
    window.scrollTo(0, 0);
  };

  const onFetchData = useCallback(async (data) => {

    if(initial){
      setInitial(false);
    }

    setIsLoading(true);
    let params = isNull(data) ? param : data;
    let option = initial ? '' : searchOption;

    const result = await dispatch(
        getHistoryList({
          param: makeQuery(params, option),
        })
    );

    if(!isNull(result)) {
      setIsLoading(false);

      if(isNull(result.payload)) {
        setIsFail(true);

        setTimeout(() => {
          setIsFail(false);
        }, 3000);
      }
    }
  }, [dispatch, param, searchOption, initial]);

  useEffect(() => {
    if(initial) {
      onFetchData();
    }
  }, [onFetchData, initial]);

  return (
      <div>
        {
          isFail && (
              <div className='mb-3'>
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  <strong>일시적인 에러가 발생했습니다. 잠시 후 시도해 보세요.</strong>
                </Alert>
              </div>
          )
        }
        {/* 검색 */}
        <div className="accordion mb-2" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                  type="button"
                  className={`accordion-button ${showSearch ? "collapsed" : ""}`}
                  data-coreui-toggle="collapse"
                  data-coreui-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                  onClick={onHandleSearch}
              >
                검색
              </button>
            </h2>
            <div
                id="collapseOne"
                className={`accordion-collapse collapse ${
                    showSearch ? "show" : ""
                }`}
                aria-labelledby="headingOne"
                data-coreui-parent="#accordionExample"
            >
              {/* 캘린더 Native pickers */}
              <div className="p-3">
                <div
                    style={{
                      display: "inline-flex",
                      alignItems: "baseline",
                      justifyContent: "center",
                    }}
                >
                  <TextField
                      id="datetime-local"
                      label="기간"
                      type="datetime-local"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="startDate"
                      value={searchOption.startDate}
                      className="col-md-5 mb-4"
                      onChange={onChangeFormData}
                  />
                  <span className="p-3 mb-4"> ~ </span>
                  <TextField
                      id="datetime-local"
                      label="기간"
                      type="datetime-local"
                      value={searchOption.endDate}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="endDate"
                      className="col-md-5 mb-4 ms-3"
                      onChange={onChangeFormData}
                  />
                </div>
                <Button
                    variant="outlined"
                    className="ms-4"
                    style={{ color: "#1976DE" }}
                    startIcon={<SearchIcon />}
                    onClick={() => {
                      onFetchData();
                    }}
                >
                  Search
                </Button>
              </div>
              <div className="row ms-4">
                <div className="col-md-2 mb-4">
                  <label htmlFor="inputState" className="form-label">
                    인증 만료 여부
                  </label>
                  <FormControl fullWidth size="small">
                    <Select
                        defaultValue=""
                        value={searchOption.isCertExpired}
                        name="isCertExpired"
                        onChange={onChangeFormData}
                    >
                      {getCodeCategoryItems(options, "yn").map(
                          (name) => (
                              <MenuItem
                                  key={name.value}
                                  value={name.value}
                                  style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    padding: "10px",
                                  }}
                              >
                                {name.text}
                              </MenuItem>
                          )
                      )}
                    </Select>
                  </FormControl>
                </div>
                <div className="col-md-3 mb-4">
                  <label htmlFor="validationServer04" className="form-label">
                    인증 상태
                  </label>
                  <FormControl fullWidth size="small">
                    <Select
                        defaultValue=""
                        value={searchOption.certStatus}
                        name="certStatus"
                        onChange={onChangeFormData}
                    >
                      {getCodeCategoryItems(options, "certStatus").map(
                          (name) => (
                              <MenuItem
                                  key={name.value}
                                  value={name.value}
                                  style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    padding: "10px",
                                  }}
                              >
                                {name.text}
                              </MenuItem>
                          )
                      )}
                    </Select>
                  </FormControl>
                </div>
                <div className="col-md-3 mb-4">
                  <label htmlFor="validationServer04" className="form-label">
                    기기모델 코드
                  </label>
                  <FormControl fullWidth size="small">
                    <Select
                        defaultValue=""
                        value={searchOption.devModelCode}
                        name="devModelCode"
                        onChange={onChangeFormData}
                    >
                      {getCodeCategoryItems(options, "devModelCode").map(
                          (name) => (
                              <MenuItem
                                  key={name.value}
                                  value={name.value}
                                  style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    padding: "10px",
                                  }}
                              >
                                {name.text}
                              </MenuItem>
                          )
                      )}
                    </Select>
                  </FormControl>
                </div>
                <div className="col-md-3 mb-4">
                  <label htmlFor="inputEmail4" className="form-label">
                    시리얼 번호
                  </label>
                  <input
                      type="text"
                      className="form-control"
                      id="inputEmail4"
                      value={searchOption.serial}
                      name="serial"
                      onChange={onChangeFormData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 테이블 영역 */}
        <DataGridTables
            rows={!isNull(fotaHistoryList) && makeRowsFormat(fotaHistoryList)}
            columns={columns}
            totalElement={fotaHistoryTotal}
            isLoading={isLoading}
            searchOption={searchOption}
            category={"fotaHistory"}
            onFetchData={onFetchData}
            onRefresh={onRefresh}
        />
      </div>
  );
};

export default FotaHistroySearchPage;
