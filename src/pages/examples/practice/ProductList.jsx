function ProductList({ products }) {
    return (
        <>
            <div style={{ padding: '20px' }}>
                <h2>Product List</h2>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {products.map((product) => (
                        <li
                            key={product.id}
                            style={{
                                border: '1px solid #ddd',
                                padding: '15px',
                                margin: '10px 0',
                                borderRadius: '5px',
                                backgroundColor: '#f9f9f9'
                            }}
                        >
                            <h3 style={{ margin: '0 0 10px 0' }}>{product.name}</h3>
                            <p style={{ margin: '5px 0' }}>
                                <strong>Price:</strong> INR {product.price}
                            </p>
                            <p style={{ margin: '5px 0', color: '#666' }}>
                                <strong>Category:</strong> {product.category}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default ProductList;
