import React from 'react'
import "react-tabulator/css/bootstrap/tabulator_bootstrap.min.css";
import { ReactTabulator } from 'react-tabulator'

function BootstrapTable() {
    // () => [
    //   {
    //         Header: 'Склад',
    //         accessor: 'warehouse',
    //   },
    //   {
    //     Header: 'ИД Приемки',
    //     accessor: 'receiptID',
    //   },
    //   {
    //     Header: 'Тип приемки',
    //     role: 'receipt_type',
    //     accessor: 'receipt_type',
    //   },
    //   {
    //     Header: 'Интеграция',
    //     accessor: 'integration',
    //   },
    //   {
    //     Header: 'Статус приемки',
    //     accessor: 'receipt_sts',
    //   },
    //     ],
    // []

  const columns = [
    {title:"Внутренний номер приемки",field:"internal_receipt_num",visible:false,responsive:0},
    { title: "Склад", field: "warehouse", width: 150,headerFilter: "input",responsive:0},
    { title: "ИД приемки", field: "receiptID",width:"auto", hozAlign: "left",headerFilter: "input",responsive:0, formatter: 'link',
      formatterParams:{
        urlPrefix: window.location.origin + '/receipt/'
      },
      formatter: function(cell, formatterParams, onRendered){
        let value = cell.getValue();
        let value1 = value.replace("/","_");//????? Нужно что-то думать с receiptID где есть слеши....
        let href = `${formatterParams["urlPrefix"]}${value1}`;
        return "<a href="+href+">"+value+"</i>"
      }
        // formatterParams: {
        // labelField: 'receiptID',
        // //urlPrefix: window.location.origin + '/receipt/',
        // urlPrefix: window.location.origin + "/receipt/",
        // // "urlPrefix": "/receipt/?receiptID=",
        // urlField: "receiptID",
        // }
    },//formatter: "progress" 
    { title: "Тип приемки", field: "receiptType" ,headerFilter: "input",responsive:0},
    { title: "Статус приемки", field: "receiptStatus", hozAlign: "center" ,headerFilter: "input",responsive:0},
    // { title: "Rating", field: "rating", hozAlign: "center", formatter: "star" },
    { title: "Интеграция", field: "integration", hozAlign: "center", formatter: "tickCross" ,headerFilter: "input",responsive:0}
  ];

  var data = [
    {id:1,internal_receipt_num:1, warehouse:"WH-TST", receiptID:"RC-TSTT-12312/01", receiptType:"Маркировка", receiptStatus:"Ожидает начала",integration:true},
    {id:2,internal_receipt_num:2, warehouse:"WH-TST", receiptID:"RC-TSTT-12312/02", receiptType:"Маркировка", receiptStatus:"Закрыто",integration:false},
    {id:3,internal_receipt_num:3, warehouse:"WH-TST", receiptID:"RC-TSTT-12312/03", receiptType:"Маркировка", receiptStatus:"В работе",integration:false},
    {id:4,internal_receipt_num:4, warehouse:"WH-TST", receiptID:"RC-TSTT-108-3333/01", receiptType:"Агрегация", receiptStatus:"Ожидает начала",integration:false},
    {id:5,internal_receipt_num:5, warehouse:"WH-TST", receiptID:"RC-TSTT-108-3333/02", receiptType:"Агрегация", receiptStatus:"В работе",integration:true},
    {id:6,internal_receipt_num:6, warehouse:"WH-TST", receiptID:"RC-TSTT-108-TEST", receiptType:"Агрегация", receiptStatus:"В работе",integration:true},
  ];

  return (
      <ReactTabulator className="table-striped table-hover mt-3"
 data={data}
 columns={columns}
 options={{groupBy:"warehouse", 
 layout: "fitDataTable",
 movableColumns: true,
 dataTree: true,
  dataTreeFilter: true,
// layout: 'fitDataStretch',
 rowClick: function (e, row) {
  row.treeToggle();
},
 locale: "ru-ru",
 langs: {
   "ru-ru": {
     "ajax": {
       "loading": "Загрузка", //ajax loader text
       "error": "Ошибка загрузки", //ajax error text
     },
     "groups": { //copy for the auto generated item count in group header
       "item": "приемка", //the singular  for item
       "items": "приемок", //the plural for items
     },
     "pagination": {
       "page_size": "Количество на странице", //label for the page size select element
       "page_title": "Показать страницу",//tooltip text for the numeric page button, appears in front of the page number (eg. "Show Page" will result in a tool tip of "Show Page 1" on the page 1 button)
       "first": "Первая", //text for the first page button
       "first_title": "Первая страница", //tooltip text for the first page button
       "last": "Последняя",
       "last_title": "Последняя страница",
       "prev": "Назад",
       "prev_title": "Предыдущая страница",
       "next": "Вперед",
       "next_title": "Следующая страница",
       "all": "Все",
     },
     "headerFilters": {
       "default": "filter column...", //default header filter placeholder text
       "columns": {
         "name": "filter name...", //replace default header filter text for column name
         "receiptID":"Фильтр по приемке"
       }
     }
   }}}}
></ReactTabulator>
  )
}

export default BootstrapTable

