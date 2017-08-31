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

                                    <!--<template>-->
                                    <!--<td class="action remove is-visible" v-if="!(isEdit && editable) && operable">-->

                                    <!--</td>-->
                                    <!--</template>-->
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
    //import {Loading} from 'element-ui';
    import {util} from '../../util/util';
    import tbody from './tbody.vue';
    import td from './td.vue';
    import thead from './thead.vue';
    import tr from './tr.vue';
    export default{
        props: {
            isHover:{
                default:false
            },
            head: {
                default: function () {
                    return []
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
                    return []
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
          'b-tr':tr
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
                if (val) {
                    if (this.domLoading === null) {
                        this.showLoading();
                    }
                }
                else {
                    this.domLoading.close();
                    this.domLoading = null;
                }
                ;
            },
            isEdit: function (val) {
                /*通知上级，表格当前状态，以判断是否可以跳转*/
                this.$emit('getTableStatus', val);
                this.$emit('getTableId');
            },
            error: function (val) {


                if (val != null) {
                    for (let errorItem in val) {
                        this.sourceData.map((sourceItem)=> {
                            if (errorItem == sourceItem._id) {
                                for (let vItem in val[errorItem]) {
                                    sourceItem[vItem] = val[errorItem][vItem];
                                }
                            }
                        });
                    }
                    ;
                    this.changeList = {
                        add: [],
                        update: [],
                        remove: []
                    };
                } else {
                    this.updata_tmp = {}
                }


            },
            data: function (val, oldVal) {
                this.sourceData = util.clone(val);
                let arrColumn = [];
                for (let i in this.column) {
                    if (this.column[i].merge) {
                        arrColumn.push(this.column[i].name);
                    }
                }


                this.sourceData = this.updateId(this.sourceData);
                if (arrColumn.length > 0) {
                    this.sourceData = util.orderBy(util.clone(this.sourceData), arrColumn, 'desc').results;
                    this.sourceMergeData = this.formatData(this.sourceData, arrColumn);
                }

            },
            checkAll (val) {
                this.checkedItems = [];
                if (val) {
                    this.sourceData.map((item, i) => {
                        this.checkedItems.push(item._id)
                    })
                } else {
                    this.checkedItems = []
                }
            }
        },
        methods: {
            getAttr: function (attr) {
                return attr ? attr : 1;
            },
            log: function (val) {

            },
            clearData: function () {
                this.changeList = {
                    add: [],
                    update: [],
                    remove: []
                };
            },
            onEdit: function (type) {
                this.isEdit = this.isEdit ? false : true;
                this.editType=type;
                this.$emit('editType',type)
            },
            onAdd: function (e) {
                /*添加数组*/
                let item = {};
                for (let i in this.column) {
                    if (this.column[i].type == 'switch') {
                        item[this.column[i].name] = "1";
                    }
                    else {
                        item[this.column[i].name] = "";
                    }
                }
                let _id = "tr_add" + (new Date()).getTime();
                item['_id'] = _id;
                item['_action'] = 'add';
                this.$emit('isAdd', item);
                this.sourceData.push(Object.assign({}, item));
                /*空对象*/
                this.emptyObj = Object.assign({}, item);
                this.isEdit = true;
            },
            onSave: function (e) {
                this.isEdit = false;
                let tmp = [];
                this.sourceData.map((item, i) => {
                    for (let v in item) {
                        if (item[v] && typeof item[v] == "object") {
                            item[v] = item[v].value;
                        }
                    }
                    if (item._action === 'add') {
                        /*如果和空对象值相等，就去掉*/
                        if (util.isEqual(this.emptyObj, item)) {
                            tmp.push(item._id);

                        } else {

                            this.changeList.add.push(item);
                        }
                    }
                });
                tmp.map((_id, i)=> {
                    this.sourceData.map((item, j)=> {
                        if (item._id == _id) {
                            this.sourceData.splice(j, 1);
                        }
                    })
                });
                /**
                 * 去重复
                 * */
                let array_update = [];
                this.sourceData.map((item, i) => {
                    let array_tmp = [];
                    this.changeList.update.map((_item, _i) => {
                        if (item._id == _item._id) {
                            array_tmp.push(_item);
                        }
                    });
                    if (array_tmp.length > 0) {
                        array_update.push(array_tmp[array_tmp.length - 1]);
                    }

                    if (item._action)
                        delete item._action;
                });
                this.changeList.update = array_update;
                /**/

                this.$emit('update', this.changeList, this.sourceData);
                this.updata_tmp = Object.assign({}, this.changeList);
                if (this.clear) {
                    this.changeList = {
                        add: [],
                        update: [],
                        remove: []
                    };
                }

            },
            onRemove: function (val, e) {
                this.checkKey = new Date().getTime();
                this.checkedItems.map((item, i) => {
                    this.sourceData.map((_item, _i) => {
                        if (item == _item._id) {
                            if (_item['_action'] != 'add') {
                                _item['_action'] = 'remove';
                                this.changeList.remove.push(_item);
                                this.sourceData.splice(_i, 1);
                            } else {
                                this.sourceData.splice(_i, 1);
                            }

                        }
                    })
                });
                this.checkedItems = [];
                this.checkAll = true;
                this.checkAll = false;

            },
            onCancel: function () {
                this.sourceData = util.clone(this.data);
                this.sourceData = this.updateId(this.sourceData);
                this.isEdit = false;
//                this.addable = false;
                this.changeList = {
                    add: [],
                    update: [],
                    remove: []
                };
                this.checkedItems = [];
            },
            showLoading: function () {
                this.domLoading = Loading.service({
                    target: '#' + this.tableId,
                    body: false,
                    lock: true,
                    fullscreen: false,
                    text: ''
                });
            },
            submitDraft(){
                this.isEdit=false;
                this.$emit('submitDraft',this.sourceData);
            },
            /*更新记录*/
            update(val, name, row, columnName){
                this.switchDate={date:this.sourceData[row],columnName:columnName};
                let item = this.sourceData[row];
                if (item._action !== 'add') {
                    /*当前修改行*/
                    this.changeList.update.push(item);
                }

                this.$emit('thisRow', item, this.sourceData, row, columnName);
            },
            updateId(data){
                data.map((item, i)=> {
                    if (!item["_id"]) {
                        item['_id'] = "tr_update_" + i;
                    }
                });
                return data;
            },

            /**
             * 多选
             */

            changeCheck(val) {
                let array_tmp = true;
                this.checkedItems.map((item, i) => {
                    if (item == val) {
                        this.checkedItems.splice(i, 1);
                        array_tmp = false;
                    }
                })
                if (array_tmp) {
                    this.checkedItems.push(val)
                }
            },

            /**
             * 点击 <th> 返回当前排序的字段
             * val   返回当前列字段
             */
            sortMethod(val) {
                if (!this.sortStatus[val] || this.sortStatus[val]== 1) {

                    this.sortStatus[val]=1;
                    this.sortStatus[val]++;
                } else if (this.sortStatus[val] == 2) {

                    this.sortStatus[val]++;
                } else if (this.sortStatus[val] == 3) {
                    this.sortStatus[val] = 1;
                }
                this.$emit('onSort', this.sortStatus[val], val);

            },
            /**
             * 点击查看按钮
             * data  返回当前行的数据
             * index 返回索引值
             */
            cell_click(item, index) {
                this.$emit('onLookup', item, index);
            },
            /**
             * 点击当前行
             * data  返回当前行的数据
             * index 返回索引值
             */
            row_click (data, index) {
                this.$emit('row_click', data, index);
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
                this.dialogVisible = true;
                this.rowIndex = index;
                this.fileList = fileData;
                this.actionApi = actionApi;
                if (!this.isEdit)
                    return false;
                this.$nextTick(()=> {
                    if (this.$refs.upload['uploadFiles'] && this.$refs.upload.uploadFiles.length > 0) {
                        this.isUploadStatus = 'ready';
                    } else {
                        this.isUploadStatus = null;
                    }

                })
            },
            /*上传控件 */
            submitUpload() {
                this.actionApi = this.uploadApi;
                this.$nextTick(()=> {
                    this.$refs.upload.submit();
                })

            },
            uploadChange(file, fileList) {
                if (file.status == 'ready') {
                    this.uploadFiles = Object.assign([], fileList);
                    this.isUploadStatus = 'ready';
                }
                /*上传失败*/
                else if (file.status == 'fail') {
                    this.isUploadStatus = file.status;
                    /*上传成功*/
                } else if (file.status == 'success') {
                    this.isUploadStatus = file.status;
                    this.fileList = file.response;    //上传成功，加到文件列表处

                    this.$refs.upload.uploadFiles.find((item, index)=> {
                        if (file.uid == item.uid) {
                            this.$refs.upload.uploadFiles.splice(index, 1);
                        }
                    })

                }
                this.$emit('upload', file, fileList, this.rowIndex);
            },
            /*模态框关闭前*/
            uploadHandleClose() {
                /*把上存上列表清空*/
                if (this.isUploadStatus == 'success') {
                    this.$refs.upload.uploadFiles = [];
                }
                this.dialogVisible = false;
                this.isUploadStatus = 'ready';
            },
            /*上传之前*/
            beforeUpload () {
                this.isUploadStatus = 'loading';
            },

            downloadFile(fileUrl){
                this.$emit('downloadFile', fileUrl);
            },

            /**
             * 删除已上传的文件通知
             * @param index  返回删除的索引值
             */
            deleteFile (index, md5) {
                this.fileList.splice(index, 1);
                this.$emit('deleteFile', this.rowIndex, md5);
            },
            /**
             * 点击查看事件
             */
            lookup(row){
                this.$emit('lookup', row)
            },
            onReason(row, col, index){
                this.$emit('onReason',row, col, index)
                this.reasonVisible = true;
                this.initRow = Object.assign({}, this.data)[index];
                this.row = row;
                this.reasonModel = this.row['reason'];
            },
            onReasonCancel(){

                this.reasonVisible = false;
                /*初始状态*/
                //     this.row['is_close']=this.initRow['is_close'];
                /*上一次状态*/
                this.switchDate.date[this.switchDate.columnName]= '1';

            },
            handleClose(){
                this.reasonVisible = false;
                /*初始状态*/
                //     this.row['is_close']=this.initRow['is_close'];
                /*上一次状态*/
                if (this.isEdit) {
                    this.switchDate.date[this.switchDate.columnName]= '1';
                   // this.row['is_edit'] = '1';
                }


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
                this.$emit('handleSelect', val, index, this.sourceData)
            },
            /**
             * 模态框输入
             * @param item 当前行内容
             */
            dialogInput(item){
                this.dialogDate=Object.assign({},item);
                this.dialogData=item;
                this.dialogInputVisible=true;
            },
            onChange(val,data,index){
                let row=null;
                this.$set(this.dialogData,index,val);

                this.sourceData.find((item,i)=>{
                    if(data._id==item._id){
                        row=i;
                    }
                })
                this.update(val, '', row, index);
            },
            toDate(val){
                return new Date(val);
            }

        },

        beforeMount: function () {
            this.tableId = "b_table_" + (new Date()).getTime();
        },

        mounted: function () {
            this.$on('tableController',(methodName)=>{
                this[methodName]();
            });
            this.sourceData = util.clone(this.data);
            this.sourceData = this.updateId(this.sourceData);

            if (this.loading) {
                this.showLoading();
            }
        },


    }
</script>