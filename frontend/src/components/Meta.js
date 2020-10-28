import React from "react";
import {Helmet} from "react-helmet";

const Meta = ({title, description, keywords}) => (
  <Helmet title={title}>
    <meta name="description" content={description}/>
    <meta name="keywords" content={keywords}/>
  </Helmet>
);

Meta.defaultProps = {
  title: 'Welcome to ProShop',
  description: "Best products for the low",
  keywords: "electronics, products, cheap"
}

export default Meta;