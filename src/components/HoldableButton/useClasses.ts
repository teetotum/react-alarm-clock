import makeUseClasses from "@hooks/makeUseClasses";
const [useClasses, serializeClasses] = makeUseClasses({
    button:                   {init: true,  group: 0, precedence: 1},
    HoldableButton:           {init: true,  group: 0, precedence: 2},
    HoldableButton__pressed:  {init: false, group: 1, precedence: 3},
    HoldableButton__released: {init: false, group: 1, precedence: 3},
    HoldableButton__off:      {init: false, group: 1, precedence: 3},
});

export { useClasses, serializeClasses };
