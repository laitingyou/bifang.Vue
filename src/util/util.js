
const cloneObject = (arr) => {
    return Object.assign({},arr)
};

const clone = (arr) => {
    return arr.map((e)=>{
        if(typeof e === 'object'){
            return Object.assign({},e)
        }else{
            return e
        }
    })
};


//格式化表格
const formatTable = (res, attrs) => {

    let attr = attrs[0];

    res = res.sort((a, b) => a[attr] < b[attr] ? 1 : -1);
    let last = null;
    let list = [];
    let index = [];
    let j = 0;
    for (let i = 0; i < res.length; i++) {
        let item = res[i];
        if (i === 0) {
            last = item[attr];
            list[j] = [];
            list[j].push(last);
            index.push(i);
        }
        else {
            if (last === item[attr]) {
                list[j].push(last);
            }
            else {
                index.push(i);
                j++;
                list[j] = [];
                last = item[attr];
                list[j].push(last);
            }
        }
    }
    for (let i = 0; i < index.length; i++) {
        res[index[i]]["isRow"] = true;
        res[index[i]]["rowCount"] = list[i].length;
    }
    return res;
};


const orderBy= function (source, orders, type)
{

    if (source instanceof Array && orders instanceof Array && orders.length > 0) {

        var ordersc = orders.concat([]);
        var sorttype = type || 'asc';
        var results = [];
        var totalSum = {};

        function grouporder(source, orders, totalSum) {

            source.sort(function (a, b) {
                var convertA = a[orders[0]];
                var convertB = b[orders[0]];
                if (typeof convertA == 'string' && typeof convertB == 'string') {
                    if (sorttype.toUpperCase() == 'ASC') {
                        return convertA.localeCompare(convertB);
                    } else {
                        return convertB.localeCompare(convertA);
                    }
                } else {
                    if (sorttype.toUpperCase() == 'ASC') {
                        return convertA - convertB;
                    } else {
                        return convertB - convertA;
                    }
                }

            })

            var groupmap = new Map();
            source.forEach((item) => {
                if (groupmap.has(item[orders[0]])) {
                    groupmap.get(item[orders[0]]).push(item);
                } else {
                    groupmap.set(item[orders[0]], []);
                    groupmap.get(item[orders[0]]).push(item);
                }
            })


            orders.shift();

            for (let [key, val] of groupmap) {

                totalSum[key] = {};
                totalSum[key].name = key;
                totalSum[key].value = val.length;
                if (orders.length == 0) {
                    results = results.concat(val);
                } else {
                    totalSum[key].children = {};
                    var orderscopy = orders.concat([]);
                    grouporder(val, orderscopy, totalSum[key].children);
                }
            }
        }

        grouporder(source, ordersc, totalSum);

        return{
            results: results,
            totalSum: totalSum
        };

    } else {
        return source;
    }
}



export default {
    clone,
    cloneObject,
    formatTable,
    orderBy
}