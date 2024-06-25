import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { BASE_URL } from "../../lib/constans";

function CategoryPage() {
  const { category } = useParams();
  const [uiLoader, setUiLoader] = useState(true);

  console.log("category", category);
  const [productData, setProductData] = useState([]);

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
        `${BASE_URL}?service=category&store=1&url_key=${url_key}&page=${page || 1}&count=20`
      );

      // &sort_by=${sort_by || ""}&sort_dir=${sort_dir || ""}&desc=${
      //   desc || ""
      // }&filter=${filter || ""}
      if (response?.status == 200) {
        if (response?.data?.result) {
          setProductData(response?.data?.result?.products || []);
        }
      }
    } catch {
    } finally {
      setUiLoader(false);
    }
  };

  useEffect(() => {
    getProductList(category);
  }, [category]);

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
        </div>
      </div>
    </>
  );
}

export default CategoryPage;
