import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, VStack } from "@chakra-ui/react"
import { useProductStore } from "../store/product";
import { useState } from "react";



const ProductCard = ({ product }) => {//+
    const[updatedProduct, setUpdatesProduct] = useState(product)

    const textcolor = useColorModeValue("gray.600", "gray.200")
    const bg = useColorModeValue("white", "gray.800")

    
    const {deleteProduct ,updateProduct} = useProductStore()
    const toast = useToast()
    const { isOpen, onOpen, onClose} = useDisclosure()

    const handleDeleteProduct = async (pid) => {
        const{success,message} = await deleteProduct(pid)
        if(!success) { 
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                inClosable: true
            })
             // prevent the rest of the function from running if the delete fails.  This ensures the toast doesn't show up if the delete request fails.
        }else{
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 3000,
                inClosable: true
            })
             // after the delete is successful, clear the input fields.
        }

        // Delete product logic goes here
    }
    
    const handleUpdateProduct = async (pid, updatedProduct) => {
        const {success,message} = await updateProduct(pid, updatedProduct)
        onClose()
        if(!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                inClosable: true
            })
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 3000,
                inClosable: true
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

            <Text fontWeight={"bold"} fontSize={"xl"} color={textcolor} mb={"4"}>
            ${product.price}
            </Text>

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
                            <Input placeholder="Product Nmae" name="name" 
                            value={updatedProduct.name} 
                            onChange={(e) => setUpdatesProduct({...updatedProduct, name: e.target.value})}
                            />
                            <Input placeholder="price" name="price" type="number" 
                            value={updatedProduct.price}
                            onChange={(e) => setUpdatesProduct({...updatedProduct, price: e.target.value})}
                            />
                            <Input placeholder="Image URL" name="image"
                            value={updatedProduct.image} 
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