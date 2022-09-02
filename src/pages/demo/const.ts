export const data = [
  {
    name: 'nodeA',
    value: 30,
    children: [
      {
        name: 'nodeA-a',
        value: 12,
      },
      {
        name: 'nodeA-b',
        value: 18,
      },
    ],
  },
  {
    name: 'nodeB',
    value: 20,
    children: [
      {
        name: 'nodeB-a',
        value: 13,
        children: [
          {
            name: 'nodeB-a-1',
            value: 15,
          },
          {
            name: 'nodeB-a-2',
            value: 5,
          },
        ],
      },
      {
        name: 'nodeB-b',
        value: 7,
        children: [
          {
            name: 'nodeB-b-1',
            value: 4,
          },
          {
            name: 'nodeB-b-2',
            value: 3,
          },
        ],
      },
    ],
  },
];
