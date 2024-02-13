import React from "react";
import { Route,Routes, Link } from "react-router-dom";
import Base64Decode from "./pages/Base64Decode";
import Base64Encode from "./pages/Base64Encode";
import UrlEncoder from "./pages/UrlEncoder";
import UrlDecoder from "./pages/UrlDecoder";
import UTF8Encoder from "./pages/UTF8Encoder";
import UTF8Decoder from "./pages/UTF8Decoder";

export default function App() {


  return (
    <div>
        <Routes>
         <Route path='/base64decode' element={<Base64Decode/>} />
         <Route path='/base64encode' element={<Base64Encode/>} />
         <Route path='/urlencode' element={<UrlEncoder/>} />
         <Route path='/urldecode' element={<UrlDecoder/>} />
         <Route path='/utf8encode' element={<UTF8Encoder/>} />
         <Route path='/utf8decode' element={<UTF8Decoder/>} />
       </Routes>

       <div>
       <ul>
         <li>
           <Link to="/base64encode">Base64 Encode</Link>
         </li>
         <li>
           <Link to="/base64decode">Base64 Decode</Link>
         </li>
      
         <li>
           <Link to="/urlencode">URL Encoder</Link>
         </li>

         <li>
           <Link to="/urldecode">URL Decoder</Link>
         </li>
         <li>
           <Link to="/utf8encode">UTF Encoder</Link>
         </li>
         <li>
           <Link to="/utf8decode">UTF Decoder</Link>
         </li>
       </ul>
     </div>
      
    </div>
  );
}
