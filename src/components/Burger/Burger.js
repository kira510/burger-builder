import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient"

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...(Array(props.ingredients[igKey]))].map((_, i) =>
            <BurgerIngredient key={igKey + i} type={igKey} />
        );
    }).reduce(function (arr, el) {
        return arr.concat(el);
      }, []);

    if(transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>;
    }

    // note that arrays of arrays can also be rendered in the same order 
    // in render function 
    // example: transformingredients is also an array of array

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    );
}

export default burger;
