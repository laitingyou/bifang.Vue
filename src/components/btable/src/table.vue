<template>
    <div :id="tableId">
        <div class="tools" v-if="editable">
            <el-button @click="onEdit('normal')" type="text" size="small" v-if="editable && !isEdit ">
                <icon scale="0.5" name="pencil"></icon>
                编辑
            </el-button>
            <el-button @click="onEdit('draft')" type="text" size="small" v-if="editable && !isEdit && draftable">
                <icon scale="0.5" name="pencil"></icon>
                编辑草稿
            </el-button>
            <el-button @click="onSave" type="text" size="small" v-if="editable && isEdit">
                <icon scale="0.5" name="check"></icon>
                保存
            </el-button>

            <el-button @click="onCancel" type="text" size="small" v-if="editable && isEdit">
                <icon scale="0.5" name="undo"></icon>
                取消
            </el-button>
            <el-button @click="onAdd" type="text" size="small" v-if="addable && isEdit">
                <icon scale="0.5" name="plus"></icon>
                添加
            </el-button>
            <el-button @click="submitDraft" type="text" size="small" v-if="editable && draftable && isEdit && (editType=='draft')">
                <icon scale="0.5" name="pencil"></icon>
                提交审批
            </el-button>
            <el-button @click="onRemove('all')" type="text" size="small"
                       v-if="editable && isEdit && checkedItems.length>0 && deletable">
                <icon scale="0.5" name="minus"></icon>
                删除
            </el-button>
            <el-button @click="onImport" type="text" size="small" v-if="editable && !isEdit && fileImport">
                <icon scale="0.5" name="upload"></icon>
                导入
            </el-button>
            <el-button @click="onExport" type="text" size="small" v-if="editable && !isEdit && fileExport">
                <icon scale="0.5" name="download"></icon>
                导出
            </el-button>
            <!--<div style="margin: 15px 0;"></div>-->
        </div>

        <div style="position: relative" :class="{'b-table':true, 'hover':isHover}">
            <div class=" el-table  el-table--fit el-table--border el-table--enable-row-hover"
                 style="overflow-x:auto;">
                <div class="el-table__header-wrapper" :style="{width:width,overflowX:'auto'}">
                    <table cellspacing="0" cellpadding="0" border="0" style="width: 100%"
                           class="el-table__header">
                        <b-thead>
                            <template v-for="(item, index) in head">
                                <b-tr>
                                    <template v-if="isEdit && editable && index==0 && deletable">
                                        <b-th class="is-visible checkboxGrid" style="width: 47px;cursor: default"
                                              :rowspan="getAttr(head.length) ">

                                        </b-th>
                                    </template>
                                    <b-th v-if="dialogInputable" class="is-visible" :rowspan="getAttr(head.length) " style="width: 85px">

                                    </b-th>
                                    <template v-for="(value, valueIndex) in item">
                                        <b-th :rowspan="getAttr(value.rowspan)"
                                              :colspan="getAttr(value.colspan)"
                                              :cellWidth="value.cellWidth"
                                              :sortable="value.sortable"
                                              @sortMethod="sortMethod(value.columnName)"
                                              :align="value.align"
                                              :style="{cursor: 'default'}"

                                        >
                                            {{value.label}}
                                        </b-th>
                                    </template>
                                </b-tr>
                            </template>

                        </b-thead>

                        <b-tbody>
                            <template v-for="(item, index) in sourceData">
                                <b-tr @row_click="row_click(item,index)">
                                    <template v-if="isEdit && editable && deletable">
                                        <b-th class="is-visible">
                                        </b-th>
                                    </template>
                                    <b-th v-if="dialogInputable" class="is-visible clip" style="text-align: center">
                                        <el-button type="text">
                                            view
                                        </el-button>
                                    </b-th>
                                    <template v-for="(columnItem, columnIndex) in column">
                                        <template v-if="columnItem.merge && sourceMergeData[index][columnItem.name] ">
                                            <b-td
                                                    @onReason="onReason(item,item[columnItem.name],index)"
                                                    :background="item['background']"
                                                    :fontColor="item['font_color']"
                                                    :value.sync="item[columnItem.name]"
                                                    :mode="columnItem.mode"
                                                    :rowspan="getAttr(sourceMergeData[index][columnItem.name])"
                                                    :isEdit="isEdit"
                                                    :name="item._id"
                                                    :row="index"
                                                    :type="columnItem.type"
                                                    :typeData="columnItem.typeData?columnItem.typeData:null"
                                                    @update="update"
                                                    :uploadFileData="item.fileData"
                                                    @upload="upload(item.fileData,uploadApi,index)"
                                                    @deleteFile="deleteFile"
                                                    :columnNames="columnItem.name"
                                                    @lookup="lookup(item)"
                                                    :colSuffix="columnItem['suffix']?columnItem['suffix']:''"
                                                    @editController="editController"
                                                    :inputWidth="inputWidth"
                                                    @handleSelect="handleSelect"
                                            >
                                            </b-td>
                                        </template>

                                        <template v-else-if="!columnItem.merge">
                                            <b-td
                                                    @onReason="onReason(item,item[columnItem.name],index)"
                                                    :background="item['background']"
                                                    :fontColor="item['font_color']"
                                                    :value.sync="item[columnItem.name]"
                                                    :mode="columnItem.mode"
                                                    :isEdit="isEdit"
                                                    :name="item._id"
                                                    :type="columnItem.type"
                                                    :row="index"
                                                    :typeData="columnItem.typeData?columnItem.typeData:null"
                                                    @update="update"
                                                    :uploadFileData="item.fileData"
                                                    @upload="upload(item.fileData,uploadApi,index)"
                                                    @deleteFile="deleteFile"
                                                    :columnNames="columnItem.name"
                                                    @lookup="lookup(item)"
                                                    :colSuffix="columnItem['suffix']?columnItem['suffix']:''"
                                                    @editController="editController"
                                                    :inputWidth="inputWidth"
                                                    @handleSelect="handleSelect"
                                            ></b-td>
                                        </template>

                                    </template>

                                </b-tr>
                            </template>
                            <b-tr v-if="Total && (!isEdit || !editable) && sourceData.length>0" v-for="(item,index) in Total" :key="index">
                                <template v-if="isEdit && editable">
                                    <b-th class="is-visible">


                                    </b-th>
                                </template>
                                <b-td v-for="(columnItem, columnIndex) in column"
                                      :colSuffix="columnItem['suffix']?columnItem['suffix']:''"
                                      :value.sync="item[columnItem.name]"
                                      :typeData="columnItem.typeData?columnItem.typeData:null"
                                      :name="item._id"
                                      :background="'#f0f6ee'"
                                      class="tr-total"
                                      :key="columnIndex"
                                ></b-td>
                            </b-tr>
                        </b-tbody>
                    </table>
                </div>
                <div v-if="sourceData.length==0" class="el-table__empty-block" style="width:100%"><span
                        class="el-table__empty-text"></span></div>
            </div>
            <!--固定表格-->
            <div class="table-two b-table-fixed el-table el-table--fit el-table--border"
                 style="overflow-x:hidden; ">
                <div class="el-table__header-wrapper" :style="{width:width,overflowX:'hidden'}">
                    <table cellspacing="0" cellpadding="0" border="0" style="width: 100%"
                           class="el-table__header">
                        <b-thead class="is-hidden">
                            <template v-for="(item, index) in head">
                                <b-tr>
                                    <template v-if="isEdit && editable && index==0 && deletable">
                                        <b-th class="is-visible checkboxGrid clip" :rowspan="getAttr(head.length) ">
                                            <el-checkbox v-model="checkAll"></el-checkbox>
                                        </b-th>
                                    </template>
                                    <b-th v-if="dialogInputable" class="is-visible" :rowspan="getAttr(head.length) " style="width: 85px">
                                        Option
                                    </b-th>
                                    <template v-for="(value, valueIndex) in item">
                                        <b-th :rowspan="getAttr(value.rowspan)"
                                              :class="!value.fixed?'is-hidden':'is-visible'"
                                              :colspan="getAttr(value.colspan)"
                                              :sortable="value.sortable"
                                              :style="{cursor: 'default'}"
                                              :cellWidth="value.cellWidth"
                                              :align="value.align"
                                              @sortMethod="sortMethod(value.columnName)"
                                        >
                                            {{value.label}}
                                        </b-th>
                                    </template>
                                </b-tr>
                            </template>
                        </b-thead>

                        <b-tbody>
                            <template v-for="(item, index) in sourceData">

                                <b-tr>

                                    <template v-if="isEdit && editable && deletable">
                                        <b-th class="is-visible clip">

                                            <el-checkbox :key="index" v-if="checkAll" :checked="checkAll"
                                                         @change="changeCheck(item._id)"></el-checkbox>
                                            <el-checkbox class="currentChecked" :key="checkKey" ref="input" v-else
                                                         @change="changeCheck(item._id)"></el-checkbox>
                                        </b-th>
                                    </template>
                                    <b-th v-if="dialogInputable" class="is-visible clip" style="text-align: center">
                                        <el-button type="text" @click="dialogInput(sourceData[index])">
                                            {{isEdit ? 'Edit':'View' }}
                                        </el-button>
                                    </b-th>
                                    <template v-for="(columnItem, columnIndex) in column">
                                        <template v-if="columnItem.merge&&sourceMergeData[index][columnItem.name] ">
                                            <b-td
                                                    @onReason="onReason(item,item[columnItem.name],index)"
                                                    :value.sync="item[columnItem.name]"
                                                    :class="!columnItem.fixed?'is-hidden':'is-visible'"
                                                    :mode="columnItem.mode"
                                                    :rowspan="getAttr(sourceMergeData[index][columnItem.name])"
                                                    :name="item._id"
                                                    :type="columnItem.type"
                                                    :row="index"
                                                    :colSuffix="columnItem['suffix']?columnItem['suffix']:''"
                                                    :typeData="columnItem.typeData?columnItem.typeData:null"
                                                    :isEdit="isEdit"
                                                    @update="update"
                                                    :columnNames="columnItem.name"
                                                    :background="item['background']"
                                                    :fontColor="item['font_color']"
                                                    @editController="editController"
                                                    :inputWidth="inputWidth"
                                                    :uploadFileData="item.fileData"
                                                    @upload="upload(item.fileData,uploadApi,index)"
                                                    @handleSelect="handleSelect"
                                            ></b-td>
                                        </template>

                                        <template v-else-if="!columnItem.merge">
                                            <b-td
                                                    @onReason="onReason(item,item[columnItem.name],index)"
                                                    :value.sync="item[columnItem.name]"
                                                    :class="!columnItem.fixed?'is-hidden':'is-visible'"
                                                    :mode="columnItem.mode"
                                                    :type="columnItem.type"
                                                    :colSuffix="columnItem['suffix']?columnItem['suffix']:''"
                                                    :typeData="columnItem.typeData?columnItem.typeData:null"
                                                    :name="item._id"
                                                    :row="index"
                                                    :isEdit="isEdit"
                                                    @update="update"
                                                    :columnNames="columnItem.name"
                                                    :background="item['background']"
                                                    :fontColor="item['font_color']"
                                                    @editController="editController"
                                                    :inputWidth="inputWidth"
                                                    :uploadFileData="item.fileData"
                                                    @upload="upload(item.fileData,uploadApi,index)"
                                                    @handleSelect="handleSelect"
                                            >
                                            </b-td>
                                        </template>
                                    </template>
                                </b-tr>
                            </template>
                            <b-tr v-if="Total && (!isEdit || !editable) && sourceData.length>0" v-for="(item,index) in Total"  :key="index">
                                <template v-if="isEdit && editable">
                                    <b-th class="is-visible">

                                    </b-th>
                                    <b-th class="is-visible">

                                    </b-th>
                                </template>
                                <b-td v-for="(columnItem, columnIndex) in column"
                                      :colSuffix="columnItem['suffix']?columnItem['suffix']:''"
                                      :value.sync="item[columnItem.name]"
                                      :typeData="columnItem.typeData?columnItem.typeData:null"
                                      :name="item._id"
                                      :class="!columnItem.fixed?'is-hidden':'is-visible'"
                                      class="tr-total"
                                      :background="'#f0f6ee'"
                                      :key="columnIndex"
                                ></b-td>
                            </b-tr>
                        </b-tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

</template>
<style>
    .el-form-item__label{
        color:#61758F;
    }
    .el-dialog__body{
        font-family: Helvetica, sans-serif;
        color:#000000;
    }
    .el-table .cell {
        word-break: break-word;
    }

    .clip .cell {
        text-overflow: clip !important;
    }

    .productEditForm .el-dialog{
        width:80%;
    }
    .productEditForm .el-form-item__content {
        width:60%;
    }
    .productEditForm .el-textarea__inner{
        height: 140px;
    }
    .productEditForm .el-date-editor.el-input{
        width: 100%;
    }
</style>
<style scoped>
    .form-cell {
        border: 1px solid #eaeefb;
        border-radius: 4px;
        transition: .2s;
        padding: 24px;
        width: 87%;
        margin: auto;
    }
    ::-webkit-scrollbar {
        height: 12px;
        background-color: #fbfdff;
    }

    ::-webkit-scrollbar-track {
        background-color: #dfe6ec;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background-color: #C2C2C2;
    }

    .tools {
        background-color: #d4dff9;
        /*padding: 10px;*/
        padding: 5px 10px 5px 10px;
        margin-bottom: 0px;
    }

    .el-table__header-wrapper {
        overflow-x: auto;
        /*min-width: 1500px;*/
    }

    .el-table--enable-row-hover tr:hover > td {
        background-color: #eef1f6;
        background-clip: padding-box;
    }

    .el-table table {
        /*width: 2000px !important;*/
        /*font-size: 12px !important;*/
    }
    .b-hidden {
        visibility: hidden !important;
    }

    .b-table-fixed {
        visibility: hidden;
        position: absolute;
        top: 0px;
    }

    .www {
        position: absolute;
        top: 0px;
        right: 0px;
        visibility: hidden;
    }

    .b-table-fixed .is-visible {
        visibility: visible;
    }

    .action {
        width: 70px;
        border-left: 1px solid #dfe6ec;
    }

    .remove * {
        /*color: #FF4949 !important;*/
    }

    .tr-total {
        background: #eef1f6;
        font-weight: bold;
    }

    .checkboxGrid {
        width: 52px;
    }

    .el-table::after {
        width: 0;
    }

</style>


<script>
    import {tableData} from '../../../util/model';
    import tbody from './tbody.vue';
    import td from './td.vue';
    import thead from './thead.vue';
    import tr from './tr.vue';
    import th from './th.vue';
    export default{
        name:'BTable',
        props: {
            isHover:{
                default:false
            },
            head: {
                default: function () {
                    return tableData.head
                }
            },
            data: {
                default: function () {
                    return []
                }
            }
            ,
            column: {
                default: function () {
                    return tableData.column
                }
            },
            width: {
                default: "100%"
            },
            loading: {
                default: false
            },
            addable: {
                default: false
            },
            editable: {
                default: false
            },
            deletable: {
                default: true
            },
            save: {
                default: function () {

                }
            },
            Total: {
                default: ''
            },
            operable: {
                default: false
            },
            uploadApi: {
                default: ''
            },
            align: {
                default: 'left'
            },
            error: {
                default: function () {
                    return []
                }
            },
            clear: {
                default: true
            },
            inputWidth: {
                default: '100%'
            },
            fileImport: {
                default: false
            },
            fileExport: {
                default: false
            },
            dialogInputable:{
                default:false
            },
            switchTitle: {
                type: Object,
                default() {
                    return {};
                }
            },
            draftable:{
                default:false
            }
        },
        components:{
          'b-tbody':tbody,
          'b-thead':thead,
          'b-td':td,
          'b-tr':tr,
            'b-th':th
        },
        data: function () {
            return {
                isUploadStatus: null,
                rowIndex: 0,
                actionApi: '',
                uploadFiles: [],
                dialogVisible: false,
                fileList: [],
                reasonVisible: false,
                reasonModel: '',
                row: {},
                initRow: {},
                checkAll: false,
                checkSingle: false,
                domLoading: null,
                tableId: 0,
                sourceData: [],
                sourceMergeData: [],
                isEdit: false,
                changeList: {
                    add: [],
                    update: [],
                    remove: []
                },
                tableUpdate: [],
                checkedItems: [],
                checkKey: new Date().getTime(),
                sortStatus: {},//排序说明：1正常排序 ,  2 减序,  3 增序
                /*添加空行*/
                emptyObj: {},
                updata_tmp: {},
                dialogData:{},
                dialogInputVisible:false,
                dialogDate:{},
                switchDate:{},
                editType:'normal'
            }
        },
        watch: {
            loading: function (val, oldVal) {

            },
            isEdit: function (val) {

            },
            error: function (val) {





            },
            data: function (val, oldVal) {


            },
            checkAll (val) {

            }
        },
        methods: {
            getAttr: function (attr) {

            },
            clearData: function () {

            },
            onEdit: function (type) {

            },
            onAdd: function (e) {

            },
            onSave: function (e) {


            },
            onRemove: function (val, e) {


            },
            onCancel: function () {

            },
            submitDraft(){

            },
            /*更新记录*/
            update(val, name, row, columnName){

            },
            updateId(data){

            },

            /**
             * 多选
             */

            changeCheck(val) {

            },

            /**
             * 点击 <th> 返回当前排序的字段
             * val   返回当前列字段
             */
            sortMethod(val) {


            },
            /**
             * 点击查看按钮
             * data  返回当前行的数据
             * index 返回索引值
             */
            cell_click(item, index) {

            },
            /**
             * 点击当前行
             * data  返回当前行的数据
             * index 返回索引值
             */
            row_click (data, index) {

            },

            /**
             * 格式化data
             * @param lists
             * @param arrColumn
             */
            formatData(lists, arrColumn) {
                /*把相同字段的行，分成几个数组*/
                var mergeData = [];
                for (let m in lists) {
                    mergeData.push({value: ""});
                }


                function _sort(list, mergeList, column) {

                    let lastValue = "";
                    let lastIndex = 0;

                    let mergeIndex = 0;
                    let count = 1;

                    list.map((item, i) => {
                        mergeList[i]['value'] += item[column];
                        if (mergeList[i]['value'] === mergeList[lastIndex]['value'] && i != 0) {
                            count++;
                            //重新赋值
                            mergeList[mergeIndex][column] = count;
                        }
                        else {
                            mergeIndex = i;
                            count = 1;
                            mergeList[mergeIndex][column] = count;
                        }
                        lastValue = item[column];
                        lastIndex = i;

                    });
                    return mergeList;
                }

                /* 把所有数据给allData */
                let allData = util.clone(lists);
                /*循环每一个要排序的字段*/
                arrColumn.map((column, index) => {
                    mergeData = _sort(allData, mergeData, arrColumn[index]);
                });

                return mergeData;

            },

            /**
             * 上传文件返回参数
             * @param file  当前状态文件
             * @param fileList 所有文件
             */
            /*点击弹出上传的模态框 */
            upload (fileData, actionApi, index) {

            },
            /*上传控件 */
            submitUpload() {


            },
            uploadChange(file, fileList) {

            },
            /*模态框关闭前*/
            uploadHandleClose() {

            },
            /*上传之前*/
            beforeUpload () {

            },

            downloadFile(fileUrl){

            },

            /**
             * 删除已上传的文件通知
             * @param index  返回删除的索引值
             */
            deleteFile (index, md5) {

            },
            /**
             * 点击查看事件
             */
            lookup(row){

            },
            onReason(row, col, index){

            },
            onReasonCancel(){

                this.switchDate.date[this.switchDate.columnName]= '1';

            },
            handleClose(){



            },
            onReasonSubmit(){
                this.reasonVisible = false;
                this.row['reason'] = this.reasonModel;
            },
            editController(val){
                this.$nextTick(()=> {
                    this.isEdit = val;
                })

            },
            /**
             * 文件导入导出
             */
            onImport(){
                this.$emit('onImport');
            },
            onExport(){
                this.$emit('onExport');
            },
            handleSelect(val, index) {

            },
            /**
             * 模态框输入
             * @param item 当前行内容
             */
            dialogInput(item){

            },
            onChange(val,data,index){

            },
            toDate(val){
                return new Date(val);
            }

        },

        beforeMount: function () {
            this.tableId = "b_table_" + (new Date()).getTime();
        },

        mounted: function () {
            this.sourceData=tableData.data;
        },


    }
</script>