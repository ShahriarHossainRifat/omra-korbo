import{s as y,r as l,u as v,t as w,j as e,L as o,q as k,a as F,m as i,v as M,w as P,x as C,y as T,z as H,B as p,A as S,b as A,H as D,c as $}from"./index-Cwjsat1S.js";import{p as q}from"./mockData-CS5w2i6t.js";const E=()=>{const{id:x}=y(),[s,g]=l.useState(null),[j,u]=l.useState(!0),[r,n]=l.useState(1),[c,m]=l.useState(!1),b=v(),N=w();if(l.useEffect(()=>{setTimeout(()=>{const a=q.find(d=>d.id===x);g(a||null),u(!1)},500)},[x]),j)return e.jsx("div",{className:"min-h-screen bg-gray-50 py-12 px-4",children:e.jsx("div",{className:"container mx-auto",children:e.jsx("div",{className:"h-96 bg-white rounded-xl shadow-md animate-pulse"})})});if(!s)return e.jsx("div",{className:"min-h-screen bg-gray-50 py-12 px-4",children:e.jsxs("div",{className:"container mx-auto text-center",children:[e.jsx("h1",{className:"text-3xl font-bold text-gray-800 mb-4",children:"Package Not Found"}),e.jsx("p",{className:"text-gray-600 mb-8",children:"The package you're looking for does not exist or may have been removed."}),e.jsx(o,{to:"/packages",className:"bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg transition",children:"View All Packages"})]})});const h=()=>{b($({id:s.id,name:s.name,price:s.price,discountedPrice:s.discount?s.price-s.price*s.discount/100:void 0,image:s.image,type:"package"})),m(!0),setTimeout(()=>{m(!1)},2e3)},f=()=>{h(),N("/cart")},t=s.discount?s.price-s.price*s.discount/100:null;return e.jsxs(e.Fragment,{children:[e.jsxs(k,{children:[e.jsxs("title",{children:[s.name," | Omra Korbo"]}),e.jsx("meta",{name:"description",content:s.description})]}),e.jsx("div",{className:"bg-gray-50 py-8",children:e.jsxs("div",{className:"container mx-auto px-4",children:[e.jsx("div",{className:"text-sm breadcrumbs mb-6",children:e.jsxs("ul",{className:"flex items-center space-x-2",children:[e.jsx("li",{children:e.jsx(o,{to:"/",className:"text-gray-500 hover:text-teal-600",children:"Home"})}),e.jsx("li",{children:e.jsx("span",{className:"text-gray-500",children:"/"})}),e.jsx("li",{children:e.jsx(o,{to:"/packages",className:"text-gray-500 hover:text-teal-600",children:"Packages"})}),e.jsx("li",{children:e.jsx("span",{className:"text-gray-500",children:"/"})}),e.jsx("li",{className:"text-teal-600 font-medium",children:s.name})]})}),e.jsx("div",{className:"bg-white rounded-xl shadow-md overflow-hidden mb-8",children:e.jsxs("div",{className:"relative h-96",children:[e.jsx("img",{src:s.image,alt:s.name,className:"w-full h-full object-cover"}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"}),e.jsxs("div",{className:"absolute bottom-0 left-0 p-8 text-white",children:[e.jsx("h1",{className:"text-3xl md:text-4xl font-bold mb-2",children:s.name}),e.jsx("div",{className:"flex items-center gap-4 mb-4",children:e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx(F,{className:"text-amber-400"}),e.jsx("span",{children:s.duration})]})}),s.limitedOffer&&e.jsx("div",{className:"inline-block px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-full",children:"Limited Time Offer - Ends Soon!"})]}),s.discount&&e.jsxs("div",{className:"absolute top-4 right-4 bg-red-500 text-white px-3 py-2 rounded-lg font-bold",children:[s.discount,"% OFF"]})]})}),e.jsxs("div",{className:"flex flex-col lg:flex-row gap-8",children:[e.jsxs(i.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{duration:.5},className:"lg:w-2/3",children:[e.jsxs("div",{className:"bg-white rounded-xl shadow-md p-6 mb-8",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 mb-4",children:"Package Description"}),e.jsx("p",{className:"text-gray-600 mb-6",children:s.description}),e.jsx("h3",{className:"text-xl font-bold text-gray-800 mb-3",children:"Package Highlights"}),e.jsxs("ul",{className:"space-y-3 mb-6",children:[e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx(M,{className:"text-teal-600 mt-1"}),e.jsx("span",{className:"text-gray-600",children:"Comfortable accommodations close to the Holy Sites"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx(P,{className:"text-teal-600 mt-1"}),e.jsx("span",{className:"text-gray-600",children:"Return flights with convenient timings"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx(C,{className:"text-teal-600 mt-1"}),e.jsx("span",{className:"text-gray-600",children:"Transportation between airports, hotels, and Holy Sites"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx(T,{className:"text-teal-600 mt-1"}),e.jsx("span",{className:"text-gray-600",children:"Daily breakfast and dinner included"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx(H,{className:"text-teal-600 mt-1"}),e.jsx("span",{className:"text-gray-600",children:"Free Wi-Fi throughout your stay"})]})]}),e.jsx("h3",{className:"text-xl font-bold text-gray-800 mb-3",children:"What's Included"}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4 mb-6",children:s.amenities.map((a,d)=>e.jsxs("div",{className:"flex items-center gap-2 bg-teal-50 p-3 rounded-lg",children:[e.jsx("span",{className:"text-teal-600 font-bold",children:"✓"}),e.jsx("span",{children:a})]},d))}),e.jsx("h3",{className:"text-xl font-bold text-gray-800 mb-3",children:"Itinerary Overview"}),e.jsxs("div",{className:"space-y-4 mb-6",children:[e.jsxs("div",{className:"bg-amber-50 p-4 rounded-lg",children:[e.jsx("h4",{className:"font-bold text-amber-700 mb-2",children:"Day 1-2: Arrival & Settling In"}),e.jsx("p",{className:"text-gray-600",children:"Welcome at the airport, transfer to your hotel in Makkah, and orientation."})]}),e.jsxs("div",{className:"bg-amber-50 p-4 rounded-lg",children:[e.jsx("h4",{className:"font-bold text-amber-700 mb-2",children:"Day 3-7: Makkah"}),e.jsx("p",{className:"text-gray-600",children:"Perform Umrah rituals, visit historical sites, and spend time in prayer at the Grand Mosque."})]}),e.jsxs("div",{className:"bg-amber-50 p-4 rounded-lg",children:[e.jsx("h4",{className:"font-bold text-amber-700 mb-2",children:"Day 8-12: Madinah"}),e.jsx("p",{className:"text-gray-600",children:"Travel to Madinah, visit the Prophet's Mosque, and explore other significant religious sites."})]}),e.jsxs("div",{className:"bg-amber-50 p-4 rounded-lg",children:[e.jsx("h4",{className:"font-bold text-amber-700 mb-2",children:"Day 13-14: Return Journey"}),e.jsx("p",{className:"text-gray-600",children:"Final prayers, check-out from hotel, transfer to airport, and return flight home."})]})]})]}),e.jsxs("div",{className:"bg-white rounded-xl shadow-md p-6 mb-8",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 mb-4",children:"Hotels"}),e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"flex flex-col md:flex-row gap-4",children:[e.jsx("div",{className:"md:w-1/3",children:e.jsx("img",{src:"https://images.unsplash.com/photo-1566073771259-6a8506099945",alt:"Makkah Hotel",className:"w-full h-48 object-cover rounded-lg"})}),e.jsxs("div",{className:"md:w-2/3",children:[e.jsx("h3",{className:"text-xl font-bold text-gray-800 mb-1",children:"Grand Makkah Hotel"}),e.jsxs("div",{className:"flex items-center gap-1 text-gray-600 mb-3",children:[e.jsx(p,{}),e.jsx("span",{children:"500m from Masjid al-Haram"})]}),e.jsx("p",{className:"text-gray-600",children:"Luxurious accommodations with stunning views of the Holy Mosque, offering comfort and convenience for your spiritual journey."})]})]}),e.jsxs("div",{className:"flex flex-col md:flex-row gap-4",children:[e.jsx("div",{className:"md:w-1/3",children:e.jsx("img",{src:"https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",alt:"Madinah Hotel",className:"w-full h-48 object-cover rounded-lg"})}),e.jsxs("div",{className:"md:w-2/3",children:[e.jsx("h3",{className:"text-xl font-bold text-gray-800 mb-1",children:"Al-Madinah Plaza"}),e.jsxs("div",{className:"flex items-center gap-1 text-gray-600 mb-3",children:[e.jsx(p,{}),e.jsx("span",{children:"300m from Al-Masjid an-Nabawi"})]}),e.jsx("p",{className:"text-gray-600",children:"Elegant hotel providing easy access to the Prophet's Mosque, featuring spacious rooms and excellent service to enhance your stay in the holy city."})]})]})]})]})]}),e.jsx(i.div,{initial:{opacity:0,x:20},animate:{opacity:1,x:0},transition:{duration:.5},className:"lg:w-1/3",children:e.jsxs("div",{className:"bg-white rounded-xl shadow-md p-6 sticky top-24",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 mb-4",children:"Book This Package"}),e.jsxs("div",{className:"mb-6",children:[e.jsxs("div",{className:"flex justify-between items-center mb-2",children:[e.jsx("span",{className:"text-gray-600",children:"Price per person"}),t?e.jsxs("div",{children:[e.jsxs("span",{className:"text-gray-400 line-through",children:["$",s.price]}),e.jsxs("span",{className:"text-2xl font-bold text-teal-700 ml-2",children:["$",t.toFixed(2)]})]}):e.jsxs("span",{className:"text-2xl font-bold text-teal-700",children:["$",s.price]})]}),s.discount&&e.jsxs("div",{className:"bg-red-50 text-red-600 p-2 rounded-lg text-sm mb-4",children:["Save $",(s.price*s.discount/100).toFixed(2)," per person with our limited time offer!"]})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"block text-gray-700 text-sm font-medium mb-2",children:"Departure Date"}),e.jsxs("select",{className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500",children:[e.jsx("option",{value:"",children:"Select a date"}),e.jsx("option",{value:"2025-04-10",children:"April 10, 2025"}),e.jsx("option",{value:"2025-05-15",children:"May 15, 2025"}),e.jsx("option",{value:"2025-06-20",children:"June 20, 2025"}),e.jsx("option",{value:"2025-07-25",children:"July 25, 2025"})]})]}),e.jsxs("div",{className:"mb-6",children:[e.jsx("label",{className:"block text-gray-700 text-sm font-medium mb-2",children:"Number of Travelers"}),e.jsxs("div",{className:"flex items-center",children:[e.jsx("button",{onClick:()=>n(a=>Math.max(1,a-1)),className:"p-2 border border-gray-300 rounded-l-lg hover:bg-gray-100",children:"-"}),e.jsx("input",{type:"number",min:"1",value:r,onChange:a=>n(Math.max(1,parseInt(a.target.value)||1)),className:"w-20 py-2 border-y border-gray-300 text-center"}),e.jsx("button",{onClick:()=>n(a=>a+1),className:"p-2 border border-gray-300 rounded-r-lg hover:bg-gray-100",children:"+"})]})]}),e.jsxs("div",{className:"mb-6 p-4 bg-gray-50 rounded-lg",children:[e.jsxs("div",{className:"flex justify-between mb-2",children:[e.jsx("span",{className:"text-gray-600",children:"Subtotal"}),e.jsxs("span",{className:"font-medium",children:["$",((t||s.price)*r).toFixed(2)]})]}),e.jsxs("div",{className:"flex justify-between mb-2",children:[e.jsx("span",{className:"text-gray-600",children:"Tax & Fees"}),e.jsxs("span",{className:"font-medium",children:["$",((t||s.price)*r*.1).toFixed(2)]})]}),e.jsx("div",{className:"border-t pt-2 mt-2",children:e.jsxs("div",{className:"flex justify-between font-bold",children:[e.jsx("span",{children:"Total"}),e.jsxs("span",{className:"text-teal-700",children:["$",((t||s.price)*r*1.1).toFixed(2)]})]})})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("button",{onClick:f,className:"w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2",children:"Book Now"}),e.jsx(i.button,{onClick:h,whileTap:{scale:.95},className:`w-full ${c?"bg-green-100 text-green-600 border-green-200":"bg-amber-50 hover:bg-amber-100 text-amber-600 border-amber-200"} font-semibold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2 border`,disabled:c,children:e.jsx(S,{mode:"wait",children:c?e.jsxs(i.div,{initial:{scale:.5,opacity:0},animate:{scale:1,opacity:1},transition:{duration:.2},className:"flex items-center gap-2",children:[e.jsx(A,{size:20}),e.jsx("span",{children:"Added to Cart"})]},"check"):e.jsxs(i.div,{initial:{scale:.5,opacity:0},animate:{scale:1,opacity:1},transition:{duration:.2},className:"flex items-center gap-2",children:[e.jsx(D,{size:20}),e.jsx("span",{children:"Add to Cart"})]},"bag")})})]}),e.jsxs("div",{className:"mt-6 text-center text-gray-600 text-sm",children:["Questions about this package?",e.jsx("a",{href:"/contact",className:"text-teal-600 hover:text-teal-700 font-medium ml-1",children:"Contact us"})]})]})})]})]})})]})};export{E as default};
