const tableData={
    data:[
        {
            tenant_name:'ka',
            brand_type:'133',
            tenant_type:'12312',
            incentive_type:'1231',
            kpi:'234234'
        }
    ],
    head:[[
        {label:'商户名称'},
        {label:'品牌类型'},
        {label:'租户类别'},
        {label:'激励类型'},
        {label:'KPI指标（元）'}
    ]],
    column:[
        {name:'tenant_name',mode:'write_only',type:'text'},
        {name:'brand_type',mode:'write_only',type:'text'},
        {name:'tenant_type',mode:'write_only',type:'text'},
        {name:'incentive_type',mode:'read_only',type:'text'},
        {name:'kpi',mode:'write_only',type:'text'},
    ]
}

export{
    tableData

}

