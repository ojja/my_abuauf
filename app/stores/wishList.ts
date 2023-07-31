// import { persistentAtom } from '@nanostores/persistent';
// import { useStore } from '@nanostores/react';

// export type Item = {
//   id: number;
//   quantity: number;
//   name: string;
//   slug?: string;
//   thumbnail?: string;
//   main_img?: string;
//   price?: string;
// };

// // Create a Nanostores atom to manage the recent products list
// const recentProductsAtom = persistentAtom<Item[]>('recent-products', [], {
//   listen: true,
//   encode: JSON.stringify,
//   decode: JSON.parse,
// });

// // Create a Nanostores atom to manage the favorite items list
// const favoriteItemsAtom = persistentAtom<Item[]>('favorite-items', [], {
//   listen: true,
//   encode: JSON.stringify,
//   decode: JSON.parse,
// });

// // Create a Nanostores atom to manage the wishlist items list
// const wishlistItemsAtom = persistentAtom<Item[]>('wishlist-items', [], {
//   listen: true,
//   encode: JSON.stringify,
//   decode: JSON.parse,
// });

// export const useRecentView = () => {
//   if (typeof window === 'undefined') {
//     return {
//       addToRecent: () => null,
//       recentItems: [],
//     };
//   }

//   const recentStore = useStore(recentProductsAtom);
//   const favoriteStore = useStore(favoriteItemsAtom);
//   const wishlistStore = useStore(wishlistItemsAtom);

//   const addToRecent = (product: Item) => {
//     const itemIndex = recentStore.findIndex(
//       (item: Item) =>
//         item.id === product.id &&
//         item.slug === product.slug &&
//         item.name === product.name &&
//         item.price === product.price &&
//         item.thumbnail === product.main_img
//     );

//     if (itemIndex !== -1) {
//       const newRecentItems = [...recentStore];
//       newRecentItems[itemIndex].quantity++;
//       recentProductsAtom.set(newRecentItems);
//     } else {
//       recentProductsAtom.set([
//         ...recentStore,
//         {
//           id: product.id,
//           slug: product.slug,
//           name: product.name,
//           price: product.price,
//           thumbnail: product.main_img,
//         },
//       ]);
//     }
//   };

//   const addToFavorites = (product: Item) => {
//     const isItemFavorite = favoriteStore.some(
//       (item: Item) => item.id === product.id
//     );

//     if (isItemFavorite) {
//       // Item already exists in favorites, remove it
//       const newFavoriteItems = favoriteStore.filter(
//         (item: Item) => item.id !== product.id
//       );
//       favoriteItemsAtom.set(newFavoriteItems);
//     } else {
//       // Item is not in favorites, add it
//       favoriteItemsAtom.set([...favoriteStore, product]);
//     }
//   };

//   const addToWishlist = (product: Item) => {
//     const isItemInWishlist = wishlistStore.some(
//       (item: Item) => item.id === product.id
//     );

//     if (isItemInWishlist) {
//       // Item already exists in wishlist, remove it
//       const newWishlistItems = wishlistStore.filter(
//         (item: Item) => item.id !== product.id
//       );
//       wishlistItemsAtom.set(newWishlistItems);
//     } else {
//       // Item is not in wishlist, add it
//       wishlistItemsAtom.set([...wishlistStore, product]);
//     }
//   };

//   return {
//     recentItems: recentStore ?? [],
//     addToRecent,
//     favoriteItems: favoriteStore ?? [],
//     addToFavorites,
//     wishlistItems: wishlistStore ?? [],
//     addToWishlist,
//   };
// };
