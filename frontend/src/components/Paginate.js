import React from "react";
import {Pagination} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

const Paginate = ({pages, page, isAdmin = false, keyword = ""}) => {

  return pages > 1 && (
    <Pagination>
        {[...Array(pages).keys()].map(pgs => (
          <LinkContainer key={pgs + 1}
                         to={!isAdmin ? keyword ? `/search/${keyword}/page/${pgs + 1}` : `/page/${pgs + 1}` : `/admin/product-list/${pgs + 1}`}>
            <Pagination.Item active={pgs + 1 === page}>
              {pgs + 1}
            </Pagination.Item>
          </LinkContainer>
        ))}
    </Pagination>
  )
}

export default Paginate