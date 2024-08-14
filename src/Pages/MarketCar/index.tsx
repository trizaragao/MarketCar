'use client'
import React, { useState } from 'react'
import './marketcar.css';

interface ICurso {
    id: number,
    titulo: string,
    preco: number,
    desc: string
}

interface IshoppingItem{
    produto:ICurso,
    quantidade: number

}



const cursos: ICurso[] = [
    {id:1, titulo:'Iphone 12', preco: 3500.00, desc:'O iPhone 12 é a escolha perfeita para aqueles que buscam um smartphone de alta qualidade e desempenho excepcional.'},
    {id:2, titulo:'Samsung S23', preco: 4000.00, desc:'Com o Galaxy S23 nas mãos, você pode liberar níveis totalmente novos de criatividade, produtividade e potencial no seu smartphone.'},
    {id:3, titulo:'Iphone 14', preco: 4500.00, desc:'O iPhone 14 tem o sistema de câmera dupla mais impressionante em um iPhone para fazer fotos espetaculares em pouca e muita luz.'},
    {id:4, titulo:'Samsung S22', preco: 2900.00, desc:'Para você que está a procura de um novo smartphone e dar aquele upgrade no seu dia a dia, seja para trabalhar ou navegar nas redes sociais.'}
]

const formatarPreco = (preco:number): string => preco.toFixed(2);

const MarketCarPages = () => {
 const[shoppingCurso, setShoppingCurso] = useState<IshoppingItem[]>([])
 const handleAddCurso = (id:number) => {
    const curso = cursos.find((curso) => curso.id === id)
    
    const cursoExisteShopping = shoppingCurso.find(item => item.produto.id === id)
    
    if(cursoExisteShopping){
        const newShoppingCurso:IshoppingItem[] = shoppingCurso.map(item =>{

            if(item.produto.id === id)({

                ...item,
                quantidade: item.quantidade++
            })
            return item
        })
        setShoppingCurso(newShoppingCurso)
        return
    }


    const carItem:IshoppingItem = {
        produto: curso !,
        quantidade: 1,
    }
    const newShoppingCurso:IshoppingItem[] = [...shoppingCurso, carItem]
    setShoppingCurso(newShoppingCurso)
 }

 const handleRemoveCurso = (id : number) => {
    const cursoExisteShopping = shoppingCurso.find((item) => item.produto.id === id)

if(cursoExisteShopping!.quantidade>1){
    const newShoppingCurso:IshoppingItem[] = shoppingCurso.map(item =>{
        if(item.produto.id === id)({
            ...item,
            quantidade:item.quantidade--
        })

return item
    })
   setShoppingCurso(newShoppingCurso)
   return

   


}
const newShoppingCurso: IshoppingItem[] = shoppingCurso.filter(item => item.produto.id !== id)
setShoppingCurso(newShoppingCurso)
 }
 
 // total
 const totalCurso = shoppingCurso.reduce((total, item) => {
    return total + (item.produto.preco * item.quantidade);
 },0)


return (
        
      <div >    
        <h2>B&A Smartphones</h2>
    <ul>
    
       
        {cursos.map(curso =>(<li>
            <li key={curso.id}/>
            <h2>{curso.titulo}</h2>
            <p>{curso.desc}</p>
            <p>R${formatarPreco(curso.preco)}</p>

            <button onClick={()=>handleAddCurso(curso.id)} className='btnA'>Adicionar</button>
            
        </li>))}
    </ul>
       
   
     <h2>Carrinho de Compras R${formatarPreco(totalCurso)}</h2>
    <ul className='CarrinhodeCompras'>
        {shoppingCurso.map((item)=>(<li>
            <li key={item.produto.id}/>
            <h2>{item.produto.titulo}</h2>
            <p>{item.produto.desc}</p>
            <p>R${formatarPreco(item.produto.preco)}</p>
            <p>Quantidade: {item.quantidade}</p>
            <p>Total: R${formatarPreco(item.produto.preco * item.quantidade)}</p>
            <button onClick={()=>handleRemoveCurso(item.produto.id)} className='btnR'>Remover</button>


        </li> ))}
    </ul>
    </div>
    
  )
}

export default MarketCarPages