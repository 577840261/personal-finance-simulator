class RetirementCalculator {
    constructor() {
        this.form = document.getElementById('retirement-form');
        this.summary = document.querySelector('#retirement .summary');
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.calculate();
        });
    }

    calculate() {
        // 获取表单输入值
        const currentAge = parseInt(document.getElementById('current-age').value);
        const retirementAge = parseInt(document.getElementById('retirement-age').value);
        const currentSavings = parseFloat(document.getElementById('current-savings').value);
        const annualIncome = parseFloat(document.getElementById('annual-income').value);
        const investmentReturn = parseFloat(document.getElementById('investment-return').value) / 100;
        const savingsRate = parseFloat(document.getElementById('savings-rate').value) / 100;
        const inflationRate = parseFloat(document.getElementById('inflation-rate').value) / 100;

        // 计算工作年限
        const workingYears = retirementAge - currentAge;
        if (workingYears <= 0) {
            this.summary.innerHTML = '<p>请确保退休年龄大于当前年龄</p>';
            return;
        }

        // 计算每年储蓄金额
        const annualSavings = annualIncome * savingsRate;

        // 预测每年的储蓄增长
        let yearlyData = [];
        let currentBalance = currentSavings;
        let inflationAdjustedReturn = (1 + investmentReturn) / (1 + inflationRate) - 1;

        for (let i = 0; i <= workingYears; i++) {
            const year = currentAge + i;
            yearlyData.push({
                year: year,
                balance: currentBalance,
                inflationAdjustedBalance: currentBalance / Math.pow(1 + inflationRate, i)
            });

            if (i < workingYears) {
                currentBalance = currentBalance * (1 + investmentReturn) + annualSavings;
            }
        }

        // 显示结果摘要
        const retirementBalance = yearlyData[yearlyData.length - 1].balance.toFixed(2);
        const inflationAdjustedBalance = yearlyData[yearlyData.length - 1].inflationAdjustedBalance.toFixed(2);

        this.summary.innerHTML = `
            <h3>退休金预测结果</h3>
            <p>预计退休年龄: ${retirementAge}岁</p>
            <p>预计退休时储蓄: ¥${retirementBalance}</p>
            <p>扣除通胀后实际价值: ¥${inflationAdjustedBalance}</p>
            <p>工作年限: ${workingYears}年</p>
            <p>总储蓄投入: ¥${(annualSavings * workingYears).toFixed(2)}</p>
            <p>预计投资收益: ¥${(retirementBalance - currentSavings - annualSavings * workingYears).toFixed(2)}</p>
            <div class="result-explanation">
                <h4>结果解释</h4>
                <p>• 扣除通胀后实际价值：考虑通货膨胀因素后，退休时储蓄的实际购买力</p>
                <p>• 投资收益：通过投资增值获得的收益，不包括您直接存入的本金</p>
                <p>• 图表显示：蓝线为名义储蓄金额，橙线为扣除通胀后的实际购买力</p>
            </div>
            <div class="term-definition">
                <h4>重要术语解释</h4>
                <ul class="term-list">
                    <li><strong>投资回报率</strong>：您的投资每年可能获得的收益率，历史上股票市场长期平均约为5-7%</li>
                    <li><strong>通货膨胀率</strong>：物价每年上涨的比例，会降低货币的实际购买力</li>
                    <li><strong>复利效应</strong>：您的投资收益再投资产生的收益，长期来看对最终结果影响很大</li>
                </ul>
            </div>
        `;

        // 绘制图表
        window.renderRetirementChart(yearlyData);
    }
}

// 页面加载完成后初始化计算器
document.addEventListener('DOMContentLoaded', () => {
    new RetirementCalculator();
});