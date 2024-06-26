import React, { useEffect, useState } from "react";
import { SpinnerImg } from "../../loader/Loader";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import "./ProductList.scss";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_PRODUCTS,
  selectFilteredProducts,
} from "../../../redux/features/filterSlice";
import ReactPaginate from "react-paginate";
import {
  deleteProduct,
  getAllProducts,
} from "../../../redux/features/productSlice";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";

const ProductList = ({ products, isLoading }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const filteredProducts = useSelector(selectFilteredProducts);

  useEffect(() => {
    if (products) {
      dispatch(FILTER_PRODUCTS({ products, search }));
    }
  }, [products, search, dispatch]);

  const shortenText = (text, n) => {
    if (text.length <= n) {
      return text;
    } else {
      const shortendText = text.substring(0, n).concat("...");
      return shortendText;
    }
  };

  //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProducts]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };
  // End Pagination

  const delProduct = async (productId) => {
    await dispatch(deleteProduct(productId));
    await dispatch(getAllProducts());
  };

  const confirmDelete = (productId) => {
    confirmAlert({
      title: "Delete Product",
      message: "Are you sure you want to delete this product.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delProduct(productId),
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  return (
    <div className="product-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Inventory Items</h3>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </span>
        </div>

        {isLoading && <SpinnerImg />}
        <div className="table">
          {!isLoading && products.length === 0 ? (
            <p>No product found, please add products...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Value</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((product, index) => {
                  const { _id, name, category, price, quantity } = product;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(name, 16)}</td>
                      <td>{category}</td>
                      <td>
                        &#8377;
                        {price}
                      </td>
                      <td>{quantity}</td>
                      <td>
                        &#8377;
                        {price * quantity}
                      </td>
                      <td className="icons">
                        <span>
                          <Link to={`/app/product-detail/${_id}`}>
                            <AiOutlineEye size={20} color={"purple"} />
                          </Link>
                        </span>
                        <span>
                          <Link to={`/app/edit-product/${_id}`}>
                            <FaEdit size={20} color={"green"} />
                          </Link>
                        </span>
                        <span>
                          <FaTrashAlt
                            size={20}
                            color={"red"}
                            onClick={() => confirmDelete(_id)}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </div>
    </div>
  );
};

export default ProductList;
