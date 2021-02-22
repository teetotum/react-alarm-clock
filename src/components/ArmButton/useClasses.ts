import makeUseClasses from "@hooks/makeUseClasses";
const [useClasses, serializeClasses] = makeUseClasses({
    ArmButton:          {init: true,  group: 0, precedence: 1},
    ArmButton__isArmed: {init: false, group: 1, precedence: 2},
    ArmButton__isLit:   {init: false, group: 2, precedence: 3}
});

export { useClasses, serializeClasses };
