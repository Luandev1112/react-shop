import Banner from '@framework/app/banner';
import Categories from '@framework/categories/categories';
import Products from '@framework/products/products';
import FilterBar from './filter-bar';

const Standard = () => {
  return (
    <>
      <Banner layout="standard" />
      <FilterBar />
      <Categories layout="standard" />
      <main className="flex-1">
        <Products layout="standard" />
      </main>
    </>
  );
};

export default Standard;
