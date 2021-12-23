import React, { useState, useEffect } from "react";
import {
  CCard,
  // CDataTable,
  CPagination,
  CButton,
  CButtonToolbar,
  CButtonGroup,
  CTooltip,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import * as icon from "@coreui/icons";
import { useHistory } from "react-router-dom";

/**
 * Fota 이력 조회
 */

const FotaHistroySearchPage = (props) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(5);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [columnFilterValue, setColumnFilterValue] = useState();
  const [tableFilterValue, setTableFilterValue] = useState("");
  const [sorterValue, setSorterValue] = useState();

  const [fetchTrigger, setFetchTrigger] = useState(0);
  const history = useHistory();

  // const fields = [
  //   { key: '수정자 아이디', _style: { width: '50px' } },
  //   { key: '수정 일시', _style: { width: '100px' } },
  //   // {
  //   //   key: 'show_details',
  //   //   label: '',
  //   //   _style: { width: '1%' },
  //   //   sorter: false,
  //   //   filter: false,
  //   // },
  // ];
  const fields = [
    "발행일시",
    "기기모델코드",
    "시리얼번호",
    "인증상태",
    "WIFI FOTA 상태",
    "WIFI 펌웨어 버전",
    "MCU FOTA 상태",
    "MCU 펌웨어버전",
    "인증 만료여부",
    "등록자 아이디",
    "등록 일시",
    "수정 일시",
  ];

  const params = {
    page,
    columnFilterValue: JSON.stringify(columnFilterValue),
    tableFilterValue,
    sorterValue: JSON.stringify(sorterValue),
    itemsPerPage,
  };

  const query = new URLSearchParams(params).toString();

  useEffect(() => {
    // 초기 값 setting
    // firmware 관리 목록 조회 api 호출
    // 데이터 있는 경우 뿌려주기
    // 데이터 없는 경우 No Items flag
    // code sandbox which is used as a backend: https://codesandbox.io/s/coreui-rest-api-407g3
    // setLoading(true);
    // fetch(`https://407g3.sse.codesandbox.io?${query}`)
    //   .then(data => {
    //     data.json().then(json => {
    //       console.log(json);
    //       setItems(json.items);
    //       setPages(json.pages);
    //       setLoading(false);
    //     });
    //   })yarn add @coreui/icons
    //   .catch(e => {
    //     // wait for code sandbox server to unhibernate
    //     setTimeout(() => {
    //       setFetchTrigger(fetchTrigger + 1);
    //     }, 2000);
    //   });
  }, [query, fetchTrigger]);

  return (
    <div>
      <CCard className="p-5 cardScroll">
        {/* 버튼영역 */}
        <CButtonToolbar
          className="mb-3"
          role="group"
          aria-label="Toolbar with button groups"
        >
          <CButtonGroup
            className="me-2"
            role="group"
            size="lg"
            aria-label="First group"
          >
            <CTooltip content="새로 고침" placement="top">
              <CButton color="secondary" variant="outline">
                <CIcon
                  className="float-left"
                  icon={icon.cilSync}
                  height={15}
                  style={{
                    color: "#4DBD74",
                  }}
                />
              </CButton>
            </CTooltip>
            <CTooltip content="엑셀 다운로드" placement="top">
              <CButton color="secondary" variant="outline">
                {" "}
                <CIcon
                  className="float-left"
                  icon={icon.cilVerticalAlignBottom}
                  height={15}
                  style={{
                    color: "#4DBD74",
                  }}
                />
              </CButton>
            </CTooltip>
          </CButtonGroup>
        </CButtonToolbar>
        {/* // 버튼영역 */}

        {/* 테이블 영역 */}
        {/*<CDataTable*/}
        {/*  items={items}*/}
        {/*  fields={fields}*/}
        {/*  loading={loading}*/}
        {/*  hover*/}
        {/*  cleaner*/}
        {/*  columnFilter={{ external: true }}*/}
        {/*  columnFilterValue={columnFilterValue}*/}
        {/*  onColumnFilterChange={setColumnFilterValue}*/}
        {/*  tableFilter={{ external: true }}*/}
        {/*  tableFilterValue={tableFilterValue}*/}
        {/*  onTableFilterChange={setTableFilterValue}*/}
        {/*  sorter*/}
        {/*  sorterValue={sorterValue}*/}
        {/*  onSorterValueChange={setSorterValue}*/}
        {/*  itemsPerPageSelect={{ external: true }}*/}
        {/*  itemsPerPage={itemsPerPage}*/}
        {/*  onPaginationChange={setItemsPerPage}*/}
        {/*/>*/}
        <CPagination
          pages={pages}
          activePage={page}
          onActivePageChange={setPage}
          align="center"
          className={pages < 2 ? "d-none" : ""}
        />
        {/* // 테이블 영역 */}
      </CCard>
    </div>
  );
};

export default FotaHistroySearchPage;
