import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import "./Pagination.css";

export default function Pagination({ items, itemsCount, pathname, setShowItems }) {
  // console.log(items, itemsCount, pathname, setShowItems);

  const { pageID } = useParams()
  const [pageCount, setPageCount] = useState(null)
  const [allPagesArray, setAllPagesArray] = useState([])

  useEffect(() => {
    let endIndex = itemsCount * pageID
    let startIndex = endIndex - itemsCount
    let paginatedItems = items && items.slice(startIndex, endIndex)
    setShowItems && setShowItems(paginatedItems)

    let pageNumber = Math.ceil(items.length / itemsCount)
    setPageCount(pageNumber)

    setAllPagesArray(Array.from(Array(pageCount).keys()))

  }, [pageID, items, pageCount])


  return (
    <div className="courses-pagination">
      <ul className="courses__pagination-list">

        <Link to={`${pathname}/${(pageID - 1)}`} className={`courses__pagination-item ${pageID == 1 && 'd-none'}`}>
          <div className="courses__pagination-link">
            <i className="fas fa-long-arrow-alt-right courses__pagination-icon"></i>
          </div>
        </Link>
        {pageCount && allPagesArray.map((page,index) => (
          <li className="courses__pagination-item" key={page}>
            <Link to={`${pathname}/${(page + 1)}`}
              className={`courses__pagination-link ${page + 1 == pageID && "courses__pagination-link--active"}`} //
            >
              {page + 1}
            </Link>
          </li>

        ))}

        <Link to={`${pathname}/${(Number(pageID) + 1)}`} className="courses__pagination-item">
          <div className={`courses__pagination-link ${pageID == allPagesArray.length && 'd-none'}`}>
            <i className="fas fa-long-arrow-alt-left courses__pagination-icon"></i>
          </div>
        </Link>

      </ul>
    </div>
  );
}
