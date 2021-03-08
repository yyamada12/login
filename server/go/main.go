package main

import (
	"github.com/gin-gonic/gin"

	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"

	"logingo/controller"
	_ "logingo/docs"
)

// @title login sample API
// @version 1.0

// @license.name MIT
// @license.url https://opensource.org/licenses/MIT

// @host localhost:5000
// @BasePath /
func main() {
	engine := gin.Default()

	// swagger
	url := ginSwagger.URL("http://localhost:5000/swagger/doc.json")
	engine.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler, url))

	engine.POST("/register", controller.Register)
	engine.Run(":5000")
}
