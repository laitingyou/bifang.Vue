/**
 * 表格
 *
 *
 *
 * @param {Object} [options] 初始化参数
 *
 *     @example
 *     {
 *       checkbox:true,     //每列前面是否有复选框
 *       noDataHtml: '没有数据',
 *       columns: [{
 *           label: '名称',  //列头的标题
 *           field: 'name',  //数据字段标示
 *           title: '名称',  //列头的title属性
 *           width: '300px', //列宽，单位：px
 *           align: 'center',//列头标题的对齐方式
 *           sortable: true, //列是否可排序
 *           render: [function(data, row){
 *               return html = '<a href="javascript:void(0);">'+(data + 'bizdev')+'</a>';
 *           },function(data, row){
 *               return data;
 *           }]
 *        }]
 *      }
 */
function Table(options) {
   console.log(123);
}