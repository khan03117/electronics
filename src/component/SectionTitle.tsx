import React from 'react'
interface Prop {
    title: string;
}
const SectionTitle: React.FC<Prop> = ({ title }) => {
    return (

        <div className="w-full   sectiontitle_parent">
            <h2 className="sectiontitle">{title}</h2>
        </div>

    )
}

export default SectionTitle
