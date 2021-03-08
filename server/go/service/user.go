package service

import (
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

// Register users テーブルに INSERT する
func Register(email, pw string) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(pw), 10)
	if err != nil {
		return fmt.Errorf("bcrypt hash 生成でエラー : %s", err)
	}

	_, err = db.Exec("INSERT INTO `users` (`email`, `password`) VALUES (?, ?)", email, hashedPassword)
	// *mysql.MySQLError のまま返す
	return err
}
