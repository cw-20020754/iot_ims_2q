import React, { useState } from "react";
import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
} from "@coreui/react";
import { Select, TextField } from "@material-ui/core";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import {
  getCodeCategoryItems,
  getText,
  isNull,
} from "../common/utils/CowayUtils";
import MenuItem from "@mui/material/MenuItem";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const SearchCondition = (props) => {
  const { conditionFormList } = props;
  const codes = useSelector((state) => state.sharedInfo.codes);
  const transMsg = useSelector((state) => state.sharedInfo.messages);
  const text = {
    search: getText(transMsg, "word.search"),
    term: getText(transMsg, "word.term"),
  };

  const [searchOption, setSearchOption] = useState({
    frmwrName: "",
    frmwrType: "",
    devModelCode: "",
    frmwrVer: "",
    startDate: dayjs(new Date())
      .add(-7, "days")
      .hour(0)
      .minute(0)
      .second(0)
      .format("YYYY-MM-DDTHH:mm"),
    endDate: dayjs(new Date())
      .hour(23)
      .minute(59)
      .second(59)
      .format("YYYY-MM-DDTHH:mm"),
  });

  const onChangeFormData = (e) => {
    const { name, value } = e.target;

    setSearchOption((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
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
                props.onFetchData("", searchOption);
              }}
            >
              Search
            </Button>
          </div>
          {/* Search Condition */}
          <div className="row ms-4">
            {conditionFormList.map((item, index) => {
              return (
                <div
                  className={`mb-4 ${
                    item.type === "selectBox" ? "col-md-2" : "col-md-3"
                  }`}
                  key={item.label}
                >
                  <label htmlFor="inputState" className="form-label">
                    {item.label}
                  </label>
                  {item.type === "selectBox" ? (
                    <FormControl fullWidth size="small">
                      <Select
                        defaultValue=""
                        value={
                          !isNull(searchOption[item.id])
                            ? searchOption[item.id]
                            : " "
                        }
                        name={item.id}
                        onChange={onChangeFormData}
                      >
                        {getCodeCategoryItems(codes, item.category).map(
                          (name) => (
                            <MenuItem
                              key={name.text}
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
                  ) : (
                    <input
                      type="text"
                      className="form-control"
                      id="inputEmail4"
                      value={searchOption[item.id]}
                      name={item.id}
                      onChange={onChangeFormData}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </CAccordionBody>
      </CAccordionItem>
    </CAccordion>
  );
};

export default SearchCondition;
