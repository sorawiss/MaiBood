import React from 'react'

function StoreSection( ) {
    return (
        <div className='third-container'>
            <SectionTitle title={'อาหารจากร้านค้า'} />
            <div className="allfood-container">
                {list.map((items) => <FoodWrapper key={items.id} id={items.id} exp={items.exp} price={items.price} image={items.image} name={items.material} location={'Tops daily สาขาธรรมศาสตร'} />)}
            </div>
        </div>
  )
}

export default StoreSection