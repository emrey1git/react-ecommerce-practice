import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/slices/productSlice.jsx";
import Product from "./Product.jsx";

function ProductList() {
    const dispatch = useDispatch();
    
    // 1. DÜZELTME: Hem ürünleri hem de arama terimini (searchTerm) Redux'tan çekiyoruz.
    const { products, searchTerm } = useSelector((state) => state.products);
    
    // Konsol logunu sadece ürünleri görmek için bırakıyorum (isteğe bağlı)
    console.log(products); 

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]); 

    
    // 2. KRİTİK DÜZELTME: Ürün listesini, arama terimine göre filtreliyoruz.
    const filteredProducts = products.filter((product) => {
        // Eğer arama terimi yoksa veya boşsa, tüm ürünleri göster.
        if (!searchTerm) {
            return true;
        }
        
        // Arama terimi varsa, ürün başlığını küçük harfe çevirip terimi arat.
        return product.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
    

    // 3. DÜZELTME: Artık map döngüsünde filtrelenmiş listeyi kullanıyoruz.
    return (
        <div className="flex-row" style={{flexWrap:'wrap', marginTop: '25px'}}>
            {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                    <Product key={product.id} product={product} />
                ))
            ) : (
                // Arama sonucu bulunamazsa kullanıcıya bilgi ver
                <p style={{textAlign: 'center', width: '100%', fontSize: '1.2em', marginTop: '50px'}}>
                    "{searchTerm}" ile eşleşen ürün bulunamadı.
                </p>
            )}
        </div>
    );
}

export default ProductList;