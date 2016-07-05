// export default function() {
//   return {
//     user : {},
//     categories: {},
//     subcategories: {
//       entries: []
//     }
//   }
// };

export const INITIAL_STATE = {
  isAuthenticated: true,
  user: {
    id: 1,
    name: 'Test User'
  },
  categories: [
    {
      id: 'C1',
      name: 'cheese'
    }
  ],
  subcategories: [
    // {
    //   id: 'S1',
    //   name: 'brie',
    //   ancestors: {
    //     user: 1,
    //     category: 'C1'
    //   },
    //   parent: 'C1'
    // }
  ],
  entries: [
    {
      type: 'brie a la tga',
      notes: 'so good',
      rating: 5,
      ancestors: {
        user: 1,
        category: 'C1',
        subcategory: 'S1'
      },
      parent: 'S1'
    }
  ]
};