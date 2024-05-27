import React from "react";
import SearchPage from "@/components/dashboard/vendor/search";
import Head from "next/head";


const Products = () => {
  return (
    <>
    <Head>
      <title>Search Page | Work Wise</title>
    </Head>
      <SearchPage title="Products" type="products" />
    </>
  );
};

export default Products;
