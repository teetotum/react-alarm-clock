import makeUseClasses from "@hooks/makeUseClasses";
const [useClasses, serializeClasses] = makeUseClasses({
    controls:            {init: true,  group: 0, precedence: 1},
    controls__isNotIdle: {init: false, group: 1, precedence: 2}
});

export { useClasses, serializeClasses };
