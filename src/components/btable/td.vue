<template>
    <td   :rowspan="rowspan" :colspan="colspan"
            :class="{noBorder:noBorder,animate:isChange}"
          :style="{background:background,color:tdValue==''?placeHolder.fontColor:''}"
    >

        <div v-if="mode === 'read_only'" class="cell" v-html="(tdValue || tdValue ===0) ?tdValue+suffix:'--'" >
            <template >

            </template>
        </div>
       <!-------------------------只写-------------------------------->
        <div v-else-if="mode === 'write_only'" class="cell" >
        <!--------------编辑状态-------------------------->
            <template v-if="isEdit">
                <!--输入框-->
                <template v-if="type=='text'">
                    <el-tooltip :disabled="tooltip.bgColor?false:true" class="item" effect="dark" :content="this.tooltip.message" placement="top-start">
                        <el-input ref="input"
                                  size="small"
                                  :value="tdValue"
                                  @change="onChange"
                                  :class="{focus:tooltip.bgColor?true:false}"
                                  :style="{width: inputWidth}"
                        >
                        </el-input>

                    </el-tooltip>
                    {{suffix}}
                </template>
                <!--下拉框-->
                <el-select size="small" v-else-if="type=='select'" v-model="selectValue"  filterable
                           placeholder="请选择">
                    <el-option
                            v-for="item in typeData"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-autocomplete v-else-if="type=='editableSelect'"
                        class="inline-input"
                        v-model="tdValue"
                        placeholder="请输入内容"
                        :fetch-suggestions="querySearch"
                        :trigger-on-focus='suggestion'
                        @select="handleSelect"
                ></el-autocomplete>
                <!--上传按钮-->
                <template v-else-if="type=='upload'">
                    <el-button @click="uploadModal" size="small" type="primary">上传文件({{uploadFileData.length}})</el-button>
                </template>
                <!--开关按钮-->
                <template v-else-if="type == 'switch' ">
                        <el-switch
                                v-model="switchValue"
                                @change="onChange"
                                on-value='1'
                                off-value='0'>
                        </el-switch>

                    <el-button  v-if="switchValue==0" size="small" type="text"  @click="onReason">
                        <icon style="color:#20a0ff;"   name="commenting" scale="1" ></icon>
                    </el-button>

                    <!--<el-button v-if="switchValue==0" size="small" type="text" @click="onReason">Reason</el-button>-->
                </template>
                <!--   日期选择器 -->
                <template v-else-if="type == 'date' ">
                    <div class="block">
                        <el-date-picker @change="onChange"
                                format="yyyy-MM-dd"
                                :editable=false
                                size="small"
                                style="width:112px;"
                                v-model="tdValue"
                                type="date"
                                placeholder="选择日期"
                                :picker-options="pickerOptions0">
                        </el-date-picker>
                    </div>
                </template>
            </template>
     <!--------------查看状态  （{{fileData .length}}）-------------------------->
            <template v-else>
                <template v-if="type=='upload'">
                    <el-button @click="uploadModal" size="small" type="text">查看文件({{uploadFileData.length}})</el-button>
                </template>
                <template v-else-if="type=='select'">
                    {{getSelectLabel(selectValue)}}
                </template>
                <template v-else-if="type == 'switch' ">
                    <template v-if="switchValue==0">
                        {{ $t("component.table.switchClose") }}
                        <el-button size="small" type="text"  @click="onReason">
                            <icon style="color:#20a0ff;"   name="commenting" scale="1" ></icon>
                        </el-button>

                    </template>
                    <template v-else>
                        {{ $t("component.table.switchOpen") }}
                    </template>
                </template>
                <template v-else-if="type == 'button' ">
                    <el-button type="text" size="small" @click="lookup">{{ $t("component.table.open") }}</el-button>
                </template>
                <template v-else-if="type == ('date' || 'editableSelect') ">
                    {{tdValue}}
                </template>
                <template v-else-if="placeHolder.label && tdValue == ''">
                    {{placeHolder.label}}
                </template>
                <template v-else>
                    {{(tdValue || tdValue ===0)?tdValue+suffix:'--'}}
                </template>


            </template>
        </div>
         <!---------------读写------------------->
        <div v-else-if="mode === 'read_write'" class="cell edit-input" @mouseout="onPenHide" @mouseover="onPenShow">

            <template v-if="isEdit">

                <div v-if="isTdEdit" @keyup.enter="onEdit">
                    <el-input size="small" :value="tdValue" @change="onChange" placeholder=""></el-input>
                    <span @click="onEdit" class="icon-edit"><icon scale="0.8" name="check"></icon></span>
                </div>

                <div v-else>
                    {{tdValue}} &nbsp
                    <span @click="onEdit" :class="'icon-edit ' + isPenShow"><icon scale="0.8"
                                                                                  name="pencil"></icon></span>
                </div>
            </template>

            <div v-else="isEdit" class="cell">
                {{tdValue+suffix}}
            </div>

        </div>
    </td>
</template>
<style>
    .focus input{
        outline: 0;
        border-color: #FF4949 !important;
        background-color: #fcffd5;
    }
</style>
<style scoped>
    td>div{
        white-space:nowrap !important;
        text-overflow:ellipsis;
        -o-text-overflow:ellipsis;
        overflow:hidden;
    }

    .icon-edit {
        position: absolute;
        right: 0;
        width: 20px;
        cursor: pointer;
        font-size: 12px;
        color: #999;
        top: 10px;
    }

    .edit-input {
        padding-right: 28px !important;
    }

    .show {
        display: block;
    }

    .hide {
        display: none;
    }

    .noBorder {
        border-right: none;
    }

    .animate {
        -webkit-animation: fadeInOut .3s ease-out alternate;
        -o-animation: fadeInOut .3s ease-out alternate;
        animation: fadeInOut .3s ease-out alternate;
        animation-iteration-count: 1;
        -webkit-animation-iteration-count: 1;
    }

    @keyframes fadeInOut {
        0% {
            background: white;
        }
        50% {
            background: #eef1f6;
        }
        100% {
            background: white;
        }
    }

    @-o-keyframes fadeInOut {
        0% {
            background: white;
        }
        50% {
            background: #eef1f6;
        }
        100% {
            background: white;
        }
    }

    @-ms-keyframes fadeInOut {
        0% {
            background: white;
        }
        50% {
            background: #eef1f6;
        }
        100% {
            background: white;
        }
    }

    @-webkit-keyframes fadeInOut {
        0% {
            background: white;
        }
        50% {
            background: #eef1f6;
        }
        100% {
            background: white;
        }
    }
</style>
<script>
    export default {
        data() {
            return {
                isTdEdit: false,
                isPenShow: "hide",
                selectValue: null,
                isChange: false,
                dialogVisible: false,
                switchValue:'1',
                fileList:[],
                tooltip:{
                    bgColor:null,
                    message:null
                },
                tdValue:'',
                pickerOptions0:'',
                rowSuffix:{
                    suffix:''
                },
                suffix:'',
                inputData:[],
                placeHolder:{
                    label:'',
                    bg_color:'',
                    fontColor:""
                },
                suggestion:true // 输入框建议列表，是否显示
            }
        },
        props: {
            'background': {
                default: ''
            },
            colSuffix:{
                default:''
            },
            fontColor:{
                default:'#1f2d3d'
            },
            'noBorder': {
                "default": 0
            },
            "rowspan": {
                "default": 1
            },
            "colspan": {
                "default": 1
            },
            "mode": {
                'default': 'read_only'
            },
            "type": {
                'default': 'text'
            },
            "typeData": {
                'default': null
            },
            'value': {
                'default': ''
            },
            'row': {
                'row': 0
            },
            'name': {
                default: ''
            },
            isEdit: {
                default: false
            },
            columnNames : {
                default:''
            },
            inputWidth:{
                default:'100%'
            },
            uploadFileData:{
                default:function() {
                    return []
                }
            }
        },
        mounted: function () {
            if(this.value != null){
                let _value = this.value;
                this.suffix=this.colSuffix;
                if(typeof  _value== "object")
                {
                    if(this.value["color"]){
                        this.tooltip.bgColor = _value.color;
                        this.$emit('editController',true);
                    }
                    if(this.value["message"]){
                        this.tooltip.message = _value.message;
                    }
                    if(this.value['suffix']){
                        this.suffix= _value.suffix;
                    }

                    if(this.value['placeholder']){
                        this.placeHolder["label"] = _value.placeholder;
                    }
                    if(this.value['bg_color']){
                        this.placeHolder.fontColor= _value.bg_color;
                    }
                    this.tdValue = _value.value;
                }
                else{
                    this.tdValue=this.value;
                    this.tooltip.bgColor = "";
                    this.tooltip.message="";
                }
            }
            if (this.tdValue != null && this.type == 'select') {

                this.selectValue = this.tdValue;
              //  console.log(this.selectValue)
            }
            else if(this.type == 'switch'){
                if(this.tdValue != null)
                    this.switchValue=this.tdValue.toString();
            }
            else if(this.type == 'upload'){
                this.fileList=Object.assign([],this.fileData);
            };
            if(this.typeData == null || this.typeData[0]['value']== null) {
                this.suggestion=false;
            }else{
                this.suggestion=true;
            }
        },
        methods: {
            getSelectLabel(val){
                if(this.typeData){
                    let label = "";
                    this.typeData.map((item,i)=>{
                        if(item.value == val){
                            label = item.label;
                        }
                    });
                    return label;
                }

                return "";
            },
            onEdit(e) {
                //write_only
                //read_only
                //read_write
                if (this.isTdEdit) {
                    this.isTdEdit = false;
                }
                else {
                    this.isTdEdit = true;
                }

            },
            onPenShow(){
                this.isPenShow = 'show';
            },
            onPenHide(){
                this.isPenShow = 'hide';
            },
            lookup(){
                this.$emit('lookup');
            },
            onChange(val){
                this.$emit('update:value', val, this.name, this.row);
                this.$emit('update', val, this.name, this.row,this.columnNames);
                if(this.type=='switch' && val=='0'){

                    this.$emit('onReason');
                }
            },
            uploadModal () {
                //this.dialogVisible=true;
                this.$emit('upload')
            },
            onReason(){
                this.$emit('onReason')
            },
            querySearch (queryString, cb) {
                this.onChange(queryString)
                if(this.typeData == null || this.typeData[0]['value']== null)
                    return false;
                var inputData = this.typeData;
                var results = queryString?inputData.filter(this.createFilter(queryString)): inputData;
                cb(results);
            },
            createFilter (queryString) {
                return (inputData) => {
                    return (inputData.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect(value){
                this.onChange(value.value)
                this.$emit('handleSelect',value,this.row);
            }
        },
        watch: {
            value:function (val,oldval) {

                if(this.value != null){
                    let _value = this.value;
                    this.suffix=this.colSuffix;
                    if(typeof  _value== "object")
                    {
                        if(this.value["color"]){
                            this.tooltip.bgColor = _value.color;
                            this.$emit('editController',true);
                        }
                        if(this.value["message"]){
                            this.tooltip.message = _value.message;
                        }
                        if(this.value['suffix']){
                            this.suffix= _value.suffix;
                        }
                        if(this.value['placeholder']){

                            this.placeHolder["label"] = _value.placeholder;
                        }
                        if(this.value['bg_color']){
                            this.placeHolder.fontColor= _value.bg_color;
                        }
                        this.tdValue = _value.value;
                    }
                    else{
                        this.tdValue=this.value;
                        this.tooltip.bgColor = "";
                        this.tooltip.message="";
                    }
                }
                else{
                    this.tdValue="";
                    this.tooltip.bgColor = "";
                    this.tooltip.message="";
                }

                if (this.mode == 'read_only') {
                    this.isChange = true;
                    setTimeout(function () {
                        this.isChange = false;
                    }.bind(this), 500);
                }

                if(val != null && this.type=='switch')
                    this.switchValue=val.toString();

                if(val != null && this.type=='select')
                    this.selectValue=val;
            },
            selectValue:function(val,oldVal){

                if(oldVal === null)
                    return;

                this.$emit('update:value', val, this.name, this.row);
                this.$emit('update', val, this.name, this.row,this.columnNames);
            }
        }

    }
</script>