import React, { useEffect, useState } from "react";

import { userProduct } from "../../stores/useProduct";

import { useHistoryStore } from "../../stores/useHistory";

function AdminDashboard() {

// Product form state

const [itemName, setItemName] = useState("");

const [imageUrl, setImageUrl] = useState("");

const [description, setDescription] = useState("");

const [price, setPrice] = useState("");

const [menuEdit, setMenuEdit] = useState(null);

// Zustand store hooks

const {

menuGet,

products,

menuAddProduct,

menuUpdateProduct,

menuDeleteProduct,

} = userProduct();

const {

history,

fetchAllHistories,

updateOrderStatus,

isLoading: historyLoading,

} = useHistoryStore();

useEffect(() => {

menuGet();

fetchAllHistories();

}, [menuGet, fetchAllHistories]);

const handleAddItem = async (e) => {

e.preventDefault();

if (itemName && imageUrl && description && price) {

  const newItem = {

    name: itemName,

    price: parseInt(price),

    description,

    image: imageUrl,

  };

  await menuAddProduct(newItem);

  menuGet();

  setItemName("");

  setImageUrl("");

  setDescription("");

  setPrice("");

}

};

const handleEditItem = (product) => {

setItemName(product.name);

setImageUrl(product.image);

setDescription(product.description);

setPrice(product.price);

setMenuEdit(product._id);

};

const handleSaveEdit = async () => {

if (itemName && imageUrl && description && price && menuEdit) {

  const updatedItem = {

    name: itemName,

    price: parseInt(price),

    description,

    image: imageUrl,

  };

  await menuUpdateProduct(menuEdit, updatedItem);

  menuGet();

  setItemName("");

  setImageUrl("");

  setDescription("");

  setPrice("");

  setMenuEdit(null);

}

};

const handleCancel = () => {

setItemName("");

setImageUrl("");

setDescription("");

setPrice("");

setMenuEdit(null);

};

const handleDeleteItem = async (id) => {

await menuDeleteProduct(id);

menuGet();

};

return (

<div className="p-6 font-sans max-w-7xl mx-auto">

  <h2 className="text-3xl font-bold mb-6">Canteen Admin Dashboard 🍽</h2>



  {/* Add/Edit Item Form */}

  <form

    onSubmit={menuEdit ? handleSaveEdit : handleAddItem}

    className="max-w-md mb-10 space-y-4"

  >

    <input

      type="text"

      placeholder="Item Name"

      value={itemName}

      onChange={(e) => setItemName(e.target.value)}

      className="w-full p-2 border border-gray-300 rounded"

      required

    />

    <input

      type="text"

      placeholder="Image URL"

      value={imageUrl}

      onChange={(e) => setImageUrl(e.target.value)}

      className="w-full p-2 border border-gray-300 rounded"

      required

    />

    <textarea

      placeholder="Description"

      value={description}

      onChange={(e) => setDescription(e.target.value)}

      className="w-full p-2 border border-gray-300 rounded"

      rows={3}

      required

    />

    <input

      type="number"

      placeholder="Price"

      value={price}

      onChange={(e) => setPrice(e.target.value)}

      className="w-full p-2 border border-gray-300 rounded"

      required

      min="0"

    />

    <div className="flex gap-4">

      <button

        type="submit"

        className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"

      >

        {menuEdit ? "Update" : "Add"}

      </button>

      <button

        type="button"

        onClick={handleCancel}

        className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"

      >

        Cancel

      </button>

    </div>

  </form>



  {/* Menu Items */}

  <section className="mb-12">

    <h3 className="text-2xl font-semibold mb-4">📋 Menu Items</h3>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

      {products.map((item) => (

        <div

          key={item._id}

          className="border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col"

        >

          <img

            src={item.image}

            alt={item.name}

            className="h-40 object-cover rounded mb-4"

          />

          <h4 className="text-lg font-semibold mb-1">{item.name}</h4>

          <p className="text-gray-700 flex-grow">{item.description}</p>

          <p className="font-bold mt-2">₹{item.price}</p>

          <div className="mt-4 flex justify-between gap-2">

            <button

              onClick={() => handleDeleteItem(item._id)}

              className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded transition"

            >

              Delete

            </button>

            <button

              onClick={() => handleEditItem(item)}

              className="bg-gray-600 hover:bg-gray-700 text-white py-1 px-3 rounded transition"

            >

              Edit

            </button>

          </div>

        </div>

      ))}

    </div>

  </section>



  {/* Order History */}

  <section>

    <h3 className="text-2xl font-semibold mb-4">📦 Order History</h3>



    {historyLoading && (

      <p className="text-center text-gray-600">Loading order history...</p>

    )}



    {!historyLoading && history.length === 0 && (

      <p className="text-center text-gray-500">No orders found.</p>

    )}



    <div className="space-y-6">

      {history.map((order) => {

        const { _id, status, products } = order;



        const totalAmount = products.reduce(

          (sum, item) =>

            sum + (item.totalPrice || item.price * item.quantity),

          0

        );



        return (

          <div

            key={_id}

            className={`p-6 rounded-lg shadow-md ${

              status === "delivered"

                ? "bg-green-100"

                : status === "ready"

                ? "bg-yellow-100"

                : "bg-white"

            }`}

          >

            <h4 className="font-bold mb-2">Order ID: {_id}</h4>

            <p className="mb-2">

              Status:{" "}

              <span

                className={`font-semibold ${

                  status === "delivered"

                    ? "text-green-700"

                    : status === "ready"

                    ? "text-yellow-700"

                    : "text-gray-700"

                }`}

              >

                {status.charAt(0).toUpperCase() + status.slice(1)}

              </span>

            </p>

            <p className="mb-4 font-medium">Total Amount: ₹{totalAmount}</p>



            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

              {products.map((item, index) => (

                <div

                  key={index}

                  className="flex gap-4 border rounded p-3 bg-white"

                >

                  <img

                    src={item.image || "https://placehold.co/80x80"}

                    alt={item.productName}

                    className="w-20 h-20 object-cover rounded"

                  />

                  <div>

                    <h5 className="font-semibold">{item.productName}</h5>

                    <p>Price: ₹{item.price}</p>

                    <p>Quantity: {item.quantity}</p>

                    <p>Total: ₹{item.totalPrice}</p>

                  </div>

                </div>

              ))}

            </div>



            {status !== "delivered" ? (

              <button

                onClick={() =>

                  updateOrderStatus(

                    _id,

                    status === "waiting" ? "ready" : "delivered"

                  )

                }

                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"

              >

                Mark as {status === "waiting" ? "Ready" : "Delivered"}

              </button>

            ) : (

              <span className="text-green-700 font-semibold">

                ✅ Delivered

              </span>

            )}

          </div>

        );

      })}

    </div>

  </section>

</div>

);

}

export default AdminDashboard;