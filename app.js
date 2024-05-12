const tempSelectorA = document.getElementById('left-temp-selector');
const tempInputA = document.getElementById('left-temp-input');
const tempSelectorB = document.getElementById('right-temp-selector');
const tempInputB = document.getElementById('right-temp-input');

function getFormula(selectedTemps) {
  const tempCases = [
    {
      condition: ['celsius', 'fahrenheit'],
      formula: (value) => (value * 9) / 5 + 32,
    },
    {
      condition: ['celsius', 'kelvin'],
      formula: (value) => value + 273.15,
    },
    {
      condition: ['celsius', 'reamur'],
      formula: (value) => (value * 4) / 5,
    },
    {
      condition: ['fahrenheit', 'celsius'],
      formula: (value) => ((value - 32) * 5) / 9,
    },
    {
      condition: ['fahrenheit', 'kelvin'],
      formula: (value) => ((value + 459.67) * 5) / 9,
    },
    {
      condition: ['fahrenheit', 'reamur'],
      formula: (value) => ((value - 32) * 4) / 9,
    },
    {
      condition: ['kelvin', 'celsius'],
      formula: (value) => value - 273.15,
    },
    {
      condition: ['kelvin', 'fahrenheit'],
      formula: (value) => ((value - 273.15) * 9) / 5,
    },
    {
      condition: ['kelvin', 'reamur'],
      formula: (value) => ((value - 273.15) * 4) / 5,
    },
    {
      condition: ['reamur', 'celsius'],
      formula: (value) => (value * 5) / 4,
    },
    {
      condition: ['reamur', 'fahrenheit'],
      formula: (value) => (value * 9) / 4 + 32,
    },
    {
      condition: ['reamur', 'kelvin'],
      formula: (value) => (value * 5) / 4 + 273.15,
    },
  ];

  let formula = null;
  tempCases.forEach((tempCase) => {
    if (
      tempCase.condition[0] === selectedTemps[0] &&
      tempCase.condition[1] === selectedTemps[1]
    ) {
      formula = tempCase.formula;
      return;
    }
  });

  return formula;
}

function tempteratureConverter(temp, selectedTemps) {
  let result = 0;

  if (temp === '') {
    return '';
  }

  const converter = getFormula(selectedTemps);
  if (typeof converter === 'function') {
    result = converter(Number(temp));
  } else {
    result = temp;
  }

  console.log(result);

  return result;
}

function main(selectors, inputFields) {
  let selectedTemps = ['celsius', 'fahrenheit'];
  const selectField = {
    'left-temp-selector': {
      element: inputFields[1],
      getValue: () => {
        return inputFields[0].value;
      },
      isReverseCondition: true,
    },
    'right-temp-selector': {
      element: inputFields[0],
      getValue: () => {
        return inputFields[1].value;
      },
      isReverseCondition: false,
    },
  };

  selectors.forEach((selector, index) => {
    selector.addEventListener('change', (e) => {
      const selectedChoice = e.target.value;
      selectedTemps[index] = selectedChoice;

      const field = selectField[e.target.id];
      field.element.value = tempteratureConverter(
        field.getValue(),
        field.isReverseCondition
          ? [selectedTemps[1], selectedTemps[0]]
          : selectedTemps
      );
    });
  });

  inputFields.forEach((inputField) => {
    inputField.addEventListener('focus', () => {
      inputField.addEventListener('input', (e) => {
        const valueInput = e.target.value;

        inputFields.forEach((field) => {
          if (field.id !== e.target.id) {
            if (field.id === 'left-temp-input') {
              field.value = tempteratureConverter(valueInput, [
                selectedTemps[1],
                selectedTemps[0],
              ]);
            } else {
              field.value = tempteratureConverter(valueInput, selectedTemps);
            }
          }
        });
      });
    });
  });
}

const selectors = [tempSelectorA, tempSelectorB];
const inputFields = [tempInputA, tempInputB];
window.onload = () => {
  main(selectors, inputFields);
};
