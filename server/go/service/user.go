package service

import (
	"fmt"
	"logingo/model"

	"golang.org/x/crypto/bcrypt"
)

// RegisterUser users テーブルに INSERT する
func RegisterUser(email, pw string) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(pw), 10)
	if err != nil {
		return fmt.Errorf("bcrypt hash 生成でエラー : %s", err)
	}

	_, err = db.Exec("INSERT INTO `users` (`email`, `password`) VALUES (?, ?)", email, hashedPassword)
	// *mysql.MySQLError のまま返す
	return err
}

func SelectByEmail(email string) (model.User, error) {
	query := "SELECT `id`, `email`, `password` FROM `users` WHERE `email` = ?"
	var user model.User
	err := db.Get(&user, query, email)
	return user, err
}
