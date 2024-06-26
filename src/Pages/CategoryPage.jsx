import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { BASE_URL } from "../../lib/constans";
import { Triangle } from "react-loader-spinner";

function CategoryPage() {
  const { category } = useParams();
  const [uiLoader, setUiLoader] = useState(true);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [isPageAvailable, setIsPageAvailable] = useState(true);

  const loaderRef = useRef(null);

  const [productData, setProductData] = useState([]);

  const handleScroll = (e) => {
    const topScroll = window.scrollY; // 0 - 20000 -4000
    const loaderScroll = loaderRef?.current?.offsetTop; // 2000 - 4000


    // uiLoader it will wait for the api call 
    // isPageAvailable for when there is next page 
    if (topScroll > loaderScroll - 1000 && !uiLoader && isPageAvailable) {
      getProductList(category, CurrentPage + 1);
    }
  };

  const getProductList = async (
    url_key,
    page,
    sort_by,
    sort_dir,
    desc,
    filter
  ) => {
    try {
      setUiLoader(true);
      const response = await axios(
        `${BASE_URL}?service=category&store=1&url_key=${url_key}&page=${
          page || 1
        }&count=100`
      );

      // &sort_by=${sort_by || ""}&sort_dir=${sort_dir || ""}&desc=${
      //   desc || ""
      // }&filter=${filter || ""}
      if (response?.status == 200) {
        if (response?.data?.result) {
          // [1,2,3,4,5,6,7,8,9]

          if (response?.data?.result?.products?.length) {
            setProductData((state) => [
              ...state,
              ...response?.data?.result?.products,
            ]);
            setCurrentPage(page || 1);
          } else {
            setIsPageAvailable(false);
          }
        }
      }
    } catch {
    } finally {
      setUiLoader(false);
    }
  };

  useEffect(() => {
    setIsPageAvailable(true)
    setProductData([])
    window.scrollTo(0,0)
    getProductList(category);
  }, [category]);

  useEffect(() => {

    if (isPageAvailable) {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      // 2
      window.removeEventListener("scroll", handleScroll);
    };
  }, [uiLoader, isPageAvailable]);

  // console.log('loaderRef',loaderRef?.current?.offsetTop);

  return (
    <>
      <div className="flex gap-8">
        <div className="w-2/12 border "></div>
        <div className="flex flex-wrap w-9/12">
          {productData?.length > 0 &&
            productData.map((item) => {
              return (
                <div className="w-1/4" key={item?.id_product_category}>
                  <div>
                    <img src={item?.image} width={"w-full"} />
                  </div>
                  <p>{item?.name}</p>
                  <p>Rs {item?.price}</p>
                </div>
              );
            })}

          <div className="productLoader text-center" ref={loaderRef}>
            <Triangle />
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryPage;
