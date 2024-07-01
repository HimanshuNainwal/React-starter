import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { BASE_URL } from "../../lib/constans";
import { Triangle } from "react-loader-spinner";
import SingleFilterComponent from "../components/SingleFilterComponent";
import { useSearchParams } from "react-router-dom";

function CategoryPage() {
  const { category } = useParams();
  const [uiLoader, setUiLoader] = useState(true);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [isPageAvailable, setIsPageAvailable] = useState(true);

  const [productData, setProductData] = useState([]);
  const [filtersData, setFiltersData] = useState([]);
  const [appliedFilters, setAppliedFilters] = useState({});

  const [searchParams, setSearchParams] = useSearchParams();
  const [filterString,setFilterString] = useState("")

  const filter = searchParams.get("filter");


  const loaderRef = useRef(null);

  const handleScroll = (e) => {
    const topScroll = window.scrollY; // 0 - 20000 -4000
    const loaderScroll = loaderRef?.current?.offsetTop; // 2000 - 4000

    // uiLoader it will wait for the api call
    // isPageAvailable for when there is next page
    if (topScroll > loaderScroll - 1000 && !uiLoader && isPageAvailable) {
      getProductList(category, CurrentPage + 1 ,filterString);
    }
  };

  const getProductList = async (
    url_key,
    page,
    filter,
    sort_by,
    sort_dir,
    desc
  ) => {
    try {
      setUiLoader(true);
      const response = await axios(
        `${BASE_URL}?service=category&store=1&url_key=${url_key}&page=${
          page || 1
        }&count=10&filter=${filter || ""}`
      );

      // sort_by=${sort_by || ""}&sort_dir=${sort_dir || ""}&desc=${
      //   desc || ""
      // }&

      if (response?.status == 200) {
        if (response?.data?.result) {
          if (response?.data?.result?.filters?.length) {
            setFiltersData(response?.data?.result?.filters);
          }
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

 
  const setFilterInParams = async (filterObj) => {

    if (Object.keys(filterObj)) {
      // let urlStrin = " "
      //   const obj = {
      //     "product_category": [
      //         "Kurtas",
      //         "Kurta Sets"
      //     ],
      //     "selling_price": [
      //         "Rs.0 to Rs.999"
      //     ]
      // }
      // Object.keys(obje)
      // ["product_category","selling_price"]
      // obj.product_category ->  [
      //         "Kurtas",
      //         "Kurta Sets"
      //     ]

      // const val  =   [
      //         "Kurtas",
      //         "Kurta Sets"
      //     ]
      // val.loop -> urlStrig += `product_category-Kurtas`

      // extracting keys from the object
      // ["product_category","selling_price","discount"]
      //
      //   {
      //     "product_category": [
      //         "Kurtas",
      //         "Kurta Sets",
      //         "Tops",
      //         "Gowns & Dresses",
      //         "Sharara Sets",
      //         "Straight Kurta"
      //     ],
      //     "selling_price": [
      //         "Rs.0 to Rs.999",
      //         "Rs.1000 to Rs.1999"
      //     ],
      //     "discount": [
      //         "10% and Above",
      //         "20% and Above"
      //     ]
      // }
      // a,b , c ,d

      let urlStringArray = [];

      Object.keys(filterObj)?.forEach((singleKey, index) => {
        const singleValue = filterObj[singleKey];
        if (singleValue?.length) {
          singleValue.forEach((value) => {
            if(singleKey == "selling_price"){

              const formattedValue = value.replaceAll(" ", "+")
              urlStringArray.push(`${singleKey}-${formattedValue}`);

            }else {

              
              urlStringArray.push(`${singleKey}-${value}`);
            }
          });
        }
      });



      const urlString = urlStringArray.join(",");



      setIsPageAvailable(true);
      setProductData([]);
      window.scrollTo(0, 0);
      setFilterString(urlString)
      setSearchParams({ filter: urlString });
      await getProductList(category, 1, urlString);
    } else {
      setFilterString("")
    }
  };

  const handleFilterChange = (code, value) => {
    const updatedFilters = { ...appliedFilters };

    // Create a new copy of the current filters
    if (updatedFilters[code]) {
      if (updatedFilters[code]?.includes(value)) {
        updatedFilters[code] = updatedFilters[code].filter(
          (el) => el !== value
        );
      } else {
        updatedFilters[code] = [...updatedFilters[code], value]; // Update the filter value
      }
    } else {
      updatedFilters[code] = [value]; // Add the new filter value
    }
    console.log('updatedFilters',updatedFilters);
    setAppliedFilters(updatedFilters);
    setFilterInParams(updatedFilters)

    
  };

  useEffect(() => {

    if (filter) {

      const urlFilter = filter;

      const arrayOfFilter = urlFilter.split(",");
      const filterObj = {};



      arrayOfFilter.forEach((singleFilter) => {

        const [key, value] = singleFilter.split("-");
        // console.log('key,value',key,value);
        if (key && value) {
          if (filterObj[key]) {
            filterObj[key] = [...filterObj[key], value]; // Update the filter value
          } else {
            filterObj[key] = [value]; // Add the new filter value
          }
        }
      });



      setFilterInParams(filterObj)
      setAppliedFilters(filterObj);
    }else {

      setIsPageAvailable(true);
      setProductData([]);
      window.scrollTo(0, 0);
      getProductList(category);
    }
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



  return (
    <>
      <div className="flex gap-8">
        <div className="w-2/12 border ">
          {filtersData?.length > 0 &&
            filtersData.map((filter) => {
              return (
                <div key={filter.filter_lable}>
                  <SingleFilterComponent
                    title={filter.filter_lable}
                    filterOption={filter?.options}
                    appliedFilters={appliedFilters}
                    handleFilterChange={handleFilterChange}
                  />
                </div>
              );
            })}
        </div>
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
