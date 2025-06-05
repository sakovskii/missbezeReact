import React from "react";
// import products from "./items";
import ProductsSlider from "./productsSlider";

const DesertsSlider = () => {
  const [deserts, setDeserts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://miss-beze.local/backend/api/get-products.php")
      .then((res) => res.json())
      .then((data) => {
        const filteredDeserts = data.filter((item) => item.category === "deserts");
        setDeserts(filteredDeserts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка загрузки:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Загрузка...</p>;

  return (
    <ProductsSlider
      products={deserts}
      title="Мои торты"
      productType="cake"
    />
  );
};

export default DesertsSlider;