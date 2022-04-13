//Lấy giá trị từ History
function getHistory() {
  return document.getElementById("history-value").innerText; //string
}

//In giá trị lên History
function printHistory(num) {
  document.getElementById("history-value").innerText = num;
}

//Lấy giá trị từ Output
function getOutput() {
  return document.getElementById("output-value").innerText;
}

//In giá trị lên Output
function printOutput(num) {
  if (num == "") {
    //Nếu num == null thì Output empty
    document.getElementById("output-value").innerText = num;
  } else {
    //Nếu num == value thì Output là value đã format
    document.getElementById("output-value").innerText = getFormattedNumber(num);
  }
}

//Format number => 9,999
function getFormattedNumber(num) {
  if (num == "-") {
    return "";
  }
  var n = Number(num);
  var value = n.toLocaleString("en");
  return value;
}

//Format ngược lại bỏ dấu ","
function reverseNumberFormat(num) {
  //Hàm thay thế string.replace(searchValue, newValue)
  return Number(num.replace(/,/g, ""));
}

var operator = document.getElementsByClassName("operator"); //=> opetator[]
for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function () {
    if (this.id == "clear") {
      // this.id <=> operator[i].id
      printHistory("");
      printOutput("");
    } else if (this.id == "backspace") {
      var output = reverseNumberFormat(getOutput()).toString();
      if (output) {
        //if output has a value
        //syntax: substr(start,length)
        output = output.substr(0, output.length - 1);
        printOutput(output);
      }
    } else {
      var output = getOutput();
      var history = getHistory();
      if (output == "" && history != "") {
        //isNaN() if val history not number => false
        if (isNaN(history[history.length - 1])) {
          // {value = 555 -} => 555
          history = history.substr(0, history.length - 1);
        }
      }
      if (output != "" || history != "") {
        output = output == "" ? output : reverseNumberFormat(output); //55
        history = history + output; //45 + 55// nối chuổi
        if (this.id == "=") {
          //Syntax: eval(string)
          var result = eval(history);
          printOutput(result); //100
          printHistory("");
        } else {
          history = history + this.id; // nối chuổi
          printHistory(history);
          printOutput("");
        }
      }
    }
  });
}
var number = document.getElementsByClassName("number"); //=> number[]
for (var i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function () {
    var output = reverseNumberFormat(getOutput());
    if (output != NaN) {
      //if output is a number
      output = output + this.id;
      printOutput(output);
    }
  });
}
