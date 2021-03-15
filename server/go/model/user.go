package model

type User struct {
	Id             int    `db:"id"`
	Email          string `db:"email"`
	HashedPassword []byte `db:"password"`
}
