import makeUseClasses from "@hooks/makeUseClasses";
const [useClasses, serializeClasses] = makeUseClasses({
    ArmButton:          {init: true,  group: 0, precedence: 1},
    ArmButton__isArmed: {init: false, group: 1, precedence: 2},
    ArmButton__isFired: {init: false, group: 1, precedence: 2}
});

export { useClasses, serializeClasses };
