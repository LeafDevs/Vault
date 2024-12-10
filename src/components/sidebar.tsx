import { ReactNode } from "react";

interface SidebarProps {
    isOpen?: boolean;
    onToggle?: (isOpen: boolean) => void;
    children?: ReactNode;
    className?: string;
}

interface SidebarSectionProps {
    children?: ReactNode;
    className?: string;
}

interface SidebarSectionHeaderProps {
    children?: ReactNode;
    className?: string;
}

interface SidebarItemProps {
    href?: string;
    icon?: ReactNode;
    children?: ReactNode;
    className?: string;
    onClick?: () => void;
}

export function SidebarSection({ children, className = "" }: SidebarSectionProps) {
    return (
        <div className={`space-y-4 ${className}`}>
            {children}
        </div>
    );
}

export function SidebarSectionHeader({ children, className = "" }: SidebarSectionHeaderProps) {
    return (
        <h2 className={`text-sm font-semibold text-gray-400 dark:text-gray-300 uppercase tracking-wider ${className}`}>
            {children}
        </h2>
    );
}

export function SidebarItem({ href = "#", icon, children, className = "", onClick }: SidebarItemProps) {
    return (
        <a 
            href={href}
            onClick={onClick}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-gray-100 transition-colors ${className}`}
        >
            {icon}
            <span>{children}</span>
        </a>
    );
}

export default function Sidebar({ isOpen = false, onToggle, children, className = "" }: SidebarProps) {
    console.log(isOpen);
    console.log(className);
    console.log(children);
    console.log(onToggle);
    return (
        <div 
            id="sidebar" 
            className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-gray-800 border-r border-gray-700 p-6 shadow-sm transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} ${className}`}
        >
            <nav className="space-y-6">
                {children}
            </nav>
        </div>
    );
}