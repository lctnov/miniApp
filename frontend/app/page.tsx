export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to E-commerce</h1>
      <div className="space-x-4">
        <a href="/products" className="bg-blue-500   rounded">
          Browse Products
        </a>
        <a href="/auth" className="bg-green-500   rounded">
          Admin Login
        </a>
      </div>
    </main>
  );
}