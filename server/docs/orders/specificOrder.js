module.exports = {
    get: {
      security: [
          {
              bearerAuth: [],
          }
      ],
      tags: ["Orders CRUD operations"], 
      description: "Get Specific Order details", 
      operationId: "getSpecificOrder", 
      parameters: [
        {
            name: "id",
            in: "path",
            schema: {
            $ref: "#/components/schemas/OrderId",
            },
            required: true,
            description: "The order id", 
        },
      ], 
      responses: {
        200: {
          description: "The Order was retrieved", 
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/OrderItem",
              },
            },
          },
        },
        500: {
            description: "Server error", 
        },
      },
    },
    put: {
      security: [
          {
              bearerAuth: [],
          }
      ],
      tags: ["Orders CRUD operations"], 
      description: "Update Specific Order details", 
      operationId: "updateSpecificOrder", 
      parameters: [
        {
            name: "id",
            in: "path",
            schema: {
            $ref: "#/components/schemas/OrderId",
            },
            required: true,
            description: "The order id", 
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UpdateOrderItem",
            },
          },
        },
      },
      responses: {
        200: {
          description: "The Order was updated", 
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/OrderItem",
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
      tags: ["Orders CRUD operations"], 
      description: "Delete Specific Order details", 
      operationId: "DeleteSpecificOrder", 
      parameters: [
        {
            name: "id",
            in: "path",
            schema: {
            $ref: "#/components/schemas/OrderId",
            },
            required: true,
            description: "The order id", 
        },
      ], 
      responses: {
        200: {
          description: "The Order was deleted", 
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/OrderItem",
              },
            },
          },
        },
        500: {
            description: "Server error", 
        },
        404: {
            description: "The order isn't present"
        }
      },
    },
  };
