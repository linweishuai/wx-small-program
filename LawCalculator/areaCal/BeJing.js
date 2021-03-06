var TimeArea = { Min: 100, Max: 3000 };
var TimeFreeTitle = "*政府指导价100-3000元/小时";
var RiskFreeTitle = "风险代理收费的最高金额不得高于收费合同约定标的额的30%。";
var FreeRule = "收费标准的5倍计算";
//计件收费
var JiJianArr = [{
    cases: "刑事案件", desArr: [
        { name: "侦查阶段", price: "2000-15000元/件" },
        { name: "审查起诉阶段", price: "2000-15000元/件" },
        { name: "一审阶段", price: "4000-45000元/件" }
    ],
    CivilAction:  [{ type: "民事、行政诉讼和国家赔偿案件", name: "立案", price: "3000-15000元/件" }],
    Important:0
}, {
    cases: "刑事案件", desArr: [
        { name: "侦查阶段", price: "10000-75000元/件" },
        { name: "审查起诉阶段", price: "10000-75000元/件" },
        { name: "一审阶段", price: "20000-225000元/件" }
    ],
    CivilAction: [{ type: "民事、行政诉讼和国家赔偿案件", name: "立案", price: "22500-50000元/件" }],
    Important: 1
}];


/**
RatioFees ：比例收费
@val : 输入金额,
@important : 是否重大案件 bool true=是 false= 否 收费标准的5倍收费 , 这里设置最大5
**/
function RatioFees (val, important) {
    
    //当前输入的值
    var curval = parseFloat(val);
    var IntMoney = 0;
    if (curval <= 100000) {
        IntMoney += parseFloat(stage10());
    }
    //10万元至100万元
    else if (curval > 100000 && curval <= 1000000) {
        IntMoney += parseFloat(stage10()) + parseFloat(((curval - 100000) * 0.06));
    }
    //100万元至1000万元
    else if (curval > 1000000 && curval <= 10000000) {
        IntMoney += parseFloat(stage10()) + parseFloat(stage100()) + parseFloat(((curval - 1000000) * 0.04));
    }
    else if (curval > 10000000) {
        IntMoney += parseFloat(stage10()) + parseFloat(stage100()) + parseFloat(stage1000()) + parseFloat(((curval - 10000000) * 0.02));
    }
    if (!important) {
        return IntMoney;
    }
    else {
        return IntMoney*5;
    }
    //10以下算法 0.1
    function stage10() {
        if(curval>100000)
        {
            return 100000 * 0.1;
        }else
        {
            return curval * 0.1 < 3000 ? 3000 : curval * 0.1;
        }
    }
    //  10万元至100万元（含100万元）	6%
    function stage100() {
        return 900000 * 0.06;
    }
    //100万元至1000万元（含1000万元）	4%
    function stage1000() {
        return 9000000 * 0.04;
    }

}

module.exports.RatioFees = RatioFees
exports.TimeArea = TimeArea
exports.TimeFreeTitle = TimeFreeTitle
exports.RiskFreeTitle = RiskFreeTitle
exports.FreeRule = FreeRule
exports.JiJianArr = JiJianArr