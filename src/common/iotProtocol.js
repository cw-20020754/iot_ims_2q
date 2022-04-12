import { isNull } from './utils';

const reformatCheckList = (type, array, checked, filterArray) => {
  return (
    array &&
    array.map((v) => {
      if (!isNull(filterArray)) {
        const data = filterArray.find((el) => el.groupCode === v.groupCode);
        return {
          ...v,
          type: type,
          id: v.groupCode,
          checked: !isNull(data),
          labelText: v['groupNm'],
          children: v.children?.map((i, cIndex) => ({
            ...i,
            type: type,
            groupCode: v.groupCode,
            id: !isNull(i.apiId) ? i.apiId : String(i.valueSeq),
            labelText: i['desc'],
            checked: !isNull(data),
          })),
        };
      } else {
        return {
          ...v,
          type: type,
          id: v.groupCode,
          checked: checked,
          labelText: v['groupNm'],
          children: v.children?.map((i) => ({
            ...i,
            type: type,
            checked: checked,
            groupCode: v.groupCode,
            labelText: i['desc'],
            id: !isNull(i.valueSeq) ? String(i.valueSeq) : i.apiId,
          })),
        };
      }
    })
  );
};

const checkedToggleAll = (list, checked, changeType) => {
  return (
    list &&
    list.map((item) => {
      return {
        ...item,
        checked: checked,
        type: changeType,
        children: item.children?.map((i, cIndex) => ({
          ...i,
          checked: checked,
          type: changeType,
        })),
      };
    })
  );
};

export { reformatCheckList, checkedToggleAll };
