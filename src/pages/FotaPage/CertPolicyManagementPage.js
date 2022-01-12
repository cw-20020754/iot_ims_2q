import React, { useState, useEffect, useCallback } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Button } from "@mui/material";
import { Select, TextField } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import {
  getCodeCategoryItems,
  getText,
  isNull,
  makeQuery,
  makeRowsFormat,
} from "../../common/utils/CowayUtils";
import DataGridTables from "../../components/table/DataGridTables";
import { getCertPolicyList } from "../../redux/reducers/fotaInfoSlice";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import MatEdit from "../../components/table/MatEdit";
import AlertMessage from "../../components/AlertMessage";
import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
} from "@coreui/react";

/**
 * 인증서 정책관리
 */

const CertPolicyManagementPage = (props) => {
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

  const certPolicyList = useSelector((state) => state.fotaInfo.certPolicy.list);
  const certPolicyTotal = useSelector(
    (state) => state.fotaInfo.certPolicy.totalElements
  );

  const transMsg = useSelector((state) => state.sharedInfo.messages);
  const text = {
    devModelCode: getText(transMsg, "word.devModelCode"),
    policy: getText(transMsg, "word.policy"),
    name: getText(transMsg, "word.name"),
    desc: getText(transMsg, "word.desc"),
    status: getText(transMsg, "word.status"),
    target: getText(transMsg, "word.target"),
    publish: getText(transMsg, "word.publish"),
    type: getText(transMsg, "word.type"),
    regId: getText(transMsg, "word.regId"),
    regDate: getText(transMsg, "word.regDate"),
    updId: getText(transMsg, "word.updId"),
    updDate: getText(transMsg, "word.updDate"),
    use: getText(transMsg, "word.use"),
    yn: getText(transMsg, "word.yn"),
    valid_tempError: getText(transMsg, "desc.tempError"),
    search: getText(transMsg, "word.search"),
    id: getText(transMsg, "word.id"),
    term: getText(transMsg, "word.term"),
  };
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
              category={"certPolicyMng"}
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
      field: "targetId",
      headerName: text.target + " " + text.id,
      width: 250,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "targetType",
      headerName: text.publish + " " + text.target + text.type,
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
    async (data) => {
      if (initial) {
        setInitial(false);
      }

      setIsLoading(true);
      let params = isNull(data) ? param : data;
      let option = initial ? "" : searchOption;

      const result = await dispatch(
        getCertPolicyList({
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
      <CAccordion flush={true}>
        <CAccordionItem>
          <CAccordionHeader>{text.search}</CAccordionHeader>
          <CAccordionBody className="mb-2">
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
                  label={text.term}
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
                  label={text.term}
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
                  {text.policy + " " + text.status}
                </label>
                <FormControl fullWidth size="small">
                  <Select
                    defaultValue=""
                    value={searchOption.policyStatus}
                    name="policyStatus"
                    onChange={onChangeFormData}
                  >
                    {getCodeCategoryItems(codes, "fotaShadowStatus").map(
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
                  {text.devModelCode}
                </label>
                <FormControl fullWidth size="small">
                  <Select
                    defaultValue=""
                    value={searchOption.devModelCode}
                    name="devModelCode"
                    onChange={onChangeFormData}
                  >
                    {getCodeCategoryItems(codes, "devModelCode").map((name) => (
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
                <label htmlFor="inputEmail4" className="form-label">
                  {text.policy + " " + text.name}
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
                  {text.target + " " + text.id}
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
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>
      {/* 테이블 영역 */}
      <DataGridTables
        rows={
          !isNull(certPolicyList) &&
          Array.isArray(certPolicyList) &&
          certPolicyList.length > 0 &&
          makeRowsFormat(certPolicyList, codes)
        }
        columns={columns}
        param={param}
        totalElement={certPolicyTotal}
        isLoading={isLoading}
        searchOption={searchOption}
        category={"certPolicyManage"}
        onFetchData={onFetchData}
        onRefresh={onRefresh}
      />
    </div>
  );
};

export default CertPolicyManagementPage;
