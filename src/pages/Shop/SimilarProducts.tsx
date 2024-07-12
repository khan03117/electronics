import axios from 'axios'
import React, { useEffect } from 'react'
import { base_url } from '../../utils'
import SliderComponent from '../../component/SliderComponent';
interface Prop {
    category_url: string | null | undefined;

}

const SimilarProducts: React.FC<Prop> = ({ category_url }) => {

    interface CategoryWithProducts {
        category: {
            _id: string;
            title: string;
            url : string;
            products: Product[];
        };
    }

    interface Product {
        _id: string;
        url: string;
        category: string;
        product_type: string;
        title: string;
        price: number;
        mrp: number;
        images: string[];
        modals: {
            brand: string;
            modal: string;
            moq: number;
            stock: number;
            _id: string;
        }[];
        description: string;
        is_hidden: boolean;
        createdAt: string;
        updatedAt: string;
        __v: number;
    }
    const [catproducts, setProduct] = React.useState<CategoryWithProducts[]>([]);
    const getproducts = async () => {
        await axios.get(base_url + 'product/shop?category_url=' + category_url).then((resp) => {
            setProduct(resp.data.data)
        })
    }
    useEffect(() => {
        if(category_url){
            getproducts();
        }
     
    }, [category_url]);
    return (
        <>
            {
                catproducts.map(itm => (

                    <>
                   
                             <section className="md:py-10 py-3">
                            <div className="container">
                                <div className="w-full">
                                    <SliderComponent products={itm.category.products} />
                                </div>
                            </div>
                        </section>
                            
                        
                       
                    </>
                ))
            }
        </>
    )
}

export default SimilarProducts
