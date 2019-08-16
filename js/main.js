const color = 'color: #ff8c1a;';
let baseServing = 0;
let servingsFor = document.getElementsByClassName('servings_for yield');
if (servingsFor.length != 0) {
  baseServing = getNum(changeHalf(servingsFor[0].textContent));

  const label1 = document.createElement('label');
  label1.textContent = '→';
  servingsFor[0].appendChild(label1);

  const input1 = document.createElement('input');
  input1.type = 'text';
  input1.name = 'servings';
  input1.maxLength = 2;
  input1.size = 2;
  input1.value = baseServing;
  input1.style = color;
  servingsFor[0].appendChild(input1);

  const label2 = document.createElement('label');
  label2.textContent = '人分';
  label2.style = color;
  servingsFor[0].appendChild(label2);

  const btn1 = document.createElement('input');
  btn1.type = 'button';
  btn1.value = '分量表示';
  btn1.className = 'submit button small';
  btn1.onclick = function() {
    let values = document.getElementsByClassName('ingredient_quantity amount');
    for(i = 0; i < values.length; i++) {
      let changeAmount = values[i].parentNode.getElementsByClassName('ingredient_quantity change_amount');
      if (changeAmount.length != 0) {
        values[i].parentNode.removeChild(changeAmount[0]);
      }
      let halfValue = changeHalf(values[i].textContent);
      let baseQuantity = getNum(halfValue);
      if (baseQuantity != '') {
        let serving = document.getElementsByName('servings')[0].value;
        let per = serving / baseServing;
        let quantity = baseQuantity * per;

        const label3 = document.createElement('div');
        label3.className = 'ingredient_quantity change_amount';
        label3.style = color;
        label3.textContent = halfValue.replace(baseQuantity, quantity);
        values[i].parentNode.appendChild(label3);
      }
    }
  };
  servingsFor[0].appendChild(btn1);
}

function getNum(data) {
  return data.replace(/[^0-9]/g, '');
}

function changeHalf(str) {
  return str.replace(/[０-９]/g, function(s) {
    return String.fromCharCode(s.charCodeAt(0) - 65248);
  });
}
