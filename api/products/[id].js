import connectToDatabase from '../../../api/utils/db.js';
import Product from '../../../backend/models/product.model.js';

export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    
    const { id } = params;
    
    // Validate ObjectId format
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return Response.json({ success: false, message: 'Invalid Product ID' }, { status: 400 });
    }

    const product = await Product.findById(id);

    if (!product) {
      return Response.json({ success: false, message: 'Product not found' }, { status: 404 });
    }

    return Response.json({ success: true, data: product });
  } catch (error) {
    console.error('Error fetching product:', error);
    return Response.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectToDatabase();
    
    const { id } = params;
    
    // Validate ObjectId format
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return Response.json({ success: false, message: 'Invalid Product ID' }, { status: 400 });
    }

    const body = await request.json();
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return Response.json({ success: false, message: 'Product not found' }, { status: 404 });
    }

    return Response.json({ 
      success: true, 
      message: 'Product updated successfully', 
      data: updatedProduct 
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return Response.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    
    const { id } = params;
    
    // Validate ObjectId format
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return Response.json({ success: false, message: 'Invalid Product ID' }, { status: 400 });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return Response.json({ success: false, message: 'Product not found' }, { status: 404 });
    }

    return Response.json({ 
      success: true, 
      message: 'Product deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return Response.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}