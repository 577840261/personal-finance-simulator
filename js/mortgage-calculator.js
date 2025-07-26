class MortgageCalculator {
    constructor() {
        this.form = document.getElementById('mortgage-form');
        this.summary = document.querySelector('#mortgage .summary');
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
        const income = parseFloat(document.getElementById('income').value);
        const savings = parseFloat(document.getElementById('savings').value);
        const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100;
        const taxRate = parseFloat(document.getElementById('tax-rate').value) / 100;
        const downPaymentPercent = parseFloat(document.getElementById('down-payment-percent').value) / 100;
        const otherDebts = parseFloat(document.getElementById('other-debts').value);
        const loanTerm = parseInt(document.getElementById('loan-term').value) || 30;

        // 计算每月可用于房贷的收入 (通常不超过月收入的36%)
        const monthlyIncome = income / 12;
        const monthlyDebtPayment = otherDebts / 12;
        const maxMonthlyPayment = monthlyIncome * 0.36 - monthlyDebtPayment;

        // 计算最大贷款金额
        const monthlyRate = interestRate / 12;
        const numberOfPayments = loanTerm * 12;
        const maxLoanAmount = maxMonthlyPayment * (1 - Math.pow(1 + monthlyRate, -numberOfPayments)) / monthlyRate;

        // 计算最大可负担房价
        const maxDownPayment = savings;
        const maxHousePrice = maxLoanAmount + maxDownPayment;

        // 计算实际首付金额和贷款金额
        const downPaymentAmount = maxHousePrice * downPaymentPercent;
        const loanAmount = maxHousePrice - downPaymentAmount;

        // 计算实际月供
        const monthlyPayment = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

        // 计算税费和保险 (估算)
        const propertyTax = maxHousePrice * 0.01 / 12; // 假设1%的房产税
        const insurance = maxHousePrice * 0.003 / 12; // 假设0.3%的房屋保险
        const totalMonthlyPayment = monthlyPayment + propertyTax + insurance;

        // 显示结果摘要
        this.summary.innerHTML = `
            <h3>购房负担能力评估</h3>
            <p>可负担房价范围: ¥${maxHousePrice.toFixed(2)}</p>
            <p>建议首付金额: ¥${downPaymentAmount.toFixed(2)} (${downPaymentPercent*100}%)</p>
            <p>贷款金额: ¥${loanAmount.toFixed(2)}</p>
            <p>贷款期限: ${loanTerm}年</p>
            <h4>月供明细</h4>
            <p>本金和利息: ¥${monthlyPayment.toFixed(2)}</p>
            <p>房产税: ¥${propertyTax.toFixed(2)}</p>
            <p>房屋保险: ¥${insurance.toFixed(2)}</p>
            <p><strong>月供总额: ¥${totalMonthlyPayment.toFixed(2)}</strong></p>
            <p>占月收入比例: ${(totalMonthlyPayment/monthlyIncome*100).toFixed(2)}%</p>
            <h4>总支出估算</h4>
            <p>贷款总利息: ¥${(monthlyPayment*numberOfPayments - loanAmount).toFixed(2)}</p>
            <p>总房产税 (30年): ¥${(propertyTax*12*30).toFixed(2)}</p>
            <div class="result-explanation">
                <h4>结果解释</h4>
                <p>• 可负担房价：基于您的收入和现有存款，您能够负担的最高房价</p>
                <p>• 月供占收入比例：理想情况下应低于36%，超过50%可能导致财务压力</p>
                <p>• 总利息支出：整个贷款期限内支付的利息总额，通常接近甚至超过本金</p>
            </div>
            <div class="developer-badge" style="margin-top: 20px; font-style: italic; color: #666; text-align: right;">
                由亍幵开发 | 个人财务系列工具
            </div>
            <div class="term-definition">
                <h4>重要术语解释</h4>
                <ul class="term-list">
                    <li><strong>首付比例</strong>：购房时首期支付的金额占总房价的百分比，影响贷款额度和利率</li>
                    <li><strong>债务收入比</strong>：月供占月收入的比例，银行通常要求不超过36%</li>
                    <li><strong>等额本息</strong>：本计算器使用的还款方式，每月还款金额固定，前期利息占比高，后期本金占比高</li>
                </ul>
            </div>
        `;

        // 绘制图表
        window.renderMortgageChart(monthlyPayment, propertyTax, insurance);
    }
}

// 页面加载完成后初始化计算器
document.addEventListener('DOMContentLoaded', () => {
    new MortgageCalculator();
});