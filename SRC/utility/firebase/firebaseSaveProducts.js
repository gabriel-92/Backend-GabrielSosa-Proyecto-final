// import { collection, addDoc } from "firebase/firestore";
// import { db } from "../configDB.js";
// import path from "path";
// import fs from "fs";

// const algoritmoGuardadoAutomático = async () => {
//   // console.log("Entra una vez");

//   const products = JSON.parse(
//     fs.readFileSync(path.join(__dirname, "../public/mockup/product.json"))
//   );
//   const response = products

//   const productosAGuardar = await response.map((producto) => {
//     const { id, title, price, image, description, category, rating } = producto;
//     return {
//       id,
//       title,
//       price,
//       image,
//       description,
//       category,
//       rating,
//     };
//   });




//   productosAGuardar.forEach(async (producto) => {
//     const docRef = await addDoc(collection(db, "products"), {
//       title: producto.title,
//       price: producto.price,
//       description: producto.description,
//       category: producto.category,
//       image: producto.image,
//       stock: 20,
//       rating: producto.rating,
//       id: producto.id
//     });
//     console.log("Document written with ID: ", docRef.id);
//   })
// }

// export default algoritmoGuardadoAutomático;