'use client';

import { useEffect, useState } from 'react';
import { productApi } from '@/lib/api';

interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
}

export default function ProductsPage() {

  const [productList, setProductList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  	useEffect(() => {

	const fetchProducts = async () => {

		try {

		const data = await productApi.getAll();

		if (data.success) {
			setProductList(data.data);
		}

		} catch (err) {
		console.error(err);
		} finally {
		setLoading(false);
		}

	};

	fetchProducts();

	}, []);

  if (loading) {
    return <div className="p-8">Loading products...</div>;
  }

  return (
    <div className="min-h-screen p-8">

      <h1 className="text-3xl font-bold mb-8">
        Products
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {productList.map((product) => (

          <div
            key={product.id}
            className="border p-4 rounded-lg"
          >

            <h2 className="text-xl font-semibold">
              {product.name}
            </h2>

            <p className="text-gray-600">
              ${product.price}
            </p>

            <p className="text-sm mt-2">
              {product.description}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}