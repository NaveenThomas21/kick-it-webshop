import React, { useContext,useEffect,useState} from 'react'
import { ProductContext } from './ProductContext'
import { useParams } from 'react-router-dom'

const ProductDetails = () => {



const {menProducts,womenProducts}=useContext(ProductContext)  
const[detailMenProducts,SetDetailMenProducts]=useState([])
const[detailWomenProducts,SetDetailWomenProducts]=useState([])


const {id}=useParams() 
const parseId=parseInt(id)

console.log("heyy",parseId);


useEffect(() => {
  const productInMen = menProducts.find(product => product.id === parseId);
  const productInWomen = womenProducts.find(product => product.id === parseId);

  if (productInMen) {
    SetDetailMenProducts(productInMen);
  } else if (productInWomen) {
    SetDetailWomenProducts(productInWomen);
  }
}, [menProducts, womenProducts, parseId]);



console.log("check",detailMenProducts)
console.log("check",detailWomenProducts)

  return (



<h1>ddsdsadsgddfgadas</h1>
  )
}

export default ProductDetails