module.exports = {
    
    put: {
        security: [
            {
                bearerAuth: [],
            }
        ],
        tags: ["Pizzas CRUD operations"], 
        description: "Update Specific Pizza details", 
        operationId: "updateSpecificPizza", 
        parameters: [
          {
              name: "id",
              in: "path",
              schema: {
              $ref: "#/components/schemas/PizzaId",
              },
              required: true,
              description: "The pizza id", 
          },
        ],
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
          200: {
            description: "The Pizza was updated", 
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
          400: {
              description: "Invalid request"
          }
        },
    },
    delete: {
        security: [
            {
                bearerAuth: [],
            }
        ],
        tags: ["Pizzas CRUD operations"], 
        description: "Delete Specific Pizza details", 
        operationId: "DeleteSpecificPizza", 
        parameters: [
          {
              name: "id",
              in: "path",
              schema: {
              $ref: "#/components/schemas/PizzaId",
              },
              required: true,
              description: "The pizza id", 
          },
        ], 
        responses: {
          200: {
            description: "The Pizza was deleted", 
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
          404: {
              description: "The pizza isn't present"
          }
        },
      },
}
