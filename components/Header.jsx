import React, { useEffect, useState } from 'react';
import { CiSearch } from "react-icons/ci";
import Wrapper from './Wrapper';
import Menu from './Menu';
import MenuMobile from './MenuMobile';
import Link from 'next/link';
import { BiMenu } from 'react-icons/bi';
import { BsCart3 } from 'react-icons/bs';
import { IoMdHeart } from 'react-icons/io';
import { VscChromeClose } from 'react-icons/vsc';  
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { RxCross1 } from "react-icons/rx";
 

const Header =   (cart) => {

 

  const [Number, setNumber] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [search, setsearch] = useState('Search...');
  const [showsearch, setshowsearch] = useState(false);
 
   

  useEffect(() => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('cart')) {
      setNumber(Object.keys(JSON.parse(localStorage.getItem('cart'))).length);
    }
  }, [cart]);
  
 

  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);

  const router = useRouter(); // Use the useRouter hook to get the router object
  const { slug } = router.query;

  const handleSearch = async (query) => {
    // logic to handle search
    // console.log('Search query:', query);
 

      
      window.location.replace(`/category/${query}?query=${query}`);
      // setSearchQuery('')
  };

   

  return (

    <div  className='bg-white w-screen'> 
{ showsearch &&   <motion.div initial={{y:10,scale:0}} animate={{x:0,y:0, scale:1}} transition={{duration:.4}} className=' pt-3 pb-0 justify-between right-3  items-center gap-4 text-black'>
            <form   onSubmit={(e) => 
{              e.preventDefault();
              handleSearch(searchQuery)
              
            }
              } className='flex justify-center  items-center'>
            
            <input
                type='text'
                placeholder={search}
                // onClick={()=>{
                //   setsearch('')   
                // }}
                // onDragExit={()=>{ setsearch('Search..')  }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='border px-2 border-gray-300  p-1 outline-none'
              />
              <input type='submit'
                
                className='bg-black border-2-solid-black text-white  px-3 py-1'
              
              />

            <RxCross1 onClick={()=>{setshowsearch(false)}}  className='ml-10  text-xl'/>
            </form>

          </motion.div>}

  {!showsearch&&  
      <motion.Wrapper initial={{y:5,scale:0}} animate={{x:0,y:0, scale:1}} transition={{duration:.4}} className='flex pt-3 pb-1 items-center justify-between right-3'>

        {/* Logo of the Store */}
        <Link href={"/"}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={90}
            height={90}
            className='w-[80px] md:w-[90px] mr-2 mt-2 border border-transparent rounded-md hover:bg-gray-50 hover:shadow-lg px-4 py-2'
          />
        </Link>



        {/* Navbar Menu items, category sub-menu */}
        <Menu
          showCatMenu={showCatMenu}
          setShowCatMenu={setShowCatMenu}
          showSortMenu={showSortMenu}
          setShowSortMenu={setShowSortMenu}
        />

        {mobileMenu && (
          <MenuMobile
            setShowCatMenu={setShowCatMenu}
            setMobileMenu={setMobileMenu}
            showCatMenu={showCatMenu}
          />
        )}


        {/* Mobile Menu Icon */}
        <div className='flex items-center gap-6 text-black'>
          {mobileMenu ? (
            <VscChromeClose
              className=' relative text-[22px] left-12 lg:hidden md:text-[28px]'
              onClick={() => setMobileMenu(false)}
            />
          ) : (
           <div className='flex mr-10'>
            <BiMenu
              className={`${setsearch}?hidden relative left-12 text-[22px] lg:hidden md:text-[28px]`}
              onClick={() => setMobileMenu(true)}
            /><CiSearch  onClick={()=>{
              setshowsearch(true)
              console.log(showsearch)
            }}  className='relative ml-5 left-12 text-[22px] lg:hidden md:text-[28px]'/></div>
          )}


          {/* Other items, placed at the right */}

          {/* Search Interface */}
          
          <div className=' border lg:flex hidden  items-center gap-4 text-black'>
            <form   onSubmit={(e) => 
{              e.preventDefault();
              handleSearch(searchQuery)
            }
              } className='flex items-center'>
            
            <input
                type='text'
                placeholder={search}
                // onClick={()=>{
                //   setsearch('')   
                // }}
                // onDragExit={()=>{ setsearch('Search..')  }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='border px-2 border-gray-300 rounded-l-xl p-1 outline-none'
              />
              <input type='submit'
                
                className='bg-black border-2-solid-black text-white rounded-r-xl px-3 py-1'
              
                placeholder='Search'
              />
            </form>
          </div>
      

          {/* Cart Icon */}
         {!mobileMenu&& <Link href="/cart">
            <div className='w-8 md:w-12 h-8 mr-2 md:h-12 rounded-full flex justify-center  items-center hover:bg-gray-200 hover:shadow-lg relative cursor-pointer'>
              <BsCart3 className='text-[15px] md:text-[20px]' />
              <div className='h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 flex justify-center items-center absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] px-[2px] md:px-[5px]'>{Number}</div>
            </div>
          </Link>
}
          {/* Heart Icon */}
         
        </div>
      </motion.Wrapper>}
    </div>
  );
};

export default Header;

