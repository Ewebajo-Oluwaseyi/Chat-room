import { Transition } from "@headlessui/react";
import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";  
import suggessions from "src/data/suggestions";
import Header from '../../components/Header/header';
import Sidebar from '../../components/Sidebar/sidebar';
import SortOptions from '../../components/SortOptions/index'
import RequestCard from '../../components/RequestCard/index';


const Home = () => {
  const sortOption = ['Most Liked', 'Least Liked', 'Most Comments', 'Least Comments']
  const [isMenuVisible, setisMenuVisible] = useState(false)
  const [selectFilterOption, setSelectFilterOption] = useState('All');
  const [selectSortOption, setSelectSortOption] = useState(sortOption[0]);
  const {data: requests, loading } = suggessions();

  const filteredRequests = useMemo(() => {
    let result = requests;

    if (selectFilterOption != "All") {
      result = requests?.filter(
        ({ category }) => category.toLowerCase() === selectFilterOption.toLowerCase()
      )
    };

    switch (selectSortOption){
      case 'Most Liked': {
        result?.sort((a, b) => b.liked_count?.[0].count - a.liked_count?.[0].count);
        break;
      }
      case 'Least Liked': {
        result?.sort((a, b) => a.liked_count?.[0].count - b.liked_count?.[0].count);
        break;
      }
      case 'Most Comments': {
        result?.sort((a, b) => Number(b.comments_count?.[0].count ?? 0) - Number(a.comments_count?.[0].count ?? 0));
        break;
      }
      case 'Least Comments': {
        result?.sort((a, b) => Number(a.comments_count?.[0].count ?? 0) - Number(b.comments_count?.[0].count ?? 0));
        break;
      }
      default: {
        break;
      }
    }

    
    return result
  }, [requests, loading, selectFilterOption, selectSortOption]);

  const toggleMenu = () => {
    setisMenuVisible((current) => !current)
  };

  useEffect(() => {
    setisMenuVisible(false);
  }, [selectFilterOption]);

 return(
    <main className="page-container">
     <Header
      toggleMenu={toggleMenu}
      isMenuVisible={isMenuVisible}
      selectFilterOption={selectFilterOption}
      setSelectFilterOption={setSelectFilterOption}

     />

     <div className="contentWrapper">
      <div className="contentWrapperHeader bg-dark text-white">
        <h1 className='font-bold text-regular text-xl hidden lg:block'>Chat Room</h1>
        <div className="flex items-center justify-around">
         {/** <div className="space-x-2 hidden md:flex items-center mr-3">
            <svg
                width="23"
                height="24"
                viewBox="0 0 23 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#light-bulb)">
                  <path
                    d="M11.5006 2.27418C13.7374 2.27418 15.8386 3.12773 17.4235 4.68168C19.013 6.24013 19.8884 8.31387 19.8884 10.5209C19.8884 12.3358 19.3002 14.0575 18.1875 15.4998C17.251 16.7138 15.9721 17.6593 14.5363 18.21L14.2263 18.3219L14.2295 19.1478H14.5978C14.8599 19.1478 15.0725 19.3577 15.0725 19.6165C15.0725 19.8466 14.9045 20.038 14.6831 20.0777L14.5978 20.0853H14.233L14.2369 21.1051H14.5978C14.8599 21.1051 15.0725 21.3151 15.0725 21.5739C15.0725 21.804 14.9045 21.9954 14.6831 22.0351L14.5978 22.0426H14.2405L14.2461 23.5295C14.2466 23.6542 14.1968 23.7738 14.1077 23.8621C14.0409 23.9283 13.9561 23.9728 13.8646 23.9909L13.7714 24H9.22857C9.10238 24 8.98132 23.9504 8.89226 23.8621C8.82543 23.7959 8.78071 23.712 8.76272 23.6216L8.75382 23.5295L8.75947 22.0426H8.40218C8.14002 22.0426 7.92743 21.8327 7.92743 21.5739C7.92743 21.3438 8.0954 21.1524 8.31685 21.1127L8.40218 21.1051H8.76303L8.76693 20.0853H8.40218C8.14002 20.0853 7.92743 19.8754 7.92743 19.6165C7.92743 19.3865 8.0954 19.195 8.31685 19.1553L8.40218 19.1478H8.77049L8.77362 18.3219C7.19333 17.7867 5.78461 16.7783 4.77795 15.4548C3.66144 13.9868 3.08553 12.2387 3.11249 10.3994C3.14368 8.27169 4.03535 6.24702 5.62315 4.69827C7.13092 3.22763 9.07058 2.37717 11.1159 2.28278L11.4397 2.27418H11.5006ZM13.291 22.0426H9.70901L9.70517 23.0625H13.2949L13.291 22.0426ZM13.2835 20.0852H9.71642L9.71258 21.1051H13.2874L13.2835 20.0852ZM11.5004 3.21163L11.4463 3.21182C7.50035 3.23915 4.11867 6.53685 4.06189 10.4129C4.01404 13.6777 6.20248 16.6044 9.38391 17.5302C9.55754 17.5807 9.6843 17.7231 9.71646 17.894L9.72444 17.9815L9.71998 19.1477H13.28L13.2756 17.9815C13.2748 17.7731 13.4135 17.5891 13.6161 17.5302C16.7501 16.6182 18.9389 13.7359 18.9389 10.5208C18.9389 8.5655 18.1631 6.72805 16.7544 5.34688C15.3488 3.96871 13.4847 3.21163 11.5004 3.21163ZM12.3288 4.99443C12.5506 4.99443 12.7305 5.17199 12.7305 5.39104V5.7126C13.2099 5.83218 13.662 6.02005 14.0756 6.26511L14.3039 6.03889C14.4609 5.88336 14.716 5.88336 14.873 6.03889L16.0461 7.2012C16.2023 7.35599 16.2023 7.60634 16.0461 7.76113L15.8158 7.98931C16.0631 8.39909 16.2527 8.84703 16.3734 9.32211H16.6965C16.9183 9.32211 17.0982 9.49967 17.0982 9.71872V11.3639C17.0982 11.5829 16.9183 11.7605 16.6965 11.7605H16.3734C16.2527 12.2356 16.0631 12.6835 15.8157 13.0933L16.046 13.3214C16.2022 13.4762 16.2022 13.7266 16.046 13.8813L14.8729 15.0437C14.716 15.1992 14.4609 15.1992 14.3039 15.0437L14.0756 14.8174C13.662 15.0625 13.2099 15.2504 12.7305 15.37V15.6915C12.7305 15.9106 12.5506 16.0881 12.3288 16.0881H10.6711C10.4493 16.0881 10.2695 15.9106 10.2695 15.6915V15.37C9.79001 15.2504 9.3379 15.0625 8.9243 14.8174L8.696 15.0437C8.53905 15.1992 8.28397 15.1992 8.12697 15.0437L6.95387 13.8813C6.79767 13.7266 6.79767 13.4762 6.95387 13.3214L7.18417 13.0933C6.93682 12.6835 6.74721 12.2356 6.62653 11.7605H6.30341C6.08156 11.7605 5.90173 11.5829 5.90173 11.3639V9.71872C5.90173 9.49967 6.08156 9.32211 6.30341 9.32211H6.62653C6.74721 8.84703 6.93682 8.39909 7.18417 7.98931L6.95387 7.76113C6.79767 7.60634 6.79767 7.35599 6.95387 7.2012L8.12697 6.03889C8.28392 5.88336 8.539 5.88336 8.696 6.03889L8.9243 6.26511C9.33786 6.02005 9.78996 5.83218 10.2695 5.7126V5.39104C10.2695 5.17199 10.4493 4.99443 10.6711 4.99443H12.3288ZM11.5 7.72128C9.92811 7.72128 8.65384 8.98386 8.65384 10.5413C8.65384 12.0988 9.92811 13.3614 11.5 13.3614C13.0719 13.3614 14.3462 12.0988 14.3462 10.5413C14.3462 8.98386 13.0719 7.72128 11.5 7.72128ZM22.5253 11.8732C22.7875 11.8732 23 12.0831 23 12.342C23 12.5721 22.832 12.7635 22.6106 12.8032L22.5253 12.8107H22.0269C21.7648 12.8107 21.5522 12.6008 21.5522 12.342C21.5522 12.1119 21.7201 11.9205 21.9416 11.8808L22.0269 11.8732H22.5253ZM0.97309 11.8732C1.23525 11.8732 1.44784 12.0831 1.44784 12.342C1.44784 12.5721 1.27986 12.7635 1.05842 12.8032L0.97309 12.8107H0.474748C0.212592 12.8107 0 12.6008 0 12.342C0 12.1119 0.167974 11.9205 0.389422 11.8808L0.474748 11.8732H0.97309ZM3.11161 3.44944L3.18622 3.50934L3.64521 3.96046C3.83102 4.14313 3.83169 4.4399 3.64673 4.62337C3.55396 4.71538 3.43214 4.76141 3.31027 4.76141C3.21941 4.76141 3.12854 4.73581 3.04971 4.68461L2.97534 4.62487L2.51635 4.17374C2.33054 3.99107 2.32987 3.69431 2.51483 3.51084C2.67672 3.35026 2.92707 3.32972 3.11161 3.44944ZM20.4852 3.51084C20.647 3.67137 20.6667 3.91869 20.5447 4.10035L20.4836 4.17374L20.0247 4.62487C19.932 4.7159 19.8109 4.76141 19.6897 4.76141C19.5679 4.76141 19.446 4.71538 19.3533 4.62337C19.1914 4.46283 19.1717 4.21555 19.2938 4.03387L19.3548 3.96046L19.8138 3.50934C19.9996 3.32671 20.3002 3.32742 20.4852 3.51084ZM11.5 0C11.733 0 11.9269 0.165814 11.9671 0.384489L11.9747 0.468749V0.958545C11.9747 1.21744 11.7622 1.42729 11.5 1.42729C11.2669 1.42729 11.0731 1.26148 11.0329 1.04281L11.0253 0.958545V0.468749C11.0253 0.209859 11.2378 0 11.5 0Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="light-bulb">
                    <rect width="23" height="24" fill="white" />
                  </clipPath>
                </defs>
            </svg>
            <p className="font-bold text-lg">Suggestions</p>
          </div> */}
          <SortOptions
            selectSortOption={selectSortOption}
            setSelectSortOption={setSelectSortOption}
            sortOption={sortOption}
          />
        </div>
        <Link to="/create" className="btn primary p-2 md:p-4 hover:bg-white hover:text-primary">
          + Post <i className="fas fa-comment ml-1"></i>
        </Link>
      </div>
      <div className="px-6 py-8 md:p-0 md:mt-6 flex flex-col">
        {loading ? (
          <Spinner className="text-6xl mx-auto mt-16"/>
        ) : filteredRequests?.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-white rounded flex-grow p-8">
            <p>No post yet</p>
            <p>Got a post you like to share? </p>
            <Link to="/create" className="btn p-4 primary mt-6">
              + Post <i className="fas fa-comment ml-1"></i>
            </Link>
          </div>
        ): (
          <div>
          <div className="grid gap-3">
              {filteredRequests?.map((request, index) => { 
                return (
                <Transition
                  appear
                  as="div"
                  show={true}
                  key={request.id}
                  style={{ transitionDelay: `${100 * index}ms`}}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 translate-y-10"
                  enterTo="transform opacity-100 translate-y-0"
                >
                  <RequestCard key={request.id} request={request}/>
                </Transition>)
              })}
          </div>
          <div className="flex flex-col items-center justify-center flex-grow p-8">
            <p>Got a post you like to share? </p>
            <Link to="/create" className="btn p-4 primary mt-2">
              + Post <i className="fas fa-comment ml-1"></i>
            </Link>
          </div>
          </div>
        )}
      </div>
     </div>
    </main>
 )
}

export default Home;

 {/*<div className="layout">
     <div className="layout-wrapper">
       <section>
       <div className="cards">
        <Sidebar/>
        <div className="cards_side">
          <Header/>
          <Content/>
          <footer>
        <p className="attribution">
          <a
            href=""
            target="_blank"
            rel="noreferrer"
            ><i className="fa fa-github" aria-hidden="true"/></a>.
          copyright &#169; Ewebajo Oluwaseyi 2021
        </p>
        </footer>
        </div>
       </div>
       </section>
     </div>
 </div>*/}