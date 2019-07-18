[ // cardSet
  {
    "author": "authorName", // String
    "description": "brief description", // String

    "deck": {
      "blackCards": [ // Array
        {
          "id": 0,
          "text": "%RESPONSE%: My favourite.", // String
          "responseCount": 1 // Integer - Min: 1 - Max: 3
        },
        {
          "id": 1,
          "text": "What helps Obama unwind? %RESPONSE%", // String
          "responseCount": 1 // Integer - Min: 1 - Max: 3
        },
        {
          "id": 2,
          "text": "%RESPONSE% + %RESPONSE% = %RESPONSE%", // String
          "responseCount": 3 // Integer - Min: 1 - Max: 3
        },
        {
          "id": 3,
          "text": "Step 1: %RESPONSE%\nStep 2: %RESPONSE%\nStep 3: Profit!", // String
          "responseCount": 2 // Integer - Min: 1 - Max: 3
        }
      ],
      "whiteCards": [ // Array
        {
          "id": 0,
          "text": "humourous response" // String
        }
      ],
      "blankCards": [ // Array
        { "id": 0 },
        { "id": 1 }
      ]
    },

    "id": 0,
    "name": "default" // String
  }
]
