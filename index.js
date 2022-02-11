function App() {
    const [expression, setExpression] = React.useState("");
    const [answer, setAnswer] = React.useState("0");

    function display(symbol) {
        setExpression((prevValue) => {
            if (/[+*-/]/.test(symbol) && /[+*-/]/.test(prevValue[prevValue.length - 1])) {
                let newValue;
                if (/[-]/.test(symbol)) {
                    newValue = prevValue.slice(0, prevValue.length) + symbol;
                } else {
                    let count = 0;
                    for (let i = 0; i < prevValue.length; i++) {
                        if (isNaN(+prevValue[i])) {
                            count++;
                        } else {
                            count = 0;
                        }
                    }
                    newValue = prevValue.slice(0, prevValue.length - count) + symbol;
                }

                setExpression(newValue);
            } else {
                if (prevValue) {
                    prevValue = prevValue + "";
                    let valArr = prevValue.split(/[+/*-]/g);
                    console.log("valArr " + JSON.stringify(valArr));
                    let lastNumber = valArr[valArr.length - 1];
                    if (!isNaN(lastNumber) && /[.]/.test(lastNumber) && symbol === ".") {
                        console.log("symbol = empty ");
                        symbol = "";
                    }
                }

                setExpression((prevValue + symbol).replace(/^0/g, "").replace(/\.+/g, "."));
            }
        });

        setAnswer(
            (prevValue) => (prevValue + symbol).replace(/^0/g, "").replace(/\.+/g, ".")
        );
    }

    const calculate = () => {
        setExpression(eval(expression));
    };

    const allClear = () => {
        if (expression[expression.length - 1] !== "0") {
            setExpression("0");
            setAnswer(0);
        } else {
            setExpression("");
            setAnswer(0);
        }
    };

    const clear = () => {
        setExpression(prev => prev.split("").slice(0, prev.length - 1).join(""));
        setExpression(0);
    };

    return (
        <div className="container">
            <div className="grid">
                <div className="dis">
                    <input
                        id="display"
                        type="text"
                        value={expression}
                        placeholder="0"
                        disabled="disabled"/>
                    //
                    <div className="total">{answer}</div>
                </div>
                <div onClick={allClear} id="clear" className="padButton clear red">AC</div>
                <div onClick={clear} id="backOne" className="padButton delete red">CE</div>
                <div onClick={() => display("/")} id="divide" className="padButton divide">/</div>
                <div onClick={() => display("*")} id="multiply" className="padButton multiply">*</div>
                <div
                    onClick={() => display("7")}
                    id="seven"
                    className="padButton seven dark-grey">7</div>
                <div
                    onClick={() => display("8")}
                    id="eight"
                    className="padButton eight dark-grey">8</div>
                <div
                    onClick={() => display("9")}
                    id="nine"
                    className="padButton nine dark-grey">9</div>
                <div onClick={() => display("-")} id="subtract" className="padButton subtract">-</div>
                <div
                    onClick={() => display("4")}
                    id="four"
                    className="padButton four dark-grey">4</div>
                <div
                    onClick={() => display("5")}
                    id="five"
                    className="padButton five dark-grey">5</div>
                <div onClick={() => display("6")} id="six" className="padButton six dark-grey">6</div>
                <div onClick={() => display("+")} id="add" className="padButton add">+</div>
                <div onClick={() => display("1")} id="one" className="padButton one dark-grey">1</div>
                <div onClick={() => display("2")} id="two" className="padButton two dark-grey">2</div>
                <div
                    onClick={() => display("3")}
                    id="three"
                    className="padButton three dark-grey">3</div>
                <div onClick={calculate} id="equals" className="padButton equals dark-blue">=</div>
                <div
                    onClick={() => display("0")}
                    id="zero"
                    className="padButton zero dark-grey">0</div>
                <div
                    onClick={() => display(".")}
                    id="decimal"
                    className="padButton decimal dark-grey">.</div>
            </div>
        </div>
    );
}

ReactDOM.render(<App/>, document.getElementById("root"))