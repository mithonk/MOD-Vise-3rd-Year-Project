import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Spinner from "@/components/Spinner";
import { ReactSortable } from "react-sortablejs";

const inlineStyles = {
  formContainer: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f7f7f7",
    border: "1px solid #ddd",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "3px",
  },
  select: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "3px",
    backgroundColor: "#fff",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    margin: "0",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "3px",
    resize: "vertical",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "3px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  sizesContainer: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    padding: "10px",
  },
  sizeItem: {
    flex: "0 0 calc(25% - 30px)",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  sizeLabel: {
    fontWeight: "bold",
    marginBottom: "5px",
  },
  sizeInput: {
    width: "60px",
    padding: "5px",
    border: "1px solid #ccc",
    borderRadius: "3px",
  },
};

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: assignedCategory,
  properties: assignedProperties,
  sizes: existingSizes,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [category, setCategory] = useState(assignedCategory || "");
  const [productProperties, setProductProperties] = useState(
    assignedProperties || {}
  );
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImages || []);
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [sizes, setSizes] = useState(existingSizes || []);
  console.log("Sizes", sizes);
  const availableSizes = [
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
  ];

  const router = useRouter();
  useEffect(() => {
    setCategoriesLoading(true);
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
      setCategoriesLoading(false);
    });
  }, []);
  async function saveProduct(ev) {
    ev.preventDefault();

    // const sizeQuantities = Object.entries(sizes).map(([size, quantity]) => ({
    //   size,
    //   quantity: parseInt(quantity, 10),
    // }));

    // console.log("Sizes", sizeQuantities);
    const data = {
      title,
      description,
      price,
      images,
      category,
      properties: productProperties,
      sizes,
    };
    console.log("Data product", data);
    if (_id) {
      //update
      await axios.put("/api/products", { ...data, _id });
    } else {
      //create
      await axios.post("/api/products", data);
    }
    setGoToProducts(true);
  }
  if (goToProducts) {
    router.push("/products");
  }
  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/upload", data);
      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
    }
  }
  const handleSizeChange = (size, quantity) => {
    setSizes((prevSizes) => [
      ...prevSizes.filter((i) => i.size !== size),
      { size, quantity },
    ]);
  };

  function updateImagesOrder(images) {
    setImages(images);
  }
  function setProductProp(propName, value) {
    setProductProperties((prev) => {
      const newProductProps = { ...prev };
      newProductProps[propName] = value;
      return newProductProps;
    });
  }

  const propertiesToFill = [];
  if (categories.length > 0 && category) {
    let catInfo = categories.find(({ _id }) => _id === category);
    propertiesToFill.push(...catInfo.properties);
    while (catInfo?.parent?._id) {
      const parentCat = categories.find(
        ({ _id }) => _id === catInfo?.parent?._id
      );
      propertiesToFill.push(...parentCat.properties);
      catInfo = parentCat;
    }
  }

  return (
    <div style={inlineStyles.formContainer}>
      <form onSubmit={saveProduct}>
        <label style={inlineStyles.label}>Product Name</label>
        <input
          type="text"
          placeholder="product name"
          value={title}
          style={inlineStyles.input}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <label style={inlineStyles.label}>Category</label>
        <select
          value={category}
          style={inlineStyles.select}
          onChange={(ev) => setCategory(ev.target.value)}
        >
          <option value="">Uncategorized</option>
          {categories.length > 0 &&
            categories.map((c) => <option value={c._id}>{c.name}</option>)}
        </select>
        {categoriesLoading && <Spinner />}
        {propertiesToFill.length > 0 &&
          propertiesToFill.map((p) => (
            <div className="">
              <label style={inlineStyles.label}>
                {p.name[0].toUpperCase() + p.name.substring(1)}
              </label>
              <div>
                <select
                  value={productProperties[p.name]}
                  style={inlineStyles.select}
                  onChange={(ev) => setProductProp(p.name, ev.target.value)}
                >
                  {p.values.map((v) => (
                    <option value={v}>{v}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        <label style={inlineStyles.label}>Photos</label>
        <div className="mb-2 flex flex-wrap gap-1">
          <ReactSortable
            list={images}
            className="flex flex-wrap gap-1"
            setList={updateImagesOrder}
          >
            {!!images?.length &&
              images.map((link) => (
                <div
                  key={link}
                  className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200"
                >
                  <img src={link} alt="" className="rounded-lg" />
                </div>
              ))}
          </ReactSortable>
          {isUploading && (
            <div className="h-24 flex items-center">
              <Spinner />
            </div>
          )}
          <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <div>Add image</div>
            <input type="file" onChange={uploadImages} className="hidden" />
          </label>
        </div>

        <label style={inlineStyles.label}>Available Sizes</label>

        <div className="h-45 bg-white p-4 shadow-sm rounded-sm border border-gray-200">
          <div style={inlineStyles.sizesContainer}>
            {availableSizes.map((size) => {
              // let quantity = 0;
              // let internalSize = sizes.find((sizeQ) => sizeQ.size === size);
              // if (internalSize) quantity = internalSize.quantity;
              // quantity = sizes[size];
              return (
                <div key={size} style={inlineStyles.sizeItem}>
                  <label style={inlineStyles.sizeLabel}>Size {size}</label>
                  <input
                    // defaultValue={quantity}
                    type="number"
                    placeholder="Quantity"
                    value={(sizes || []).find((i) => i.size == size)?.quantity}
                    style={inlineStyles.sizeInput}
                    onChange={(ev) => handleSizeChange(size, ev.target.value)}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <label style={inlineStyles.label}>Description</label>
        <textarea
          placeholder="description"
          style={inlineStyles.textarea}
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        <label style={inlineStyles.label}>Price (in RS)</label>
        <input
          type="number"
          placeholder="price"
          style={inlineStyles.input}
          value={price}
          onChange={(ev) => setPrice(ev.target.value)}
        />
        <button style={inlineStyles.button} type="submit">
          Save
        </button>
      </form>
    </div>
  );
}
