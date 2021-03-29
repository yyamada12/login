package controller

import (
	"database/sql"
	"log"
	"logingo/service"
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"golang.org/x/crypto/bcrypt"
)

type LoginForm struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

// Login API
// @Summary ログインAPI
// @description メールアドレスとパスワードを用いてログイン処理を行う
// @version 1.0
// @accept json
// @param LoginForm body LoginForm true "メールアドレス, パスワード"
// @Success 200 {object} object "OK, userId"
// @Failure 400 {object} object "パラメータが不正"
// @Failure 500 {object} object "サーバー内エラー"
// @router /login [post]
func Login(c *gin.Context) {
	var form LoginForm
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

	user, err := service.SelectByEmail(form.Email)
	if err == sql.ErrNoRows {
		// メールアドレスが存在しない場合
		log.Printf("%s は users テーブルに存在しません", form.Email)
		c.JSON(http.StatusBadRequest, gin.H{
			"msg": "メールアドレスが登録されていません",
		})
		return
	} else if err != nil {
		// その他エラーの場合
		log.Printf("ユーザー %s のパスワード取得エラー : %s", form.Email, err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"msg": "ログイン処理でエラーが発生しました",
		})
		return
	}

	err = bcrypt.CompareHashAndPassword(user.HashedPassword, []byte(form.Password))
	if err == bcrypt.ErrMismatchedHashAndPassword {
		c.JSON(http.StatusBadRequest, gin.H{
			"msg": "パスワードが間違っています",
		})
		return
	} else if err != nil {
		log.Printf("ユーザー %s の bcrypt 処理エラー : %s", form.Email, err)
		c.JSON(http.StatusBadRequest, gin.H{
			"msg": "ログイン処理でエラーが発生しました",
		})
		return
	}

	// セッションに user_id を設定
	sess := sessions.Default(c)
	sess.Set("user_id", user.Id)
	sess.Save()

	c.JSON(http.StatusOK, gin.H{
		"msg":    "OK",
		"userId": user.Id,
	})
}
