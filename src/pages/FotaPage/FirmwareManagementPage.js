import React, { useState, useEffect, useCallback } from "react";
import { Select, TextField } from "@material-ui/core";
import { Alert, AlertTitle, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getFirmwareList } from "../../redux/reducers/fotaInfoSlice";
import DataGridTables from "../../components/DataGridTables";
import {
  getCodeCategoryItems,
  isNull,
  makeQuery,
} from "../../common/utils/CowayUtils";
import dayjs from "dayjs";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import MatEdit from "../../components/MatEdit";
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
  const options = useSelector((state) => state.getData.codes);
  const [searchOption, setSearchOption] = useState({
    frmwrName: "",
    frmwrType: "",
    devModelCode: "",
    frmwrVer: "",
    startDate: startDate,
    endDate: endDate,
  });

  const [param, setParam] = useState({ page: 0, size: 10 });

  const firmwareMngList = useSelector(
    (state) => state.fotaInfo.firmwareMng.list
  );
  const firmwareMngTotal = useSelector(
    (state) => state.fotaInfo.firmwareMng.totalElements
  );

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
      headerName: "펌웨어 이름",
      width: 250,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "frmwrVer",
      headerName: "펌웨어 버전",
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "fileName",
      headerName: "파일 이름",
      width: 300,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "frmwrType",
      headerName: "펌웨어 유형",
      width: 150,
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
      field: "fileSizeTxt",
      headerName: "파일 크기",
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "regId",
      headerName: "등록자 아이디",
      width: 150,
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
    {
      field: "useYn",
      headerName: "사용 여부",
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

  const onFetchData = useCallback(async (data) => {

    if(initial){
      setInitial(false);
    }

    setIsLoading(true);
    let params = isNull(data) ? param : data;
    let option = initial ? '' : searchOption;

    const result = await dispatch(
        getFirmwareList({
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
      frmwrName: "",
      frmwrType: "",
      devModelCode: "",
      frmwrVer: "",
      startDate: startDate,
      endDate: endDate,
    });

    setShowSearch(false);

    onFetchData();
    window.scrollTo(0, 0);
  };

  const onChangeFormData = (e) => {
    const { name, value } = e.target;
    // console.log("name, value >> ", name, value);

    setSearchOption((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onHandleSearch = () => {
    setShowSearch(!showSearch);
  };

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
                  펌웨어 유형
                </label>
                <FormControl fullWidth size="small">
                  <Select
                    defaultValue=""
                    value={searchOption.frmwrType}
                    name="frmwrType"
                    onChange={onChangeFormData}
                  >
                    {getCodeCategoryItems(options, "frmwrType").map((name) => (
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
                    ))}
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
                  펌웨어 이름
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail4"
                  value={searchOption.frmwrName}
                  name="frmwrName"
                  onChange={onChangeFormData}
                />
              </div>
              <div className="col-md-3 mb-4">
                <label htmlFor="inputEmail4" className="form-label">
                  펌웨어 버전
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail4"
                  value={searchOption.frmwrVer}
                  name="frmwrVer"
                  onChange={onChangeFormData}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 테이블 영역 */}
      <DataGridTables
        rows={!isNull(firmwareMngList) && firmwareMngList}
        columns={columns}
        totalElement={firmwareMngTotal}
        isLoading={isLoading}
        searchOption={searchOption}
        category={"firmwareMng"}
        onFetchData={onFetchData}
        onRefresh={onRefresh}
      />
      {/* // 테이블 영역 */}
    </div>
  );
};

export default FirmwareManagementPage;
