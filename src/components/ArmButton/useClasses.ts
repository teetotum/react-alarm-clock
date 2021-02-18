import makeUseClasses from "@hooks/makeUseClasses";
const [useClasses, serializeClasses] = makeUseClasses({
    button:             {init: true,  group: 0, precedence: 1},
    armButton:          {init: true,  group: 0, precedence: 2},
    armButton__isArmed: {init: false, group: 1, precedence: 3},
    armButton__isFired: {init: false, group: 1, precedence: 4}
});

export { useClasses, serializeClasses };
