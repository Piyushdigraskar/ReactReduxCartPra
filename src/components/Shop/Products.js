import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Dummy_Array = [
  {
    id: 'p1',
    price: 120,
    title: 'My first Book',
    description: 'The first book i ever wrote'
  },
  {
    id: 'p2',
    price: 160,
    title: 'My second Book',
    description: 'The second book i wrote'
  },
  {
    id: 'p3',
    price: 220,
    title: 'My third Book',
    description: 'The third book i wrote'
  }

]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {Dummy_Array.map((product => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        )))}
      </ul>
    </section>
  );
};

export default Products;
