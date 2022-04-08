import { isNull } from './utils';

const reformatCheckList = (type, array, checked, filterArray) => {
  return (
    array &&
    array.map((v) => {
      if (!isNull(filterArray)) {
        const data = filterArray.find((el) => el.groupCode === v.groupCode);
        return {
          ...v,
          id: v.groupCode,
          checked: !isNull(data),
          children: v.children?.map((i, cIndex) => ({
            ...i,
            groupCode: v.groupCode,
            id: !isNull(i.apiId) ? i.apiId : String(i.valueSeq),
            checked: !isNull(data),
          })),
        };
      } else {
        return {
          ...v,
          id: v.groupCode,
          checked: checked,
          labelText: type === 'protocolApiList' ? v.groupNm : '',
          children: v.children?.map((i) => ({
            ...i,
            checked: checked,
            groupCode: v.groupCode,
            id: !isNull(i.valueSeq) ? String(i.valueSeq) : i.apiId,
          })),
        };
      }
    })
  );
};

const handleGroupChecked = (list, checked, groupCode) => {
  return (
    list &&
    list.map((item, index) => {
      if (item.groupCode === groupCode) {
        return {
          ...item,
          checked: !item.checked,
          children: item.children?.map((i) => ({
            ...i,
            checked: !item.checked,
          })),
        };
      }
      return item;
    })
  );
};

const handleItemChecked = (list, checked, item, category) => {
  return (
    list &&
    list.map((v, index) => {
      if (v.groupCode === item.groupCode) {
        const result = v.children.map((i) => {
          if (i[category] === item[category]) {
            return {
              ...i,
              checked: checked,
            };
          }
          return i;
        });
        return {
          ...v,
          checked: result.some((v) => v.checked),
          children: result,
        };
      }
      return v;
    })
  );
};

const checkedToggleAll = (list, checked) => {
  return (
    list &&
    list.map((item) => {
      return {
        ...item,
        checked: checked,
        children: item.children?.map((i, cIndex) => ({
          ...i,
          checked: checked,
        })),
      };
    })
  );
};

// const handleItemChecked = (list, checked, item) => {
//   console.log(
//     'handleItemChecked item >> ',
//     JSON.stringify(list),
//     checked,
//     item,
//   );
//
//   let groupItems = getValueItems(list, 'groupCode', item.groupCode);
//   let elItems = getValueItems(
//     groupItems.selectedItem.children,
//     'valueSeq',
//     item.valueSeq,
//   );
//
//   console.log('groupItems >> ', JSON.stringify(groupItems));
//   console.log('elItems >> ', JSON.stringify(elItems));
//   if (!isNull(groupItems) && !isNull(elItems)) {
//     let children = groupItems.selectedItem.children;
//
//     console.log('elItems.selectedIndex >> ', elItems.selectedIndex);
//
//     console.log('chldren >>  ', JSON.stringify(children));
//
//     children.splice(elItems.selectedIndex, 1);
//
//     elItems.selectedItem.checked = checked;
//
//     children.splice(elItems.selectedIndex, 0, elItems.selectedItem);
//
//     console.log('children >> ', children);
//
//     groupItems.selectedItem.children = children;
//     // groupCode Checked는 children에서 하나라도 true가 있는 경우
//     groupItems.selectedItem.checked = groupItems.selectedItem.children.some(
//       (v) => v.checked,
//     );
//
//     list.splice(groupItems.selectedIndex, 1);
//
//     list.splice(groupItems.selectedIndex, 0, groupItems.selectedItem);
//   }
//
//   console.log('@@@@ list >>> ', list);
//
//   return list;
//
//   // {} groupCode Checked는 children에서 하나라도 true가 있는 경우
//   //
// };
// const getValueItems = (list, category, value) => {
//   const selectedItem = list.find((el) => el[category] === value);
//
//   const selectedIndex = list.findIndex((el) => el[category] === value);
//
//   return {
//     selectedItem: selectedItem,
//     selectedIndex: selectedIndex,
//   };
// };

export {
  reformatCheckList,
  handleGroupChecked,
  handleItemChecked,
  checkedToggleAll,
};
