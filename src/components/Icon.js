import React from 'react';
import '../css/display.css'

export const Icon = (props) => {
    const icon = () => {
        const label = `${props.title} Indicator`;

        // color guide: https://www.w3.org/TR/css-color-3/

        switch (props.status) {
            case "full_battery": {
                // <Icon icon="pixelarticons:battery-full" />
                // return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-label={label}><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><rect width="18" height="12" x="2" y="6" rx="2"/><path d="M7 10v4m4-4v4m4-4v4m5-4h1.5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5H20z"/></g></svg>
                return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M18 5H2v14h18v-4h2V9h-2V5zm0 2v10H4V7zM8 9H6v6h2zm2 0h2v6h-2zm6 0h-2v6h2z"/></svg>
            }
            case "med_battery": {
                // <Icon icon="pixelarticons:battery-2" />
                // return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-label={label}><g fill="none" stroke="orangered" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><rect width="18" height="12" x="2" y="6" rx="2"/><path d="M20 10h1.5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5H20zM7 10v4m4-4v4"/></g></svg>
                return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="orangered" d="M4 5H2v14h18v-4h2V9h-2V5zm14 2v10H4V7zM6 9h2v6H6zm6 0h-2v6h2z"/></svg>
            }
            case "low_battery": {
                // <Icon icon="pixelarticons:battery-1" />
                // return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-label={label}><g fill="none" stroke="firebrick" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><rect width="18" height="12" x="2" y="6" rx="2"/><path d="M7 10v4m13-4h1.5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5H20z"/></g></svg>
                return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="firebrick" d="M4 5H2v14h18v-4h2V9h-2V5zm14 2v10H4V7zM8 9H6v6h2z"/></svg>
            }
            case "charging_battery": {
                // <Icon icon="pixelarticons:battery-charging" />
                // return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-label={label}><g fill="none" stroke="seagreen" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><rect width="18" height="12" x="2" y="6" rx="2"/><path d="M20 10h1.5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5H20zm-8.6-1L9 12h4l-2.4 3"/></g></svg>
                return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-label={label}><path fill="seagreen" d="M4 5H2v14h6v-2H4V7h4V5zm10 0h6v4h2v6h-2v4h-6v-2h4V7h-4zm-4 2h2v4h4v2h-2v2h-2v2h-2v-4H6v-2h2V9h2z"/></svg>
            }
            case "sick": {
                // MaterialSymbolsSickOutline
                return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-label={label}><path fill="currentColor" d="M2.175 10.1q.65-3.5 3.388-5.8T12 2q1.85 0 3.488.6t2.937 1.7q-.35.65-.562 1.113t-.288.862q-1.1-1.05-2.525-1.662T12 4Q9.475 4 7.475 5.413t-2.9 3.612Q3.9 9 3.263 9.275t-1.088.825M12 22q-3.7 0-6.437-2.3t-3.388-5.8q.425.55 1.063.838T4.575 15q.9 2.2 2.9 3.6T12 20q3.325 0 5.663-2.337T20 12q0-.425-.038-.85t-.137-.85q.275.1.563.15t.612.05q.225 0 .45-.025t.425-.075q.05.4.088.788T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22M8.4 11.6l2.1-2.1l-2.125-2.125l-1.05 1.05L8.4 9.475L7.325 10.55zM21 9q-.825 0-1.412-.587T19 7q0-.675.375-1.437T21 3q1.25 1.8 1.625 2.563T23 7q0 .825-.587 1.413T21 9m-5.375 2.625L16.7 10.55l-1.075-1.075l1.05-1.05l-1.05-1.05L13.5 9.5zM12 13.5q-.65 0-1.263.15t-1.162.425L6 12q0-.4-.2-.75t-.55-.55q-.55-.3-1.137-.137t-.913.687q-.3.55-.137 1.138t.687.912q.35.2.75.2t.75-.2l2.975 1.725q-.425.425-.763.913T6.9 17h1.65q.525-.9 1.425-1.45T12 15q1.125 0 2.025.55T15.45 17h1.65q-.6-1.55-1.963-2.525T12 13.5m0-1.5"></path></svg>
            }
            case "bored": {
                // <Icon icon="material-symbols:sentiment-frustrated-outline" />
                return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-label={label}><path fill="currentColor" d="M9.775 18q.425 0 .813-.15t.762-.35q.15-.1.313-.175T12 17.25q.2 0 .65.25q.375.2.763.35t.812.15q1.25 0 2.013-.888T17 14.75q0-1.8-1.237-2.775T12.2 11h-.4q-2.325 0-3.562.975T7 14.75q0 1.475.763 2.363T9.775 18m-.025-1.5q-.6 0-.937-.462t-.338-1.288q0-1.15.813-1.7t2.512-.55h.375q1.7 0 2.5.55t.8 1.7q0 .825-.325 1.288t-.925.462q-.3 0-.85-.3q-.325-.2-.662-.325T12 15.75q-.375 0-.725.125t-.675.325q-.2.125-.412.213t-.438.087m-3.475-5.8q1.5-.6 2.4-1.325t1.7-1.975l-1.25-.8q-.65 1.025-1.362 1.575T5.7 9.3zm11.425 0l.575-1.4q-1.325-.55-2.025-1.1t-1.375-1.6l-1.25.8q.8 1.25 1.7 1.963T17.7 10.7M12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20"></path></svg>
            }
            case "asleep": {
                // <Icon icon="pixelarticons:moon" />
                return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" aria-label={label}><g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="4"><path d="M16.866 7.47A17.986 17.986 0 0 0 16 13c0 9.941 8.059 18 18 18a17.94 17.94 0 0 0 7.134-1.47C38.801 36.767 32.012 42 24 42c-9.941 0-18-8.059-18-18c0-7.407 4.473-13.768 10.866-16.53Z"/><path strokeLinecap="round" d="M31.66 10H41l-10 8h10"/></g></svg>
                // return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-label={label}><path fill="currentColor" d="M6 2h8v2h-2v2h-2V4H6zM4 6V4h2v2zm0 10H2V6h2zm2 2H4v-2h2zm2 2H6v-2h2zm10 0v2H8v-2zm2-2v2h-2v-2zm-2-4h2v4h2v-8h-2v2h-2zm-6 0v2h6v-2zm-2-2h2v2h-2zm0 0V6H8v6z"/></svg>
            }
            case "love": {
                // <Icon icon="pixelarticons:heart" />
                return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-label={label}><path fill="currentColor" d="M178 36c-20.09 0-37.92 7.93-50 21.56C115.92 43.93 98.09 36 78 36a66.08 66.08 0 0 0-66 66c0 72.34 105.81 130.14 110.31 132.57a12 12 0 0 0 11.38 0C138.19 232.14 244 174.34 244 102a66.08 66.08 0 0 0-66-66m-5.49 142.36a328.69 328.69 0 0 1-44.51 31.8a328.69 328.69 0 0 1-44.51-31.8C61.82 159.77 36 131.42 36 102a42 42 0 0 1 42-42c17.8 0 32.7 9.4 38.89 24.54a12 12 0 0 0 22.22 0C145.3 69.4 160.2 60 178 60a42 42 0 0 1 42 42c0 29.42-25.82 57.77-47.49 76.36"/></svg>
                // return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-label={label}><path fill="currentColor" d="M9 2H5v2H3v2H1v6h2v2h2v2h2v2h2v2h2v2h2v-2h2v-2h2v-2h2v-2h2v-2h2V6h-2V4h-2V2h-4v2h-2v2h-2V4H9zm0 2v2h2v2h2V6h2V4h4v2h2v6h-2v2h-2v2h-2v2h-2v2h-2v-2H9v-2H7v-2H5v-2H3V6h2V4z"/></svg>
            }
            case "annoyed": {
                // <Icon icon="tabler:mood-annoyed-2" />
                return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-label={label}><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M12 21a9 9 0 1 1 0-18a9 9 0 0 1 0 18"/><path d="M15 14c-2 0-3 1-3.5 2.05M10 9.25c-.5 1-2.5 1-3 0m10 0c-.5 1-2.5 1-3 0"/></g></svg>
            }
            case "hurt": {
                // <Icon icon="uil:medical" />
                return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-label={label}><path fill="currentColor" d="M8.82 11.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.41 0a1 1 0 0 0 0-1.42a1 1 0 0 0-1.41 0m2.47 2.48a1 1 0 0 0 0 1.41a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.41a1 1 0 0 0-1.42 0m9-10A6 6 0 0 0 12 3.55a6 6 0 0 0-8.24.2A6 6 0 0 0 3.57 12A6 6 0 0 0 8 22a5.92 5.92 0 0 0 4-1.55a6 6 0 0 0 8.25-.2a6 6 0 0 0 .18-8.25a6 6 0 0 0-.18-8.25Zm-1.46 1.4a4 4 0 0 1 .17 5.39L13.44 5a4.07 4.07 0 0 1 5.39.17M5.17 18.83A4 4 0 0 1 5 13.44l5.6 5.6a4.08 4.08 0 0 1-5.43-.21m13.66 0a4.08 4.08 0 0 1-5.64 0l-8-8a4 4 0 0 1 0-5.64a4 4 0 0 1 5.64 0l8 8a4 4 0 0 1 0 5.64m-5.06-7.54a1 1 0 0 0 0 1.42a1 1 0 0 0 1.41 0a1 1 0 0 0 0-1.42a1 1 0 0 0-1.41 0m-2.48-2.47a1 1 0 0 0 0 1.41a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.41a1 1 0 0 0-1.42 0"/></svg>
            }
            default: {
                return false
            }
        }
    }

    return (
        <div className="statusIcon" title={props.title}>
            {icon()}
        </div>
    )
}