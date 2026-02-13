
import * as React from 'react';

declare module 'lucide-react' {
    import { FC, SVGProps } from 'react';
    export interface IconProps extends SVGProps<SVGSVGElement> {
        size?: number | string;
        color?: string;
        strokeWidth?: number | string;
    }
    export type Icon = FC<IconProps>;
    export const Play: Icon;
    export const History: Icon;
    export const Info: Icon;
    export const RefreshCcw: Icon;
    export const ShieldCheck: Icon;
    export const AlertTriangle: Icon;
    export const Bell: Icon;
    export const Mail: Icon;
    export const User: Icon;
    export const Clock: Icon;
    export const Filter: Icon;
    export const Search: Icon;
    export const ChevronRight: Icon;
    export const CheckCircle2: Icon;
    export const CornerDownRight: Icon;
    export const Activity: Icon;
    export const Database: Icon;
    export const Terminal: Icon;
}
