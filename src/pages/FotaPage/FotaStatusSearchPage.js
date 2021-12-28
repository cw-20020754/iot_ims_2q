import React, { useState, useEffect } from "react";
import { Select, TextField } from "@material-ui/core";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import {
  getCodeCategoryItems,
  isNull,
  makeQuery,
} from "../../common/utils/CowayUtils";
import MenuItem from "@mui/material/MenuItem";
import DataGridTables from "../../components/DataGridTables";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import MatEdit from "../../components/MatEdit";
import { getStatusList } from "../../redux/reducers/fotaInfoSlice";

/**
 * 포타 상태 조회
 */

const FotaStatusSearchPage = (props) => {

  const dispatch = useDispatch();
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
    policyName: "",
    policyStatus: "",
    devModelCode: "",
    targetId: "",
    startDate: startDate,
    endDate: endDate,
  });

  const [param, setParam] = useState({ page: 0, size: 10 });

  const fotaStatusList = useSelector((state) => state.fotaInfo.fotaStatus.list);
  const fotaStatusTotal = useSelector(
    (state) => state.fotaInfo.fotaStatus.totalElements
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
            category={"fotaStatus"}
            param={params.row}
            searchOption={searchOption}
          />
        );
      },
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
      field: "devModelCode",
      headerName: "기기모델코드",
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "fotaShadowStatusName",
      headerName: "FOTA 상태",
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "certShadowStatusName",
      headerName: "인증 상태",
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
      policyName: "",
      policyStatus: "",
      devModelCode: "",
      targetId: "",
      startDate: startDate,
      endDate: endDate,
    });

    setShowSearch(false);
    onFetchData();
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (initial) {
      dispatch(
        getStatusList({
          param: makeQuery(param),
        })
      );
      setInitial(false);
    }
  }, [initial, dispatch, param]);

  const onFetchData = () => {
    console.log("onFetchData >> ", param, searchOption);
    dispatch(
      getStatusList({
        param: makeQuery(param, searchOption),
      })
    );
  };

  return (
    <div>
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
                  정책 상태
                </label>
                <FormControl fullWidth size="small">
                  <Select
                    defaultValue=""
                    value={searchOption.policyStatus}
                    name="policyStatus"
                    onChange={onChangeFormData}
                  >
                    {getCodeCategoryItems(options, "fotaShadowStatus").map(
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
                  정책 이름
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail4"
                  value={searchOption.policyName}
                  name="policyName"
                  onChange={onChangeFormData}
                />
              </div>
              <div className="col-md-3 mb-4">
                <label htmlFor="inputEmail4" className="form-label">
                  대상 아이디
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail4"
                  value={searchOption.targetId}
                  name="targetId"
                  onChange={onChangeFormData}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 테이블 영역 */}
      <DataGridTables
        rows={!isNull(fotaStatusList) && fotaStatusList}
        columns={columns}
        totalElement={fotaStatusTotal}
        searchOption={searchOption}
        category={"fotaStatus"}
        onFetchData={onFetchData}
        onRefresh={onRefresh}
      />
    </div>
  );
};

export default FotaStatusSearchPage;
