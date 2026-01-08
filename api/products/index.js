import connectToDatabase from '../../api/utils/db.js';
import Product from '../../backend/models/product.model.js';

export async function GET(request) {
  try {
    await connectToDatabase();
    
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page')) || 1;
    const limit = parseInt(url.searchParams.get('limit')) || 10;
    
    const startIndex = (page - 1) * limit;
    
    const products = await Product.find({})
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

    const total = await Product.countDocuments({});

    return Response.json({ 
      success: true, 
      data: products,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return Response.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    const { name, price, image, description, category, stock } = body;

    if (!name || !price || !image) {
      return Response.json({ success: false, message: 'Please provide name, price, and image' }, { status: 400 });
    }

    const newProduct = new Product({
      name,
      price,
      image,
      description: description || '',
      category: category || 'General',
      stock: stock !== undefined ? stock : 100
    });

    const savedProduct = await newProduct.save();

    return Response.json({ 
      success: true, 
      message: 'Product created successfully', 
      data: savedProduct 
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return Response.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}