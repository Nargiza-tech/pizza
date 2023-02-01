import React from 'react';

const Categories = ({categoryId, onChangeCategory}) => {




    const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые",]


    return (
        <div className="categories">
            <ul>

                {
                    categories.map((value, index) => {
                        return <li key={index} onClick={() => onChangeCategory(index)}
                                   className={categoryId === index ? 'active' : ''}>{value}</li>
                    })
                }

            </ul>
        </div>
    );
};

export default Categories;