import makeUseClasses from "@hooks/makeUseClasses";
const [useClasses, serializeClasses] = makeUseClasses({
    button:                {init: true,  group: 0, precedence: 1},
    BlinkingButton:        {init: true,  group: 0, precedence: 2},
    BlinkingButton__isLit: {init: false, group: 1, precedence: 3}
});

export { useClasses, serializeClasses };
