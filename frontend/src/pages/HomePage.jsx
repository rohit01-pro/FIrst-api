import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useProductStore } from "../store/product"
import { useEffect } from "react"
import ProductCard from "../components/ProductCard"

const HomePage = () => {
  const { fetchProducts,products} = useProductStore()

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])
  console.log("products",products)
  return  (
    <Container maxW='container.xl' py={12}>
      <VStack spacing={8}>
        <Text
            fontSize={"38"}
            fontWeight={"bold"}
            bgGradient='linear(to-l, #7928CA, #FF0080)'
            bgClip='text'
            textAlign={"center"}
        >
          Current Products 🚀
        </Text>

        <SimpleGrid 
            columns={{
              base: 1,
              md: 3,
              lg: 4,
            }}
            spacing={10}
            w={"full"}
        >

          
          {products.map((product) =>(
            <ProductCard key={product._id} product={product}/>
          ))}

        </SimpleGrid>

          {products.length === 0 &&(
            <Text fontSize={"xl"} textAlign={"center"} fontWeight={"bold"} color={"gray.500"}>
            No product found 🥲{" "}
            <Link to={"/create"}>
              <Text as="span" color="blue.500" _hover={{ textDecoration: "underline"}}>
                Create A product
              </Text>
            
            </Link>
          </Text>
          )}
      </VStack>
    </Container>

  )
  
}

export default HomePage