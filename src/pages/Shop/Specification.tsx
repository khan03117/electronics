import React from 'react'
import parse from 'html-react-parser';
const Specification = ({ description }: { description: string | undefined }) => {
    return (
        <>
            <div className="w-full">
                <div className="grid grid-cols-2">
                    <div className="col-span-2">
                        {
                            parse(description ?? '')
                        }

                    </div>

                </div>
            </div>
        </>
    )
}

export default Specification