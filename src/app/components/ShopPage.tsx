"use client";
import { urlFor } from "@/sanity/lib/image";
import { FoodProduct } from "@/types/FoodProduct";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import ProductGrid from "./ProductGrid"; 

const ShopPage = ({ products }: { products: FoodProduct[] }) => {
  const [search, setsearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 80]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setsearch(value);
  };

  const categories = ["starter", "main", "desserts", "drinks", "burger", "all"];

  const latestProducts = products.filter((product) =>
    product.tags.includes("latest")
  );

  const productTags = [
    "snacks",
    "burger",
    "popular",
    "sweet dish",
    "Burger",
    "lunch",
    "best seller",
    "desi",
  ];

  const filteredProducts = products.filter((product) => {
    const searchTerm = search.toLowerCase().trim();
    const inCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const inPriceRange =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    const inSearch =
      !searchTerm ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.name.toLowerCase().includes(searchTerm);

    return (
      (inCategory && inPriceRange && !searchTerm) || (inSearch && searchTerm)
    );
  });

  const productsPerPage = 9;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 my-4 sm:my-8 ">
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="w-full bg-primYellow inter text-white py-2 rounded-lg font-medium"
        >
          {isSidebarOpen ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row-reverse gap-6">
        <div
          className={`w-full lg:w-64 ${isSidebarOpen ? "block" : "hidden"} lg:block`}
        >
          <div className="bg-white rounded-lg p-4 shadow-md space-y-6">
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
              <input
                type="text"
                placeholder="Search Product"
                value={search}
                onChange={handleChange}
                className="w-full bg-gray-100 opacity-70 px-2 py-1 rounded outline-none"
              />
              <button
                type="submit"
                className="w-full sm:w-auto lg:w-full bg-primYellow px-3 py-1 text-white rounded"
              >
                Search
              </button>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4 openSans">Category</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2">
                {categories.map((category) => (
                  <label key={category} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-primYellow focus:ring-primYellow"
                      onChange={() => setSelectedCategory(category)}
                      checked={selectedCategory === category}
                    />
                    <span className="text-gray-700 inter capitalize inter">
                      {category}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="hidden sm:block">
              <Link href={"/products"} className="block w-full">
                <Image
                  src={"/shopside.png"}
                  alt="Shop promotion"
                  width={286}
                  height={286}
                  className="w-full h-auto"
                />
              </Link>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4 openSans">
                Filter By Price
              </h3>
              <div className="space-y-4">
                <input
                  type="range"
                  min="0"
                  max="80"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-full accent-primYellow"
                />
                <div className="flex justify-between text-sm text-gray-600 inter">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4 openSans">
                Latest Products
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {latestProducts.map((product) => (
                  <div key={product._id} className="flex items-start space-x-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={urlFor(product.images[0]).url()}
                        alt={product.name}
                        height={64}
                        width={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 inter">
                        {product.name}
                      </h4>
                      <p className="text-primYellow font-bold inter">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4 openSans">
                Product Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {productTags.map((tag) => (
                  <button
                    key={tag}
                    className="px-3 py-1 rounded-md text-sm transition-colors duration-200 hover:bg-primYellow hover:text-white bg-gray-100"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* {currentProducts ? (
          <div className="flex-1 items-end">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              { currentProducts && currentProducts.map((product) => (
                <Link
                  href={`/products/${product.slug.current}`}
                  key={product._id}
                >
                  <div className="group relative bg-white overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div className="w-full aspect-square overflow-hidden">
                      {product.images && product.images[0] && (
                        <Image
                          src={urlFor(product.images[0]).url() || ""}
                          alt={product.name}
                          height={400}
                          width={400}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <ProductBadges product={product} />
                      <h3 className="text-lg lg:text-sm xl:text-lg font-semibold text-gray-900 openSans">
                        {product.name}
                      </h3>
                      <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row justify-between items-start sm:items-center gap-2 mt-2">
                        <div>
                          {product.isDiscounted && product.discountPrice ? (
                            <div className="flex gap-1">
                              <p className="text-green-600 font-bold inter">
                                ${product.discountPrice.toFixed(2)}
                              </p>
                              <p className="text-gray-400 line-through">
                                ${product.price.toFixed(2)}
                              </p>
                            </div>
                          ) : (
                            <p className="text-primYellow font-bold inter">
                              ${product.price.toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex justify-center items-center mt-6 space-x-4">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <FaArrowLeft className="text-zinc-700" />
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  className={`px-4 py-2 border rounded ${
                    currentPage === index + 1
                      ? "bg-primYellow text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <FaArrowRight className="text-zinc-700" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-50 rounded-lg">
            <div className="animate-pulse space-y-4 w-full max-w-2xl px-4">
              <div className="text-center space-y-3">
                <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )} */}
        <ProductGrid
  currentProducts={currentProducts}
  currentPage={currentPage}
  totalPages={totalPages}
  handlePageChange={handlePageChange}
  urlFor={urlFor}
/>
      </div>
    </div>
  );
};

export default ShopPage;
