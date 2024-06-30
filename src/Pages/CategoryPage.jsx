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

  const [searchParams,setSearchParams] = useSearchParams()

  const filter = searchParams.get("filter")



  const [appliedFilters,setAppliedFilters] = useState({})

  const loaderRef = useRef(null);

  const [productData, setProductData] = useState([]);
  const [filtersData, setFiltersData] = useState([]);

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
        }&count=10`
      );

      // &sort_by=${sort_by || ""}&sort_dir=${sort_dir || ""}&desc=${
      //   desc || ""
      // }&filter=${filter || ""}
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

  const handleFilterChange = (code, value) => {
    setAppliedFilters(prevFilters => {
      const updatedFilters = { ...prevFilters };
      // const updatedFilters = prevFilters
      
      // Create a new copy of the current filters
      if (updatedFilters[code]) {
        updatedFilters[code] = [...updatedFilters[code], value]; // Update the filter value
      } else {
        updatedFilters[code] = [value]; // Add the new filter value
      }
      return updatedFilters; // Return the new filter object
    });
  };
  


  useEffect(() => {
    
    
    setIsPageAvailable(true);
    setProductData([]);
    window.scrollTo(0, 0);
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


  useEffect(() => {

    // product_category-Kurtas,product_category-Kurta Sets
    // [product_category-Kurtas,product_category-Kurta Sets]
    if(filter){
      const urlFilter = filter
      console.log('urlFilter',urlFilter);
      const arrayOfFilter = urlFilter.split(',')
      const filterObj ={}

      // console.log('arrayOfFilter',arrayOfFilter);

      arrayOfFilter.forEach(singleFilter => {

        // console.log(" singleFilter.split('-')", singleFilter.split('-'));

        const [key,value] = singleFilter.split('-')
        // console.log('key,value',key,value);
        if(key && value){

          if (filterObj[key]) {
            filterObj[key] = [...filterObj[key], value]; // Update the filter value
          } else {
            // filterObj['product_category'] = ["kurta"]
            filterObj[key] = [value]; // Add the new filter value
          }
        }


      })

      // console.log('filterObj',filterObj);
      setAppliedFilters(filterObj)


    }

  },[])



  useEffect(() => {
    if(Object.keys(appliedFilters)){

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
      let urlString = ""
      Object.keys(appliedFilters)?.forEach((singleKey,index) => {

        // extracting value from the object based on key
        const singleValue = appliedFilters[singleKey] 
        // [
          //         "Kurtas",
          //         "Kurta Sets",
          //         "Tops",
          //         "Gowns & Dresses",
          //         "Sharara Sets",
          //         "Straight Kurta"
              // ]


        if(singleValue?.length){
          singleValue.forEach(value => {
            // product_category-Kurtas
            // product_category-Tops
            // product_category-Straight Kurta
            urlString += `${singleKey}-${value},`
          })

        }
      })

      console.log('appliedFilters',appliedFilters);

      
      setSearchParams({filter:urlString})
   

      // encodeURIComponent



    }
  },[appliedFilters])
  // console.log('loaderRef',loaderRef?.current?.offsetTop);

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
