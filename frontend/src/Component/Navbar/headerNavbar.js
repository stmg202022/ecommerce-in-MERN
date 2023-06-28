// import React from "react";

// import UserOptions from "../layout/UserOptions/options";

// import {
//   //   BrowserRouter as Router,
//   Link,
//   //   Route,
//   //   Routes,
//   // Navigate,
// } from "react-router-dom";

// import meroshop from "../../images/meroshop.png";

// import { linkData } from "../linkData/linkData";

// import * as CgIcons from "react-icons/cg";
// import * as FaIcons from "react-icons/fa";
// import * as AiIcons from "react-icons/ai";

// const headerNavbar = () => {
//   const showBurger = () => {
//     setBurger(!burger);
//     console.log(burger);
//   };

//   return (
//     <div>
//       <div className="navbar">
//         <div className="left-navbar">
//           <img src={meroshop} alt="" style={{ width: "80px" }} />
//         </div>
//         <div className="right-navbar">
//           <nav>
//             <ul>
//               {linkData.map((item, index) => {
//                 if (isAuthenticated && item.title === "Login") {
//                   // item.title = "Logout";
//                   // item.path = "/logout";
//                   // return (
//                   //   <li key={index} className={item.cName}>
//                   //     <Link to={item.path}>
//                   //       <span>{item.title}</span>
//                   //     </Link>
//                   //   </li>
//                   // );

//                   return null;
//                 }

//                 return (
//                   <li key={index} className={item.cName}>
//                     <Link to={item.path}>
//                       <span>{item.title}</span>
//                     </Link>
//                   </li>
//                 );
//               })}
//             </ul>
//           </nav>
//         </div>
//         <div style={{ width: "40px" }}>
//           <Link to="products/search">
//             <CgIcons.CgSearch />
//           </Link>
//         </div>

//         <div>{isAuthenticated && <UserOptions user={user} />}</div>

//         <div className="burger-main">
//           <Link
//             to="#"
//             onClick={showBurger}
//             className={burger ? "burger" : "burger active"}
//           >
//             <FaIcons.FaBars style={{ color: "wheat" }} />
//           </Link>
//         </div>

//         <div className={burger ? "second_navbar" : "second_navbar active"}>
//           <Link
//             to="#"
//             className={burger ? "cross" : "cross active"}
//             onClick={showBurger}
//           >
//             <AiIcons.AiOutlineClose style={{ color: "wheat" }} />
//           </Link>
//           <h1>this is second_navbar</h1>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default headerNavbar;
