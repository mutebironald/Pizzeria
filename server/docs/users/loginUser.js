module.exports = {
    post: {
        tags: ["Users CRUD operations"], 
        description: "Login User", 
        operationId: "loginUser", 
        parameters: [],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        responses: {
          201: {
            description: "You have successfully logged in", 
          },
          500: {
            description: "Server error",
          },
        },
    },
}
