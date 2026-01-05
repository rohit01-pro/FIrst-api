import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, VStack, Badge } from "@chakra-ui/react"
import { useProductStore } from "../store/product";
import { useState } from "react";
import { FiShoppingCart } from 'react-icons/fi';



const ProductCard = ({ product }) => {//+
    const[updatedProduct, setUpdatedProduct] = useState(product)

    const textcolor = useColorModeValue("gray.600", "gray.200")
    const bg = useColorModeValue("white", "gray.800")

    
    const {deleteProduct ,updateProduct, addToCart} = useProductStore()
    const toast = useToast()
    const { isOpen, onOpen, onClose} = useDisclosure()

    const handleAddToCart = () => {
        addToCart(product);
        toast({
            title: "Added to Cart",
            description: `${product.name} has been added to your cart`,
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "top-right"
        });
    };

    const handleBuyNow = () => {
        addToCart(product);
        toast({
            title: "Proceeding to Checkout",
            description: `${product.name} added to cart. Redirecting...`,
            status: "info",
            duration: 2000,
            isClosable: true,
            position: "top-right"
        });
        // In a real app, this would redirect to checkout page
    };

    const handleDeleteProduct = async (pid) => {
        const{success,message} = await deleteProduct(pid)
        if(!success) { 
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true
            })
             // prevent the rest of the function from running if the delete fails.  This ensures the toast doesn't show up if the delete request fails.
        }else{
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true
            })
             // after the delete is successful, clear the input fields.
        }

        // Delete product logic goes here
    }
    
    const handleUpdateProduct = async (pid, updatedProduct) => {
        const {success,message} = await updateProduct(pid, updatedProduct)
        if(!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true
            })
        } else {
            onClose()
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true
            })
            // after the update is successful, close the modal.
        }

    }

  return (
    <Box shadow={"lg"} rounded={"lg"} overflow={"hidden"} transition={"all 0.3s"} _hover={{transform:  "translateY(-5px)", shadow:"xl"}} bg={bg}>
        <Image src={product.image} alt={product.name} h={48} w={"full"} objectFit={"cover"} />

        <Box p={4}>
            <Heading as={"h3"} size={"md"} mb={"2"}>
                {product.name}
            </Heading>

            <Text fontWeight={"bold"} fontSize={"xl"} color={textcolor} mb={"2"}
            >
            ${product.price}
            </Text>

            {product.category && (
                <Badge colorScheme="purple" mb={3}>
                    {product.category}
                </Badge>
            )}

            <VStack spacing={2} mb={4}>
                <Button
                    leftIcon={<FiShoppingCart />}
                    colorScheme="teal"
                    size="sm"
                    width="full"
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </Button>
                <Button
                    colorScheme="purple"
                    size="sm"
                    width="full"
                    onClick={handleBuyNow}
                >
                    Buy Now
                </Button>
            </VStack>

            <HStack spacing={2}> 
                <IconButton icon={<EditIcon/>}
                    onClick={onOpen}
                colorScheme="blue" />
                <IconButton icon={<DeleteIcon/>} onClick={ () => handleDeleteProduct(product._id)}  colorScheme="red" />
            </HStack>
            
        </Box>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />

                <ModalContent>
                    <ModalHeader>Update Product </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input placeholder="Product Name" name="name"
                            value={updatedProduct.name} 
                            onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})}
                            />
                            <Input placeholder="Price" name="price" type="number"
                            value={updatedProduct.price}
                            onChange={(e) => setUpdatedProduct({...updatedProduct, price: e.target.value})}
                            />
                            <Input placeholder="Image URL" name="image"
                            value={updatedProduct.image} 
                            onChange={(e) => setUpdatedProduct({...updatedProduct, image: e.target.value})}
                            />
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3}
                            onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                        >
                            Update
                            </Button>
                        <Button variant={"ghost"} onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            
                
        </Modal>
        
    </Box>
  )
}


export default ProductCard;