import makeUseClasses from "@hooks/makeUseClasses";
const [useClasses, serializeClasses] = makeUseClasses({
    button:                      {init: true,  group: 0, precedence: 1},
    changeTimeButton:            {init: true,  group: 0, precedence: 2},
    changeTimeButton__left:      {init: false, group: 0, precedence: 3},
    changeTimeButton__right:     {init: false, group: 0, precedence: 3},
    changeTimeButton__pressed:   {init: false, group: 1, precedence: 4},
    changeTimeButton__unpressed: {init: false, group: 1, precedence: 4},
    changeTimeButton__off:       {init: false, group: 1, precedence: 4},
});

export { useClasses, serializeClasses };
