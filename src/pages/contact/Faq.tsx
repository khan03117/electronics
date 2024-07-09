import React from 'react'
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import axios from 'axios';
import { base_url } from '../../utils';
const Faq = () => {
    interface FAQ {
        _id: string;
        question: string;
        answer: string;
    }
    const [open, setOpen] = React.useState(0);
    const [faqs, setFaq] = React.useState<FAQ[]>([]);
    const handleOpen = (value: number) => setOpen(open === value ? 0 : value);
    const getdata = async () => {
        await axios.get(base_url + 'faq').then(resp => {
            setFaq(resp.data);
        })
    }

    React.useEffect(() => {
        getdata();
    }, [])
    return (
        <>
            <section>
                <div className="container">
                    {
                        faqs.length > 0 && faqs.map((faq, index) => (
                            <>
                                <Accordion open={open === index} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                    <AccordionHeader className='relative text-sm' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onClick={() => handleOpen(index)}>
                                        {faq.question}
                                    </AccordionHeader>
                                    <AccordionBody className="text-xs">
                                        {faq.answer}
                                    </AccordionBody>
                                </Accordion>
                            </>
                        ))
                    }
                </div>
            </section>
        </>
    )
}

export default Faq
