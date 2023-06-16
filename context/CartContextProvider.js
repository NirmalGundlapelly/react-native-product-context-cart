import React, { Component } from 'react'
import { CartContext } from './CartContext'
import { Alert, Keyboard } from 'react-native'


export default class CartContextProvider extends Component {
    constructor(props) {
        super(props)
        this.state = { cartList: [], itemQuantity: 1, products:[], seletedItem: {} }
    }



    componentDidMount(): void {
        this.getAllProducts();
      }
    
      getAllProducts = async () => {
        const response = await fetch('https://dummyjson.com/products');
        if (response.ok) {
          const responseData = await response.json();
          this.setState({products: responseData.products});
        }
      };


      selectedItem = (item) => {
        this.setState({selectedItem: item})
      }


    incrementCartItemQuantity = item => {
        this.setState(prevState => ({
            cartList: prevState.cartList.map(eachCartItem => {
                if (item.id === eachCartItem.id) {
                    this.setState({itemQuantity:eachCartItem.quantity + 1})
                    const updatedQuantity = eachCartItem.quantity + 1
                   
                    return { ...eachCartItem, quantity: updatedQuantity }
                }
                return eachCartItem
            }),
        }))
    }

    decrementCartItemQuantity = item => {
        const {cartList} = this.state
        const productObject = cartList.find(eachCartItem => eachCartItem.id === item.id)
        if (item.quantity > 1) {
          this.setState(prevState => ({
            cartList: prevState.cartList.map(eachCartItem => {
              if (item.id === eachCartItem.id) {
                const updatedQuantity = eachCartItem.quantity - 1
                if (this.state.itemQuantity >1){
                    this.setState({itemQuantity: eachCartItem.quantity - 1})
                }
               
                return {...eachCartItem, quantity: updatedQuantity}
              }
              return eachCartItem
            }),
          }))
        } else {
            this.setState({itemQuantity: 1})
          this.removeCartItem(item.id)
        }
      }

    handleAddToCart = (product) => {
        const { cartList } = this.state
        const productObject = cartList.find(each => each.id === product.id)
        if (productObject) {
            this.setState(prevState => ({
                cartList: prevState.cartList.map(eachCartItem => {
                    if (productObject.id === eachCartItem.id) {
                        const updatedQuantity = eachCartItem.quantity + 1
                     
                            this.setState({itemQuantity: updatedQuantity})
            
                        return { ...eachCartItem, quantity: updatedQuantity }
                    }

                    return eachCartItem
                }),
            }))
        } else {
            const updatedCartList = [...cartList, product]

            this.setState({ cartList: updatedCartList })
        }
    }

    removeCartItem = id => {
        const { cartList } = this.state
        const updatedCartList = cartList.filter(
            eachCartItem => eachCartItem.id !== id,
        )

        this.setState({ cartList: updatedCartList , itemQuantity:1})
    }

    render() {
        console.log('global', this.state.itemQuantity)
        return (
            <CartContext.Provider value={{ ...this.state,decrementCartItemQuantity:this.decrementCartItemQuantity, handleAddToCart: this.handleAddToCart, removeCartItem: this.removeCartItem, incrementCartItemQuantity:this.incrementCartItemQuantity }}>
                {this.props.children}
            </CartContext.Provider>
        )
    }
}