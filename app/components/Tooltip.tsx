import { useTranslation } from "react-i18next";

interface TooltipProps {
    message: any;
    children: any;
}

export default function Tooltip({ message, children }: TooltipProps) {
    const { t } = useTranslation();
    return (
        <div className="relative flex group">
            {children}
            <div className="absolute p-2 transition-all opacity-0 bg-gray-400 rounded top-full left-1/2 transform translate-x-1/2 group-hover:opacity-100">
                <span className="p-2 text-xs text-white whitespace-nowrap capitalize">
                    {t(message)}
                </span>
            </div>
        </div>
    )
}