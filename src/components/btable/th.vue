<template>
    <th  :rowspan="rowspan" :colspan="colspan" :style="{width:cellWidth+'px ',textAlign:align}" :class="{noBorder:noBorder}" style="cursor: pointer">
        <div class="cell" @click="sortClick">
            <slot></slot>
            <i v-if="sortable"
               :class="{'el-icon-caret-bottom':type==1,'el-icon-caret-top':type==2,'el-icon-d-caret':type==3}"
               class="sortable"
            ></i>
        </div>
    </th>
</template>
<style scoped>
    .noBorder{
        border-right: none;
    }
    .sortable{
        cursor: pointer;
    }
</style>
<script>
    export default {
        data() {
            return {
                type:3/*1,2,3,排序*/

            }
        },
        props: {
                rowspan:{
                    default:''
                },
                colspan:{
                    default:''
                },
                cellWidth:{
                    default:''
                },
                noBorder:{
                    default:''
                },
                sortable:{
                    default:false
                },
                align:{
                    default:'left'
                },
            },
        methods: {
            sortClick() {
                if(this.sortable){
                    switch (this.type){
                        case 1:
                            this.type=2
                            break;
                        case 2:
                            this.type=3
                            break;
                        case 3:
                            this.type=1
                            break;
                    }
                    this.$emit('sortMethod')
                }

            }
        }
    }
</script>