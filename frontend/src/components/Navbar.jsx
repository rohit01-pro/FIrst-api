import { Button, Container, Flex, HStack, Text, useColorMode,  } from "@chakra-ui/react"
import { Link } from "react-router-dom"


import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";







const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    

  return  <Container maxW={"1140px"} px={4} >
    <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
            base: "column",
            sm: "row",
            
        }}

    
    >
        <Text
          
          bgGradient='linear(to-l, #7928CA, #FF0080)'
          bgClip='text'
          fontSize='6xl'
          fontWeight='extrabold'
          textAlign='center'
          textTransform='uppercase'
        >
          <Link to={"/"}>Rock Store 🛒 </Link>

        </Text>

        <HStack spacing={2} alignItems={"center"}>
            <Link to={"/create"}>
            <Button>
                <PlusSquareIcon fontSize={20} />
            </Button>
            </Link>
            <Button onClick={toggleColorMode}>
                {colorMode === "light"? <IoMoon /> : <LuSun size="20" />}

            </Button>
            {/* <Link to={"/product/:id"}>Product Details</Link> */}
            {/* <Link to={"/edit/:id"}>Edit Product</Link> */}

        </HStack>

    </Flex>
  </Container>
  
}

export default Navbar