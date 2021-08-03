module.exports = {
    post: {
      security: [
        {
            bearerAuth: [],
        }
      ],
      tags: ["Pizzas CRUD operations"], 
      description: "Create Pizza", 
      operationId: "createPizza", 
      parameters: [],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Pizza",
            },
          },
        },
      },
      responses: {
        201: {
          description: "Pizza created successfully", 
        },
        500: {
          description: "Server error",
        },
      },
    },
    get: {
      tags: ["Pizzas CRUD operations"], 
      description: "Get pizzas on the menu", 
      operationId: "getPizzas",
      parameters: [], 
      responses: {
        200: {
          description: "Pizzas were obtained", 
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Pizza", 
              },
            },
          },
        },
        500: {
            description: "Server error",
        },
      },
    }
};
