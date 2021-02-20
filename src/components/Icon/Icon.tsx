import React from "react";

type SvgComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export default function Icon(Component: SvgComponent) {
    return () => <Component className="icon" />;
}
