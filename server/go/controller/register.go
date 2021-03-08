package controller

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/go-sql-driver/mysql"

	"logingo/service"
)

type RegisterForm struct {
	Email    string `json:"email" binding:"required,email,max=256"`
	Password string `json:"password" binding:"required,min=8"`
}

// Register API
// @Summary ユーザー登録API
// @description メールアドレスとパスワードを用いてユーザーを登録する
// @version 1.0
// @accept json
// @param RegisterForm body RegisterForm true "メールアドレス, パスワード"
// @Success 200 {object} object "OK"
// @Failure 400 {object} object "パラメータが不正"
// @Failure 500 {object} object "サーバー内エラー"
// @router /register [post]
func Register(c *gin.Context) {
	var form RegisterForm
	if err := c.ShouldBindJSON(&form); err != nil {
		errors, ok := err.(validator.ValidationErrors)
		if !ok {
			c.JSON(http.StatusBadRequest, gin.H{
				"msg": "パラメータの値が不正です",
			})
			return
		}
		for _, e := range errors {
			switch e.Field() {
			case "Email":
				var msg string
				switch e.Tag() {
				case "required":
					msg = "メールアドレスは必須です"
				case "email":
					msg = "メールアドレスが正しくありません"
				case "max":
					msg = "メールアドレスが長すぎます"
				default:
					msg = "メールアドレスでバリデーションエラーが発生しました"
				}
				c.JSON(http.StatusBadRequest, gin.H{
					"msg": msg,
				})
				return
			case "Password":
				var msg string
				switch e.Tag() {
				case "required":
					msg = "パスワードは必須です"
				case "min":
					msg = "パスワードは8文字以上で設定してください"
				default:
					msg = "パスワードでバリデーションエラーが発生しました"
				}
				c.JSON(http.StatusBadRequest, gin.H{
					"msg": msg,
				})
				return
			}
		}
	}

	err := service.RegisterUser(form.Email, form.Password)
	if err != nil {

		// ユニーク制約エラーの場合
		if mysqlErr, ok := err.(*mysql.MySQLError); ok && mysqlErr.Number == 1062 {
			log.Printf("ユーザー %s でユニーク制約エラー : %s", form.Email, err)
			c.JSON(http.StatusBadRequest, gin.H{
				"msg": "そのメールアドレスは既に登録されています",
			})
			return
		}

		// その他のエラーの場合
		log.Printf("ユーザー %s の登録でエラー : %s", form.Email, err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"msg": "ユーザー登録でエラーが発生しました",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"msg": "OK",
	})
}
