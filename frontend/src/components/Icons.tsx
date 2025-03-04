interface IconProps {
    icon: string;
    width: number;
    color?: string;
    className?: string;
}

const Icon: React.FC<IconProps> = ({ icon, width, color, className }) => {
    const icon_color : string | null = color || "currentColor";
    const icons: { [key: string]: JSX.Element } = {
        user: <svg xmlns="http://www.w3.org/2000/svg" width={width} height={width} viewBox={`0 0 24 24`} className={className}><path fill={icon_color} d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2S7.5 4.019 7.5 6.5M20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1z"/></svg>,
        location: <svg xmlns="http://www.w3.org/2000/svg" width={width} height={width} viewBox={`0 0 24 24`} className={className}><path fill={icon_color || "current"} d="M21 7h-6a1 1 0 0 0-1 1v3h-2V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1M8 6h2v2H8zM6 16H4v-2h2zm0-4H4v-2h2zm0-4H4V6h2zm4 8H8v-2h2zm0-4H8v-2h2zm9 4h-2v-2h2zm0-4h-2v-2h2z"/></svg>,
        time: <svg xmlns="http://www.w3.org/2000/svg" width={width} height={width} viewBox={`0 0 24 24`} className={className}><path fill={icon_color} d="M12.25 2c-5.514 0-10 4.486-10 10s4.486 10 10 10s10-4.486 10-10s-4.486-10-10-10M18 13h-6.75V6h2v5H18z"/></svg>,
        diagnoses: <svg xmlns="http://www.w3.org/2000/svg" width={width} height={width} viewBox={`0 0 24 24`} className={className}><path fill={icon_color} d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8 8a2 2 0 0 0 2.828 0l7.172-7.172a2 2 0 0 0 0-2.828zM7 9a2 2 0 1 1 .001-4.001A2 2 0 0 1 7 9"/></svg>,
        copy: <svg xmlns="http://www.w3.org/2000/svg" width={width} height={width} viewBox={`0 0 24 24`} className={className}><path fill={icon_color} d="M14 8H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V10c0-1.103-.897-2-2-2"/><path fill={icon_color} d="M20 2H10a2 2 0 0 0-2 2v2h8a2 2 0 0 1 2 2v8h2a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2"/></svg>,
        link: <svg xmlns="http://www.w3.org/2000/svg" width={width} height={width} viewBox="0 0 24 24"><g fill="none" stroke={icon_color} stroke-linecap="round" stroke-width="2"><path d="m12 17l-1.5 1.5a3.536 3.536 0 0 1-5 0v0a3.536 3.536 0 0 1 0-5l3-3a3.536 3.536 0 0 1 5 0v0"/><path d="m12 7l1.5-1.5a3.536 3.536 0 0 1 5 0v0a3.536 3.536 0 0 1 0 5l-3 3a3.536 3.536 0 0 1-5 0v0"/></g></svg>,
        save: <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M5 21h14a2 2 0 0 0 2-2V8l-5-5H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2M7 5h4v2h2V5h2v4H7zm0 8h10v6H7z"></path></svg>,
        open: <svg xmlns="http://www.w3.org/2000/svg" width={width} height={width} viewBox="0 0 20 20"><g fill={icon_color}><path d="M10.707 10.707a1 1 0 0 1-1.414-1.414l6-6a1 1 0 1 1 1.414 1.414z"/><path d="M15 15v-3.5a1 1 0 1 1 2 0V16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4.5a1 1 0 0 1 0 2H5v10zm2-7a1 1 0 1 1-2 0V4a1 1 0 1 1 2 0z"/><path d="M12 5a1 1 0 1 1 0-2h4a1 1 0 1 1 0 2z"/></g></svg>,
        spinner: <svg fill="#FFFFFFFF" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25" /> <circle cx="12" cy="2.5" r="1.5"><animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite"/></circle></svg>
    };

    return icons[icon];
}

export default Icon;
