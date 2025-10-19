const getProducts = async () => {
  try {
    const response = await fetch('../db.json');

    const result = await response.json();

    return result.menu;
  } catch {
    err;
    console.log(err);

    return [];
  }
};

export default getProducts;
