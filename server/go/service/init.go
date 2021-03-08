package service

import (
	"fmt"
	"log"
	"os"

	// service のみで利用するためここでブランクインポート
	_ "github.com/go-sql-driver/mysql"

	"github.com/jmoiron/sqlx"
)

var db *sqlx.DB

func init() {
	var err error
	db, err = connectMySQL()
	if err != nil {
		log.Fatalf("DB connection failed : %v", err)
	}
	db.SetMaxOpenConns(10)
}

func connectMySQL() (*sqlx.DB, error) {
	host := getEnv("MYSQL_HOST", "mysql")
	port := getEnv("MYSQL_PORT", "3306")
	dbName := getEnv("MYSQL_DBNAME", "login_sample")
	user := getEnv("MYSQL_USER", "logintest")
	password := getEnv("MYSQL_PASS", "logintest")

	dsn := fmt.Sprintf("%v:%v@tcp(%v:%v)/%v", user, password, host, port, dbName)
	return sqlx.Open("mysql", dsn)
}

func getEnv(key, defaultValue string) string {
	val := os.Getenv(key)
	if val != "" {
		return val
	}
	return defaultValue
}
