import axios from 'axios';
import React from 'react'
import { base_url } from '../utils';
import { useLocation, useParams } from 'react-router-dom';
import parse from 'html-react-parser';

const Polcy = () => {
    interface Policy {
        title: string;
        _id: string;
        description: string;
        url: string;
    }
    const { url } = useParams();

    const location = useLocation();
    const [policy, setPolicy] = React.useState<Policy>();
    const getdata = async () => {
        const resp = await axios.get(base_url + 'policy/show/' + url);
        setPolicy(resp.data.data);
    }
    React.useEffect(() => {
        getdata();
    }, [location.pathname])
    return (
        <>
            <section className="py-10">
                <div className="container text-black">
                    <div className="w-full text-black">
                        <div className="w-full   sectiontitle_parent">
                            <h2 className="sectiontitle">{policy?.title}</h2>
                        </div>
                        {parse(policy?.description || '')}
                    </div>
                </div>
            </section>
        </>

    )
}

export default Polcy
